import { useEffect, useRef, useState } from 'react';
import { readSolvedProgress, SOLVED_STORAGE_KEY } from './progress';

export const progressSaveError = '当前浏览器无法保存进度，本次标记仍然有效';

export function useSolvedProgress() {
  const [solved, setSolved] = useState<Set<string>>(() => new Set());
  const unsaved = useRef<Set<string> | null>(null);

  useEffect(() => {
    const refresh = () => setSolved(unsaved.current ?? readSolvedProgress());
    const onStorage = (event: StorageEvent) => {
      if (event.key === SOLVED_STORAGE_KEY || event.key === null) refresh();
    };
    refresh();
    window.addEventListener('pageshow', refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('pageshow', refresh);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggleSolved = (id: string) => {
    const next = new Set(unsaved.current ?? readSolvedProgress());
    next.has(id) ? next.delete(id) : next.add(id);
    setSolved(next);
    try {
      localStorage.setItem(SOLVED_STORAGE_KEY, JSON.stringify([...next]));
      unsaved.current = null;
      return true;
    } catch {
      unsaved.current = next;
      return false;
    }
  };

  return { solved, toggleSolved };
}
