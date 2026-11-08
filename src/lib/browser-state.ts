import { parseFilters, serializeFilters, type Filters } from './filters';

export const BROWSER_STATE_STORAGE_KEY = 'xcpc-problems:browser:v1';

export function parseBrowserState(search: string) {
  const value = new URLSearchParams(search).get('page') ?? '1';
  const page = /^[1-9]\d*$/.test(value) ? Number(value) : 1;
  return { filters: parseFilters(search), page: Number.isSafeInteger(page) ? page : 1 };
}

export function serializeBrowserState(filters: Filters, page: number) {
  const params = new URLSearchParams(serializeFilters(filters));
  // Keep page=1 so an explicitly shared default view overrides saved filters.
  params.set('page', String(page));
  return params.toString();
}

export function readBrowserState(search: string) {
  if (search) return parseBrowserState(search);
  try {
    return parseBrowserState(localStorage.getItem(BROWSER_STATE_STORAGE_KEY) ?? '');
  } catch {
    return parseBrowserState('');
  }
}

export function saveBrowserState(query: string) {
  try {
    localStorage.setItem(BROWSER_STATE_STORAGE_KEY, query);
  } catch {
    // Navigation and URL sharing still work when browser storage is unavailable.
  }
}
