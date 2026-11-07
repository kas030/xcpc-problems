import { difficultyNames, type Difficulty, type Problem } from './schema';

export interface Filters {
  query: string;
  difficulties: Difficulty[];
  contests: string[];
  year: string;
  progress: 'all' | 'todo' | 'done';
  sort: 'recent' | 'difficulty' | 'rate';
}
export const emptyFilters = (): Filters => ({ query: '', difficulties: [], contests: [], year: '', progress: 'all', sort: 'recent' });
export function parseFilters(search: string): Filters {
  const params = new URLSearchParams(search);
  return {
    query: (params.get('q') ?? '').slice(0, 200),
    difficulties: [...new Set(params.getAll('level'))].filter((d): d is Difficulty => difficultyNames.includes(d as Difficulty)),
    contests: [...new Set(params.getAll('contest'))].filter(s => /^[a-z0-9-]+$/.test(s)),
    year: /^\d{4}$/.test(params.get('year') ?? '') ? params.get('year')! : '',
    progress: params.get('status') === 'todo' ? 'todo' : params.get('status') === 'done' ? 'done' : 'all',
    sort: params.get('sort') === 'difficulty' ? 'difficulty' : params.get('sort') === 'rate' ? 'rate' : 'recent',
  };
}
export function serializeFilters(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.query) params.set('q', filters.query);
  filters.difficulties.forEach(d => params.append('level', d));
  filters.contests.forEach(c => params.append('contest', c));
  if (filters.year) params.set('year', filters.year);
  if (filters.progress !== 'all') params.set('status', filters.progress);
  if (filters.sort !== 'recent') params.set('sort', filters.sort);
  return params.toString();
}
export function hasChinese(p: Problem) { return p.markdown?.language === 'zh' || p.statement?.language === 'zh'; }
export function filterProblems(problems: Problem[], filters: Filters, solved = new Set<string>()) {
  const words = filters.query.normalize('NFKC').toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const result = problems.filter(p => {
    const haystack = `${p.title} ${p.label} ${p.qojId} ${p.contestShortName} ${p.contestId}`.normalize('NFKC').toLocaleLowerCase();
    return words.every(word => haystack.includes(word))
      && (!filters.difficulties.length || filters.difficulties.includes(p.difficulty))
      && (!filters.contests.length || filters.contests.includes(p.contestId))
      && (!filters.year || String(p.year) === filters.year)
      && (filters.progress === 'all' || (filters.progress === 'done') === solved.has(p.id));
  });
  if (filters.sort === 'difficulty') result.sort((a, b) => difficultyNames.indexOf(a.difficulty) - difficultyNames.indexOf(b.difficulty));
  if (filters.sort === 'rate') result.sort((a, b) => a.solved / Math.max(1, a.participants) - b.solved / Math.max(1, b.participants));
  return result;
}
