export const DEFAULT_LANGUAGE = "en";

export const SUPPORTED_LANGUAGES = ["en", "fr"];

const translations = {
  en: {
    // Errors
    errorPrefix: "Error:",
    errAuth: "{p}: invalid or expired API key.",
    errNoKey: "{p}: no API key configured.",
    errRate: "{p}: rate limit reached, try again in a moment.",
    errRateAnon: "OVHcloud: anonymous rate limit reached. Add an API key in the settings for higher limits.",
    errNetwork: "{p}: cannot reach the server.",
    errNetworkOllama: "Ollama: cannot connect. Check that Ollama is running and that CORS is allowed.",
    errTimeout: "{p}: the request timed out.",
    errEmpty: "{p}: the model returned an empty answer. Try a higher max length or another model.",
    errHttp: "{p}: error {s}.",

    // Popup
    actionsChatLink: "Chat",
    actionsSettingsLink: "Settings",
    actionsProvider: "Provider",
    actionsNoProvider: "No provider enabled. Open the settings.",
    actionsNewPrompts: "New default prompts available",

    // Draft window
    draftInsert: "Insert",
    draftToChat: "Continue in chat",
    draftRegenerate: "Regenerate",
    draftCopy: "Copy",
    draftCopied: "Copied",
    draftGenerating: "Generating…",
    draftOpenSettings: "Open settings",

    // Chat window
    chatTitle: "Quill Chat",
    chatPlaceholder: "Write your message… (Enter to send, Shift+Enter for a new line)",
    chatSend: "Send",
    chatClear: "New chat",

    // Settings
    settingsTitle: "Quill - Settings",
    settingsSubtitle: "AI email assistant for Thunderbird",
    settingsActiveProvider: "Active provider",
    settingsActiveProviderHelp: "Used to process your emails. You can also switch it from the Quill menu.",
    settingsProvidersHeading: "Providers",
    settingsProvidersHelp: "Enable the providers you want to use.",
    settingsApiKey: "API key",
    settingsApiKeyOptional: "API key (optional)",
    settingsGetKey: "Get a key",
    settingsOvhKeyHelp: "Without a key, OVHcloud only allows about 2 anonymous requests per minute.",
    settingsUrl: "URL",
    settingsModel: "Model",
    settingsRefreshModels: "Refresh the model list",
    settingsTest: "Test",
    settingsCorsHelp: "CORS help",
    settingsShow: "Show",
    settingsHide: "Hide",
    settingsGeneralHeading: "General",
    settingsLanguage: "Interface language",
    settingsMaxTokens: "Max answer length",
    settingsTokenDefault: "Default (4096 tokens)",
    settingsTokenLong: "Long (8192 tokens)",
    settingsTokenMedium: "Medium (2048 tokens)",
    settingsTokenShort: "Short (1024 tokens)",
    settingsTokenVeryShort: "Very short (512 tokens)",
    settingsMaxInput: "Max input (characters)",
    settingsMaxInputHelp: "Longer emails are truncated. 0 = unlimited.",
    settingsReset: "Reset everything",
    settingsSave: "Save",
    settingsCustomActionsHeading: "Actions",
    settingsActionsHelp: "Each action appears in the Quill menu and sends its prompt with your email.",
    settingsActionName: "Name",
    settingsActionPrompt: "Prompt",
    settingsAddAction: "Add an action",
    settingsRestoreActions: "Restore default actions",
    settingsAboutDesc: "by Supersonique Studio, fork of Aify by Ali Raheem",
    settingsDocs: "Documentation",
    settingsReportBug: "Report a bug",
    warningAvailablePrompts: "New default prompts are available. Use “Restore default actions” to load them (your custom actions will be replaced).",
    warningIgnore: "Ignore",
    statusTesting: "Testing…",
    statusConnected: "Connected · {n} models",
    statusActiveProviderDisabled: "Enable at least one provider before saving.",
    statusSettingsSaved: "Settings saved",
    statusUnsaved: "Unsaved changes",
    statusResetConfirm: "Reset all Quill settings, including API keys and custom actions?",
    statusRestoreConfirm: "Replace your actions with the default ones?",
    providerPlaceholder: "Enable at least one provider",
    deleteAction: "Delete"
  },
  fr: {
    errorPrefix: "Erreur :",
    errAuth: "{p} : clé API invalide ou expirée.",
    errNoKey: "{p} : aucune clé API configurée.",
    errRate: "{p} : limite de requêtes atteinte, réessayez dans un instant.",
    errRateAnon: "OVHcloud : limite de l'accès anonyme atteinte. Ajoutez une clé API dans les paramètres pour des limites plus élevées.",
    errNetwork: "{p} : serveur injoignable.",
    errNetworkOllama: "Ollama : connexion impossible. Vérifiez qu'Ollama est lancé et que le CORS est autorisé.",
    errTimeout: "{p} : la requête a expiré.",
    errEmpty: "{p} : le modèle a renvoyé une réponse vide. Essayez une longueur max plus élevée ou un autre modèle.",
    errHttp: "{p} : erreur {s}.",

    actionsChatLink: "Chat",
    actionsSettingsLink: "Paramètres",
    actionsProvider: "Fournisseur",
    actionsNoProvider: "Aucun fournisseur activé. Ouvrez les paramètres.",
    actionsNewPrompts: "Nouveaux prompts par défaut disponibles",

    draftInsert: "Insérer",
    draftToChat: "Continuer en chat",
    draftRegenerate: "Régénérer",
    draftCopy: "Copier",
    draftCopied: "Copié",
    draftGenerating: "Génération…",
    draftOpenSettings: "Ouvrir les paramètres",

    chatTitle: "Quill Chat",
    chatPlaceholder: "Écrivez votre message… (Entrée pour envoyer, Maj+Entrée pour un saut de ligne)",
    chatSend: "Envoyer",
    chatClear: "Nouveau chat",

    settingsTitle: "Quill - Paramètres",
    settingsSubtitle: "Assistant e-mail IA pour Thunderbird",
    settingsActiveProvider: "Fournisseur actif",
    settingsActiveProviderHelp: "Utilisé pour traiter vos e-mails. Vous pouvez aussi le changer depuis le menu Quill.",
    settingsProvidersHeading: "Fournisseurs",
    settingsProvidersHelp: "Activez les fournisseurs que vous voulez utiliser.",
    settingsApiKey: "Clé API",
    settingsApiKeyOptional: "Clé API (facultative)",
    settingsGetKey: "Obtenir une clé",
    settingsOvhKeyHelp: "Sans clé, OVHcloud n'autorise qu'environ 2 requêtes anonymes par minute.",
    settingsUrl: "URL",
    settingsModel: "Modèle",
    settingsRefreshModels: "Actualiser la liste des modèles",
    settingsTest: "Tester",
    settingsCorsHelp: "Aide CORS",
    settingsShow: "Afficher",
    settingsHide: "Masquer",
    settingsGeneralHeading: "Général",
    settingsLanguage: "Langue de l'interface",
    settingsMaxTokens: "Longueur max des réponses",
    settingsTokenDefault: "Par défaut (4096 tokens)",
    settingsTokenLong: "Long (8192 tokens)",
    settingsTokenMedium: "Moyen (2048 tokens)",
    settingsTokenShort: "Court (1024 tokens)",
    settingsTokenVeryShort: "Très court (512 tokens)",
    settingsMaxInput: "Entrée max (caractères)",
    settingsMaxInputHelp: "Les e-mails plus longs sont tronqués. 0 = illimité.",
    settingsReset: "Tout réinitialiser",
    settingsSave: "Enregistrer",
    settingsCustomActionsHeading: "Actions",
    settingsActionsHelp: "Chaque action apparaît dans le menu Quill et envoie son prompt avec votre e-mail.",
    settingsActionName: "Nom",
    settingsActionPrompt: "Prompt",
    settingsAddAction: "Ajouter une action",
    settingsRestoreActions: "Restaurer les actions par défaut",
    settingsAboutDesc: "par Supersonique Studio, fork de Aify par Ali Raheem",
    settingsDocs: "Documentation",
    settingsReportBug: "Signaler un bug",
    warningAvailablePrompts: "De nouveaux prompts par défaut sont disponibles. Utilisez « Restaurer les actions par défaut » pour les charger (vos actions personnalisées seront remplacées).",
    warningIgnore: "Ignorer",
    statusTesting: "Test en cours…",
    statusConnected: "Connecté · {n} modèles",
    statusActiveProviderDisabled: "Activez au moins un fournisseur avant d'enregistrer.",
    statusSettingsSaved: "Paramètres enregistrés",
    statusUnsaved: "Modifications non enregistrées",
    statusResetConfirm: "Réinitialiser tous les paramètres de Quill, y compris les clés API et les actions personnalisées ?",
    statusRestoreConfirm: "Remplacer vos actions par celles par défaut ?",
    providerPlaceholder: "Activez au moins un fournisseur",
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

export const t = (language, key, vars = {}) => {
  const lang = normalizeLanguage(language);
  const text = translations[lang]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? vars[name] : match));
};

// Translate static markup: data-i18n (text), data-i18n-title, data-i18n-placeholder.
export const applyI18n = (language, root = document) => {
  root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(language, el.dataset.i18n); });
  root.querySelectorAll("[data-i18n-title]").forEach(el => { el.title = t(language, el.dataset.i18nTitle); });
  root.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(language, el.dataset.i18nPlaceholder); });
  document.documentElement.lang = normalizeLanguage(language);
};

// Human-readable message for an error thrown by API.js.
export const formatError = (language, error, providerLabel) => {
  const p = providerLabel || error.provider || "API";
  const keys = { auth: "errAuth", nokey: "errNoKey", rate: "errRate", network: "errNetwork",
    timeout: "errTimeout", empty: "errEmpty", http: "errHttp" };
  let key = keys[error.kind];
  if (!key) return `${t(language, "errorPrefix")} ${error.message}`;
  if (error.kind === "network" && error.provider === "ollama") key = "errNetworkOllama";
  if (error.kind === "rate" && error.provider === "ovh" && !error.hasKey) key = "errRateAnon";
  let text = t(language, key, { p, s: error.status });
  if (error.kind === "http" && error.message) text += ` ${error.message}`;
  return text;
};
