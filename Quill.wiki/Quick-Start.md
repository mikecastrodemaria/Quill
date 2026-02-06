# Quick Start Guide

Get Quill working in 5 minutes!

---

## Choose Your Path

### 🔵 Path A: Ollama (Free, Local, Private)

**Time: ~5 minutes | Cost: Free**

1. **Install Ollama**: Download from [ollama.ai](https://ollama.ai)

2. **Get a model**:
   ```bash
   ollama pull llama3
   ```

3. **Enable CORS** (required):
   ```bash
   # Quit Ollama app first, then:
   OLLAMA_ORIGINS="*" ollama serve
   ```

4. **Configure Quill**:
   - Provider: **Ollama (Local)**
   - URL: `http://localhost:11434`
   - Model: **llama3**
   - Save!

---

### 🟠 Path B: Anthropic Claude (Best Quality)

**Time: ~3 minutes | Cost: Pay-per-use (~$0.01-0.10/email)**

1. **Get API Key**:
   - Go to [console.anthropic.com](https://console.anthropic.com)
   - Create account → API Keys → Create Key
   - Copy the key

2. **Configure Quill**:
   - Provider: **Anthropic (Claude)**
   - API Key: Paste your key
   - Model: **Claude Sonnet 4.5**
   - Save!

---

### 🟢 Path C: OpenAI GPT (Popular Choice)

**Time: ~3 minutes | Cost: Pay-per-use (~$0.01-0.10/email)**

1. **Get API Key**:
   - Go to [platform.openai.com](https://platform.openai.com)
   - Create account → API Keys → Create new secret key
   - Copy the key

2. **Configure Quill**:
   - Provider: **OpenAI (GPT)**
   - API Key: Paste your key
   - Model: **GPT-4o**
   - Save!

---

## Test It!

1. **Open** Thunderbird
2. **Compose** a new email (or reply to one)
3. **Type** some text
4. **Select** the text
5. **Click** the Quill icon (toolbar, top right)
6. **Choose** "Summarize" or any action
7. **Wait** for the response
8. **Click** "Insert" to add it to your email

🎉 **Done!** You're now using AI in your emails.

---

## Next Steps

- [[Custom-Actions]] - Create your own prompts
- [[Chat-Feature]] - Have conversations with AI
- [[Configuration]] - Fine-tune settings
