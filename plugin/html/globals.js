// Quill - Global configuration

import { DEFAULT_LANGUAGE, normalizeLanguage } from './i18n.js';

export const promptVersion = 2;

const actionsByLanguage = {
    en: [
        { name: "Summarize", prompt: "Summarize the following email in bullet points." },
        { name: "Translate FR", prompt: "Translate the following email into French." },
        { name: "Translate EN", prompt: "Translate the following email into British English." },
        { name: "Proofread FR", prompt: "Correct the following email in French:" },
        { name: "Proofread EN", prompt: "Correct the following email in UK English:" },
        { name: "Classify", prompt: "Classify the following text in terms of politeness, warmth, formality, assertiveness, and offensiveness by giving a percentage for each category. Respond only with the category and score, with no additional text." },
        { name: "Rewrite politely", prompt: "Rewrite and correct the following text to be more polite. Respond only with the rewritten text and no additional comments." },
        { name: "Rewrite formally", prompt: "Rewrite and correct the following text so it is more formal. Respond only with the rewritten text and no additional comments." },
        { name: "Reply", prompt: "Reply to the following email." },
        { name: "Custom prompt", prompt: "You are a helpful chatbot that will do its best to complete the following tasks in a single response." }
    ],
    fr: [
        { name: "Résumer", prompt: "Récapitulez l'e-mail suivant dans une liste à puces." },
        { name: "Traduire FR", prompt: "Traduisez l'e-mail suivant en Français." },
        { name: "Traduire EN", prompt: "Traduisez l'e-mail suivant en Anglais britannique." },
        { name: "Corriger FR", prompt: "Corrige l'e-mail suivant en français :" },
        { name: "Corriger EN", prompt: "Correct this email in UK english :" },
        { name: "Classer", prompt: "Classez le texte suivant en termes de politesse, de chaleur, de formalité, d'affirmation de soi, d'offense en donnant un pourcentage pour chaque catégorie. Répondez avec uniquement la catégorie et le score et aucun texte supplémentaire." },
        { name: "Réécrire poli", prompt: "Réécrivez et corrige le texte suivant pour être plus poli. Répondez avec uniquement le texte réécrit et sans commentaires supplémentaires." },
        { name: "Réécrire formel", prompt: "Réécrivez et corrige le texte suivant pour qu'il soit plus formel. Répondez avec uniquement le texte réécrit et sans commentaires supplémentaires." },
        { name: "Répondre", prompt: "Répondez à l'e-mail suivant." },
        { name: "Prompt custom", prompt: "Vous êtes un chatbot utile qui fera de son mieux pour accomplir les tâches suivantes avec une seule réponse." }
    ]
};

const chatPromptByLanguage = {
    en: "You are an intelligent email assistant. Help the user with questions about writing and managing emails.",
    fr: "Vous êtes un assistant email intelligent. Aidez l'utilisateur avec ses questions concernant la rédaction et la gestion d'emails."
};

export const getDefaultActions = (language = DEFAULT_LANGUAGE) => {
    const lang = normalizeLanguage(language);
    return actionsByLanguage[lang] || actionsByLanguage[DEFAULT_LANGUAGE];
};

export const getChatPrompt = (language = DEFAULT_LANGUAGE) => {
    const lang = normalizeLanguage(language);
    return chatPromptByLanguage[lang] || chatPromptByLanguage[DEFAULT_LANGUAGE];
};

export const defaultActions = getDefaultActions(DEFAULT_LANGUAGE);
export const chatPrompt = getChatPrompt(DEFAULT_LANGUAGE);

