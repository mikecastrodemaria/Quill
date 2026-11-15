# OVHcloud AI Endpoints Setup

Configure Quill to use [OVHcloud AI Endpoints](https://endpoints.ai.cloud.ovh.net/), an OpenAI-compatible API hosted in Europe that serves open models (Mistral, Llama, Qwen, gpt-oss...).

## Getting Your API Key

1. Open the [OVHcloud AI Endpoints](https://endpoints.ai.cloud.ovh.net/) site and sign in with your OVHcloud account
2. Create an API key (access token) for AI Endpoints in your Public Cloud project
3. Copy the key

The key is optional: without one, OVHcloud accepts anonymous requests with a very low rate limit (about 2 requests per minute at the time of writing). That is enough to try Quill, not for daily use.

## Configuration in Quill

1. Open Thunderbird
2. Go to **Add-ons Manager** → **Quill** → **Options**
3. Tick **OVHcloud AI Endpoints**
4. Paste your API key (or leave it empty for anonymous access)
5. Click **Test**: the status shows the number of chat models found and the model list is refreshed
6. Choose a model, set OVHcloud as the **Active provider**, and click **Save**

## URL

The default URL is `https://oai.endpoints.kepler.ai.cloud.ovh.net/v1`. Change it only if OVHcloud gives you a different OpenAI-compatible base URL.

## Models

Quill loads the catalogue from OVHcloud and keeps only chat models (embedding, speech, image and moderation models are hidden). `Mistral-Small-3.2-24B-Instruct-2506` is the default: fast, inexpensive and good in French.

## Troubleshooting

| Message | Meaning |
|---------|---------|
| Invalid or expired API key | The token was rejected (HTTP 401/403). Generate a new one. |
| Anonymous rate limit reached | You are using OVHcloud without a key. Wait a minute or add a key. |
| Empty answer | Reasoning models can spend the whole budget thinking. Raise **Max answer length** or pick another model. |
