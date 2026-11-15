import { fetchProviderModels, testProvider } from './API.js';
import { promptVersion, getDefaultActions } from './globals.js';
import { getLanguage, t, applyI18n, formatError } from './i18n.js';
import { PROVIDERS, PROVIDER_IDS, defaultProviders, normalizeProviders } from './providers.js';

let language = "en";
const tr = (key, vars) => t(language, key, vars);

const el = (tag, props = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
        if (key === "dataset") Object.assign(node.dataset, value);
        else node[key] = value;
    }
    node.append(...children);
    return node;
};

// ============ PROVIDER CARDS ============

const cards = {};

const setStatus = (id, kind, text) => {
    const status = cards[id].status;
    status.className = `status ${kind}`;
    status.textContent = text;
};

const fillModels = (id, models, selected) => {
    const select = cards[id].model;
    const wanted = selected || select.value || PROVIDERS[id].defaultModel;
    const list = models.some(m => m.id === wanted) ? models : [{ id: wanted, name: wanted }, ...models];
    select.replaceChildren(...list.map(m => new Option(m.name, m.id)));
    select.value = wanted;
};

// Current (unsaved) values of a provider card, in the shape API.js expects.
const readCard = (id) => {
    const card = cards[id];
    const config = { enabled: card.enabled.checked, model: card.model.value };
    if (card.apiKey) config.apiKey = card.apiKey.value.trim();
    if (card.url) config.url = card.url.value.trim() || PROVIDERS[id].defaultUrl;
    return config;
};

const canQuery = (id, config) =>
    PROVIDERS[id].noKey || PROVIDERS[id].keyOptional || !!config.apiKey;

const refreshModels = async (id, { test = false, silent = false } = {}) => {
    const config = readCard(id);
    if (!silent) setStatus(id, "", tr("statusTesting"));
    try {
        const models = test ? await testProvider(id, config) : await fetchProviderModels(id, config);
        if (models.length) fillModels(id, models);
        if (!silent) setStatus(id, "ok", tr("statusConnected", { n: models.length }));
    } catch (error) {
        console.warn("Quill:", id, error);
        error.hasKey = !!config.apiKey;
        if (!silent) setStatus(id, "error", formatError(language, error, PROVIDERS[id].short));
    }
};

const buildCard = (id, config, onToggle) => {
    const def = PROVIDERS[id];
    const card = cards[id] = {};

    card.enabled = el("input", { type: "checkbox", checked: !!config.enabled });
    card.status = el("span", { className: "status" });
    const head = el("div", { className: "provider-head" },
        el("label", {}, card.enabled, def.label),
        card.status);

    const body = el("div", { className: "provider-body" });

    if (def.hasUrl) {
        card.url = el("input", { type: "text", id: `${id}-url`, value: config.url || def.defaultUrl, placeholder: def.defaultUrl });
        body.append(
            el("label", { htmlFor: `${id}-url`, dataset: { i18n: "settingsUrl" } }),
            el("div", { className: "control" }, card.url));
        card.url.addEventListener("change", () => refreshModels(id));
    }

    if (!def.noKey) {
        card.apiKey = el("input", { type: "password", id: `${id}-api-key`, value: config.apiKey || "",
            placeholder: def.keyPlaceholder, autocomplete: "off", spellcheck: false });
        const show = el("button", { className: "btn", type: "button", dataset: { i18n: "settingsShow" } });
        show.addEventListener("click", () => {
            const reveal = card.apiKey.type === "password";
            card.apiKey.type = reveal ? "text" : "password";
            show.dataset.i18n = reveal ? "settingsHide" : "settingsShow";
            show.textContent = tr(show.dataset.i18n);
        });
        body.append(
            el("label", { htmlFor: `${id}-api-key`, dataset: { i18n: def.keyOptional ? "settingsApiKeyOptional" : "settingsApiKey" } }),
            el("div", { className: "control" }, card.apiKey, show));
        const hint = el("p", { className: "hint muted small" });
        if (def.keyOptional) hint.append(el("span", { dataset: { i18n: "settingsOvhKeyHelp" } }), " ");
        hint.append(el("a", { href: def.keyUrl, target: "_blank", dataset: { i18n: "settingsGetKey" } }));
        body.append(hint);
    }

    card.model = el("select", { id: `${id}-model` });
    const refresh = el("button", { className: "btn icon", type: "button", textContent: "↻", dataset: { i18nTitle: "settingsRefreshModels" } });
    const test = el("button", { className: "btn", type: "button", dataset: { i18n: "settingsTest" } });
    refresh.addEventListener("click", () => refreshModels(id));
    test.addEventListener("click", () => refreshModels(id, { test: true }));
    body.append(
        el("label", { htmlFor: `${id}-model`, dataset: { i18n: "settingsModel" } }),
        el("div", { className: "control" }, card.model, refresh, test));

    if (id === "ollama") {
        body.append(el("p", { className: "hint muted small" },
            el("a", { href: "https://github.com/mikecastrodemaria/Quill/wiki/Ollama-CORS", target: "_blank", dataset: { i18n: "settingsCorsHelp" } })));
    }

    const root = el("div", { className: "provider" }, head, body);
    root.classList.toggle("enabled", !!config.enabled);
    card.enabled.addEventListener("change", () => {
        root.classList.toggle("enabled", card.enabled.checked);
        onToggle();
        if (card.enabled.checked && canQuery(id, readCard(id))) refreshModels(id, { silent: true });
    });

    fillModels(id, def.models, config.model);
    return root;
};

// ============ ACTIONS ============

