import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { copy } from './copy.js';

const STORAGE_KEY = 'fzs_lang';
const LanguageContext = createContext(null);

function lookup(obj, path) {
  return path.split('.').reduce((node, key) => (node == null ? undefined : node[key]), obj);
}

function interpolate(value, vars) {
  if (typeof value !== 'string' || !vars) return value;
  return value.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

function readStoredLang() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'en' || v === 'bm' ? v : 'bm';
  } catch {
    return 'bm';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable (private mode) — choice lasts for this visit only
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'ms';
    document.title = copy[lang].meta.title;
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      let value = lookup(copy[lang], key);
      if (value === undefined && lang !== 'bm') {
        if (import.meta.env.DEV) console.warn(`[i18n] missing "${key}" in ${lang}, falling back to bm`);
        value = lookup(copy.bm, key);
      }
      if (value === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] missing key "${key}"`);
        return key;
      }
      return interpolate(value, vars);
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
