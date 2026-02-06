# Ollama Setup Guide

Ollama lets you run AI models locally on your computer - completely free and private.

## Why Choose Ollama?

| Benefit | Description |
|---------|-------------|
| 🆓 **Free** | No API costs, runs on your hardware |
| 🔒 **Private** | Data never leaves your computer |
| 📴 **Offline** | Works without internet |
| ⚡ **Fast** | No network latency |

---

## Step 1: Install Ollama

### macOS

**Option A: Download App**
1. Go to [ollama.ai](https://ollama.ai)
2. Download the macOS app
3. Drag to Applications folder
4. Launch Ollama

**Option B: Homebrew**
```bash
brew install ollama
```

### Linux

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows

1. Go to [ollama.ai/download](https://ollama.ai/download)
2. Download Windows installer
3. Run the installer
4. Ollama will start automatically

---

## Step 2: Download Models

Open a terminal and download models:

```bash
# Recommended for email tasks (good balance)
ollama pull llama3

# Faster, lighter option
ollama pull mistral

# Good for multilingual emails
ollama pull qwen2.5

# More powerful (requires 32GB+ RAM)
ollama pull mixtral
```

### Model Comparison

| Model | Size | RAM Needed | Speed | Quality |
|-------|------|------------|-------|---------|
| mistral | 4GB | 8GB | ⚡⚡⚡ | ⭐⭐⭐ |
| llama3 | 4.7GB | 8GB | ⚡⚡ | ⭐⭐⭐⭐ |
| qwen2.5 | 4.4GB | 8GB | ⚡⚡ | ⭐⭐⭐⭐ |
| mixtral | 26GB | 32GB | ⚡ | ⭐⭐⭐⭐⭐ |

---

## Step 3: Configure CORS

**This step is required!** Thunderbird extensions need CORS headers to communicate with Ollama.

### macOS

**Method 1: Manual Launch (Quick Test)**
```bash
# First, quit Ollama app (Menu bar icon → Quit)
OLLAMA_ORIGINS="*" ollama serve
```
Keep terminal open while using Quill.

**Method 2: Permanent Configuration (Recommended)**
```bash
launchctl setenv OLLAMA_ORIGINS "*"
```
Then **restart your Mac**.

**Method 3: Launch Agent (Auto-start)**
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

### Linux

**Option 1: Systemd (Recommended)**
```bash
sudo systemctl edit ollama
```

Add:
```ini
[Service]
Environment="OLLAMA_ORIGINS=*"
```

Then:
```bash
sudo systemctl restart ollama
```

**Option 2: Manual Launch**
```bash
OLLAMA_ORIGINS="*" ollama serve
```

### Windows

**Option 1: PowerShell (Run as Administrator)**
```powershell
[Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
```
Restart Ollama after.

**Option 2: GUI**
1. Press `Win + S`, search "Environment Variables"
2. Click "Edit environment variables for your account"
3. Under "User variables", click **New**
4. Variable name: `OLLAMA_ORIGINS`
5. Variable value: `*`
6. Click OK
7. Restart Ollama

---

## Step 4: Verify Setup

Test that Ollama is working with CORS:

```bash
# Check Ollama is running
curl http://localhost:11434/api/tags

# Check CORS is enabled
curl -H "Origin: moz-extension://test" http://localhost:11434/api/tags
```

Both commands should return your model list.

---

## Step 5: Configure Quill

1. Open Thunderbird
2. Go to Quill settings (Menu ☰ → Add-ons → Quill → Options)
3. Set:
   - **Provider**: Ollama (Local)
   - **URL**: `http://localhost:11434`
   - **Model**: Select your downloaded model
4. Click **Save**

---

## Troubleshooting

### Models don't appear in Quill

CORS is not configured. Follow Step 3 carefully.

### "Connection refused" error

Ollama is not running. Start it:
```bash
# macOS/Linux
OLLAMA_ORIGINS="*" ollama serve

# Windows - just launch the Ollama app
```

### Slow responses

- Use a smaller model (mistral instead of mixtral)
- Ensure no other heavy applications are running
- Check RAM usage

### Model download fails

Check internet connection and try:
```bash
ollama pull llama3 --verbose
```

---

## See Also

- [[Ollama-CORS]] - Detailed CORS troubleshooting
- [[Common-Issues]] - General troubleshooting
