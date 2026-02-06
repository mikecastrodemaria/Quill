# Quill - AI Email Assistant for Thunderbird

Process your emails with Claude, GPT, or Ollama directly in Thunderbird

**Features • Installation • Configuration • Usage • Development**

## About

Quill is a Thunderbird extension that integrates AI directly into your email client. Summarize, translate, correct, and draft your emails with a single click.

**3 providers supported:**
- 🟠 **Anthropic** (Claude) - Excellent quality-to-price ratio
- 🟢 **OpenAI** (GPT-4o, GPT-3.5) - Large ecosystem
- 🔵 **Ollama** (Local) - 100% free and private

Fork of [Aify](https://github.com/ali-raheem/Aify) by Ali Raheem.

## Features

| Action | Description |
|--------|-------------|
| Summarize | Transform an email into a concise bullet-point list |
| Translate FR | Translate the email to French |
| Translate EN | Translate the email to British English |
| Correct FR | Correct spelling and grammar (French) |
| Correct EN | Correct spelling and grammar (British English) |
| Classify | Analyze tone: politeness, warmth, formality, assertiveness, offensiveness |
| Rewrite Polite | Rephrase the text to be more polite |
| Rewrite Formal | Rephrase the text to be more formal |
| Reply | Generate a draft response |
| Custom Prompt | Execute a custom instruction |

### Additional Features

* **Interactive Chat**: Continue the conversation with AI
* **Direct Insertion**: Insert the generated response into your email
* **Regeneration**: Get a new response if the first one doesn't suit you
* **Customizable Prompts**: Add, modify, or delete actions

## Requirements

* Thunderbird version 78.0 or higher
* **One AI provider** of your choice:
  - Anthropic API Key ([console.anthropic.com](https://console.anthropic.com))
  - OpenAI API Key ([platform.openai.com](https://platform.openai.com/api-keys))
  - Ollama installed locally ([ollama.ai](https://ollama.ai))

## Installation

### Method 1: XPI File (Recommended)

1. Download the `quill-1.2.0.xpi` file from [Releases](https://github.com/mikecastrodemaria/Quill/releases)
2. In Thunderbird, go to Menu ☰ → Add-ons and Themes (or `Ctrl+Shift+A`)
3. Click the gear icon ⚙️ → Install Add-on From File...
4. Select the `quill-1.2.0.xpi` file
5. Click Add to confirm the installation

### Method 2: Manual Installation (Developers)

1. Clone this repository: `git clone https://github.com/mikecastrodemaria/Quill.git`
2. In Thunderbird, go to Menu ☰ → Add-ons and Themes
3. Click the gear icon ⚙️ → Debug Add-ons
4. Click Load Temporary Add-on...
5. Select the `plugin/manifest.json` file

## Configuration

### Option A: Anthropic (Claude)

1. Create an account at [console.anthropic.com](https://console.anthropic.com)
2. Go to **API Keys** → **Create Key**
3. Copy your key (format: `sk-ant-api03-...`)

### Option B: OpenAI (GPT)

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Go to **API Keys** → **Create new secret key**
3. Copy your key (format: `sk-proj-...`)

### Option C: Ollama (Local - Free)

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Download a model: `ollama pull llama3`
3. **Configure CORS** (required for Thunderbird):

   **macOS:**
   ```bash
   # Method 1: Manual launch with CORS
   # Stop Ollama (quit the app if running)
   OLLAMA_ORIGINS="*" ollama serve

   # Method 2: Permanent configuration
   launchctl setenv OLLAMA_ORIGINS "*"
   # Then restart your Mac
   ```

   **Linux:**
   ```bash
   OLLAMA_ORIGINS="*" ollama serve
   ```

   **Windows:**
   ```powershell
   # In PowerShell (admin):
   [Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
   # Then restart Ollama
   ```

4. Verify Ollama works: `curl http://localhost:11434/api/tags`

### Configure Quill

1. In Thunderbird, go to Menu ☰ → Add-ons and Themes
2. Find **Quill** and click **Options**
3. Choose your **AI Provider**
4. Enter your **API key** (or **Ollama URL** if local)
5. Select your preferred **model**
6. Click **Save**

### Available Models

| Provider | Model | Description |
|----------|-------|-------------|
| Anthropic | `claude-sonnet-4-5-20250929` | ⭐ Best quality-to-price ratio |
| Anthropic | `claude-3-5-haiku-20241022` | Fast and economical |
| OpenAI | `gpt-4o` | ⭐ Latest GPT model |
| OpenAI | `gpt-4o-mini` | Fast and economical |
| Ollama | `llama3` | ⭐ Free, good quality |
| Ollama | `mistral` | Fast, 7B parameters |

## Usage

### Process an Email

1. Open a composition window (New, Reply, or Forward)
2. Select the text to process (or leave empty to process the entire email)
3. Click the Quill icon (top right, near the lightbulb)
4. Choose an action from the dropdown menu
5. Wait while AI processes your request
6. Insert the result or regenerate if needed

### Available Buttons

* **Insert**: Inserts the generated text into your email
* **Convert to Chat**: Continue the conversation with AI
* **Regenerate**: Get a new response

## Customizing Prompts

You can add your own actions:

1. Go to Quill Settings
2. Scroll to the Actions section
3. Click Add an action
4. Enter a name and custom prompt
5. Click Save

## Privacy

* No data is collected by the extension itself
* For cloud providers: texts are sent to Anthropic/OpenAI API for processing
* **With Ollama**: all processing is 100% local, nothing leaves your computer
* Your API key is stored locally in Thunderbird

## FAQ

### The extension doesn't work, what should I do?

1. Verify that your API key is correct (Anthropic/OpenAI)
2. Verify that you have credit on your cloud account
3. For Ollama: verify the service is running (`ollama serve`) with CORS enabled
4. Check the debug console for errors

### How do I change provider or model?

Go to Quill settings and use the "AI Provider" and "Model" dropdown menus.

### Can I use the extension offline?

**Yes with Ollama!** Local models work without internet connection.
Anthropic and OpenAI require an internet connection.

### How much does it cost to use?

- **Ollama**: Free (runs on your machine)
- **Anthropic**: [Claude pricing](https://www.anthropic.com/pricing)
- **OpenAI**: [GPT pricing](https://openai.com/pricing)

### Ollama: which models do you recommend?

For email usage: `llama3` (balanced) or `mistral` (fast).
For complex tasks: `mixtral` or `llama3:70b` if you have a powerful GPU.

## Contributing

Contributions are welcome!

1. Fork the project
2. Create a branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add a feature'`)
4. Push (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is licensed under GPL-3.0 - see the LICENSE file for details.

Fork of [Aify](https://github.com/ali-raheem/Aify) by Ali Raheem.

## Credits

* Development: [Supersonique Studio SARL](https://supersoniquestudio.com)
* Original Project: [Aify](https://github.com/ali-raheem/Aify) by Ali Raheem
* AI: [Claude](https://www.anthropic.com) by Anthropic, [GPT](https://openai.com) by OpenAI, [Ollama](https://ollama.ai)

---

Made with ❤️ by Supersonique Studio SARL
