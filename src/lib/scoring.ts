import { medalNames, type BoardConfig, type BoardRun, type BoardTeam, type CohortStat, type ContestDefinition, type Difficulty, type Medal } from './schema';

export const ALGORITHM_VERSION = 'medal-cohort-v1';
export const THRESHOLD = 0.5;
export const MINIMUM_COHORT = 5;
const accepted = new Set(['ACCEPTED', 'AC']);
const failures = new Set(['WRONG_ANSWER', 'WA', 'TIME_LIMIT_EXCEEDED', 'TLE', 'MEMORY_LIMIT_EXCEEDED', 'MLE', 'RUNTIME_ERROR', 'RE', 'OUTPUT_LIMIT_EXCEEDED', 'OLE', 'PRESENTATION_ERROR', 'PE']);
const ignored = new Set(['COMPILATION_ERROR', 'CE', 'IGNORED']);
const pending = new Set(['PENDING', 'SUBMITTED', 'RUNNING', 'JUDGING', 'JUDGEMENT_FAILED', 'UNKNOWN']);

export interface RankedTeam {
  id: string; solved: Set<string>; penalty: number; lastAcceptedMinute: number; rank: number;
}

/** Reproduce XCPCIO's minute/second scoring, with official, in-contest runs only. */
export function rankTeams(config: BoardConfig, teams: BoardTeam[], runs: BoardRun[], group = 'official') {
  const duration = config.end_time - config.start_time;
  if (!(duration > 0) || !(config.penalty >= 0)) throw new Error('比赛时长或罚时非法');
  const unit = config.options?.submission_timestamp_unit ?? 'second';
  if (!['second', 'millisecond'].includes(unit)) throw new Error(`不支持的时间单位：${unit}`);
  const mode = config.options?.calculation_of_penalty ?? 'in_minutes';
  if (!['in_minutes', 'in_seconds', 'accumulate_in_seconds_and_finally_to_the_minute'].includes(mode)) throw new Error(`不支持的罚时规则：${mode}`);
  const problemIds = new Set(config.problems.map(p => p.id));
  const eligible = teams.filter(t => t.group.includes(group) && !t.group.includes('unofficial'));
  if (new Set(eligible.map(t => t.team_id)).size !== eligible.length) throw new Error('队伍 ID 重复');
  const ranking = new Map<string, RankedTeam>(eligible.map(t => [t.team_id, { id: t.team_id, solved: new Set(), penalty: 0, lastAcceptedMinute: 0, rank: 0 }]));
  const rejected = new Map<string, number>();
  let unresolved = false;
  // The last occurrence of a submission is its latest adjudication, not another attempt.
  const latest = new Map(runs.map(run => [run.submission_id, run]));
  const ordered = [...latest.values()].sort((a, b) => a.timestamp - b.timestamp || a.submission_id.localeCompare(b.submission_id, 'en', { numeric: true }));
  for (const run of ordered) {
    const t = ranking.get(run.team_id);
    const seconds = run.timestamp / (unit === 'millisecond' ? 1000 : 1);
    if (!t || seconds < 0 || seconds >= duration) continue;
    if (!Number.isFinite(seconds)) throw new Error('提交时间非法');
    if (!problemIds.has(run.problem_id)) throw new Error(`提交引用未知题目 ${run.problem_id}`);
    if (pending.has(run.status)) { unresolved = true; continue; }
    if (!accepted.has(run.status) && !failures.has(run.status) && !ignored.has(run.status)) throw new Error(`未知提交状态：${run.status}`);
    if (t.solved.has(run.problem_id)) continue;
    const key = JSON.stringify([run.team_id, run.problem_id]);
    if (accepted.has(run.status)) {
      t.solved.add(run.problem_id);
      const timePenalty = mode === 'in_minutes' ? Math.floor(seconds / 60) * 60 : Math.floor(seconds);
      t.penalty += timePenalty + (rejected.get(key) ?? 0) * config.penalty;
      t.lastAcceptedMinute = Math.max(t.lastAcceptedMinute, Math.floor(seconds / 60));
    } else if (failures.has(run.status)) {
      rejected.set(key, (rejected.get(key) ?? 0) + 1);
    }
  }
  const result = [...ranking.values()];
  for (const team of result) if (mode === 'accumulate_in_seconds_and_finally_to_the_minute') team.penalty = Math.floor(team.penalty / 60) * 60;
  result.sort((a, b) => b.solved.size - a.solved.size || a.penalty - b.penalty || a.lastAcceptedMinute - b.lastAcceptedMinute || a.id.localeCompare(b.id));
  let previous: RankedTeam | undefined;
  result.forEach((team, i) => {
    team.rank = previous && previous.solved.size === team.solved.size && previous.penalty === team.penalty && previous.lastAcceptedMinute === team.lastAcceptedMinute ? previous.rank : i + 1;
    previous = team;
  });
  return { teams: result, unresolved };
}

