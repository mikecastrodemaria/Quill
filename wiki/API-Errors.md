# API Errors

Understanding and fixing common API error messages.

## Anthropic Errors

### "Invalid API Key"
- **Cause**: API key is incorrect or expired
- **Fix**: Generate a new key at [console.anthropic.com](https://console.anthropic.com)

### "Rate Limited" / "429 Error"
- **Cause**: Too many requests
- **Fix**: Wait a few seconds and retry

### "Insufficient Credits"
- **Cause**: Account balance depleted
- **Fix**: Add credits at console.anthropic.com

## OpenAI Errors

### "Invalid API Key"
- **Cause**: API key is incorrect
- **Fix**: Regenerate at platform.openai.com

### "Insufficient Quota"
- **Cause**: No payment method or limit reached
- **Fix**: Add payment method or increase limits

### "Context Length Exceeded"
- **Cause**: Email too long
- **Fix**: Select smaller portion of text

## Ollama Errors

### "NetworkError when attempting to fetch"
- **Cause**: CORS not configured
- **Fix**: See [[Ollama-CORS]]

### "Connection Refused"
- **Cause**: Ollama not running
- **Fix**: Start Ollama (`ollama serve`)

### "Model Not Found"
- **Cause**: Model not downloaded
- **Fix**: `ollama pull llama3.2`

## General Errors

### "Failed to fetch"
- **Cause**: Network issue or server down
- **Fix**: Check internet connection, try again later

### "Timeout"
- **Cause**: Response took too long
- **Fix**: Try smaller text or faster model

## Debug Mode

To see detailed errors:
1. Open Thunderbird
2. Tools → Developer Tools → Error Console
3. Look for Quill-related errors

## See Also

- [[Common-Issues]] - General troubleshooting
- [[Configuration]] - Settings guide
