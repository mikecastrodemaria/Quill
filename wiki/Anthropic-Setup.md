# Anthropic Setup

Configure Quill to use Claude (Anthropic) as your AI provider.

## Getting Your API Key

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to **API Keys**
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-`)

## Configuration in Quill

1. Open Thunderbird
2. Go to **Add-ons Manager** → **Quill** → **Options**
3. Select **Anthropic** as provider
4. Paste your API key
5. Choose a model
6. Click **Save**

## Available Models

| Model | Description | Best For |
|-------|-------------|----------|
| `claude-sonnet-4-20250514` | Latest Sonnet | Best balance of quality/speed |
| `claude-3-5-haiku-20241022` | Fast & efficient | Quick tasks, lower cost |
| `claude-3-opus-20240229` | Most capable | Complex analysis |

## Pricing

Anthropic charges per token:
- **Input**: ~$3/million tokens (Sonnet)
- **Output**: ~$15/million tokens (Sonnet)

Typical email costs < $0.01

## Troubleshooting

### "Invalid API Key"
- Verify key starts with `sk-ant-`
- Check for extra spaces
- Regenerate key if needed

### "Rate Limited"
- Wait a few seconds and retry
- Check your usage limits at console.anthropic.com

## See Also

- [[Configuration]] - General settings
- [[Common-Issues]] - Troubleshooting guide
