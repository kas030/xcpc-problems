export const SOLVED_STORAGE_KEY = 'xcpc-problems:solved:v1';

export function readSolvedProgress(): Set<string> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(SOLVED_STORAGE_KEY) ?? '[]');
    return new Set(Array.isArray(saved) ? saved.filter((id): id is string => typeof id === 'string') : []);
  } catch {
    return new Set();
  }
}
