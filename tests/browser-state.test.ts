import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyFilters } from '../src/lib/filters';
import { BROWSER_STATE_STORAGE_KEY, parseBrowserState, readBrowserState, saveBrowserState, serializeBrowserState } from '../src/lib/browser-state';

test('browser state preserves filters, sorting and the selected page', () => {
  const filters = {
    ...emptyFilters(), query: '树', difficulties: ['gold', 'silver'] as const,
    contests: ['icpc-2024-kunming'], year: '2024', progress: 'todo' as const,
    sort: 'rate' as const, order: 'desc' as const,
  };
  const state = { filters: { ...filters, difficulties: [...filters.difficulties] }, page: 3 };
  assert.deepEqual(parseBrowserState(serializeBrowserState(state.filters, state.page)), state);
  assert.equal(parseBrowserState('?level=gold').page, 1);
});

test('invalid page numbers fall back to page one', () => {
  for (const page of ['', '0', '-1', '1.5', 'NaN', 'Infinity', '1e2', '9007199254740992']) {
    assert.equal(parseBrowserState(`?page=${page}`).page, 1, page);
  }
});

test('saved state survives navigation, explicit links win, and clearing replaces saved filters', t => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  t.after(() => {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else Reflect.deleteProperty(globalThis, 'localStorage');
  });
  const values = new Map<string, string>();
  let blocked = false;
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get() {
      if (blocked) throw new Error('Storage unavailable');
      return {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
      };
    },
  });
  const defaults = { filters: emptyFilters(), page: 1 };
  assert.deepEqual(readBrowserState(''), defaults);
  const filters = { ...emptyFilters(), query: 'Tree', progress: 'todo' as const };
  saveBrowserState(serializeBrowserState(filters, 4));
  assert.deepEqual(readBrowserState(''), { filters, page: 4 });
  assert.deepEqual(readBrowserState('?level=gold&page=2'), {
    filters: { ...emptyFilters(), difficulties: ['gold'] }, page: 2,
  });
  assert.deepEqual(readBrowserState('?page=1'), defaults);
  saveBrowserState(serializeBrowserState(emptyFilters(), 1));
  assert.deepEqual(readBrowserState(''), defaults);
  values.set(BROWSER_STATE_STORAGE_KEY, 'level=invalid&page=-9');
  assert.deepEqual(readBrowserState(''), defaults);
  blocked = true;
  assert.deepEqual(readBrowserState(''), defaults);
  assert.equal(readBrowserState('?page=3').page, 3);
  assert.doesNotThrow(() => saveBrowserState('page=2'));
});
