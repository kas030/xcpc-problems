import { medalNames, type BoardConfig, type BoardRun, type BoardTeam, type CohortStat, type ContestDefinition, type Difficulty, type Medal, type MedalBasis } from './schema';

export const ALGORITHM_VERSION = 'medal-cohort-v3';
export const THRESHOLD = 0.5;
export const WARMUP_BRONZE_THRESHOLD = 0.9;
export const WARMUP_OVERALL_THRESHOLD = 0.8;
const accepted = new Set(['ACCEPTED', 'AC', 'CORRECT']);
const failures = new Set(['WRONG_ANSWER', 'WA', 'REJECTED', 'INCORRECT', 'NO_OUTPUT', 'TIME_LIMIT_EXCEEDED', 'TLE', 'MEMORY_LIMIT_EXCEEDED', 'MLE', 'RUNTIME_ERROR', 'RE', 'OUTPUT_LIMIT_EXCEEDED', 'OLE']);
const ignored = new Set(['COMPILATION_ERROR', 'CE', 'PRESENTATION_ERROR', 'PE', 'IGNORED']);
const pending = new Set(['PENDING', 'SUBMITTED', 'RUNNING', 'JUDGING', 'JUDGEMENT_FAILED', 'UNKNOWN', 'WAITING', 'PREPARING', 'COMPILING', 'FROZEN']);

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
  const eligible = teams.filter(t => (group === 'all' || t.group.includes(group)) && !t.group.includes('unofficial'));
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

export function classify(cohorts: Record<Medal, CohortStat>, solved: number, participants: number): { difficulty: Difficulty; reason: string } {
  if (cohorts.bronze.total > 0 && cohorts.bronze.solved / cohorts.bronze.total >= WARMUP_BRONZE_THRESHOLD
    && participants > 0 && solved / participants >= WARMUP_OVERALL_THRESHOLD) {
    return { difficulty: 'warmup', reason: '铜牌组赛内通过率达到 90%，且全部正式队伍赛内通过率达到 80%' };
  }
  // Start with bronze, using disjoint medal cohorts rather than cumulative ranks.
  for (const medal of medalNames) {
    const c = cohorts[medal];
    if (c.total > 0 && c.solved / c.total >= THRESHOLD) return { difficulty: medal, reason: '该奖牌组至少 50% 的队伍在赛内通过' };
  }
  return { difficulty: 'challenge', reason: medalNames.some(m => cohorts[m].total > 0) ? '各奖牌组赛内通过率均未达到 50%' : '暂无正式队伍的赛内通过记录，按挑战题收录' };
}

export function analyzeBoard(config: BoardConfig, teams: BoardTeam[], runs: BoardRun[], definition: ContestDefinition) {
  const ranking = rankTeams(config, teams, runs, definition.eligibleGroup);
  const effective = ranking.teams.filter(t => t.solved.size > 0);
  let limits: Record<Medal, number> | undefined;
  let medalBasis: MedalBasis = definition.medalPolicy.kind;
  if (definition.medalPolicy.kind === 'verified-counts') limits = definition.medalPolicy.counts;
  else if (definition.medalPolicy.kind === 'source-counts' && typeof config.medal === 'object' && config.medal?.[definition.eligibleGroup]) {
    const source = config.medal[definition.eligibleGroup];
    if (Object.values(source).some(n => n !== undefined && (!Number.isInteger(n) || n < 0))) throw new Error('奖牌数量非法');
    if (medalNames.every(m => source[m] !== undefined)) limits = { gold: source.gold!, silver: source.silver!, bronze: source.bronze! };
  }
  if (limits && Object.values(limits).some(n => !Number.isInteger(n) || n < 0)) throw new Error('奖牌数量非法');
  const configuredTotal = limits ? limits.gold + limits.silver + limits.bronze : 0;
  if (!limits || configuredTotal === 0 || configuredTotal > effective.length) {
    // XCPCIO's CCPC preset uses rounded cumulative boundaries, not rounded group sizes.
    const gold = Math.ceil(effective.length * 0.1);
    const goldSilver = Math.ceil(effective.length * 0.3);
    const allMedals = Math.ceil(effective.length * 0.6);
    limits = { gold, silver: goldSilver - gold, bronze: allMedals - goldSilver };
    medalBasis = 'preset';
  }
  const notes = [medalBasis === 'preset' ? '按有赛内通过记录的正式队伍数，以累计 10%、30%、60% 向上取整估算奖牌组' : medalBasis === 'verified-counts' ? '按已核对的奖牌人数分组' : '按上游榜单配置的奖牌人数分组'];
  if (!definition.finalVerified || ranking.unresolved) notes.push('按当前已裁定提交统计');
  const cohorts: Record<Medal, RankedTeam[]> = { gold: [], silver: [], bronze: [] };
  for (const t of effective) {
    if (t.rank <= limits.gold) cohorts.gold.push(t);
    else if (t.rank <= limits.gold + limits.silver) cohorts.silver.push(t);
    else if (t.rank <= limits.gold + limits.silver + limits.bronze) cohorts.bronze.push(t);
  }
  // Keep tied teams together in the higher cohort and report actual cohort sizes.
  const counts = { gold: cohorts.gold.length, silver: cohorts.silver.length, bronze: cohorts.bronze.length };
  if (medalNames.some(m => counts[m] !== limits[m])) notes.push('奖牌分界并列队伍归入同一较高奖牌组');
  const problems = config.problems.map(problem => {
    const stats = Object.fromEntries(medalNames.map(m => {
      const total = cohorts[m].length;
      const solved = cohorts[m].filter(t => t.solved.has(problem.id)).length;
      return [m, { solved, total, rate: total ? solved / total : null }];
    })) as Record<Medal, CohortStat>;
    const solved = effective.filter(t => t.solved.has(problem.id)).length;
    // Include zero-solve official teams in the overall pass-rate denominator.
    return { label: problem.label, solved, cohorts: stats, ...classify(stats, solved, ranking.teams.length) };
  });
  return { note: notes.join('；'), medalBasis, counts, participants: ranking.teams.length, problems };
}
