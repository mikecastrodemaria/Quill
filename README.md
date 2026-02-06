# Quill
Quill lets you integrate AI writing assistance (Ollama, OpenAI, or Claude) to help you write or respond to emails un Mozilla Thunderbird.
=======
# ✒️ Quill - AI Email Assistant for Thunderbird

<p align="center">
  <img src="plugin/images/icon-64px.png" alt="Quill Logo" width="80" height="80">
</p>

<p align="center">
  <strong>Process your emails with AI directly in Thunderbird</strong><br>
  <em>Summarize • Translate • Correct • Reply • Chat</em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-supported-providers">Providers</a> •
  <a href="#-installation">Installation</a> •
  <a href="#%EF%B8%8F-configuration">Configuration</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-faq">FAQ</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.2.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-GPL--3.0-green" alt="License">
  <img src="https://img.shields.io/badge/thunderbird-78%2B-orange" alt="Thunderbird">
</p>

---

## 🌟 Features

| Action | Description |
|--------|-------------|
| **Summarize** | Transform long emails into concise bullet points |
| **Translate FR** | Translate to French |
| **Translate EN** | Translate to British English |
| **Correct FR** | Fix spelling and grammar (French) |
| **Correct EN** | Fix spelling and grammar (English) |
| **Classify** | Analyze tone: politeness, warmth, formality |
| **Rewrite Polite** | Make text more polite |
| **Rewrite Formal** | Make text more formal |
| **Reply** | Generate a draft response |
| **Custom Prompt** | Execute your own instructions |

### Additional Features

- 💬 **Interactive Chat** - Continue conversations with AI
- 📝 **Direct Insert** - Insert responses directly into your email
- 🔄 **Regenerate** - Get a new response with one click
- ⚙️ **Custom Actions** - Add your own prompts

---

## 🤖 Supported Providers

Quill supports **3 AI providers** - choose based on your needs:

| Provider | Cost | Privacy | Speed | Best For |
|----------|------|---------|-------|----------|
| 🟠 **Anthropic (Claude)** | Pay-per-use | Cloud | Fast | Best quality |
| 🟢 **OpenAI (GPT)** | Pay-per-use | Cloud | Fast | Large ecosystem |
| 🔵 **Ollama (Local)** | **Free** | **100% Local** | Varies | Privacy-focused |

---

## 📦 Installation

### Method 1: XPI File (Recommended)

