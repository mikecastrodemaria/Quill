// Quill - API Multi-Provider (Anthropic Claude + OpenAI + Ollama)
// Supporte les trois APIs avec détection automatique

// ============ OLLAMA (Local) ============
const fetchOllamaResponse = async (model, messages, ollamaUrl = "http://localhost:11434") => {
    // Ollama utilise un format similaire à OpenAI
    const ollamaMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));

    const requestBody = {
        model: model,
        messages: ollamaMessages,
        stream: false
    };

    const response = await fetch(`${ollamaUrl}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Ollama error: ${response.status}, ${errorDetail}`);
    }

    const responseData = await response.json();

    if (responseData.message && responseData.message.content) {
        return responseData.message.content;
    }

    throw new Error("No response from Ollama");
};

// ============ OLLAMA - Fetch Models ============
export const fetchOllamaModels = async (ollamaUrl = "http://localhost:11434") => {
    try {
        const response = await fetch(`${ollamaUrl}/api/tags`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Ollama models: ${response.status}`);
        }

        const data = await response.json();
        // Convertir au format attendu
        return {
            data: data.models ? data.models.map(m => ({ id: m.name })) : []
        };
    } catch (error) {
        console.error("Ollama fetch models error:", error);
        // Retourner une liste vide si Ollama n'est pas disponible
        return { data: [] };
    }
};

// ============ ANTHROPIC (Claude) ============
const fetchAnthropicResponse = async (apiKey, model, messages, maxTokens) => {
    let systemPrompt = "";
    const anthropicMessages = [];

    for (const msg of messages) {
        if (msg.role === "system") {
            systemPrompt = msg.content;
        } else {
            anthropicMessages.push({
                role: msg.role,
                content: msg.content
            });
        }
    }

    if (anthropicMessages.length === 0) {
        throw new Error("No user message provided");
    }

    const requestBody = {
        model: model,
        max_tokens: maxTokens > 0 ? parseInt(maxTokens) : 4096,
        messages: anthropicMessages
    };

    if (systemPrompt) {
        requestBody.system = systemPrompt;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Anthropic API error: ${response.status}, ${errorDetail}`);
    }

    const responseData = await response.json();

    if (responseData.content && responseData.content.length > 0) {
        return responseData.content[0].text;
    }

    throw new Error("No response from Claude");
};

// ============ OPENAI ============
const fetchOpenAIResponse = async (apiKey, model, messages, maxTokens) => {
    const requestBody = {
        model: model,
        messages: messages
    };

    if (maxTokens > 0) {
        requestBody.max_tokens = parseInt(maxTokens);
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`OpenAI API error: ${response.status}, ${errorDetail}`);
    }

    const responseData = await response.json();
    return responseData.choices[0].message.content;
};

// ============ OPENAI - Fetch Models ============
export const fetchOpenAIModels = async (apiKey) => {
    const response = await fetch("https://api.openai.com/v1/models", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
    }

    return await response.json();
};

// ============ DÉTECTION AUTO DU PROVIDER ============
const detectProvider = (apiKey) => {
    if (!apiKey) return null;
    if (apiKey.startsWith("sk-ant-")) {
        return "anthropic";
    } else if (apiKey.startsWith("sk-proj-") || apiKey.startsWith("sk-")) {
        return "openai";
    }
    return null;
};

// ============ EXPORTS PRINCIPAUX ============
export const fetchModels = async (apiKey) => {
    // Retourne une liste statique (Anthropic n'a pas d'API models)
    return {
        data: [
            { id: "claude-sonnet-4-5-20250929" },
            { id: "claude-3-5-sonnet-20241022" },
            { id: "claude-3-5-haiku-20241022" },
            { id: "claude-3-opus-20240229" }
        ]
    };
};

export const fetchResponse = async (apiKey, model, messages, maxTokens, provider = null, ollamaUrl = "http://localhost:11434") => {
    // Le provider explicite a priorité sur la détection auto
    let activeProvider = provider;

    // Si pas de provider explicite, détecte via le modèle ou la clé
    if (!activeProvider) {
        if (model && model.startsWith("claude")) {
            activeProvider = "anthropic";
        } else if (model && (model.startsWith("gpt") || model.startsWith("o1"))) {
            activeProvider = "openai";
        } else {
            activeProvider = detectProvider(apiKey);
        }
    }

    console.log("Quill: Using provider:", activeProvider, "Model:", model);

    if (activeProvider === "anthropic") {
        return fetchAnthropicResponse(apiKey, model, messages, maxTokens);
    } else if (activeProvider === "ollama") {
        return fetchOllamaResponse(model, messages, ollamaUrl);
    } else {
        return fetchOpenAIResponse(apiKey, model, messages, maxTokens);
    }
};
