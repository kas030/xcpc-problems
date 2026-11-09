import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analyzeBoard, classify, rankTeams } from '../src/lib/scoring';
import { contestDefinitionSchema, type BoardConfig, type BoardRun, type BoardTeam, type CohortStat, type ContestDefinition, type Medal, type Snapshot } from '../src/lib/schema';

const config: BoardConfig = { contest_name: 'Fixture', start_time: 0, end_time: 18000, penalty: 1200, problems: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] };
const teams: BoardTeam[] = [{ team_id: '1', group: ['official'] }, { team_id: '2', group: ['official', 'girl'] }, { team_id: '3', group: ['unofficial'] }];
let sequence = 0;
const run = (team: string, problem: string, time: number, status = 'ACCEPTED'): BoardRun => ({ submission_id: String(++sequence), team_id: team, problem_id: problem, timestamp: time, status });
const stats = (b: number, s: number, g: number, total = 10) => Object.fromEntries([['bronze', b], ['silver', s], ['gold', g]].map(([medal, solved]) => [medal, { solved, total, rate: Number(solved) / total }])) as Record<Medal, CohortStat>;

test('difficulty uses disjoint medal cohorts, inclusive 50%, from bronze upwards', () => {
  assert.equal(classify(stats(5, 9, 10), 24, 30).difficulty, 'bronze');
  assert.equal(classify(stats(1, 6, 9), 16, 30).difficulty, 'silver');
  assert.equal(classify(stats(0, 4, 5), 9, 30).difficulty, 'gold');
  assert.equal(classify(stats(0, 1, 4), 5, 30).difficulty, 'challenge');
  assert.equal(classify(stats(2, 2, 2, 3), 6, 9).difficulty, 'bronze');
  assert.equal(classify({ ...stats(0, 0, 0), gold: { solved: 1, total: 1, rate: 1 } }, 1, 21).difficulty, 'gold');
  const empty = { solved: 0, total: 0, rate: null };
  assert.equal(classify({ bronze: empty, silver: empty, gold: empty }, 0, 0).difficulty, 'challenge');
  assert.equal(classify({ bronze: empty, silver: empty, gold: { solved: 1, total: 1, rate: 1 } }, 1, 1).difficulty, 'gold');
});

test('warmup requires both inclusive thresholds and a nonempty bronze cohort', () => {
  assert.equal(classify(stats(9, 10, 10), 32, 40).difficulty, 'warmup');
  assert.equal(classify(stats(9, 10, 10), 31, 40).difficulty, 'bronze');
  assert.equal(classify(stats(89, 100, 100, 100), 320, 400).difficulty, 'bronze');
  assert.equal(classify(stats(10, 10, 10), 30, 30).difficulty, 'warmup');
  assert.equal(classify({ ...stats(0, 10, 10), bronze: { solved: 0, total: 0, rate: null } }, 20, 20).difficulty, 'silver');
});

