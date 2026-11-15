// Quill - English
export default {
  "name": "English",
  "strings": {
    "errorPrefix": "Error:",
    "errAuth": "{p}: invalid or expired API key.",
    "errNoKey": "{p}: no API key configured.",
    "errRate": "{p}: rate limit reached, try again in a moment.",
    "errRateAnon": "OVHcloud: anonymous rate limit reached. Add an API key in the settings for higher limits.",
    "errNetwork": "{p}: cannot reach the server.",
    "errNetworkOllama": "Ollama: cannot connect. Check that Ollama is running and that CORS is allowed.",
    "errTimeout": "{p}: the request timed out.",
    "errEmpty": "{p}: the model returned an empty answer. Try a higher max length or another model.",
    "errHttp": "{p}: error {s}.",
    "actionsChatLink": "Chat",
    "actionsSettingsLink": "Settings",
    "actionsProvider": "Provider",
    "actionsNoProvider": "No provider enabled. Open the settings.",
    "actionsNewPrompts": "New default prompts available",
    "draftInsert": "Insert",
    "draftToChat": "Continue in chat",
    "draftRegenerate": "Regenerate",
    "draftCopy": "Copy",
    "draftCopied": "Copied",
    "draftGenerating": "Generating…",
    "draftOpenSettings": "Open settings",
    "chatTitle": "Quill Chat",
    "chatPlaceholder": "Write your message… (Enter to send, Shift+Enter for a new line)",
    "chatSend": "Send",
    "settingsTitle": "Quill - Settings",
    "settingsSubtitle": "AI email assistant for Thunderbird",
    "settingsActiveProvider": "Active provider",
    "settingsActiveProviderHelp": "Used to process your emails. You can also switch it from the Quill menu.",
    "settingsProvidersHeading": "Providers",
    "settingsProvidersHelp": "Enable the providers you want to use.",
    "settingsApiKey": "API key",
    "settingsApiKeyOptional": "API key (optional)",
    "settingsGetKey": "Get a key",
    "settingsOvhKeyHelp": "Without a key, OVHcloud only allows about 2 anonymous requests per minute.",
    "settingsUrl": "URL",
    "settingsModel": "Model",
    "settingsRefreshModels": "Refresh the model list",
    "settingsTest": "Test",
    "settingsCorsHelp": "CORS help",
    "settingsShow": "Show",
    "settingsHide": "Hide",
    "settingsGeneralHeading": "General",
    "settingsLanguage": "Interface language",
    "settingsMaxTokens": "Max answer length",
    "settingsTokenDefault": "Default (4096 tokens)",
    "settingsTokenLong": "Long (8192 tokens)",
    "settingsTokenMedium": "Medium (2048 tokens)",
    "settingsTokenShort": "Short (1024 tokens)",
    "settingsTokenVeryShort": "Very short (512 tokens)",
    "settingsMaxInput": "Max input (characters)",
    "settingsMaxInputHelp": "Longer emails are truncated. 0 = unlimited.",
    "settingsReset": "Reset everything",
    "settingsSave": "Save",
    "settingsCustomActionsHeading": "Actions",
    "settingsActionsHelp": "Each action appears in the Quill menu and sends its prompt with your email.",
    "settingsActionName": "Name",
    "settingsActionPrompt": "Prompt",
    "settingsAddAction": "Add an action",
    "settingsRestoreActions": "Restore default actions",
    "settingsAboutDesc": "by Supersonique Studio, fork of Aify by Ali Raheem",
    "settingsDocs": "Documentation",
    "settingsReportBug": "Report a bug",
    "warningAvailablePrompts": "New default prompts are available. Use “Restore default actions” to load them (your custom actions will be replaced).",
    "warningIgnore": "Ignore",
    "statusTesting": "Testing…",
    "statusConnected": "Connected · {n} models",
    "statusActiveProviderDisabled": "Enable at least one provider before saving.",
    "statusSettingsSaved": "Settings saved",
    "statusUnsaved": "Unsaved changes",
    "statusResetConfirm": "Reset all Quill settings, including API keys and custom actions?",
    "statusRestoreConfirm": "Replace your actions with the default ones?",
    "providerPlaceholder": "Enable at least one provider",
    "deleteAction": "Delete"
  },
  "actions": [
    {
      "name": "Summarize",
      "prompt": "Summarize the following email in bullet points."
    },
    {
      "name": "Translate FR",
      "prompt": "Translate the following email into French."
    },
    {
      "name": "Translate EN",
      "prompt": "Translate the following email into British English."
    },
    {
      "name": "Proofread FR",
      "prompt": "Correct the following email in French:"
    },
    {
      "name": "Proofread EN",
      "prompt": "Correct the following email in UK English:"
    },
    {
      "name": "Classify",
      "prompt": "Classify the following text in terms of politeness, warmth, formality, assertiveness, and offensiveness by giving a percentage for each category. Respond only with the category and score, with no additional text."
    },
    {
      "name": "Rewrite politely",
      "prompt": "Rewrite and correct the following text to be more polite. Respond only with the rewritten text and no additional comments."
    },
    {
      "name": "Rewrite formally",
      "prompt": "Rewrite and correct the following text so it is more formal. Respond only with the rewritten text and no additional comments."
    },
    {
      "name": "Reply",
      "prompt": "Reply to the following email."
    },
    {
      "name": "Custom prompt",
      "prompt": "You are a helpful chatbot that will do its best to complete the following tasks in a single response."
    }
  ],
  "chatPrompt": "You are an intelligent email assistant. Help the user with questions about writing and managing emails."
};
