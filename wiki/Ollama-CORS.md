# Ollama CORS Configuration

Fix the "NetworkError when attempting to fetch resource" error with Ollama.

## The Problem

Ollama by default blocks requests from browser extensions (CORS policy). You need to configure Ollama to accept requests from Thunderbird.

## Solution by Platform

### macOS

**Option 1: Temporary (per session)**
```bash
# Stop Ollama if running (quit from menu bar)
OLLAMA_ORIGINS="*" ollama serve
```

**Option 2: Permanent**
```bash
launchctl setenv OLLAMA_ORIGINS "*"
```
Then restart your Mac.

### Linux

**Systemd service:**
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
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

### Windows

**Environment variable:**
1. Open System Properties → Environment Variables
2. Add new System variable:
   - Name: `OLLAMA_ORIGINS`
   - Value: `*`
3. Restart Ollama

**PowerShell (temporary):**
```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

## Verify Configuration

Test with curl:
```bash
curl -I http://localhost:11434/api/tags
```

You should see `Access-Control-Allow-Origin: *` in the headers.

## Still Not Working?

1. Make sure Ollama is actually running
2. Check the URL in Quill settings (default: `http://localhost:11434`)
3. Try restarting Thunderbird
4. Check Ollama logs for errors

## See Also

- [[Ollama-Setup]] - Complete Ollama guide
- [[Common-Issues]] - Other troubleshooting
