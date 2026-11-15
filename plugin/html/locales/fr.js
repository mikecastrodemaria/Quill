// Quill - Français
export default {
  "name": "Français",
  "strings": {
    "errorPrefix": "Erreur :",
    "errAuth": "{p} : clé API invalide ou expirée.",
    "errNoKey": "{p} : aucune clé API configurée.",
    "errRate": "{p} : limite de requêtes atteinte, réessayez dans un instant.",
    "errRateAnon": "OVHcloud : limite de l'accès anonyme atteinte. Ajoutez une clé API dans les paramètres pour des limites plus élevées.",
    "errNetwork": "{p} : serveur injoignable.",
    "errNetworkOllama": "Ollama : connexion impossible. Vérifiez qu'Ollama est lancé et que le CORS est autorisé.",
    "errTimeout": "{p} : la requête a expiré.",
    "errEmpty": "{p} : le modèle a renvoyé une réponse vide. Essayez une longueur max plus élevée ou un autre modèle.",
    "errHttp": "{p} : erreur {s}.",
    "actionsChatLink": "Chat",
    "actionsSettingsLink": "Paramètres",
    "actionsProvider": "Fournisseur",
    "actionsNoProvider": "Aucun fournisseur activé. Ouvrez les paramètres.",
    "actionsNewPrompts": "Nouveaux prompts par défaut disponibles",
    "draftInsert": "Insérer",
    "draftToChat": "Continuer en chat",
    "draftRegenerate": "Régénérer",
    "draftCopy": "Copier",
    "draftCopied": "Copié",
    "draftGenerating": "Génération…",
    "draftOpenSettings": "Ouvrir les paramètres",
    "chatTitle": "Quill Chat",
    "chatPlaceholder": "Écrivez votre message… (Entrée pour envoyer, Maj+Entrée pour un saut de ligne)",
    "chatSend": "Envoyer",
    "settingsTitle": "Quill - Paramètres",
    "settingsSubtitle": "Assistant e-mail IA pour Thunderbird",
    "settingsActiveProvider": "Fournisseur actif",
    "settingsActiveProviderHelp": "Utilisé pour traiter vos e-mails. Vous pouvez aussi le changer depuis le menu Quill.",
    "settingsProvidersHeading": "Fournisseurs",
    "settingsProvidersHelp": "Activez les fournisseurs que vous voulez utiliser.",
    "settingsApiKey": "Clé API",
    "settingsApiKeyOptional": "Clé API (facultative)",
    "settingsGetKey": "Obtenir une clé",
    "settingsOvhKeyHelp": "Sans clé, OVHcloud n'autorise qu'environ 2 requêtes anonymes par minute.",
    "settingsUrl": "URL",
    "settingsModel": "Modèle",
    "settingsRefreshModels": "Actualiser la liste des modèles",
    "settingsTest": "Tester",
    "settingsCorsHelp": "Aide CORS",
    "settingsShow": "Afficher",
    "settingsHide": "Masquer",
    "settingsGeneralHeading": "Général",
    "settingsLanguage": "Langue de l'interface",
    "settingsMaxTokens": "Longueur max des réponses",
    "settingsTokenDefault": "Par défaut (4096 tokens)",
    "settingsTokenLong": "Long (8192 tokens)",
    "settingsTokenMedium": "Moyen (2048 tokens)",
    "settingsTokenShort": "Court (1024 tokens)",
    "settingsTokenVeryShort": "Très court (512 tokens)",
    "settingsMaxInput": "Entrée max (caractères)",
    "settingsMaxInputHelp": "Les e-mails plus longs sont tronqués. 0 = illimité.",
    "settingsReset": "Tout réinitialiser",
    "settingsSave": "Enregistrer",
    "settingsCustomActionsHeading": "Actions",
    "settingsActionsHelp": "Chaque action apparaît dans le menu Quill et envoie son prompt avec votre e-mail.",
    "settingsActionName": "Nom",
    "settingsActionPrompt": "Prompt",
    "settingsAddAction": "Ajouter une action",
    "settingsRestoreActions": "Restaurer les actions par défaut",
    "settingsAboutDesc": "par Supersonique Studio, fork de Aify par Ali Raheem",
    "settingsDocs": "Documentation",
    "settingsReportBug": "Signaler un bug",
    "warningAvailablePrompts": "De nouveaux prompts par défaut sont disponibles. Utilisez « Restaurer les actions par défaut » pour les charger (vos actions personnalisées seront remplacées).",
    "warningIgnore": "Ignorer",
    "statusTesting": "Test en cours…",
    "statusConnected": "Connecté · {n} modèles",
    "statusActiveProviderDisabled": "Activez au moins un fournisseur avant d'enregistrer.",
    "statusSettingsSaved": "Paramètres enregistrés",
    "statusUnsaved": "Modifications non enregistrées",
    "statusResetConfirm": "Réinitialiser tous les paramètres de Quill, y compris les clés API et les actions personnalisées ?",
    "statusRestoreConfirm": "Remplacer vos actions par celles par défaut ?",
    "providerPlaceholder": "Activez au moins un fournisseur",
    "deleteAction": "Supprimer"
  },
  "actions": [
    {
      "name": "Résumer",
      "prompt": "Récapitulez l'e-mail suivant dans une liste à puces."
    },
    {
      "name": "Traduire FR",
      "prompt": "Traduisez l'e-mail suivant en Français."
    },
    {
      "name": "Traduire EN",
      "prompt": "Traduisez l'e-mail suivant en Anglais britannique."
    },
    {
      "name": "Corriger FR",
      "prompt": "Corrige l'e-mail suivant en français :"
    },
    {
      "name": "Corriger EN",
      "prompt": "Correct this email in UK english :"
    },
    {
      "name": "Classer",
      "prompt": "Classez le texte suivant en termes de politesse, de chaleur, de formalité, d'affirmation de soi, d'offense en donnant un pourcentage pour chaque catégorie. Répondez avec uniquement la catégorie et le score et aucun texte supplémentaire."
    },
    {
      "name": "Réécrire poli",
      "prompt": "Réécrivez et corrige le texte suivant pour être plus poli. Répondez avec uniquement le texte réécrit et sans commentaires supplémentaires."
    },
    {
      "name": "Réécrire formel",
      "prompt": "Réécrivez et corrige le texte suivant pour qu'il soit plus formel. Répondez avec uniquement le texte réécrit et sans commentaires supplémentaires."
    },
    {
      "name": "Répondre",
      "prompt": "Répondez à l'e-mail suivant."
    },
    {
      "name": "Prompt custom",
      "prompt": "Vous êtes un chatbot utile qui fera de son mieux pour accomplir les tâches suivantes avec une seule réponse."
    }
  ],
  "chatPrompt": "Vous êtes un assistant email intelligent. Aidez l'utilisateur avec ses questions concernant la rédaction et la gestion d'emails."
};
