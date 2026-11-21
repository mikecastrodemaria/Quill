// Quill - Multi-provider API layer
// Anthropic (Claude), OpenAI, OVHcloud AI Endpoints (OpenAI-compatible), Ollama

import { PROVIDERS, OLLAMA_DEFAULT_URL, OVH_DEFAULT_URL } from './providers.js';

const GENERATE_TIMEOUT = 180000;
const LIST_TIMEOUT = 10000;

// kind: auth | rate | network | timeout | empty | http
export class QuillError extends Error {
    constructor(kind, provider, detail = "", status = 0) {
        super(detail || kind);
        this.kind = kind;
        this.provider = provider;
        this.status = status;
    }
}

const trimUrl = (url, fallback) => (url || fallback).trim().replace(/\/+$/, "");

const request = async (provider, url, options = {}, timeout = GENERATE_TIMEOUT) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    let response;
    try {
        response = await fetch(url, { ...options, signal: controller.signal });
    } catch (error) {
        if (error.name === "AbortError") throw new QuillError("timeout", provider);
        throw new QuillError("network", provider, error.message);
    } finally {
        clearTimeout(timer);
    }

    if (!response.ok) {
        let detail = await response.text().catch(() => "");
        try {
            const json = JSON.parse(detail);
            const err = json.error;
            detail = (typeof err === "string" ? err : err?.message) || json.message || detail;
        } catch { /* plain text body */ }
        detail = String(detail).slice(0, 300);
        const kind = response.status === 401 || response.status === 403 ? "auth"
            : response.status === 429 ? "rate" : "http";
        throw new QuillError(kind, provider, detail, response.status);
    }
    return response.json();
};

// Reasoning models sometimes inline their scratchpad; never put that in an email.
const cleanText = (text) => String(text || "").replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

const jsonHeaders = (apiKey) => {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    return headers;
};

const anthropicHeaders = (apiKey) => ({
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
    "anthropic-dangerous-direct-browser-access": "true"
});

// ============ GENERATION ============

// A message may carry images: { role, content, images: [{ mediaType, data }] }
// where data is base64 without the "data:" prefix. Each provider wants its own shape.

const toAnthropic = ({ role, content, images }) => (images?.length ? {
    role,
    content: [
        ...images.map(i => ({ type: "image", source: { type: "base64", media_type: i.mediaType, data: i.data } })),
        { type: "text", text: content }
    ]
} : { role, content });

const toOpenAI = ({ role, content, images }) => (images?.length ? {
    role,
    content: [
        { type: "text", text: content },
        ...images.map(i => ({ type: "image_url", image_url: { url: `data:${i.mediaType};base64,${i.data}` } }))
    ]
} : { role, content });

const toOllama = ({ role, content, images }) => (images?.length
    ? { role, content, images: images.map(i => i.data) }
    : { role, content });

const generateAnthropic = async ({ apiKey, model, maxTokens }, messages) => {
    const system = messages.filter(m => m.role === "system").map(m => m.content).join("\n\n");
    const body = {
        model,
        max_tokens: maxTokens > 0 ? maxTokens : 4096,
        messages: messages.filter(m => m.role !== "system").map(toAnthropic)
    };
    if (system) body.system = system;

    const data = await request("anthropic", "https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: anthropicHeaders(apiKey),
        body: JSON.stringify(body)
    });
    return (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
};

// tokenParam differs: OpenAI's recent models only accept max_completion_tokens,
// while most OpenAI-compatible servers (OVHcloud, vLLM...) expect max_tokens.
const generateOpenAICompatible = async (provider, baseUrl, tokenParam, { apiKey, model, maxTokens }, messages) => {
    const body = { model, messages: messages.map(toOpenAI) };
    if (maxTokens > 0) body[tokenParam] = maxTokens;

    const data = await request(provider, `${baseUrl}/chat/completions`, {
        method: "POST",
        headers: jsonHeaders(apiKey),
        body: JSON.stringify(body)
    });
    return data.choices?.[0]?.message?.content;
};

