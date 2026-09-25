// Thin wrappers around the Meta Pixel loaded in index.html. Safe to call when
// the pixel is absent (no ID configured, blocked by an ad blocker).
export function track(event, params) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event, params);
  }
}

export function trackCustom(event, params) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', event, params);
  }
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
const UTM_STORAGE_KEY = 'fzs_utm';

// Reads UTM params from the URL on first load and persists them for the session,
// so they survive in-page navigation and a later form submit.
export function captureUtm() {
  let stored = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || '{}');
  } catch {
    stored = {};
  }
  const params = new URLSearchParams(window.location.search);
  const fromUrl = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) fromUrl[k] = v.slice(0, 200);
  }
  const merged = Object.keys(fromUrl).length ? fromUrl : stored;
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // sessionStorage unavailable — UTM only lives in memory
  }
  return merged;
}

export function getUtm() {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}
