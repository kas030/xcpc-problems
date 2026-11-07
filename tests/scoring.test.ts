import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeBoard, classify, rankTeams } from '../src/lib/scoring';
import type { BoardConfig, BoardRun, BoardTeam, CohortStat, ContestDefinition, Medal } from '../src/lib/schema';

const config: BoardConfig = { contest_name: 'Fixture', start_time: 0, end_time: 18000, penalty: 1200, problems: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] };
const teams: BoardTeam[] = [{ team_id: '1', group: ['official'] }, { team_id: '2', group: ['official', 'girl'] }, { team_id: '3', group: ['unofficial'] }];
let sequence = 0;
const run = (team: string, problem: string, time: number, status = 'ACCEPTED'): BoardRun => ({ submission_id: String(++sequence), team_id: team, problem_id: problem, timestamp: time, status });
const stats = (b: number, s: number, g: number, total = 10) => Object.fromEntries([['bronze', b], ['silver', s], ['gold', g]].map(([medal, solved]) => [medal, { solved, total, rate: Number(solved) / total }])) as Record<Medal, CohortStat>;

test('difficulty uses disjoint medal cohorts, inclusive 50%, from bronze upwards', () => {
  assert.equal(classify(stats(5, 9, 10)).difficulty, 'bronze');
  assert.equal(classify(stats(1, 6, 9)).difficulty, 'silver');
  assert.equal(classify(stats(0, 4, 5)).difficulty, 'gold');
  assert.equal(classify(stats(0, 1, 4)).difficulty, 'challenge');
  assert.equal(classify(stats(2, 2, 2, 3)).difficulty, 'pending');
  assert.equal(classify(stats(10, 10, 10), false).difficulty, 'pending');
  assert.equal(classify({ ...stats(10, 10, 10), gold: { solved: 1, total: 1, rate: 1 } }).difficulty, 'pending');
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
test('last adjudication replaces an earlier verdict; pending verdicts invalidate finality', () => {
  const initial = run('1', 'a', 100);
  assert.equal(rankTeams(config, teams, [initial, { ...initial, status: 'WRONG_ANSWER' }]).teams[0].solved.size, 0);
  assert.equal(rankTeams(config, teams, [run('1', 'a', 100, 'PENDING')]).unresolved, true);
  assert.throws(() => rankTeams(config, teams, [run('1', 'a', 100, 'NEW_UNKNOWN_STATUS')]));
});
test('ambiguous medal boundary ties remain pending instead of assigning arbitrary team IDs', () => {
  const definition = { eligibleGroup: 'official', finalVerified: true, medalPolicy: { kind: 'source-counts' } } as ContestDefinition;
  const official = Array.from({ length: 20 }, (_, i) => ({ team_id: String(i), group: ['official'] }));
  const board = { ...config, medal: { official: { gold: 5, silver: 5, bronze: 5 } } };
  const result = analyzeBoard(board, official, official.map(t => run(t.team_id, 'a', 100)), definition);
  assert.equal(result.ready, false);
  assert.equal(result.problems[0].difficulty, 'pending');
});
test('a medal preset is not silently treated as a verified award list', () => {
  const definition = { eligibleGroup: 'official', finalVerified: true, medalPolicy: { kind: 'source-counts' } } as ContestDefinition;
  assert.equal(analyzeBoard({ ...config, medal: 'ccpc' }, teams, [run('1', 'a', 100)], definition).ready, false);
});

test('medal membership and rates are computed from non-overlapping rank intervals', () => {
  const definition = { eligibleGroup: 'official', finalVerified: true, medalPolicy: { kind: 'verified-counts', counts: { gold: 5, silver: 5, bronze: 5 }, source: 'https://example.org/results' } } as ContestDefinition;
  const official = Array.from({ length: 15 }, (_, i) => ({ team_id: String(i), group: ['official'] }));
  const runs = official.flatMap((t, i) => i < 5 ? [run(t.team_id, 'a', 60 + i * 60), run(t.team_id, 'b', 60 + i * 60)] : [run(t.team_id, i < 10 ? 'a' : 'b', 600 + i * 60)]);
  const result = analyzeBoard(config, official, runs, definition);
  assert.equal(result.ready, true);
  assert.deepEqual(result.problems[0].cohorts, { bronze: { solved: 0, total: 5, rate: 0 }, silver: { solved: 5, total: 5, rate: 1 }, gold: { solved: 5, total: 5, rate: 1 } });
  assert.equal(result.problems[0].difficulty, 'silver');
  assert.equal(result.problems[1].difficulty, 'bronze');
});
