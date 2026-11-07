import test from 'node:test';
import assert from 'node:assert/strict';
import { flattenIndex, isCompetition } from '../scripts/board-index';
import { rawConfigSchema, rawRunSchema, rawTeamSchema } from '../scripts/io';
import { rankTeams } from '../src/lib/scoring';
import { extractQojCandidates } from '../scripts/qoj-candidates';

test('XCPCIO epoch milliseconds normalize independently of submission units', () => {
  const config = rawConfigSchema.parse({ contest_name: { fallback_lang: 'en', texts: { en: 'Chengdu', 'zh-CN': '成都' } }, start_time: 1792890600000, end_time: 1792908600000, problems: [{ id: 0, label: 'A' }], options: { submission_timestamp_unit: 'millisecond' } });
  assert.equal(config.contest_name, '成都');
  assert.equal(new Date(config.start_time * 1000).getUTCFullYear(), 2026);
  assert.equal(config.end_time - config.start_time, 18000);
  assert.deepEqual(rawConfigSchema.parse(config), config);
  const teams = [{ team_id: '1', group: ['official'] }];
  const run = { submission_id: '1', team_id: '1', problem_id: '0', timestamp: 18000000, status: 'AC' };
  assert.equal(rankTeams(config, teams, [run]).teams[0].solved.size, 0);
  assert.equal(rankTeams(config, teams, [{ ...run, timestamp: 17999999 }]).teams[0].solved.size, 1);
});

test('discovery supports old/new names and times and excludes rehearsals', () => {
  const index = flattenIndex({ old: { board_link: '/icpc/47th/nanjing', config: { contest_name: { en: 'Nanjing' }, start_time: 1669525200, end_time: 1669543200 } }, recent: { board_link: '/icpc/51st/chengdu', config: { contest_name: { fallback_lang: 'en', texts: { en: 'Chengdu' } }, start_time: 1792890600000, end_time: 1792908600000 } } });
  assert.deepEqual(index.map(c => c.name), ['Nanjing', 'Chengdu']);
  assert.equal(index[1].endTime - index[1].startTime, 18000);
  for (const suffix of ['warmup', 'practice', 'dress-rehearsal']) assert.equal(isCompetition(`icpc/49th/world-finals-${suffix}`), false);
  assert.equal(isCompetition('icpc/49th/world-finals'), true);
});

test('old flags and new IDs retain eligibility without retaining personal fields', () => {
  assert.deepEqual(rawTeamSchema.parse([{ team_id: 12, official: 1, name: 'private', members: ['private'] }, { id: '13', group: ['official'], unofficial: true }]), [{ team_id: '12', group: ['official'] }, { team_id: '13', group: ['official', 'unofficial'] }]);
  assert.throws(() => rawTeamSchema.parse([{ official: true }]));
});

test('anonymous attempts stay distinct and explicit IDs still support rejudgements', () => {
  const row = { team_id: '1', problem_id: '0', timestamp: 60, status: 'REJECTED' };
  const runs = rawRunSchema.parse([row, row, { ...row, id: 9, status: 'CORRECT', timestamp: 120 }, { ...row, id: 9, status: 'CORRECT', timestamp: 180 }]);
  assert.equal(new Set(runs.map(r => r.submission_id)).size, 3);
  assert.deepEqual(rawRunSchema.parse(runs), runs);
  const config = rawConfigSchema.parse({ contest_name: 'History', start_time: 0, end_time: 18000, problems: [{ id: 0, label: 'A' }] });
  const result = rankTeams(config, [{ team_id: '1', group: [] }, { team_id: '2', group: ['unofficial'] }], runs, 'all');
  assert.equal(result.teams.length, 1);
  assert.equal(result.teams[0].solved.size, 1);
  assert.equal(result.teams[0].penalty, 2580);
  assert.equal(rankTeams(config, [{ team_id: '1', group: [] }], [{ ...runs[0], status: 'FROZEN' }], 'all').unresolved, true);
  assert.equal(rankTeams(config, [{ team_id: '1', group: [] }], [{ ...runs[0], status: 'NO_OUTPUT' }, { ...runs[2], status: 'ACCEPTED' }], 'all').teams[0].penalty, 1320);
  assert.equal(rankTeams(config, [{ team_id: '1', group: [] }], [{ ...runs[0], status: 'PRESENTATION_ERROR' }, { ...runs[2], status: 'ACCEPTED' }], 'all').teams[0].penalty, 120);
});

test('QOJ dashboard mappings use explicit labels and non-consecutive problem IDs', () => {
  const candidates = extractQojCandidates('<table><tr><td>P</td><td><a href="/contest/1661/problem/8680?v=1">Turning Red</a></td></tr><tr><td>Q</td><td><a href="/problem/8685">Doing the Container Shuffle</a></td></tr></table><a href="https://example.com/problem/99">Ignore</a>', new URL('https://qoj.ac/contest/1661'));
  assert.deepEqual(candidates, [{ label: 'P', qojId: 8680, title: 'Turning Red' }, { label: 'Q', qojId: 8685, title: 'Doing the Container Shuffle' }]);
});