const addAction = (name, prompt, container) => {
    const row = el("div", { className: "action-row" });
    const nameInput = el("input", { type: "text", className: "action-name", value: name, dataset: { i18nPlaceholder: "settingsActionName" } });
    const promptInput = el("textarea", { className: "action-prompt", value: prompt, dataset: { i18nPlaceholder: "settingsActionPrompt" } });
    const remove = el("button", { className: "btn icon danger", type: "button", textContent: "✕", dataset: { i18nTitle: "deleteAction" } });
    remove.addEventListener("click", () => {
        row.remove();
        container.dispatchEvent(new Event("change", { bubbles: true }));
    });
    row.append(nameInput, promptInput, remove);
    container.appendChild(row);
    applyI18n(language, row);
    return nameInput;
};

// ============ INIT ============

document.addEventListener("DOMContentLoaded", async () => {
    language = await getLanguage();

    const activeSelect = document.getElementById("active-provider");
    const languageSelect = document.getElementById("language");
    const maxTokensInput = document.getElementById("max-tokens");
    const maxSizeInput = document.getElementById("max-size");
    const actionsContainer = document.getElementById("actions-container");
    const saveStatus = document.getElementById("save-status");
    const notice = document.getElementById("prompt-notice");

    document.getElementById("version").textContent = `v${browser.runtime.getManifest().version}`;

    const data = await browser.storage.local.get([
        "activeProvider", "providers", "actions", "maxTokens", "promptUpdated", "maxSize",
        // pre-1.3 format
        "provider", "model", "apiKey", "ollamaUrl"
    ]);
    const providers = normalizeProviders(data);

    const updateActiveOptions = (wanted = activeSelect.value) => {
        const enabled = PROVIDER_IDS.filter(id => cards[id].enabled.checked);
        if (enabled.length) {
            activeSelect.replaceChildren(...enabled.map(id => new Option(PROVIDERS[id].label, id)));
            activeSelect.value = enabled.includes(wanted) ? wanted : enabled[0];
        } else {
            activeSelect.replaceChildren(new Option(tr("providerPlaceholder"), ""));
        }
        activeSelect.disabled = !enabled.length;
    };

    const providersContainer = document.getElementById("providers");
    for (const id of PROVIDER_IDS) {
        providersContainer.appendChild(buildCard(id, providers[id], () => updateActiveOptions()));
    }
    updateActiveOptions(data.activeProvider || data.provider || "anthropic");

    languageSelect.value = language;
    maxTokensInput.value = String(parseInt(data.maxTokens, 10) || 4096);
    if (!maxTokensInput.value) maxTokensInput.value = "4096";
    maxSizeInput.value = parseInt(data.maxSize, 10) || 0;
    (data.actions?.length ? data.actions : getDefaultActions(language))
        .forEach(({ name, prompt }) => addAction(name, prompt, actionsContainer));

    notice.hidden = promptVersion <= (data.promptUpdated || 0);
    document.getElementById("prompt-notice-ignore").addEventListener("click", async () => {
        await browser.storage.local.set({ promptUpdated: promptVersion });
        notice.hidden = true;
    });

    applyI18n(language);

    // Load live model lists for the providers already in use.
    for (const id of PROVIDER_IDS) {
        if (providers[id].enabled && canQuery(id, providers[id])) refreshModels(id, { silent: true });
    }

    // ---- Dirty tracking ----
    const markDirty = () => {
        saveStatus.className = "status";
        saveStatus.textContent = tr("statusUnsaved");
    };
    document.querySelector(".settings").addEventListener("input", markDirty);
    document.querySelector(".settings").addEventListener("change", markDirty);

    languageSelect.addEventListener("change", () => {
        language = languageSelect.value;
        applyI18n(language);
        updateActiveOptions();
        markDirty();
    });

    // ---- Actions ----
    document.getElementById("add-action").addEventListener("click", () => {
        addAction("", "", actionsContainer).focus();
        markDirty();
    });
    document.getElementById("restore-actions").addEventListener("click", () => {
        if (!confirm(tr("statusRestoreConfirm"))) return;
        actionsContainer.replaceChildren();
        getDefaultActions(language).forEach(({ name, prompt }) => addAction(name, prompt, actionsContainer));
        markDirty();
    });

    // ---- Save ----
    document.getElementById("save-settings").addEventListener("click", async () => {
        if (!activeSelect.value) {
            saveStatus.className = "status error";
            saveStatus.textContent = tr("statusActiveProviderDisabled");
            return;
        }
        const toSave = {};
        for (const id of PROVIDER_IDS) toSave[id] = readCard(id);

        const actions = Array.from(actionsContainer.children)
            .map(row => ({
                name: row.querySelector(".action-name").value.trim(),
                prompt: row.querySelector(".action-prompt").value
            }))
            .filter(action => action.name);

        await browser.storage.local.set({
            activeProvider: activeSelect.value,
            language,
            providers: toSave,
            actions,
            maxTokens: parseInt(maxTokensInput.value, 10) || 4096,
            maxSize: Math.max(0, parseInt(maxSizeInput.value, 10) || 0),
            promptUpdated: promptVersion
        });
        // Drop the pre-1.3 keys so no stale copy of an API key lingers.
        await browser.storage.local.remove(["provider", "model", "apiKey", "ollamaUrl"]);

        notice.hidden = true;
        saveStatus.className = "status ok";
        saveStatus.textContent = tr("statusSettingsSaved");
    });

    // ---- Reset ----
    document.getElementById("default-settings").addEventListener("click", async () => {
        if (!confirm(tr("statusResetConfirm"))) return;
        await browser.storage.local.remove(["provider", "model", "apiKey", "ollamaUrl"]);
        await browser.storage.local.set({
            activeProvider: "anthropic",
            language,
            providers: defaultProviders(),
            actions: getDefaultActions(language),
            maxTokens: 4096,
            maxSize: 0,
            promptUpdated: promptVersion
        });
        window.location.reload();
    });
});
