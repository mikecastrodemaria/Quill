// Quill - Default actions and prompts

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getLocale } from './i18n.js';

export const promptVersion = 2;

export const getDefaultActions = (language = DEFAULT_LANGUAGE) =>
    getLocale(language).actions.map(action => ({ ...action }));

export const getChatPrompt = (language = DEFAULT_LANGUAGE) => getLocale(language).chatPrompt;

const sameActions = (a, b) =>
    a.length === b.length && a.every((action, i) =>
        action.name.trim() === b[i].name && action.prompt.trim() === b[i].prompt);

// True when the list is an untouched default set, in any language.
export const isDefaultActions = (actions) =>
    SUPPORTED_LANGUAGES.some(lang => sameActions(actions, getLocale(lang).actions));

// Actions to show for a language: stored actions are kept as they are once
// customised, but an untouched default set follows the interface language.
export const localizeActions = (actions, language) =>
    (!actions?.length || isDefaultActions(actions)) ? getDefaultActions(language) : actions;