test('warmup overall rate includes zero-solve official teams and excludes unofficial and out-of-contest solves', () => {
  const definition = { eligibleGroup: 'official', finalVerified: true, medalPolicy: { kind: 'source-counts' } } as ContestDefinition;
  const official = Array.from({ length: 10 }, (_, i) => ({ team_id: String(i), group: ['official'] }));
  const excluded = [{ team_id: 'star', group: ['official', 'unofficial'] }, { team_id: 'outside', group: ['practice'] }];
  const runs = [...official.slice(0, 8).map((t, i) => run(t.team_id, 'a', 60 + i * 60)), run('8', 'a', 18000), run('9', 'a', -1), run('star', 'a', 60), run('outside', 'a', 60)];
  const result = analyzeBoard(config, [...official, ...excluded], runs, definition);
  assert.equal(result.participants, 10);
  assert.equal(result.problems[0].solved, 8);
  assert.equal(result.problems[0].difficulty, 'warmup');
  const below = analyzeBoard(config, [...official, ...excluded], runs.filter(r => r.team_id !== '7'), definition);
  assert.equal(below.problems[0].cohorts.bronze.rate, 1);
  assert.equal(below.problems[0].difficulty, 'bronze');
});
test('only official in-contest AC counts; CE, duplicates, post-AC and out-of-contest attempts do not add penalty', () => {
  const runs = [run('1', 'a', 10, 'COMPILATION_ERROR'), run('1', 'a', 30, 'WRONG_ANSWER'), run('1', 'a', 61), run('1', 'a', 62), run('1', 'a', 63, 'WRONG_ANSWER'), run('1', 'b', 18000), run('1', 'b', -1), run('3', 'a', 1), run('2', 'b', 100)];
  runs.push(runs[1]);
  const result = rankTeams(config, teams, runs);
  assert.equal(result.teams.length, 2);
  const first = result.teams.find(t => t.id === '1')!;
  assert.equal(first.solved.size, 1);
  assert.equal(first.penalty, 1260);
  assert.equal(result.teams[0].id, '2');
});
test('millisecond timestamps and all three penalty modes are distinguished', () => {
  const runs = [run('1', 'a', 89999), run('1', 'b', 89999)];
  const options = { submission_timestamp_unit: 'millisecond' as const };
  assert.equal(rankTeams({ ...config, options }, teams, runs).teams[0].penalty, 120);
  assert.equal(rankTeams({ ...config, options: { ...options, calculation_of_penalty: 'in_seconds' } }, teams, runs).teams[0].penalty, 178);
  assert.equal(rankTeams({ ...config, options: { ...options, calculation_of_penalty: 'accumulate_in_seconds_and_finally_to_the_minute' } }, teams, runs).teams[0].penalty, 120);
});
test('last adjudication replaces an earlier verdict; unresolved submissions are tracked separately', () => {
  const initial = run('1', 'a', 100);
  assert.equal(rankTeams(config, teams, [initial, { ...initial, status: 'WRONG_ANSWER' }]).teams[0].solved.size, 0);
  assert.equal(rankTeams(config, teams, [run('1', 'a', 100, 'PENDING')]).unresolved, true);
  assert.throws(() => rankTeams(config, teams, [run('1', 'a', 100, 'NEW_UNKNOWN_STATUS')]));
});
test('boundary ties stay in the higher cohort, with actual counts and no duplicated teams', () => {
  const definition = { eligibleGroup: 'official', finalVerified: true, medalPolicy: { kind: 'source-counts' } } as ContestDefinition;
  const official = Array.from({ length: 20 }, (_, i) => ({ team_id: String(i), group: ['official'] }));
  const board = { ...config, medal: { official: { gold: 5, silver: 5, bronze: 5 } } };
  const result = analyzeBoard(board, official, official.map(t => run(t.team_id, 'a', 100)), definition);
  assert.deepEqual(result.counts, { gold: 20, silver: 0, bronze: 0 });
  assert.deepEqual(result.problems[0].cohorts, { gold: { solved: 20, total: 20, rate: 1 }, silver: { solved: 0, total: 0, rate: null }, bronze: { solved: 0, total: 0, rate: null } });
  assert.equal(result.problems[0].difficulty, 'gold');
  assert.match(result.note, /并列/);
});

test('missing or unusable medal counts use cumulative percentages of official teams with an in-contest AC', () => {
  const definition = { eligibleGroup: 'official', finalVerified: true, medalPolicy: { kind: 'source-counts' } } as ContestDefinition;
  const official = Array.from({ length: 42 }, (_, i) => ({ team_id: String(i), group: i === 0 ? ['official', 'girl'] : ['official'] }));
  const unofficial = Array.from({ length: 11 }, (_, i) => ({ team_id: `star-${i}`, group: ['official', 'unofficial'] }));
  const runs = [...official.slice(0, 23).map((t, i) => run(t.team_id, 'a', 60 + i * 60)), ...unofficial.map(t => run(t.team_id, 'a', 60)), run('23', 'a', 18000)];
  const missing: BoardConfig['medal'][] = [undefined, 'ccpc', 'other-preset', {}, { official: {} }, { official: { gold: 3, silver: 4 } }, { girl: { gold: 3, silver: 4, bronze: 7 } }, { official: { gold: 0, silver: 0, bronze: 0 } }, { official: { gold: 100, silver: 100, bronze: 100 } }];
  for (const medal of missing) {
    const result = analyzeBoard({ ...config, medal }, [...official, ...unofficial], runs, definition);
    assert.equal(result.participants, 42);
    assert.equal(result.medalBasis, 'preset');
    assert.deepEqual(result.counts, { gold: 3, silver: 4, bronze: 7 });
    assert.equal(result.problems[0].solved, 23);
    assert.equal(result.problems[0].difficulty, 'bronze');
    assert.equal(result.problems[1].difficulty, 'challenge');
  }
  const result = analyzeBoard({ ...config, medal: { official: { gold: 2, silver: 6, bronze: 9 } } }, official, runs.filter(r => !r.team_id.startsWith('star-')), definition);
  assert.equal(result.medalBasis, 'source-counts');
  assert.deepEqual(result.counts, { gold: 2, silver: 6, bronze: 9 });
  for (const counts of [{ gold: -1 }, { gold: 1.5 }, { gold: 1, silver: 2, bronze: -1 }]) {
    assert.throws(() => analyzeBoard({ ...config, medal: { official: counts } }, official, runs, definition), /奖牌数量非法/);
  }
});

