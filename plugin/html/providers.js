// Quill - Provider registry and stored configuration helpers

export const OLLAMA_DEFAULT_URL = "http://localhost:11434";
export const OVH_DEFAULT_URL = "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1";

// Static model lists are only fallbacks: the settings page loads the live
// list from each provider whenever it can.
export const PROVIDERS = {
    anthropic: {
        label: "Anthropic (Claude)",
        short: "Claude",
        keyPlaceholder: "sk-ant-...",
        keyUrl: "https://console.anthropic.com/settings/keys",
        defaultModel: "claude-sonnet-5-5",
        models: [
            { id: "claude-sonnet-5-5", name: "Claude Sonnet 5.5" },
            { id: "claude-opus-5-5", name: "Claude Opus 5.5" },
            { id: "claude-haiku-5-5", name: "Claude Haiku 5.5" },
            { id: "claude-fable-5-2", name: "Claude Fable 5.2" }
        ]
    },
    openai: {
        label: "OpenAI (GPT)",
        short: "OpenAI",
        keyPlaceholder: "sk-proj-...",
        keyUrl: "https://platform.openai.com/api-keys",
        defaultModel: "gpt-4o",
        models: [
            { id: "gpt-4o", name: "gpt-4o" },
            { id: "gpt-4o-mini", name: "gpt-4o-mini" }
        ]
    },
    ovh: {
        label: "OVHcloud AI Endpoints",
        short: "OVHcloud",
        keyPlaceholder: "eyJ...",
        keyOptional: true,
        keyUrl: "https://endpoints.ai.cloud.ovh.net/",
        hasUrl: true,
        defaultUrl: OVH_DEFAULT_URL,
        defaultModel: "Mistral-Small-3.2-24B-Instruct-2506",
        models: [
            { id: "Mistral-Small-3.2-24B-Instruct-2506", name: "Mistral-Small-3.2-24B-Instruct-2506" },
            { id: "Meta-Llama-3_3-70B-Instruct", name: "Meta-Llama-3_3-70B-Instruct" },
            { id: "gpt-oss-120b", name: "gpt-oss-120b" },
            { id: "gpt-oss-20b", name: "gpt-oss-20b" }
        ]
    },
    ollama: {
        label: "Ollama (local)",
        short: "Ollama",
        noKey: true,
        hasUrl: true,
        defaultUrl: OLLAMA_DEFAULT_URL,
        defaultModel: "llama3.2",
        models: [
            { id: "llama3.2", name: "llama3.2" },
            { id: "mistral", name: "mistral" },
            { id: "qwen2.5", name: "qwen2.5" }
        ]
    }
};

export const PROVIDER_IDS = Object.keys(PROVIDERS);

export const defaultProviders = () => {
    const out = {};
    for (const id of PROVIDER_IDS) {
        const def = PROVIDERS[id];
        out[id] = { enabled: id === "anthropic", model: def.defaultModel };
        if (!def.noKey) out[id].apiKey = "";
        if (def.hasUrl) out[id].url = def.defaultUrl;
    }
    return out;
};

// Merge whatever is stored (including the pre-1.3 single-provider format)
// with the defaults, so providers added in later versions always exist.
export const normalizeProviders = (data) => {
    const providers = defaultProviders();
    if (data.providers) {
        for (const id of PROVIDER_IDS) {
            Object.assign(providers[id], data.providers[id] || {});
        }
    } else if (data.apiKey || data.provider) {
        const old = PROVIDERS[data.provider] ? data.provider : "anthropic";
        providers.anthropic.enabled = false;
        providers[old].enabled = true;
        if (data.model) providers[old].model = data.model;
        if (!PROVIDERS[old].noKey) providers[old].apiKey = data.apiKey || "";
        if (old === "ollama" && data.ollamaUrl) providers.ollama.url = data.ollamaUrl;
    }
    for (const id of PROVIDER_IDS) {
        if (PROVIDERS[id].hasUrl && !providers[id].url) providers[id].url = PROVIDERS[id].defaultUrl;
        if (!providers[id].model) providers[id].model = PROVIDERS[id].defaultModel;
    }
    return providers;
};

const STORAGE_KEYS = ["activeProvider", "providers", "maxTokens",
    // pre-1.3 format
    "provider", "model", "apiKey", "ollamaUrl"];

export const loadProviderState = async () => {
    const data = await browser.storage.local.get(STORAGE_KEYS);
    const providers = normalizeProviders(data);
    const enabled = PROVIDER_IDS.filter(id => providers[id].enabled);
    let active = data.activeProvider || data.provider;
    if (!PROVIDERS[active] || !providers[active].enabled) {
        active = enabled[0] || "anthropic";
    }
    return { providers, enabled, active, maxTokens: parseInt(data.maxTokens, 10) || 4096 };
};

// Everything fetchResponse() needs for the currently active provider.
export const getActiveProviderConfig = async () => {
    const { providers, active, maxTokens } = await loadProviderState();
    const cfg = providers[active];
    return {
        provider: active,
        label: PROVIDERS[active].short,
        apiKey: (cfg.apiKey || "").trim(),
        url: (cfg.url || "").trim(),
        model: cfg.model,
        maxTokens
    };
};

export const setActiveProvider = async (id) => {
    if (!PROVIDERS[id]) return;
    await browser.storage.local.set({ activeProvider: id });
};