export function classify(cohorts: Record<Medal, CohortStat>, ready = true): { difficulty: Difficulty; reason: string } {
  if (!ready) return { difficulty: 'pending', reason: '最终榜或奖牌边界尚未确认' };
  if (medalNames.some(m => cohorts[m].total < MINIMUM_COHORT)) return { difficulty: 'pending', reason: '奖牌组样本不足 5 队' };
  // Start with bronze, using disjoint medal cohorts rather than cumulative ranks.
  for (const medal of medalNames) {
    const c = cohorts[medal];
    if (c.solved / c.total >= THRESHOLD) return { difficulty: medal, reason: '该奖牌组至少 50% 的队伍在赛内通过' };
  }
  return { difficulty: 'challenge', reason: '金牌组赛内通过率也未达到 50%' };
}

export function analyzeBoard(config: BoardConfig, teams: BoardTeam[], runs: BoardRun[], definition: ContestDefinition) {
  const ranking = rankTeams(config, teams, runs, definition.eligibleGroup);
  let counts: Record<Medal, number> = { gold: 0, silver: 0, bronze: 0 };
  let ready = definition.finalVerified && !ranking.unresolved;
  let note = ready ? '已使用最终榜与明确奖牌数量' : '榜单未确认完结，或存在未裁定提交';
  if (definition.medalPolicy.kind === 'verified-counts') counts = definition.medalPolicy.counts;
  else if (definition.medalPolicy.kind === 'source-counts' && typeof config.medal === 'object' && config.medal?.[definition.eligibleGroup]) {
    const source = config.medal[definition.eligibleGroup];
    counts = { gold: source.gold ?? 0, silver: source.silver ?? 0, bronze: source.bronze ?? 0 };
  } else {
    ready = false;
    note = definition.medalPolicy.kind === 'unverified' ? definition.medalPolicy.note : '上游仅有奖牌预设，尚未核对实际奖牌数量';
  }
  if (Object.values(counts).some(n => !Number.isInteger(n) || n < 0)) throw new Error('奖牌数量非法');
  if (Object.values(counts).reduce((a, b) => a + b, 0) > ranking.teams.filter(t => t.solved.size > 0).length) {
    ready = false; note = '奖牌数量超过有通过记录的正式队伍数';
  }
  const cohorts: Record<Medal, RankedTeam[]> = { gold: [], silver: [], bronze: [] };
  for (const t of ranking.teams) {
    if (!t.solved.size) continue;
    if (t.rank <= counts.gold) cohorts.gold.push(t);
    else if (t.rank <= counts.gold + counts.silver) cohorts.silver.push(t);
    else if (t.rank <= counts.gold + counts.silver + counts.bronze) cohorts.bronze.push(t);
  }
  // Do not arbitrarily break a tie across a medal boundary.
  if (Object.keys(counts).some(key => cohorts[key as Medal].length !== counts[key as Medal])) {
    ready = false; note = '奖牌边界存在同分或数量不一致，需要核对获奖名单';
  }
  if (ready && medalNames.some(m => cohorts[m].length < MINIMUM_COHORT)) {
    ready = false; note = '奖牌组样本不足 5 队';
  }
  const problems = config.problems.map(problem => {
    const stats = Object.fromEntries(medalNames.map(m => {
      const total = cohorts[m].length;
      const solved = cohorts[m].filter(t => t.solved.has(problem.id)).length;
      return [m, { solved, total, rate: total ? solved / total : null }];
    })) as Record<Medal, CohortStat>;
    const label = classify(stats, ready);
    return { label: problem.label, solved: ranking.teams.filter(t => t.solved.has(problem.id)).length, cohorts: stats, ...label, reason: ready ? label.reason : note };
  });
  return { ready, note, counts, participants: ranking.teams.length, problems };
}