1. Download `quill-1.2.0.xpi` from [Releases](https://github.com/mikecastrodemaria/Quill/releases)
2. In Thunderbird: **Menu ☰ → Add-ons and Themes** (or `Ctrl+Shift+A`)
3. Click **⚙️ → Install Add-on From File...**
4. Select the `.xpi` file and click **Add**

### Method 2: From Source (Developers)

```bash
git clone https://github.com/mikecastrodemaria/Quill.git
cd Quill/plugin
```

Then in Thunderbird: **Menu ☰ → Add-ons → ⚙️ → Debug Add-ons → Load Temporary Add-on** → select `manifest.json`

---

## ⚙️ Configuration

### 🟠 Option A: Anthropic (Claude)

**Best for**: High-quality responses, complex tasks

1. Create account at [console.anthropic.com](https://console.anthropic.com)
2. Go to **API Keys** → **Create Key**
3. Copy your key (format: `sk-ant-api03-...`)
4. In Quill settings:
   - Provider: **Anthropic (Claude)**
   - Paste your API key
   - Recommended model: **Claude Sonnet 4.5**

**Pricing**: ~$3/million input tokens, ~$15/million output tokens

---

### 🟢 Option B: OpenAI (GPT)

**Best for**: GPT ecosystem users, fast responses

1. Create account at [platform.openai.com](https://platform.openai.com)
2. Go to **API Keys** → **Create new secret key**
3. Copy your key (format: `sk-proj-...`)
4. In Quill settings:
   - Provider: **OpenAI (GPT)**
   - Paste your API key
   - Recommended model: **GPT-4o**

**Pricing**: ~$2.50/million input tokens, ~$10/million output tokens

---

### 🔵 Option C: Ollama (Local - Free)

**Best for**: Privacy, offline use, no API costs

#### Step 1: Install Ollama

<details>
<summary><b>🍎 macOS</b></summary>

```bash
# Download from https://ollama.ai or use Homebrew:
brew install ollama
```

</details>

<details>
<summary><b>🐧 Linux</b></summary>

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

</details>

<details>
<summary><b>🪟 Windows</b></summary>

Download installer from [ollama.ai/download](https://ollama.ai/download)

</details>

#### Step 2: Download a Model

```bash
# Recommended for email tasks:
ollama pull llama3

# Other good options:
ollama pull mistral      # Faster, lighter
ollama pull qwen2.5      # Good multilingual
ollama pull mixtral      # More powerful (needs 32GB+ RAM)
```

#### Step 3: Configure CORS (Required for Thunderbird)

Thunderbird extensions require CORS headers. Configure Ollama:

<details>
<summary><b>🍎 macOS - Method 1: Manual Launch</b></summary>

```bash
# Quit Ollama app first (Menu bar → Quit)
OLLAMA_ORIGINS="*" ollama serve
```

Keep terminal open while using Quill.

</details>

<details>
<summary><b>🍎 macOS - Method 2: Permanent (Recommended)</b></summary>

```bash
# Set environment variable
launchctl setenv OLLAMA_ORIGINS "*"
```

Then **restart your Mac**. After restart, Ollama app will work normally with CORS enabled.

**Alternative** - Create launch agent:
```bash
cat > ~/Library/LaunchAgents/com.ollama.env.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.ollama.env</string>
    <key>ProgramArguments</key>
    <array>
        <string>sh</string>
        <string>-c</string>
        <string>launchctl setenv OLLAMA_ORIGINS "*"</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
EOF

launchctl load ~/Library/LaunchAgents/com.ollama.env.plist
```

</details>

<details>
<summary><b>🐧 Linux - Systemd Service</b></summary>

```bash
# Edit the service file
sudo systemctl edit ollama

# Add these lines:
[Service]
Environment="OLLAMA_ORIGINS=*"

# Restart service
sudo systemctl restart ollama
```

**Or manual launch:**
```bash
OLLAMA_ORIGINS="*" ollama serve
```

</details>

<details>
<summary><b>🪟 Windows - Environment Variable</b></summary>

**Option 1: PowerShell (Admin)**
```powershell
[Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
```
Then restart Ollama.

**Option 2: GUI**
1. Search "Environment Variables" in Start Menu
2. Click "Environment Variables..."
3. Under "User variables", click **New**
4. Name: `OLLAMA_ORIGINS`
5. Value: `*`
6. OK → Restart Ollama

</details>

#### Step 4: Verify Ollama is Working

```bash
# Should return your models list:
curl http://localhost:11434/api/tags

# Test with CORS header:
curl -H "Origin: moz-extension://test" http://localhost:11434/api/tags
```

#### Step 5: Configure Quill

1. In Quill settings:
   - Provider: **Ollama (Local)**
   - URL: `http://localhost:11434` (default)
   - Select your downloaded model

---

## 🚀 Usage

### Processing an Email

1. **Open** a compose window (New, Reply, or Forward)
2. **Select** text to process (or leave empty for entire email)
3. **Click** the Quill icon (toolbar, top right)
4. **Choose** an action from the dropdown
5. **Wait** for AI to process
6. **Insert** result or **Regenerate** for a new response

### Interactive Chat

1. After getting a response, click **"Convert to Chat"**
2. Continue the conversation with follow-up questions
3. AI remembers context from your email

### Custom Actions

1. Go to Quill **Settings**
2. Scroll to **Actions** section
3. Click **Add an action**
4. Enter name and prompt
5. **Save**

**Example custom prompts:**
```
Name: Simplify
Prompt: Rewrite this text using simpler words and shorter sentences.

Name: Extract Tasks
Prompt: Extract all action items and tasks from this email as a numbered list.

Name: Professional Tone
Prompt: Rewrite this maintaining the message but with a more professional business tone.
```

---

## 📊 Model Recommendations

| Use Case | Anthropic | OpenAI | Ollama |
|----------|-----------|--------|--------|
| **Daily email** | Claude 3.5 Haiku | GPT-4o-mini | llama3 / mistral |
| **Complex tasks** | Claude Sonnet 4.5 | GPT-4o | mixtral / qwen2.5 |
| **Budget-conscious** | Claude 3.5 Haiku | GPT-3.5-turbo | Any local model |
| **Maximum quality** | Claude 3 Opus | GPT-4 | llama3:70b |

---

## ❓ FAQ

<details>
<summary><b>The extension doesn't respond</b></summary>

1. Check your API key is correct
2. Verify you have credits (Anthropic/OpenAI)
3. For Ollama: ensure service is running with CORS
4. Check Thunderbird console: **Menu → Tools → Developer Tools → Error Console**

</details>

<details>
<summary><b>Ollama models don't appear in the list</b></summary>

CORS is not configured. See [Ollama CORS Configuration](#step-3-configure-cors-required-for-thunderbird).

</details>

<details>
<summary><b>Can I use Quill offline?</b></summary>

**Yes, with Ollama!** Local models work without internet.
Anthropic and OpenAI require an internet connection.

</details>

<details>
<summary><b>Is my data secure?</b></summary>

- **Ollama**: 100% local, nothing leaves your computer
- **Anthropic/OpenAI**: Data sent to their servers for processing. Check their privacy policies.
- **Quill itself**: Collects no data. API keys stored locally in Thunderbird.

</details>

<details>
<summary><b>How much does it cost?</b></summary>

- **Ollama**: Free (runs on your hardware)
- **Anthropic**: [Pricing](https://www.anthropic.com/pricing) - typically $0.01-0.10 per email
- **OpenAI**: [Pricing](https://openai.com/pricing) - typically $0.01-0.10 per email

</details>

---

## 🔧 Troubleshooting

### API Errors

| Error | Solution |
|-------|----------|
| `401 Unauthorized` | Check API key is correct |
| `429 Rate Limited` | Wait and retry, or upgrade plan |
| `500 Server Error` | Provider issue, try later |
| `NetworkError` | Check internet / Ollama CORS |

### Ollama Specific

```bash
# Check if Ollama is running:
curl http://localhost:11434/api/tags

# Check CORS headers:
curl -v http://localhost:11434/api/tags 2>&1 | grep -i "access-control"

# Restart Ollama with CORS:
pkill ollama
OLLAMA_ORIGINS="*" ollama serve
```

---

## 🤝 Contributing

Contributions welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/improvement`
3. Commit changes: `git commit -m 'Add feature'`
4. Push: `git push origin feature/improvement`
5. Open a Pull Request

---

## 📜 License

**GPL-3.0** - See [LICENSE](LICENSE)

Fork of [Aify](https://github.com/ali-raheem/Aify) by Ali Raheem.

---

## 👏 Credits

- **Development**: [Supersonique Studio SARL](https://supersoniquestudio.com)
- **Original Project**: [Aify](https://github.com/ali-raheem/Aify) by Ali Raheem
- **AI Providers**: [Anthropic](https://anthropic.com), [OpenAI](https://openai.com), [Ollama](https://ollama.ai)

---

<p align="center">
  <strong>Made with ❤️ by <a href="https://supersoniquestudio.com">Supersonique Studio SARL</a></strong>
</p>

<p align="center">
  <a href="README_FR.md">🇫🇷 Version Française</a> •
  <a href="https://github.com/mikecastrodemaria/Quill/wiki">📚 Wiki</a> •
  <a href="https://github.com/mikecastrodemaria/Quill/issues">🐛 Report Bug</a>
</p>
