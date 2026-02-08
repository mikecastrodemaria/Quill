# Building

Build Quill from source for development or custom modifications.

## Prerequisites

- Git
- A text editor
- Thunderbird 78 or later

## Get the Source

```bash
git clone https://github.com/mikecastrodemaria/Quill.git
cd Quill
```

## Project Structure

```
Quill/
├── plugin/
│   ├── manifest.json      # Extension manifest
│   ├── background.js      # Background script
│   ├── html/
│   │   ├── API.js         # API handlers (Anthropic, OpenAI, Ollama)
│   │   ├── settings.html/js
│   │   ├── draft.html/js
│   │   └── chat.html/js
│   ├── content_scripts/
│   │   └── compose.js
│   └── images/
├── wiki/
├── README.md
└── CHANGELOG.md
```

## Development Workflow

### Load Extension Temporarily

1. Open Thunderbird
2. Go to **Add-ons Manager**
3. Click gear icon → **Debug Add-ons**
4. Click **Load Temporary Add-on**
5. Select `plugin/manifest.json`

Changes require reloading the extension.

### Debug

1. In Debug Add-ons, click **Inspect** on Quill
2. Use console for logs and errors

## Build XPI Package

```bash
cd plugin
zip -r ../quill-1.2.0.xpi . -x "*.DS_Store"
```

Or on Windows:
```powershell
Compress-Archive -Path plugin\* -DestinationPath quill-1.2.0.xpi
```

## Testing

Test with all three providers:
1. Anthropic - Verify API calls work
2. OpenAI - Verify API calls work
3. Ollama - Verify local connection works

## See Also

- [[Architecture]] - Technical details
- [[Contributing]] - Contribution guide
