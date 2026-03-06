export const DEFAULT_LANGUAGE = "en";

export const SUPPORTED_LANGUAGES = ["en", "fr"];

const translations = {
  en: {
    // Shared
    errorPrefix: "Error:",

    // Actions page
    actionsChatLink: "Chat",
    actionsSettingsLink: "Settings",

    // Draft page
    draftInsert: "Insert",
    draftToChat: "Convert to chat",
    draftRegenerate: "Regenerate",

    // Chat page
    chatPlaceholder: "Write your message here...",
    chatSend: "Send",

    // Settings page
    settingsTitle: "Quill - Settings",
    settingsConfigTitle: "Configuration",
    settingsStep1: "Enable and configure one or more AI providers below",
    settingsStep2a: "Get your API keys:",
    settingsStep3a: "For Ollama: install",
    settingsStep3b: "and a model",
    settingsStep4: "Choose the default active provider",
    settingsStep5: "Don't forget to click Save!",
    settingsActiveProvider: "🎯 Active Provider",
    settingsActiveProviderHelp: "The provider used by default to process your emails. You can quickly switch it from the Quill menu.",
    settingsProvidersHeading: "⚙️ Provider Configuration",
    settingsApiKey: "API Key",
    settingsModel: "Model",
    settingsTestApiKey: "🔑 Test API key",
    settingsOllamaUrl: "Ollama URL",
    settingsTestConnection: "🔄 Test connection",
    settingsCorsHelp: "CORS help",
    settingsGeneralHeading: "📊 General settings",
    settingsLanguage: "Interface language",
    settingsMaxTokens: "Max length (tokens)",
    settingsTokenDefault: "Default (4096)",
    settingsTokenLong: "Long (8192 tokens)",
    settingsTokenMedium: "Medium (2048 tokens)",
    settingsTokenShort: "Short (1024 tokens)",
    settingsTokenVeryShort: "Very short (512 tokens)",
    settingsMaxInput: "Max input (characters)",
    settingsUnlimitedPlaceholder: "0 = unlimited",
    settingsReset: "Reset",
    settingsSave: "Save",
    settingsCustomActionsHeading: "📝 Custom actions",
    settingsActionsLabel: "Actions",
    settingsAddAction: "Add action",
    settingsAbout: "About",
    settingsAboutDesc: "AI email assistant (Claude + GPT + Ollama)",
    settingsReportBug: "Report a bug",
    warningAvailablePrompts: "New prompts are available. Save your custom prompts and click Reset to load the new ones.",
    warningIgnore: "Ignore",
    warningLabel: "Warning",
    ollamaUnavailableFallback: "Ollama unavailable, using default models",
    statusTesting: "⏳ Testing...",
    statusConnected: "✅ Connected",
    statusNotConnected: "❌ Not connected -",
    statusValidKey: "✅ Valid key",
    statusActiveProviderDisabled: "Warning: selected active provider is not enabled. Please enable it or choose another one.",
    statusOllamaNotConnectedConfirm: "Ollama is not connected. Do you want to save anyway?",
    statusSettingsSaved: "Settings saved!",
    statusSettingsReset: "Settings reset!",
    providerPlaceholder: "-- Enable at least one provider --",
    deleteAction: "Delete"
  },
  fr: {
    errorPrefix: "Erreur :",
    actionsChatLink: "Chat",
    actionsSettingsLink: "Paramètres",
    draftInsert: "Insérer",
    draftToChat: "Convertir en chat",
    draftRegenerate: "Régénérer",
    chatPlaceholder: "Écrivez votre message ici...",
    chatSend: "Envoyer",
    settingsTitle: "Quill - Paramètres",
    settingsConfigTitle: "Configuration",
    settingsStep1: "Activez et configurez un ou plusieurs providers IA ci-dessous",
    settingsStep2a: "Obtenez vos clés API :",
    settingsStep3a: "Pour Ollama : installez",
    settingsStep3b: "et un modèle",
    settingsStep4: "Choisissez le provider actif par défaut",
    settingsStep5: "N'oubliez pas de cliquer sur Sauvegarder !",
    settingsActiveProvider: "🎯 Provider Actif",
    settingsActiveProviderHelp: "Le provider utilisé par défaut pour traiter vos emails. Vous pouvez le changer rapidement depuis le menu Quill.",
    settingsProvidersHeading: "⚙️ Configuration des Providers",
    settingsApiKey: "Clé API",
    settingsModel: "Modèle",
    settingsTestApiKey: "🔑 Tester la clé API",
    settingsOllamaUrl: "URL Ollama",
    settingsTestConnection: "🔄 Tester la connexion",
    settingsCorsHelp: "Aide CORS",
    settingsGeneralHeading: "📊 Paramètres généraux",
    settingsLanguage: "Langue de l'interface",
    settingsMaxTokens: "Longueur max (tokens)",
    settingsTokenDefault: "Par défaut (4096)",
    settingsTokenLong: "Long (8192 tokens)",
    settingsTokenMedium: "Moyen (2048 tokens)",
    settingsTokenShort: "Court (1024 tokens)",
    settingsTokenVeryShort: "Très court (512 tokens)",
    settingsMaxInput: "Entrée max (caractères)",
    settingsUnlimitedPlaceholder: "0 = illimité",
    settingsReset: "Réinitialiser",
    settingsSave: "Sauvegarder",
    settingsCustomActionsHeading: "📝 Actions personnalisées",
    settingsActionsLabel: "Actions",
    settingsAddAction: "Ajouter une action",
    settingsAbout: "À propos",
    settingsAboutDesc: "Assistant email IA (Claude + GPT + Ollama)",
    settingsReportBug: "Signaler un bug",
    warningAvailablePrompts: "De nouveaux prompts sont disponibles. Sauvegardez vos prompts personnalisés et cliquez sur Réinitialiser pour charger les nouveaux.",
    warningIgnore: "Ignorer",
    warningLabel: "Attention",
    ollamaUnavailableFallback: "Ollama non disponible, utilisation des modèles par défaut",
    statusTesting: "⏳ Test en cours...",
    statusConnected: "✅ Connecté",
    statusNotConnected: "❌ Non connecté -",
    statusValidKey: "✅ Clé valide",
    statusActiveProviderDisabled: "Attention : Le provider actif sélectionné n'est pas activé ! Veuillez l'activer ou en choisir un autre.",
    statusOllamaNotConnectedConfirm: "Ollama n'est pas connecté. Voulez-vous sauvegarder quand même ?",
    statusSettingsSaved: "Paramètres sauvegardés !",
    statusSettingsReset: "Paramètres réinitialisés !",
    providerPlaceholder: "-- Activez au moins un provider --",
    deleteAction: "Supprimer"
  }
};

export const normalizeLanguage = (language) => {
  if (!language) return DEFAULT_LANGUAGE;
  const short = language.toLowerCase().slice(0, 2);
  return SUPPORTED_LANGUAGES.includes(short) ? short : DEFAULT_LANGUAGE;
};

export const getLanguage = async () => {
  const { language } = await browser.storage.local.get(["language"]);
  return normalizeLanguage(language || DEFAULT_LANGUAGE);
};

export const setLanguage = async (language) => {
  const normalized = normalizeLanguage(language);
  await browser.storage.local.set({ language: normalized });
  return normalized;
};

export const t = (language, key) => {
  const lang = normalizeLanguage(language);
  return translations[lang]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
};
