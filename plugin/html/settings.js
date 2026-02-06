import { fetchModels, fetchOpenAIModels, fetchOllamaModels } from './API.js';
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

// Modèles Ollama par défaut (si la détection échoue)
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

const defaultModels = {
    anthropic: "claude-sonnet-4-5-20250929",
    openai: "gpt-4o",
    ollama: "llama3.2"
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
    // Vider la liste actuelle
    while (modelSelect.options.length > 0) {
        modelSelect.remove(0);
    }

    let models;
    const defaultForProvider = defaultModels[provider] || defaultModel;

    // Choisir la liste de modèles selon le provider
    if (provider === "ollama") {
        // Essayer de récupérer les modèles installés sur Ollama
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

    // Ajouter tous les modèles disponibles
    models.forEach(model => {
        let option = document.createElement("option");
        option.value = model.id;
        option.text = model.name;
        modelSelect.add(option);
    });

    // Sélectionner le modèle sauvegardé ou par défaut
    // Vérifier si le modèle sélectionné existe dans la nouvelle liste
    const modelExists = models.some(m => m.id === selectedModel);
    modelSelect.value = modelExists ? selectedModel : defaultForProvider;
};

// ============ SAUVEGARDE ============
const saveSettings = (actionsContainer, modelSelect, apiKeyInput, maxTokensInput, maxSizeInput, providerSelect, ollamaUrlInput) => {
    const actions = Array.from(actionsContainer.children).map(actionDiv => {
        const nameInput = actionDiv.querySelector(".action-name");
        const promptInput = actionDiv.querySelector(".action-prompt");
        return { name: nameInput.value, prompt: promptInput.value };
    });

    browser.storage.local.set({
        provider: providerSelect.value,
        model: modelSelect.value,
        apiKey: apiKeyInput.value,
        ollamaUrl: ollamaUrlInput ? ollamaUrlInput.value : "http://localhost:11434",
        actions: actions,
        maxTokens: maxTokensInput.value,
        maxSize: maxSizeInput.value,
        promptUpdated: promptVersion
    });

    // Feedback visuel
    alert("Paramètres sauvegardés !");
};

// ============ RÉINITIALISATION ============
const setDefaultSettings = (actionsContainer, modelSelect, apiKeyInput, maxTokensInput, maxSizeInput, providerSelect, ollamaUrlInput) => {
    while (actionsContainer.firstChild) {
        actionsContainer.firstChild.remove();
    }
    providerSelect.value = "anthropic";
    loadModels(modelSelect, "anthropic", defaultModel);
    apiKeyInput.value = "";
    if (ollamaUrlInput) ollamaUrlInput.value = "http://localhost:11434";
    maxTokensInput.value = 4096;
    maxSizeInput.value = 0;
    defaultActions.forEach(({ name, prompt }) => {
        addAction(name, prompt, actionsContainer);
    });
    browser.storage.local.set({
        provider: "anthropic",
        model: defaultModel,
        apiKey: "",
        ollamaUrl: "http://localhost:11434",
        actions: defaultActions,
        maxTokens: 4096,
        promptUpdated: promptVersion
    });
};

// ============ GESTION AFFICHAGE CONDITIONNEL ============
const updateProviderUI = (provider, apiKeyRow, ollamaUrlRow) => {
    if (provider === "ollama") {
        // Ollama: pas besoin de clé API, mais URL nécessaire
        apiKeyRow.style.display = "none";
        ollamaUrlRow.style.display = "flex";
    } else {
        // Anthropic/OpenAI: clé API nécessaire, pas d'URL Ollama
        apiKeyRow.style.display = "flex";
        ollamaUrlRow.style.display = "none";
    }
};

// ============ INITIALISATION ============
document.addEventListener("DOMContentLoaded", () => {
    const providerSelect = document.getElementById("provider");
    const modelSelect = document.getElementById("model");
    const apiKeyInput = document.getElementById("api-key");
    const ollamaUrlInput = document.getElementById("ollama-url");
    const apiKeyRow = document.getElementById("api-key-row");
    const ollamaUrlRow = document.getElementById("ollama-url-row");
    const actionsContainer = document.getElementById("actions-container");
    const addActionButton = document.getElementById("add-action");
    const saveButton = document.getElementById("save-settings");
    const maxTokensInput = document.getElementById("max-tokens");
    const maxSizeInput = document.getElementById("max-size");
    const defaultButton = document.getElementById("default-settings");
    const notesContainer = document.getElementById("notes-container");

    // Charger les paramètres sauvegardés
    browser.storage.local.get(["provider", "model", "apiKey", "ollamaUrl", "actions", "maxTokens", "promptUpdated", "maxSize"], (data) => {
        const {
            provider = "anthropic",
            model = defaultModel,
            apiKey = '',
            ollamaUrl = 'http://localhost:11434',
            maxTokens = 4096,
            promptUpdated = 0,
            maxSize = 0,
            actions = defaultActions
        } = data;

        // Initialiser le provider
        providerSelect.value = provider;
        apiKeyInput.value = apiKey;
        if (ollamaUrlInput) ollamaUrlInput.value = ollamaUrl;

        // Mise à jour de l'UI selon le provider
        updateProviderUI(provider, apiKeyRow, ollamaUrlRow);

        // Charger les modèles selon le provider
        loadModels(modelSelect, provider, model, ollamaUrl);

        maxTokensInput.value = maxTokens;
        maxSizeInput.value = maxSize;
        handleWarning(promptUpdated, notesContainer);

        actions.forEach(({ name, prompt }) => addAction(name, prompt, actionsContainer));

        // Event listeners
        providerSelect.addEventListener("change", () => {
            const newProvider = providerSelect.value;
            updateProviderUI(newProvider, apiKeyRow, ollamaUrlRow);
            const currentOllamaUrl = ollamaUrlInput ? ollamaUrlInput.value : "http://localhost:11434";
            loadModels(modelSelect, newProvider, null, currentOllamaUrl);
        });

        addActionButton.addEventListener("click", () => addAction("", "", actionsContainer));
        saveButton.addEventListener("click", () => saveSettings(actionsContainer, modelSelect, apiKeyInput, maxTokensInput, maxSizeInput, providerSelect, ollamaUrlInput));
        defaultButton.addEventListener("click", () => setDefaultSettings(actionsContainer, modelSelect, apiKeyInput, maxTokensInput, maxSizeInput, providerSelect, ollamaUrlInput));
    });
});
