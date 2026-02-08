# Architecture

Technical overview of Quill's internal structure.

## Extension Type

Quill is a **Thunderbird WebExtension** (Manifest V2).

## Core Components

### API.js - Multi-Provider Handler

```javascript
// Main entry point
fetchResponse(apiKey, model, messages, maxTokens, provider, ollamaUrl)

// Provider-specific handlers
fetchClaudeResponse()   // Anthropic
fetchOpenAIResponse()   // OpenAI
fetchOllamaResponse()   // Ollama (local)
```

### Data Flow

```
User Action (right-click)
    ↓
Context Menu (background.js)
    ↓
Content Script (compose.js)
    ↓
Action Window (draft.js / chat.js)
    ↓
API.js - Routes to provider
    ↓
AI Response
    ↓
Display / Insert
```

## Storage Schema

```javascript
{
  apiKey: "sk-...",
  provider: "anthropic" | "openai" | "ollama",
  model: "claude-sonnet-4-20250514",
  maxTokens: 2048,
  ollamaUrl: "http://localhost:11434",
  customActions: [...]
}
```

## API Formats

### Anthropic
```
POST https://api.anthropic.com/v1/messages
Headers: x-api-key, anthropic-version: 2023-06-01
```

### OpenAI
```
POST https://api.openai.com/v1/chat/completions
Headers: Authorization: Bearer sk-...
```

### Ollama
```
POST http://localhost:11434/api/chat
Body: { model, messages, stream: false }
```

## Security

- API keys stored in browser.storage.local
- No external tracking
- Ollama runs fully local

## See Also

- [[Building]] - Build from source
- [[Contributing]] - How to contribute
