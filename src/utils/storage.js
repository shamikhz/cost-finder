/**
 * Resilient LocalStorage wrapper for saving and loading user calculation scenarios.
 * Gracefully degrades if LocalStorage is disabled or unavailable (e.g. private mode, quota exceeded).
 */

const STORAGE_KEY_SCENARIOS = 'hcf_saved_scenarios_v1';
const STORAGE_KEY_CURRENT = 'hcf_active_items_v1';
const STORAGE_KEY_SETTINGS = 'hcf_user_settings_v1';

export function isLocalStorageAvailable() {
  try {
    const testKey = '__hcf_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

export function loadSavedCurrency(fallback = 'INR') {
  if (!isLocalStorageAvailable()) return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed?.currency || fallback;
  } catch (err) {
    return fallback;
  }
}

export function saveCurrency(currencyCode) {
  if (!isLocalStorageAvailable()) return false;
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY_SETTINGS);
    const parsed = existing ? JSON.parse(existing) : {};
    parsed.currency = currencyCode;
    window.localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(parsed));
    return true;
  } catch (err) {
    return false;
  }
}

export function loadActiveItems(fallback = []) {
  if (!isLocalStorageAvailable()) return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_CURRENT);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (err) {
    console.warn('Could not read active items from LocalStorage', err);
    return fallback;
  }
}

export function saveActiveItems(items) {
  if (!isLocalStorageAvailable()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(items));
    return true;
  } catch (err) {
    console.warn('Could not write active items to LocalStorage', err);
    return false;
  }
}

export function loadSavedScenarios() {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_SCENARIOS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Could not read scenarios from LocalStorage', err);
    return [];
  }
}

export function saveScenario(name, items, currency) {
  if (!isLocalStorageAvailable()) return false;
  try {
    const existing = loadSavedScenarios();
    const newScenario = {
      id: `sc_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: name || `Scenario ${existing.length + 1}`,
      savedAt: new Date().toISOString(),
      itemCount: items.length,
      currency,
      items,
    };
    const updated = [newScenario, ...existing.filter((s) => s.name !== name)];
    window.localStorage.setItem(STORAGE_KEY_SCENARIOS, JSON.stringify(updated.slice(0, 15)));
    return newScenario;
  } catch (err) {
    console.warn('Could not save scenario', err);
    return false;
  }
}

export function deleteScenario(id) {
  if (!isLocalStorageAvailable()) return false;
  try {
    const existing = loadSavedScenarios();
    const updated = existing.filter((s) => s.id !== id);
    window.localStorage.setItem(STORAGE_KEY_SCENARIOS, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.warn('Could not delete scenario', err);
    return false;
  }
}

export function clearAllLocalData() {
  if (!isLocalStorageAvailable()) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY_CURRENT);
    window.localStorage.removeItem(STORAGE_KEY_SCENARIOS);
    window.localStorage.removeItem(STORAGE_KEY_SETTINGS);
    return true;
  } catch (err) {
    console.warn('Could not clear local data', err);
    return false;
  }
}
