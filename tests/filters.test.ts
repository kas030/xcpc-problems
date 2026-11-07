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
  const f = { ...emptyFilters(), query: '昆明 金币', difficulties: ['bronze', 'silver'] as const, contests: ['icpc-2024-kunming'], progress: 'todo' as const };
  const normalized = { ...f, difficulties: [...f.difficulties] };
  assert.deepEqual(parseFilters(serializeFilters(normalized)), normalized);
  assert.deepEqual(parseFilters('?level=invalid&sort=evil').difficulties, []);
});
test('OR within a facet, AND across facets, plus local progress', () => {
  const f = { ...emptyFilters(), difficulties: ['bronze', 'silver'] as ('bronze' | 'silver')[], contests: ['a'] };
  assert.equal(filterProblems(problems, f).length, 2);
  assert.equal(filterProblems(problems, { ...f, progress: 'todo' }, new Set(['a/A']))[0].id, 'a/B');
  assert.equal(filterProblems(problems, { ...emptyFilters(), query: 'tree 13' })[0].id, 'b/A');
});

test('old pending difficulty and language links still show results and preserve valid filters', () => {
  const filters = parseFilters('?level=pending&zh=1&contest=a');
  assert.deepEqual(filterProblems(problems, filters).map(p => p.id), ['a/A', 'a/B']);
  assert.equal(serializeFilters(filters), 'contest=a');
  assert.deepEqual(parseFilters('?level=pending&level=gold').difficulties, ['gold']);
});

test('all sort fields and directions survive sharing and restoring filters', () => {
  for (const sort of ['recent', 'difficulty', 'rate'] as const) {
    for (const order of ['asc', 'desc'] as const) {
      const filters = { ...emptyFilters(), sort, order, query: 'Tree', year: '2024', progress: 'todo' as const };
      assert.deepEqual(parseFilters(serializeFilters(filters)), filters);
    }
  }
});

test('legacy sorting links and invalid directions use the original defaults', () => {
  assert.equal(parseFilters('').order, 'desc');
  assert.equal(parseFilters('?sort=recent').order, 'desc');
  assert.equal(parseFilters('?sort=difficulty').order, 'asc');
  assert.equal(parseFilters('?sort=rate').order, 'asc');
  assert.equal(parseFilters('?sort=difficulty&order=invalid').order, 'asc');
  assert.deepEqual(parseFilters('?sort=invalid&order=invalid'), emptyFilters());
  assert.equal(serializeFilters(emptyFilters()), '');
});

test('time, difficulty and pass rate sort both ways while preserving ties and source data', () => {
  const sortableProblems: Problem[] = [
    { ...problems[0], solved: 80, participants: 100 },
    { ...problems[1], solved: 40, participants: 400 },
    { ...problems[2], solved: 30, participants: 100 },
    { ...problems[0], id: 'c/A', contestId: 'c', difficulty: 'challenge', solved: 0, participants: 0 },
    { ...problems[0], id: 'c/B', contestId: 'c', label: 'B', solved: 10, participants: 100 },
  ];
  const contests = [
    { id: 'a', date: '2024-11-24T01:00:00.000Z' },
    { id: 'b', date: '2024-12-01T01:00:00.000Z' },
    { id: 'c', date: '2024-11-24T02:00:00.000Z' },
  ];
  const original = structuredClone(sortableProblems);
  const cases = [
    ['recent', 'asc', ['a/A', 'a/B', 'c/A', 'c/B', 'b/A']],
    ['recent', 'desc', ['b/A', 'c/A', 'c/B', 'a/A', 'a/B']],
    ['difficulty', 'asc', ['a/A', 'c/B', 'a/B', 'b/A', 'c/A']],
    ['difficulty', 'desc', ['c/A', 'b/A', 'a/B', 'a/A', 'c/B']],
    ['rate', 'asc', ['c/A', 'a/B', 'c/B', 'b/A', 'a/A']],
    ['rate', 'desc', ['a/A', 'b/A', 'a/B', 'c/B', 'c/A']],
  ] as const;
  for (const [sort, order, expected] of cases) {
    const actual = filterProblems(sortableProblems, { ...emptyFilters(), sort, order }, new Set(), contests);
    assert.deepEqual(actual.map(problem => problem.id), expected, `${sort} ${order}`);
  }
  assert.deepEqual(sortableProblems, original);
});
