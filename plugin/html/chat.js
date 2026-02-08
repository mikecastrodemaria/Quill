import { fetchResponse } from './API.js';
import { chatPrompt } from './globals.js';

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

document.addEventListener('DOMContentLoaded', async function () {
  var messageInput = document.getElementById('message-input');
  var sendButton = document.getElementById('send-button');
  var messagesContainer = document.getElementById('messages');
  var loadingIcon = document.createElement('img');

  loadingIcon.src = '/images/loading.png';
  loadingIcon.classList.add('rotate');

  var storage = await browser.storage.local.get(["messages"]);
    let messages = (storage.messages?.length)? storage.messages : [{role: "system",
                                    content: chatPrompt}];

  messages.forEach(function(message) {
    displayMessage(message.role, message.content);
  });

  sendButton.addEventListener('click', async function () {
    var messageText = messageInput.value.trim();

    if (messageText) {
      messages.push({role: 'user', content: messageText});
      displayMessage('user', messageText);

      sendButton.disabled = true;
      messagesContainer.appendChild(loadingIcon);

      try {
        const { apiKey, model, maxTokens, provider, ollamaUrl } = await getActiveProviderConfig();
        const response = await fetchResponse(apiKey, model, messages, maxTokens, provider, ollamaUrl);
        loadingIcon.parentElement.removeChild(loadingIcon);
        sendButton.disabled = false;

        if (response) {
          displayMessage('assistant', response);
          messages.push({role: 'assistant', content: response});

          browser.storage.local.set({messages});
        }
      } catch(error) {
        console.error(error);
        loadingIcon.parentElement?.removeChild(loadingIcon);
        sendButton.disabled = false;
        displayMessage('assistant', "Erreur: " + error.message);
      }

      messageInput.value = '';
    }
  });

  function displayMessage(role, text) {
    var messageDiv = document.createElement('div');
    messageDiv.classList.add(role + '-message');
    messageDiv.classList.add('message');
    messageDiv.innerText = text;
    messagesContainer.appendChild(messageDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});

window.addEventListener('unload', async function (event) {
    await browser.storage.local.set({ messages: [], draftTitle: "" });
});
