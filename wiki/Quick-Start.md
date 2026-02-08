# 🚀 Quick Start Guide

Get Quill working in 5 minutes!

---

## Choose Your Path

### 🔵 Path A: Ollama (Free, Local, Private)

**Time: ~5 minutes | Cost: Free**

1. **Install Ollama**: Download from [ollama.ai](https://ollama.ai)

2. **Get a model**:
   ```bash
   ollama pull llama3.2
   ```

3. **Enable CORS** (⚠️ required):
   ```bash
   # Quit Ollama app first, then:
   OLLAMA_ORIGINS="*" ollama serve
   ```
   > 📖 See [[Ollama-CORS]] for permanent setup

4. **Configure Quill**:
   - ☑️ Cochez **Ollama (Local)**
   - URL: `http://localhost:11434`
   - Cliquez **🔄 Tester la connexion**
   - Model: **llama3.2**
   - **Sauvegarder!**

---

### 🟠 Path B: Anthropic Claude (Best Quality)

**Time: ~3 minutes | Cost: Pay-per-use (~$0.01-0.10/email)**

1. **Get API Key**:
   - Go to [console.anthropic.com](https://console.anthropic.com)
   - Create account → API Keys → Create Key
   - Copy the key (starts with `sk-ant-`)

2. **Configure Quill**:
   - ☑️ Cochez **Anthropic (Claude)**
   - Paste your API key
   - Cliquez **🔑 Tester la clé API** → ✅ Clé valide
   - Model: **Claude Sonnet 4.5**
   - **Sauvegarder!**

---

### 🟢 Path C: OpenAI GPT (Popular Choice)

**Time: ~3 minutes | Cost: Pay-per-use (~$0.01-0.10/email)**

1. **Get API Key**:
   - Go to [platform.openai.com](https://platform.openai.com)
   - Create account → API Keys → Create new secret key
   - Copy the key (starts with `sk-proj-`)

2. **Configure Quill**:
   - ☑️ Cochez **OpenAI (GPT)**
   - Paste your API key
   - Cliquez **🔑 Tester la clé API** → ✅ Clé valide
   - Model: **GPT-4o**
   - **Sauvegarder!**

---

## 🎯 Choose Your Active Provider

In the green "Provider Actif" section at the top, select which provider to use by default.

> **💡 Tip**: You can configure multiple providers and switch between them easily!

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

## ❌ Something Wrong?

| Problem | Solution |
|---------|----------|
| "❌ Non connecté" (Ollama) | See [[Ollama-CORS]] |
| "❌ Clé API invalide" | Check your key, get a new one |
| "❌ Timeout" | Check your internet connection |
| Quill icon not showing | Restart Thunderbird |

---

## Next Steps

- [[Custom-Actions]] - Create your own prompts
- [[Chat-Feature]] - Have conversations with AI
- [[Configuration]] - Fine-tune settings
