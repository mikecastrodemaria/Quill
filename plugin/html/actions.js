import { promptVersion, getDefaultActions } from './globals.js';
import { getLanguage, t, applyI18n } from './i18n.js';
import { PROVIDERS, loadProviderState, setActiveProvider } from './providers.js';

const truncate = async (text) => {
    const { maxSize } = await browser.storage.local.get(["maxSize"]);
    const max = parseInt(maxSize, 10);
    return (isNaN(max) || max <= 0) ? text : text.substring(0, max);
};

const openWindow = (url, height) =>
    browser.windows.create({ url, type: "popup", width: 620, height });

const runAction = async ({ name, prompt }) => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const selection = await browser.tabs.sendMessage(tab.id, { command: "getSelectedText" });
    const text = selection || await browser.tabs.sendMessage(tab.id, { command: "getText" });
    const messages = [
        { role: "system", content: prompt },
        { role: "user", content: await truncate(text) }
    ];
    await browser.storage.local.set({ messages, draftTitle: name, tabId: tab.id });
    await openWindow("/html/draft.html", 520);
    window.close();
};

document.addEventListener("DOMContentLoaded", async () => {
    const language = await getLanguage();
    applyI18n(language);

    const { actions, promptUpdated = 0 } = await browser.storage.local.get(["actions", "promptUpdated"]);
    const container = document.getElementById("actions-container");
    for (const action of (actions?.length ? actions : getDefaultActions(language))) {
        const item = document.createElement("button");
        item.className = "menu-item";
        item.textContent = action.name;
        item.addEventListener("click", () => runAction(action));
        container.appendChild(item);
    }

    // Quick provider switch
    const { providers, enabled, active } = await loadProviderState();
    const select = document.getElementById("provider-select");
    if (enabled.length === 0) {
        const note = document.getElementById("provider-note");
        note.textContent = t(language, "actionsNoProvider");
        note.hidden = false;
    } else {
        for (const id of enabled) {
            select.add(new Option(PROVIDERS[id].short, id));
        }
        select.value = active;
        select.title = providers[active].model;
        select.addEventListener("change", async () => {
            await setActiveProvider(select.value);
            select.title = providers[select.value].model;
        });
        document.getElementById("provider-row").hidden = false;
    }

    document.getElementById("chat-link").addEventListener("click", async () => {
        await browser.storage.local.set({ messages: [], draftTitle: "" });
        await openWindow("/html/chat.html", 600);
        window.close();
    });

    const settingsLink = document.getElementById("settings-link");
    if (promptVersion > promptUpdated) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.title = t(language, "actionsNewPrompts");
        settingsLink.appendChild(dot);
    }
    settingsLink.addEventListener("click", async () => {
        await browser.runtime.openOptionsPage();
        window.close();
    });
});
