// Quill - Interface translations. One file per language in ./locales.

import en from './locales/en.js';
import fr from './locales/fr.js';
import de from './locales/de.js';
import es from './locales/es.js';
import it from './locales/it.js';
import pt from './locales/pt.js';
import nl from './locales/nl.js';
import pl from './locales/pl.js';

const locales = { en, fr, de, es, it, pt, nl, pl };

export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = Object.keys(locales);

// [{ id, name }] for the language selector, each in its own language.
export const LANGUAGES = SUPPORTED_LANGUAGES.map(id => ({ id, name: locales[id].name }));

export const normalizeLanguage = (language) => {
  if (!language) return DEFAULT_LANGUAGE;
  const short = String(language).toLowerCase().slice(0, 2);
  return SUPPORTED_LANGUAGES.includes(short) ? short : DEFAULT_LANGUAGE;
};

export const getLocale = (language) => locales[normalizeLanguage(language)];

// Until the user picks a language, follow Thunderbird's own UI language.
const detectLanguage = () => {
  try {
    return browser.i18n.getUILanguage();
  } catch {
    return typeof navigator !== "undefined" ? navigator.language : DEFAULT_LANGUAGE;
  }
};

export const getLanguage = async () => {
  const { language } = await browser.storage.local.get(["language"]);
  return normalizeLanguage(language || detectLanguage());
};

export const setLanguage = async (language) => {
  const normalized = normalizeLanguage(language);
  await browser.storage.local.set({ language: normalized });
  return normalized;
};

export const t = (language, key, vars = {}) => {
  const text = getLocale(language).strings[key] ?? locales[DEFAULT_LANGUAGE].strings[key] ?? key;
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
