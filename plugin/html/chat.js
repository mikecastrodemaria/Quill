import { fetchResponse } from './API.js';
import { chatPrompt } from './globals.js';

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
        const { apiKey, model, maxTokens, provider, ollamaUrl } = await browser.storage.local.get(
                                                    ["apiKey","model", "maxTokens", "provider", "ollamaUrl"]);
        const response = await fetchResponse(apiKey, model, messages, maxTokens, provider, ollamaUrl || "http://localhost:11434");
        loadingIcon.parentElement.removeChild(loadingIcon);
        sendButton.disabled = false;

        if (response) {
          displayMessage('assistant', response);
          messages.push({role: 'assistant', content: response});

          browser.storage.local.set({messages});
        }
      } catch(error) {
        console.error(error);
        messagesContainer.textContent = "Erreur: Impossible de récupérer les données";
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
