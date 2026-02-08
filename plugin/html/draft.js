import { fetchResponse } from './API.js';

// Helper pour récupérer la config du provider actif (compatible ancien/nouveau format)
async function getActiveProviderConfig() {
    const data = await browser.storage.local.get([
        "activeProvider", "providers",
        // Rétro-compatibilité
        "apiKey", "model", "maxTokens", "provider", "ollamaUrl"
    ]);

    // Nouveau format
    if (data.providers && data.activeProvider) {
        const provider = data.activeProvider;
        const config = data.providers[provider];
        return {
            provider: provider,
            apiKey: config.apiKey || "",
            model: config.model,
            maxTokens: data.maxTokens || 4096,
            ollamaUrl: data.providers.ollama?.url || "http://localhost:11434"
        };
    }

    // Ancien format (rétro-compatibilité)
    return {
        provider: data.provider || "anthropic",
        apiKey: data.apiKey || "",
        model: data.model,
        maxTokens: data.maxTokens || 4096,
        ollamaUrl: data.ollamaUrl || "http://localhost:11434"
    };
}

async function generate(draftContainer, messages, draftTitle) {
    const loadingIcon = document.createElement("img");
    loadingIcon.src = "/images/loading.png";
    loadingIcon.classList.add("rotate");

    draftContainer.textContent = "";
    draftContainer.appendChild(loadingIcon);

    try {
        const { apiKey, model, maxTokens, provider, ollamaUrl } = await getActiveProviderConfig();
        const response = await fetchResponse(apiKey, model, messages, maxTokens, provider, ollamaUrl);
        draftContainer.innerText = response;
        messages.push({role: "assistant", content: response});
        document.title = draftTitle;
        await browser.storage.local.set({messages});
    } catch (error) {
        console.error("Quill Error:", error);
        draftContainer.textContent = "Erreur: " + error.message;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const regenButton = document.getElementById('regenerate');
    const chatButton = document.getElementById('chat-button');
    const insertButton = document.getElementById('insert-button');
    const draftContainer = document.getElementById("draft-container");
    const { messages, draftTitle, tabId } = await browser.storage.local.get(["messages", "draftTitle", "tabId"]);
    regenButton.addEventListener("click", () => generate(draftContainer, messages, draftTitle));
    chatButton.addEventListener("click", async () => {
        await browser.storage.local.set({messages});
        await browser.windows.create({ url: "/html/chat.html", type: "popup",
                         width: 600, height: 600 });
        window.close();
    });
    insertButton.addEventListener("click", async () => {
        browser.tabs.sendMessage(tabId, { command: "replaceSelectedText", text: draftContainer.innerText });
        browser.windows.getCurrent().then((w) => {browser.windows.remove(w.id)})
    });
    generate(draftContainer, messages, draftTitle);
    await browser.storage.local.set({ messages: [], draftTitle: "" });
});
