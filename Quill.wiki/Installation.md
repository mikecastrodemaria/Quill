# Installation

## Requirements

- **Thunderbird** version 78.0 or higher
- **One AI provider** (choose one):
  - Anthropic API key, or
  - OpenAI API key, or
  - Ollama installed locally

---

## Method 1: XPI File (Recommended)

This is the easiest way to install Quill.

### Steps

1. **Download** the latest `quill-x.x.x.xpi` from [Releases](https://github.com/mikecastrodemaria/Quill/releases)

2. **Open Thunderbird**

3. **Go to Add-ons Manager**:
   - Menu ☰ → Add-ons and Themes
   - Or press `Ctrl+Shift+A` (Windows/Linux) / `Cmd+Shift+A` (Mac)

4. **Install from file**:
   - Click the gear icon ⚙️
   - Select "Install Add-on From File..."
   - Choose the downloaded `.xpi` file

5. **Confirm installation**:
   - Click "Add" when prompted
   - Quill will appear in your extensions list

---

## Method 2: From Source (Developers)

For developers who want to modify Quill or test the latest changes.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mikecastrodemaria/Quill.git
   cd Quill
   ```

2. **Open Thunderbird Debug mode**:
   - Menu ☰ → Add-ons and Themes
   - Click gear icon ⚙️ → Debug Add-ons

3. **Load temporary add-on**:
   - Click "Load Temporary Add-on..."
   - Navigate to the `plugin` folder
   - Select `manifest.json`

> ⚠️ **Note**: Temporary add-ons are removed when Thunderbird closes.

---

## Verifying Installation

After installation, you should see:

1. **Quill icon** in the compose window toolbar (top right, near the lightbulb)
2. **Quill entry** in Menu ☰ → Add-ons and Themes → Extensions

---

## Next Steps

- [[Quick-Start]] - Get started in 5 minutes
- [[Configuration]] - Set up your AI provider
