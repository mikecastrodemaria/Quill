# OpenAI Setup

Configure Quill to use GPT (OpenAI) as your AI provider.

## Getting Your API Key

1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API Keys**
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`)

## Configuration in Quill

1. Open Thunderbird
2. Go to **Add-ons Manager** → **Quill** → **Options**
3. Select **OpenAI** as provider
4. Paste your API key
5. Choose a model
6. Click **Save**

## Available Models

| Model | Description | Best For |
|-------|-------------|----------|
| `gpt-4o` | Latest GPT-4 | High quality responses |
| `gpt-4o-mini` | Fast & cheap | Quick tasks |
| `gpt-4-turbo` | Previous gen | Compatibility |
| `gpt-3.5-turbo` | Legacy | Budget option |

## Pricing

OpenAI charges per token:
- **GPT-4o**: ~$5/million input, ~$15/million output
- **GPT-4o-mini**: ~$0.15/million input, ~$0.60/million output

Typical email costs < $0.01

## Troubleshooting

### "Invalid API Key"
- Verify key starts with `sk-`
- Check for extra spaces
- Ensure key hasn't been revoked

### "Insufficient Quota"
- Add payment method at platform.openai.com
- Check usage limits

## See Also

- [[Configuration]] - General settings
- [[Common-Issues]] - Troubleshooting guide
