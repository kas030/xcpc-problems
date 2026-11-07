import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyFilters, filterProblems, parseFilters, serializeFilters } from '../src/lib/filters';
import type { Problem } from '../src/lib/schema';

const problems = [
  { id: 'a/A', title: '金币', label: 'A', qojId: 11, contestId: 'a', contestShortName: '24-ICPC-昆明', year: 2024, difficulty: 'bronze', statement: { language: 'zh' } },
  { id: 'a/B', title: 'Tree', label: 'B', qojId: 12, contestId: 'a', contestShortName: '24-ICPC-昆明', year: 2024, difficulty: 'silver', statement: { language: 'en' } },
  { id: 'b/A', title: 'Tree Game', label: 'A', qojId: 13, contestId: 'b', contestShortName: '25-CCPC-重庆', year: 2025, difficulty: 'gold', statement: { language: 'zh' } },
] as Problem[];
test('shareable filter state round trips including multiple values and Chinese search', () => {
  const f = { ...emptyFilters(), query: '昆明 金币', difficulties: ['bronze', 'silver'] as const, contests: ['icpc-2024-kunming'], chinese: true, progress: 'todo' as const };
  const normalized = { ...f, difficulties: [...f.difficulties] };
  assert.deepEqual(parseFilters(serializeFilters(normalized)), normalized);
  assert.deepEqual(parseFilters('?level=invalid&sort=evil').difficulties, []);
});
test('OR within a facet, AND across facets, plus local progress and language', () => {
  const f = { ...emptyFilters(), difficulties: ['bronze', 'silver'] as ('bronze' | 'silver')[], contests: ['a'] };
  assert.equal(filterProblems(problems, f).length, 2);
  assert.equal(filterProblems(problems, { ...f, chinese: true }).length, 1);
  assert.equal(filterProblems(problems, { ...f, progress: 'todo' }, new Set(['a/A']))[0].id, 'a/B');
  assert.equal(filterProblems(problems, { ...emptyFilters(), query: 'tree 13' })[0].id, 'b/A');
});
