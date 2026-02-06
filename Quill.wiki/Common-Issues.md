# Common Issues & Solutions

## Extension Issues

### Quill icon doesn't appear

**Cause**: Extension not properly installed

**Solution**:
1. Go to Menu ☰ → Add-ons and Themes
2. Check if Quill is listed and enabled
3. If not, reinstall from [Releases](https://github.com/mikecastrodemaria/Quill/releases)

---

### "Extension not responding"

**Cause**: Various possible causes

**Solutions**:
1. Check your API key is correct
2. Verify internet connection (for cloud providers)
3. For Ollama: ensure service is running with CORS
4. Restart Thunderbird

---

## API Errors

### 401 Unauthorized

**Cause**: Invalid or expired API key

**Solution**:
1. Go to Quill settings
2. Verify your API key is correct
3. Generate a new key if needed

---

### 429 Rate Limited

**Cause**: Too many requests

**Solution**:
- Wait a few minutes and retry
- Consider upgrading your API plan
- Use a local Ollama model to avoid rate limits

---

### 500 Server Error

**Cause**: Provider's server issue

**Solution**:
- Wait and retry later
- Check provider's status page:
  - [Anthropic Status](https://status.anthropic.com)
  - [OpenAI Status](https://status.openai.com)

---

### NetworkError

**Cause**: Connection issue

**For cloud providers**:
- Check internet connection
- Check if provider is blocked by firewall

**For Ollama**:
- Ensure Ollama is running
- Ensure CORS is configured (see [[Ollama-CORS]])

---

## Ollama-Specific Issues

### Models don't appear in dropdown

**Cause**: CORS not configured

**Solution**: See [[Ollama-Setup#step-3-configure-cors]]

Quick fix:
```bash
pkill ollama
OLLAMA_ORIGINS="*" ollama serve
```

---

### Connection refused

**Cause**: Ollama not running

**Solution**:
```bash
# Start Ollama with CORS
OLLAMA_ORIGINS="*" ollama serve
```

---

### Very slow responses

**Causes & Solutions**:

| Cause | Solution |
|-------|----------|
| Large model | Use smaller model (mistral instead of mixtral) |
| Low RAM | Close other applications |
| CPU-only | Models run faster with GPU/Apple Silicon |

---

## Chat Feature Issues

### Chat doesn't show messages

**Cause**: Bug in older versions (fixed in v1.2.0)

**Solution**: Update to latest version

---

### Chat loses context

**Cause**: Normal behavior - context is cleared when window closes

**Solution**: Keep chat window open for multi-turn conversations

---

## Debugging

### Enable Debug Logging

1. In Thunderbird: Menu → Tools → Developer Tools → Error Console
2. Look for messages starting with "Quill:"

### Test API Connection

**Anthropic**:
```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY" \
  -H "content-type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model":"claude-3-haiku-20240307","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'
```

**OpenAI**:
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Hello"}]}'
```

**Ollama**:
```bash
curl http://localhost:11434/api/chat \
  -d '{"model":"llama3","messages":[{"role":"user","content":"Hello"}],"stream":false}'
```

---

## Still Need Help?

1. Search [existing issues](https://github.com/mikecastrodemaria/Quill/issues)
2. [Open a new issue](https://github.com/mikecastrodemaria/Quill/issues/new) with:
   - Quill version
   - Thunderbird version
   - Provider used
   - Error message
   - Steps to reproduce