const generateOllama = async ({ url, model }, messages) => {
    const data = await request("ollama", `${trimUrl(url, OLLAMA_DEFAULT_URL)}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model,
            messages: messages.map(toOllama),
            stream: false
        })
    });
    return data.message?.content;
};

// config comes from getActiveProviderConfig() in providers.js
export const fetchResponse = async (config, messages) => {
    const { provider } = config;
    if (!PROVIDERS[provider]) throw new QuillError("http", provider, `Unknown provider: ${provider}`);
    if (!PROVIDERS[provider].noKey && !PROVIDERS[provider].keyOptional && !config.apiKey) {
        throw new QuillError("nokey", provider);
    }

    let text;
    if (provider === "anthropic") {
        text = await generateAnthropic(config, messages);
    } else if (provider === "ollama") {
        text = await generateOllama(config, messages);
    } else if (provider === "ovh") {
        text = await generateOpenAICompatible("ovh", trimUrl(config.url, OVH_DEFAULT_URL), "max_tokens", config, messages);
    } else {
        text = await generateOpenAICompatible("openai", "https://api.openai.com/v1", "max_completion_tokens", config, messages);
    }

    text = cleanText(text);
    if (!text) throw new QuillError("empty", provider);
    return text;
};

// ============ MODEL LISTS ============
// Each returns [{ id, name }] and throws a QuillError on failure.

const NON_CHAT = /embed|whisper|tts|audio|realtime|transcri|dall-e|image|moderation|guard|rerank|stable-diffusion|bge-|search|instruct$|^babbage|^davinci|sora|codex/i;

const listAnthropic = async ({ apiKey }) => {
    const data = await request("anthropic", "https://api.anthropic.com/v1/models?limit=100", {
        headers: anthropicHeaders(apiKey)
    }, LIST_TIMEOUT);
    return (data.data || []).map(m => ({ id: m.id, name: m.display_name || m.id }));
};

const listOpenAI = async ({ apiKey }) => {
    const data = await request("openai", "https://api.openai.com/v1/models", {
        headers: jsonHeaders(apiKey)
    }, LIST_TIMEOUT);
    return (data.data || [])
        .filter(m => /^(gpt|o\d|chatgpt)/i.test(m.id) && !NON_CHAT.test(m.id))
        .sort((a, b) => (b.created || 0) - (a.created || 0))
        .map(m => ({ id: m.id, name: m.id }));
};

// The OVHcloud catalogue mixes chat, embedding, speech and image models.
// Chat models are the ones that advertise an output token budget.
const listOvh = async ({ apiKey, url }) => {
    const data = await request("ovh", `${trimUrl(url, OVH_DEFAULT_URL)}/models`, {
        headers: jsonHeaders(apiKey)
    }, LIST_TIMEOUT);
    const list = Array.isArray(data) ? data : (data.data || []);
    const hasBudget = list.some(m => typeof m.max_completion_tokens === "number");
    return list
        .filter(m => typeof m.id === "string")
        .filter(m => !/guard|embed|whisper|tts|stable-diffusion|^bge-/i.test(m.id))
        .filter(m => !hasBudget || m.max_completion_tokens > 0)
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(m => ({ id: m.id, name: m.owned_by ? `${m.id} · ${m.owned_by}` : m.id }));
};

const listOllama = async ({ url }) => {
    const data = await request("ollama", `${trimUrl(url, OLLAMA_DEFAULT_URL)}/api/tags`, {}, LIST_TIMEOUT);
    return (data.models || []).map(m => ({ id: m.name, name: m.name }));
};

export const fetchProviderModels = (provider, config) => {
    if (provider === "anthropic") return listAnthropic(config);
    if (provider === "openai") return listOpenAI(config);
    if (provider === "ovh") return listOvh(config);
    return listOllama(config);
};

// ============ CONNECTION TEST ============
// Resolves with the live model list when credentials work, throws otherwise.

export const testProvider = async (provider, config) => {
    const def = PROVIDERS[provider];
    if (!def.noKey && !def.keyOptional && !config.apiKey) throw new QuillError("nokey", provider);

    const models = await fetchProviderModels(provider, config);

    // OVHcloud's model list is public, so only a real (1-token) call proves the key.
    if (provider === "ovh" && config.apiKey) {
        const model = models.some(m => m.id === config.model) ? config.model : models[0]?.id;
        if (model) {
            await request("ovh", `${trimUrl(config.url, OVH_DEFAULT_URL)}/chat/completions`, {
                method: "POST",
                headers: jsonHeaders(config.apiKey),
                body: JSON.stringify({ model, messages: [{ role: "user", content: "Hi" }], max_tokens: 1 })
            }, 30000);
        }
    }
    return models;
};
