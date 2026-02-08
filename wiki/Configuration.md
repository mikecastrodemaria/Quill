# Configuration

Complete guide to configuring Quill for your needs.

## Settings Overview

Access Quill settings via **Add-ons Manager** → **Quill** → **Options**

## Provider Selection

| Provider | Best For | Requirements |
|----------|----------|--------------|
| **Anthropic (Claude)** | Quality responses | API key |
| **OpenAI (GPT)** | Fast responses | API key |
| **Ollama** | Privacy, offline use | Local installation |

## API Keys

### Anthropic
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create account and generate API key
3. Paste in Quill settings

### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account and generate API key
3. Paste in Quill settings

### Ollama
No API key needed - just install Ollama and configure the URL (default: `http://localhost:11434`)

## Model Selection

| Provider | Model | Use Case |
|----------|-------|----------|
| Anthropic | claude-sonnet-4-20250514 | Best balance |
| Anthropic | claude-3-5-haiku-20241022 | Fast & cheap |
| OpenAI | gpt-4o | High quality |
| OpenAI | gpt-4o-mini | Fast & cheap |
| Ollama | llama3.2 | General use |
| Ollama | mistral | Fast responses |

## Max Tokens

Controls response length:
- **1024**: Short responses
- **2048**: Medium (default)
- **4096**: Long responses

## See Also

- [[Anthropic-Setup]] - Detailed Claude setup
- [[OpenAI-Setup]] - Detailed GPT setup
- [[Ollama-Setup]] - Detailed Ollama setup