test('small and empty cohorts always produce a difficulty without inventing passing teams', () => {
  const definition = { eligibleGroup: 'official', finalVerified: true, medalPolicy: { kind: 'source-counts' } } as ContestDefinition;
  const one = analyzeBoard(config, teams, [run('1', 'a', 60)], definition);
  assert.deepEqual(one.counts, { gold: 1, silver: 0, bronze: 0 });
  assert.deepEqual(one.problems.map(p => p.difficulty), ['gold', 'challenge']);
  const empty = analyzeBoard(config, teams, [], definition);
  assert.deepEqual(empty.counts, { gold: 0, silver: 0, bronze: 0 });
  assert(empty.problems.every(p => p.difficulty === 'challenge' && p.solved === 0));
  assert(empty.problems.every(p => Object.values(p.cohorts).every(c => c.total === 0 && c.rate === null)));
});

test('unconfirmed boards and unresolved verdicts classify using adjudicated in-contest results', () => {
  const official = Array.from({ length: 10 }, (_, i) => ({ team_id: String(i), group: ['official'] }));
  const runs = [...official.map((t, i) => run(t.team_id, 'a', 60 + i * 60)), run('0', 'b', 1000, 'PENDING')];
  for (const finalVerified of [true, false]) {
    const definition = { eligibleGroup: 'official', finalVerified, medalPolicy: { kind: 'source-counts' } } as ContestDefinition;
    const result = analyzeBoard(config, official, runs, definition);
    assert.deepEqual(result.problems.map(p => p.difficulty), ['warmup', 'challenge']);
    assert.equal(result.problems[1].solved, 0);
    assert.match(result.note, /当前已裁定提交/);
  }
});

test('medal membership and rates are computed from non-overlapping rank intervals', () => {
  const definition = { eligibleGroup: 'official', finalVerified: true, medalPolicy: { kind: 'verified-counts', counts: { gold: 5, silver: 5, bronze: 5 }, source: 'https://example.org/results' } } as ContestDefinition;
  const official = Array.from({ length: 15 }, (_, i) => ({ team_id: String(i), group: ['official'] }));
  const runs = official.flatMap((t, i) => i < 5 ? [run(t.team_id, 'a', 60 + i * 60), run(t.team_id, 'b', 60 + i * 60)] : [run(t.team_id, i < 10 ? 'a' : 'b', 600 + i * 60)]);
  const result = analyzeBoard({ ...config, medal: { official: { gold: 1, silver: 1, bronze: 1 } } }, official, runs, definition);
  assert.equal(result.medalBasis, 'verified-counts');
  assert.deepEqual(result.problems[0].cohorts, { bronze: { solved: 0, total: 5, rate: 0 }, silver: { solved: 5, total: 5, rate: 1 }, gold: { solved: 5, total: 5, rate: 1 } });
  assert.equal(result.problems[0].difficulty, 'silver');
  assert.equal(result.problems[1].difficulty, 'bronze');
});

test('Chongqing snapshot reproduces the official-view preset cohorts and all thirteen difficulties', () => {
  const snapshot: Snapshot = JSON.parse(readFileSync(new URL('../data/snapshots/ccpc-2024-chongqing.json', import.meta.url), 'utf8'));
  const rawDefinition = JSON.parse(readFileSync(new URL('../data/contests/ccpc-2024-chongqing.json', import.meta.url), 'utf8'));
  const definition = contestDefinitionSchema.parse(rawDefinition);
  const result = analyzeBoard(snapshot.config, snapshot.teams, snapshot.runs, definition);
  assert.equal(result.medalBasis, 'preset');
  assert.deepEqual(result.counts, { gold: 28, silver: 56, bronze: 83 });
  assert.deepEqual(Object.fromEntries(result.problems.map(p => [p.label, p.difficulty])), { A: 'gold', B: 'warmup', C: 'bronze', D: 'silver', E: 'warmup', F: 'challenge', G: 'challenge', H: 'gold', I: 'warmup', J: 'warmup', K: 'warmup', L: 'challenge', M: 'gold' });
  assert.deepEqual(result.problems.find(p => p.label === 'M')!.cohorts.gold, { solved: 14, total: 28, rate: 0.5 });
  delete rawDefinition.medalPolicy;
  assert.deepEqual(contestDefinitionSchema.parse(rawDefinition).medalPolicy, { kind: 'source-counts' });
});
