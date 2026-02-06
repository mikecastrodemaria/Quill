// Quill - Configuration globale
// Prompts personnalisés pour le traitement d'emails

export const promptVersion = 1;

export const defaultActions = [
    {
        name: "Résumer",
        prompt: "Récapitulez l'e-mail suivant dans une liste à puces."
    },
    {
        name: "Traduire FR",
        prompt: "Traduisez l'e-mail suivant en Français."
    },
    {
        name: "Traduire EN",
        prompt: "Traduisez l'e-mail suivant en Anglais britannique."
    },
    {
        name: "Corriger FR",
        prompt: "Corrige l'e-mail suivant en français :"
    },
    {
        name: "Corriger EN",
        prompt: "Correct this email in UK english :"
    },
    {
        name: "Classer",
        prompt: "Classez le texte suivant en termes de politesse, de chaleur, de formalité, d'affirmation de soi, d'offense en donnant un pourcentage pour chaque catégorie. Répondez avec uniquement la catégorie et le score et aucun texte supplémentaire."
    },
    {
        name: "Réécrire poli",
        prompt: "Réécrivez et corrige le texte suivant pour être plus poli. Répondez avec uniquement le texte réécrit et sans commentaires supplémentaires."
    },
    {
        name: "Réécrire formel",
        prompt: "Réécrivez et corrige le texte suivant pour qu'il soit plus formel. Répondez avec uniquement le texte réécrit et sans commentaires supplémentaires."
    },
    {
        name: "Répondre",
        prompt: "Répondez à l'e-mail suivant."
    },
    {
        name: "Prompt custom",
        prompt: "Vous êtes un chatbot utile qui fera de son mieux pour accomplir les tâches suivantes avec une seule réponse."
    }
];

export const chatPrompt = "Vous êtes un assistant email intelligent. Aidez l'utilisateur avec ses questions concernant la rédaction et la gestion d'emails.";

export const defaultModel = "claude-sonnet-4-5-20250929";
