import { fetchResponse } from './API.js';
import { getChatPrompt } from './globals.js';
import { getLanguage, applyI18n, formatError } from './i18n.js';
import { getActiveProviderConfig } from './providers.js';

document.addEventListener("DOMContentLoaded", async () => {
    const language = await getLanguage();
    applyI18n(language);

    const input = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const container = document.getElementById("messages");
    const modelChip = document.getElementById("chat-model");

    // A draft converted to chat hands its conversation over through storage.
    const stored = await browser.storage.local.get(["messages"]);
    await browser.storage.local.set({ messages: [], draftTitle: "" });
    const messages = stored.messages?.length
        ? stored.messages
        : [{ role: "system", content: getChatPrompt(language) }];

    const display = (role, text) => {
        const div = document.createElement("div");
        div.className = `message ${role}-message`;
        div.textContent = text;
        container.appendChild(div);
        div.scrollIntoView({ block: "end" });
        return div;
    };

    messages.forEach(m => display(m.role, m.content));

    getActiveProviderConfig().then(c => { modelChip.textContent = `${c.label} · ${c.model}`; });

    const send = async () => {
        const text = input.value.trim();
        if (!text || sendButton.disabled) return;

        container.querySelectorAll(".error-message").forEach(el => el.remove());
        messages.push({ role: "user", content: text });
        const userBubble = display("user", text);
        input.value = "";
        sendButton.disabled = true;

        const pending = display("assistant", "");
        const spinner = document.createElement("span");
        spinner.className = "spinner";
        pending.appendChild(spinner);

        let config = {};
        try {
            config = await getActiveProviderConfig();
            modelChip.textContent = `${config.label} · ${config.model}`;
            const response = await fetchResponse(config, messages);
            pending.textContent = response;
            pending.scrollIntoView({ block: "end" });
            messages.push({ role: "assistant", content: response });
        } catch (error) {
            console.error("Quill:", error);
            error.hasKey = !!config.apiKey;
            // Roll the failed turn back so it can simply be sent again.
            messages.pop();
            userBubble.remove();
            pending.remove();
            input.value = text;
            display("error", formatError(language, error, config.label));
        } finally {
            sendButton.disabled = false;
            input.focus();
        }
    };

    sendButton.addEventListener("click", send);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
            event.preventDefault();
            send();
        }
    });
    input.focus();
});
