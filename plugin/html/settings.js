import { fetchModels, fetchOpenAIModels, fetchOllamaModels, checkOllamaConnection, checkAnthropicApiKey, checkOpenAIApiKey } from './API.js';
import { promptVersion, defaultActions, defaultModel } from './globals.js';

// ============ MODÈLES PAR PROVIDER ============
const anthropicModels = [
    { id: "claude-sonnet-4-5-20250929", name: "Claude Sonnet 4.5 (recommandé)" },
    { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
    { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku (rapide)" },
    { id: "claude-3-opus-20240229", name: "Claude 3 Opus (puissant)" },
    { id: "claude-3-sonnet-20240229", name: "Claude 3 Sonnet" },
    { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku" }
];

const openaiModels = [
    { id: "gpt-4o", name: "GPT-4o (recommandé)" },
    { id: "gpt-4o-mini", name: "GPT-4o Mini (rapide)" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo (économique)" }
];

const defaultOllamaModels = [
    { id: "llama3.2", name: "Llama 3.2 (recommandé)" },
    { id: "llama3.1", name: "Llama 3.1" },
    { id: "mistral", name: "Mistral 7B" },
    { id: "mixtral", name: "Mixtral 8x7B" },
    { id: "codellama", name: "Code Llama" },
    { id: "phi3", name: "Phi-3" },
    { id: "gemma2", name: "Gemma 2" },
    { id: "qwen2.5", name: "Qwen 2.5" }
];

const defaultProviderModels = {
    anthropic: "claude-sonnet-4-5-20250929",
    openai: "gpt-4o",
    ollama: "llama3.2"
};

// ============ DEFAULT PROVIDERS CONFIG ============
const defaultProviders = {
    anthropic: {
        enabled: true,
        apiKey: "",
        model: "claude-sonnet-4-5-20250929"
    },
    openai: {
        enabled: false,
        apiKey: "",
        model: "gpt-4o"
    },
    ollama: {
        enabled: false,
        url: "http://localhost:11434",
        model: "llama3.2",
        connected: false
    }
};

// ============ FONCTIONS UTILITAIRES ============
const addAction = (name, prompt, actionsContainer) => {
    const actionDiv = document.createElement("div");
    const nameInput = document.createElement("input");
    const promptInput = document.createElement("textarea");
    const deleteButton = document.createElement("button");

    nameInput.type = "text";
    nameInput.value = name;
    nameInput.classList.add("action-name");

    promptInput.value = prompt;
    promptInput.classList.add("action-prompt");

    deleteButton.innerText = "Supprimer";
    deleteButton.classList.add("button", "bad");
    deleteButton.addEventListener("click", () => actionDiv.remove());

    const docFrag = document.createDocumentFragment();
    docFrag.appendChild(nameInput);
    docFrag.appendChild(promptInput);
    docFrag.appendChild(deleteButton);

    actionDiv.appendChild(docFrag);
    actionsContainer.appendChild(actionDiv);
};

const handleWarning = (promptUpdated, notesContainer) => {
    if (promptVersion > promptUpdated) {
        let warningContainer = document.createElement('div');
        warningContainer.id = "warning-container";
        warningContainer.classList.add('row')
        let warningDiv25 = document.createElement('div');
        warningDiv25.classList.add('col-25');
        let warningDiv75 = document.createElement('div');
        warningDiv75.classList.add('col-75');
        let warningIcon = document.createElement('img');
        warningIcon.src = "/images/warning.png";
        warningIcon.classList.add('small-icon');
        let warningText = document.createElement('span');
        warningText.innerText = "De nouveaux prompts sont disponibles. Sauvegardez vos prompts personnalisés et cliquez sur Réinitialiser pour charger les nouveaux. ";
        let ignoreButton = document.createElement('button');
        ignoreButton.classList.add('button');
        ignoreButton.classList.add('bad');
        ignoreButton.innerText = "Ignorer";
        ignoreButton.addEventListener('click', function () {
            browser.storage.local.set({promptUpdated: promptVersion});
            warningContainer.parentElement.removeChild(warningContainer);
        });
        warningDiv25.innerText = "Attention "
        warningDiv25.appendChild(warningIcon);
        warningDiv75.appendChild(warningText);
        warningDiv75.appendChild(ignoreButton);
        warningContainer.appendChild(warningDiv25);
        warningContainer.appendChild(warningDiv75);
        notesContainer.appendChild(warningContainer);
    }
};

// ============ CHARGEMENT DES MODÈLES ============
const loadModels = async (modelSelect, provider, selectedModel, ollamaUrl = "http://localhost:11434") => {
    while (modelSelect.options.length > 0) {
        modelSelect.remove(0);
    }

    let models;
    const defaultForProvider = defaultProviderModels[provider] || defaultModel;

    if (provider === "ollama") {
        try {
            const response = await fetchOllamaModels(ollamaUrl);
            if (response.data && response.data.length > 0) {
                models = response.data.map(m => ({ id: m.id, name: m.id }));
            } else {
                models = defaultOllamaModels;
            }
        } catch (error) {
            console.log("Ollama non disponible, utilisation des modèles par défaut");
            models = defaultOllamaModels;
        }
    } else if (provider === "openai") {
        models = openaiModels;
    } else {
        models = anthropicModels;
    }

    models.forEach(model => {
        let option = document.createElement("option");
        option.value = model.id;
        option.text = model.name;
        modelSelect.add(option);
    });

    const modelExists = models.some(m => m.id === selectedModel);
    modelSelect.value = modelExists ? selectedModel : defaultForProvider;
};

// ============ TEST CONNEXION OLLAMA ============
const testOllamaConnection = async (ollamaUrl, statusElement) => {
    statusElement.innerHTML = '<span style="color: orange;">⏳ Test en cours...</span>';

    try {
        const isConnected = await checkOllamaConnection(ollamaUrl);
        if (isConnected) {
            statusElement.innerHTML = '<span style="color: #4ade80;">✅ Connecté</span>';
            return true;
        } else {
            statusElement.innerHTML = `<span style="color: #f87171;">❌ Non connecté - <a href="https://github.com/mikecastrodemaria/Quill/wiki/Ollama-CORS" target="_blank">Aide</a></span>`;
            return false;
        }
    } catch (error) {
        statusElement.innerHTML = `<span style="color: #f87171;">❌ ${error.message}</span>`;
        return false;
    }
};

// ============ TEST CLÉ API ANTHROPIC ============
const testAnthropicKey = async (apiKey, statusElement) => {
    statusElement.innerHTML = '<span style="color: orange;">⏳ Test en cours...</span>';

    const result = await checkAnthropicApiKey(apiKey);
    if (result.valid) {
        statusElement.innerHTML = '<span style="color: #4ade80;">✅ Clé valide</span>';
        return true;
    } else {
        statusElement.innerHTML = `<span style="color: #f87171;">❌ ${result.error}</span>`;
        return false;
    }
};

// ============ TEST CLÉ API OPENAI ============
const testOpenAIKey = async (apiKey, statusElement) => {
    statusElement.innerHTML = '<span style="color: orange;">⏳ Test en cours...</span>';

    const result = await checkOpenAIApiKey(apiKey);
    if (result.valid) {
        statusElement.innerHTML = '<span style="color: #4ade80;">✅ Clé valide</span>';
        return true;
    } else {
        statusElement.innerHTML = `<span style="color: #f87171;">❌ ${result.error}</span>`;
        return false;
    }
};

// ============ SAUVEGARDE ============
const saveSettings = async (elements, providers) => {
    const { actionsContainer, maxTokensInput, maxSizeInput, activeProviderSelect } = elements;

    const actions = Array.from(actionsContainer.children).map(actionDiv => {
        const nameInput = actionDiv.querySelector(".action-name");
        const promptInput = actionDiv.querySelector(".action-prompt");
        return { name: nameInput.value, prompt: promptInput.value };
    });

    // Mettre à jour les configs providers depuis les inputs
    providers.anthropic.enabled = document.getElementById("anthropic-enabled").checked;
    providers.anthropic.apiKey = document.getElementById("anthropic-api-key").value;
    providers.anthropic.model = document.getElementById("anthropic-model").value;

    providers.openai.enabled = document.getElementById("openai-enabled").checked;
    providers.openai.apiKey = document.getElementById("openai-api-key").value;
    providers.openai.model = document.getElementById("openai-model").value;

    providers.ollama.enabled = document.getElementById("ollama-enabled").checked;
    providers.ollama.url = document.getElementById("ollama-url").value;
    providers.ollama.model = document.getElementById("ollama-model").value;

    // Vérifier si le provider actif est enabled
    const activeProvider = activeProviderSelect.value;
    if (!providers[activeProvider].enabled) {
        alert("Attention : Le provider actif sélectionné n'est pas activé ! Veuillez l'activer ou en choisir un autre.");
        return;
    }

    // Vérifier la connexion Ollama si c'est le provider actif
    if (activeProvider === "ollama") {
        const isConnected = await checkOllamaConnection(providers.ollama.url);
        providers.ollama.connected = isConnected;
        if (!isConnected) {
            const continueAnyway = confirm("Ollama n'est pas connecté. Voulez-vous sauvegarder quand même ?");
            if (!continueAnyway) return;
        }
    }

    await browser.storage.local.set({
        activeProvider: activeProvider,
        providers: providers,
        actions: actions,
        maxTokens: maxTokensInput.value,
        maxSize: maxSizeInput.value,
        promptUpdated: promptVersion,
        // Rétro-compatibilité
        provider: activeProvider,
        model: providers[activeProvider].model,
        apiKey: providers[activeProvider].apiKey || "",
        ollamaUrl: providers.ollama.url
    });

    alert("Paramètres sauvegardés !");
};

// ============ RÉINITIALISATION ============
const setDefaultSettings = async (elements) => {
    const { actionsContainer, maxTokensInput, maxSizeInput, activeProviderSelect } = elements;

    while (actionsContainer.firstChild) {
        actionsContainer.firstChild.remove();
    }

    // Reset providers
    document.getElementById("anthropic-enabled").checked = true;
    document.getElementById("anthropic-api-key").value = "";
    document.getElementById("openai-enabled").checked = false;
    document.getElementById("openai-api-key").value = "";
    document.getElementById("ollama-enabled").checked = false;
    document.getElementById("ollama-url").value = "http://localhost:11434";

    activeProviderSelect.value = "anthropic";
    maxTokensInput.value = 4096;
    maxSizeInput.value = 0;

    // Reload models
    await loadModels(document.getElementById("anthropic-model"), "anthropic", defaultProviderModels.anthropic);
    await loadModels(document.getElementById("openai-model"), "openai", defaultProviderModels.openai);
    await loadModels(document.getElementById("ollama-model"), "ollama", defaultProviderModels.ollama);

    defaultActions.forEach(({ name, prompt }) => {
        addAction(name, prompt, actionsContainer);
    });

    await browser.storage.local.set({
        activeProvider: "anthropic",
        providers: defaultProviders,
        actions: defaultActions,
        maxTokens: 4096,
        maxSize: 0,
        promptUpdated: promptVersion,
        // Rétro-compatibilité
        provider: "anthropic",
        model: defaultModel,
        apiKey: "",
        ollamaUrl: "http://localhost:11434"
    });

    alert("Paramètres réinitialisés !");
};

// ============ UPDATE ACTIVE PROVIDER OPTIONS ============
const updateActiveProviderOptions = (providers, activeProviderSelect) => {
    // Vider les options
    while (activeProviderSelect.options.length > 0) {
        activeProviderSelect.remove(0);
    }

    // Ajouter seulement les providers activés
    if (providers.anthropic.enabled) {
        const opt = document.createElement("option");
        opt.value = "anthropic";
        opt.text = "Anthropic (Claude)";
        activeProviderSelect.add(opt);
    }
    if (providers.openai.enabled) {
        const opt = document.createElement("option");
        opt.value = "openai";
        opt.text = "OpenAI (GPT)";
        activeProviderSelect.add(opt);
    }
    if (providers.ollama.enabled) {
        const opt = document.createElement("option");
        opt.value = "ollama";
        opt.text = "Ollama (Local)";
        activeProviderSelect.add(opt);
    }

    // Si aucun provider activé, ajouter un placeholder
    if (activeProviderSelect.options.length === 0) {
        const opt = document.createElement("option");
        opt.value = "";
        opt.text = "-- Activez au moins un provider --";
        activeProviderSelect.add(opt);
    }
};

// ============ INITIALISATION ============
document.addEventListener("DOMContentLoaded", async () => {
    const activeProviderSelect = document.getElementById("active-provider");
    const actionsContainer = document.getElementById("actions-container");
    const addActionButton = document.getElementById("add-action");
    const saveButton = document.getElementById("save-settings");
    const maxTokensInput = document.getElementById("max-tokens");
    const maxSizeInput = document.getElementById("max-size");
    const defaultButton = document.getElementById("default-settings");
    const notesContainer = document.getElementById("notes-container");

    // Provider-specific elements
    const anthropicEnabled = document.getElementById("anthropic-enabled");
    const anthropicApiKey = document.getElementById("anthropic-api-key");
    const anthropicModel = document.getElementById("anthropic-model");
    const anthropicTestBtn = document.getElementById("anthropic-test");
    const anthropicStatus = document.getElementById("anthropic-status");

    const openaiEnabled = document.getElementById("openai-enabled");
    const openaiApiKey = document.getElementById("openai-api-key");
    const openaiModel = document.getElementById("openai-model");
    const openaiTestBtn = document.getElementById("openai-test");
    const openaiStatus = document.getElementById("openai-status");

    const ollamaEnabled = document.getElementById("ollama-enabled");
    const ollamaUrl = document.getElementById("ollama-url");
    const ollamaModel = document.getElementById("ollama-model");
    const ollamaTestBtn = document.getElementById("ollama-test");
    const ollamaStatus = document.getElementById("ollama-status");

    // Charger les paramètres sauvegardés
    const data = await browser.storage.local.get([
        "activeProvider", "providers", "actions", "maxTokens", "promptUpdated", "maxSize",
        // Rétro-compatibilité avec l'ancien format
        "provider", "model", "apiKey", "ollamaUrl"
    ]);

    let providers = data.providers || { ...defaultProviders };

    // Migration depuis l'ancien format
    if (!data.providers && data.apiKey) {
        const oldProvider = data.provider || "anthropic";
        if (oldProvider === "anthropic") {
            providers.anthropic.apiKey = data.apiKey;
            providers.anthropic.model = data.model || defaultProviderModels.anthropic;
            providers.anthropic.enabled = true;
        } else if (oldProvider === "openai") {
            providers.openai.apiKey = data.apiKey;
            providers.openai.model = data.model || defaultProviderModels.openai;
            providers.openai.enabled = true;
        } else if (oldProvider === "ollama") {
            providers.ollama.url = data.ollamaUrl || "http://localhost:11434";
            providers.ollama.model = data.model || defaultProviderModels.ollama;
            providers.ollama.enabled = true;
        }
    }

    const activeProvider = data.activeProvider || data.provider || "anthropic";
    const maxTokens = data.maxTokens || 4096;
    const maxSize = data.maxSize || 0;
    const promptUpdated = data.promptUpdated || 0;
    const actions = data.actions || defaultActions;

    // Initialiser les inputs
    anthropicEnabled.checked = providers.anthropic.enabled;
    anthropicApiKey.value = providers.anthropic.apiKey || "";

    openaiEnabled.checked = providers.openai.enabled;
    openaiApiKey.value = providers.openai.apiKey || "";

    ollamaEnabled.checked = providers.ollama.enabled;
    ollamaUrl.value = providers.ollama.url || "http://localhost:11434";

    // Charger les modèles pour chaque provider
    await loadModels(anthropicModel, "anthropic", providers.anthropic.model);
    await loadModels(openaiModel, "openai", providers.openai.model);
    await loadModels(ollamaModel, "ollama", providers.ollama.model, providers.ollama.url);

    // Mettre à jour les options du provider actif
    updateActiveProviderOptions(providers, activeProviderSelect);
    if (providers[activeProvider]?.enabled) {
        activeProviderSelect.value = activeProvider;
    }

    maxTokensInput.value = maxTokens;
    maxSizeInput.value = maxSize;
    handleWarning(promptUpdated, notesContainer);
    actions.forEach(({ name, prompt }) => addAction(name, prompt, actionsContainer));

    // Event listeners pour les toggles
    anthropicEnabled.addEventListener("change", () => {
        providers.anthropic.enabled = anthropicEnabled.checked;
        updateActiveProviderOptions(providers, activeProviderSelect);
    });

    openaiEnabled.addEventListener("change", () => {
        providers.openai.enabled = openaiEnabled.checked;
        updateActiveProviderOptions(providers, activeProviderSelect);
    });

    ollamaEnabled.addEventListener("change", async () => {
        providers.ollama.enabled = ollamaEnabled.checked;
        updateActiveProviderOptions(providers, activeProviderSelect);

        // Test auto de connexion si activé
        if (ollamaEnabled.checked) {
            await testOllamaConnection(ollamaUrl.value, ollamaStatus);
        } else {
            ollamaStatus.innerHTML = "";
        }
    });

    // Test Anthropic API Key
    anthropicTestBtn.addEventListener("click", async () => {
        await testAnthropicKey(anthropicApiKey.value, anthropicStatus);
    });

    // Test OpenAI API Key
    openaiTestBtn.addEventListener("click", async () => {
        await testOpenAIKey(openaiApiKey.value, openaiStatus);
    });

    // Test Ollama manuel
    ollamaTestBtn.addEventListener("click", async () => {
        const isConnected = await testOllamaConnection(ollamaUrl.value, ollamaStatus);
        if (isConnected) {
            // Recharger les modèles
            await loadModels(ollamaModel, "ollama", providers.ollama.model, ollamaUrl.value);
        }
    });

    // Recharger modèles Ollama si URL change
    ollamaUrl.addEventListener("blur", async () => {
        if (ollamaEnabled.checked) {
            await testOllamaConnection(ollamaUrl.value, ollamaStatus);
            await loadModels(ollamaModel, "ollama", providers.ollama.model, ollamaUrl.value);
        }
    });

    // Actions
    addActionButton.addEventListener("click", () => addAction("", "", actionsContainer));

    saveButton.addEventListener("click", () => {
        saveSettings({ actionsContainer, maxTokensInput, maxSizeInput, activeProviderSelect }, providers);
    });

    defaultButton.addEventListener("click", () => {
        setDefaultSettings({ actionsContainer, maxTokensInput, maxSizeInput, activeProviderSelect });
    });

    // Test initial Ollama si activé
    if (ollamaEnabled.checked) {
        testOllamaConnection(ollamaUrl.value, ollamaStatus);
    }
});
