import { fetchResponse } from './API.js';
import { getLanguage, t, applyI18n, formatError } from './i18n.js';
import { getActiveProviderConfig } from './providers.js';

document.addEventListener("DOMContentLoaded", async () => {
    const language = await getLanguage();
    applyI18n(language);

    const container = document.getElementById("draft-container");
    const modelChip = document.getElementById("draft-model");
    const regenButton = document.getElementById("regenerate");
    const chatButton = document.getElementById("chat-button");
    const copyButton = document.getElementById("copy-button");
    const insertButton = document.getElementById("insert-button");
    const needsResult = [chatButton, copyButton, insertButton];

    // The prompt is handed over through storage by the actions popup.
    const { messages = [], draftTitle = "", tabId } =
        await browser.storage.local.get(["messages", "draftTitle", "tabId"]);
    await browser.storage.local.set({ messages: [], draftTitle: "" });

    const title = draftTitle || "Quill";
    document.title = `Quill - ${title}`;
    document.getElementById("draft-title").textContent = title;

    let result = "";

    const showState = (className, text) => {
        const state = document.createElement("div");
        state.className = `state ${className}`;
        state.append(text);
        container.replaceChildren(state);
        return state;
    };

    const generate = async () => {
        result = "";
        needsResult.forEach(b => { b.disabled = true; });
        regenButton.disabled = true;
        const spinner = document.createElement("span");
        spinner.className = "spinner";
        showState("", t(language, "draftGenerating")).prepend(spinner);

        let config = {};
        try {
            config = await getActiveProviderConfig();
            modelChip.textContent = `${config.label} · ${config.model}`;
            result = await fetchResponse(config, messages);
            const text = document.createElement("div");
            text.className = "draft-text";
            text.textContent = result;
            container.replaceChildren(text);
            needsResult.forEach(b => { b.disabled = false; });
            insertButton.focus();
        } catch (error) {
            console.error("Quill:", error);
            error.hasKey = !!config.apiKey;
            const state = showState("error", formatError(language, error, config.label));
            const settings = document.createElement("button");
            settings.className = "btn";
            settings.textContent = t(language, "draftOpenSettings");
            settings.addEventListener("click", () => browser.runtime.openOptionsPage());
            state.append(settings);
        } finally {
            regenButton.disabled = false;
        }
    };

    regenButton.addEventListener("click", generate);

    chatButton.addEventListener("click", async () => {
        await browser.storage.local.set({ messages: [...messages, { role: "assistant", content: result }] });
        await browser.windows.create({ url: "/html/chat.html", type: "popup", width: 620, height: 600 });
        window.close();
    });

    copyButton.addEventListener("click", async () => {
        await navigator.clipboard.writeText(result);
        copyButton.textContent = t(language, "draftCopied");
        setTimeout(() => { copyButton.textContent = t(language, "draftCopy"); }, 1500);
    });

    insertButton.addEventListener("click", async () => {
        await browser.tabs.sendMessage(tabId, { command: "replaceSelectedText", text: result });
        window.close();
    });

    if (messages.length) generate();
});
