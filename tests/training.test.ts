import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog as source } from '../src/lib/catalog';
import { difficultyNames, type Catalog } from '../src/lib/schema';
import { calculateTrainingStats, formatTrainingRate } from '../src/lib/training';
import { readSolvedProgress, SOLVED_STORAGE_KEY } from '../src/lib/progress';

const catalog: Catalog = {
  ...source,
  contests: [
    { ...source.contests[0], id: 'old', date: '2024-10-01T00:00:00Z', problemCount: 99 },
    { ...source.contests[0], id: 'new', date: '2025-10-01T00:00:00Z' },
    { ...source.contests[0], id: 'empty', date: '2023-10-01T00:00:00Z' },
  ],
  problems: difficultyNames.map((difficulty, index) => ({
    ...source.problems[0], id: `${index < 3 ? 'old' : 'new'}/${index}`,
    contestId: index < 3 ? 'old' : 'new', difficulty,
  })),
};

test('zero progress preserves every difficulty and contest, with contests sorted by date', () => {
  const original = structuredClone(catalog);
  const stats = calculateTrainingStats(catalog, new Set());
  assert.deepEqual(stats.overall, { total: 5, completed: 0, remaining: 5, rate: 0 });
  assert.deepEqual(stats.difficulties.map(row => row.difficulty), difficultyNames);
  assert.ok(stats.difficulties.every(row => row.total === 1 && row.completed === 0));
  assert.deepEqual(stats.contests.map(row => row.contest.id), ['new', 'old', 'empty']);
  assert.deepEqual(stats.contests.map(row => row.total), [2, 3, 0]);
  assert.equal(stats.startedContests, 0);
  assert.equal(stats.completedContests, 0);
  assert.equal(formatTrainingRate(stats.overall), '0.0%');
  assert.deepEqual(catalog, original);
});

test('partial progress ignores stale IDs and duplicate marks and keeps group totals consistent', () => {
  const solved = new Set(['old/0', 'old/0', 'new/3', 'new/4', 'removed/A']);
  const stats = calculateTrainingStats(catalog, solved);
  assert.deepEqual(stats.overall, { total: 5, completed: 3, remaining: 2, rate: 0.6 });
  assert.equal(stats.startedContests, 2);
  assert.equal(stats.completedContests, 1);
  assert.equal(formatTrainingRate(stats.contests[1]), '33.3%');
  assert.deepEqual(stats.difficulties.map(row => row.completed), [1, 0, 0, 1, 1]);
  for (const rows of [stats.difficulties, stats.contests]) {
    for (const key of ['total', 'completed', 'remaining'] as const) {
      assert.equal(rows.reduce((sum, row) => sum + row[key], 0), stats.overall[key]);
    }
  }
  solved.delete('old/0');
  const updated = calculateTrainingStats(catalog, solved);
  assert.equal(updated.overall.completed, 2);
  assert.equal(updated.startedContests, 1);
});

test('all completed excludes empty contests from completed contest count', () => {
  const stats = calculateTrainingStats(catalog, new Set(catalog.problems.map(p => p.id)));
  assert.equal(stats.overall.remaining, 0);
  assert.equal(formatTrainingRate(stats.overall), '100.0%');
  assert.equal(stats.startedContests, 2);
  assert.equal(stats.completedContests, 2);
});

test('empty catalog and empty difficulty groups have finite zero rates', () => {
  const stats = calculateTrainingStats({ ...catalog, contests: [], problems: [] }, new Set(['old/0']));
  assert.deepEqual(stats.overall, { total: 0, completed: 0, remaining: 0, rate: 0 });
  assert.equal(formatTrainingRate(stats.overall), '0%');
  assert.equal(stats.contests.length, 0);
  assert.equal(stats.startedContests, 0);
  assert.equal(stats.completedContests, 0);
  assert.equal(stats.difficulties.length, 5);
  assert.ok(stats.difficulties.every(row => row.total === 0 && formatTrainingRate(row) === '0%'));
});

test('stored progress tolerates duplicates, malformed records and unavailable storage', t => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  t.after(() => {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else Reflect.deleteProperty(globalThis, 'localStorage');
  });
  let saved: string | null = null;
  let blocked = false;
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get() {
      if (blocked) throw new Error('Storage unavailable');
      return { getItem: (key: string) => { assert.equal(key, SOLVED_STORAGE_KEY); return saved; } };
    },
  });
  for (const value of [null, 'broken', '{}', 'null', '42']) {
    saved = value;
    assert.deepEqual([...readSolvedProgress()], []);
  }
  saved = JSON.stringify(['old/0', 'old/0', 42, null, 'removed/A']);
  assert.deepEqual([...readSolvedProgress()], ['old/0', 'removed/A']);
  assert.equal(calculateTrainingStats(catalog, readSolvedProgress()).overall.completed, 1);
  blocked = true;
  assert.deepEqual([...readSolvedProgress()], []);
});
