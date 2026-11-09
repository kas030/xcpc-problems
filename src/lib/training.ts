import { difficultyNames, type Catalog } from './schema';

export interface TrainingProgress {
  total: number;
  completed: number;
  remaining: number;
  rate: number;
}

function progress(total = 0, completed = 0): TrainingProgress {
  return { total, completed, remaining: total - completed, rate: total ? completed / total : 0 };
}

export function calculateTrainingStats(catalog: Catalog, solved: ReadonlySet<string>) {
  const difficulties = difficultyNames.map(difficulty => ({ difficulty, ...progress() }));
  const contests = catalog.contests.map(contest => ({ contest, ...progress() }));
  const byDifficulty = new Map(difficulties.map(row => [row.difficulty, row]));
  const byContest = new Map(contests.map(row => [row.contest.id, row]));
  let completed = 0;

  for (const problem of catalog.problems) {
    const done = Number(solved.has(problem.id));
    completed += done;
    for (const row of [byDifficulty.get(problem.difficulty), byContest.get(problem.contestId)]) {
      if (row) Object.assign(row, progress(row.total + 1, row.completed + done));
    }
  }

  contests.sort((a, b) => Date.parse(b.contest.date) - Date.parse(a.contest.date));
  return {
    overall: progress(catalog.problems.length, completed),
    difficulties,
    contests,
    startedContests: contests.filter(row => row.completed > 0).length,
    completedContests: contests.filter(row => row.total > 0 && row.completed === row.total).length,
  };
}

export function formatTrainingRate(row: TrainingProgress): string {
  return row.total ? `${(row.rate * 100).toFixed(1)}%` : '0%';
}
