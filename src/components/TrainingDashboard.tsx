import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { readSolvedProgress, SOLVED_STORAGE_KEY } from '../lib/progress';
import { difficultyLabels, type Catalog } from '../lib/schema';
import { calculateTrainingStats, formatTrainingRate, type TrainingProgress } from '../lib/training';

const PER_PAGE = 20;

function ProgressBar({ row, label }: { row: TrainingProgress; label: string }) {
  return <div className="training-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Number((row.rate * 100).toFixed(1))} aria-valuetext={`已完成 ${row.completed} / ${row.total} 道，${formatTrainingRate(row)}`}>
    <span style={{ width: `${row.rate * 100}%` }} />
  </div>;
}

export default function TrainingDashboard({ catalog, base }: { catalog: Catalog; base: string }) {
  const [solved, setSolved] = useState<Set<string> | null>(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const refresh = () => setSolved(readSolvedProgress());
    const onStorage = (event: StorageEvent) => {
      if (event.key === SOLVED_STORAGE_KEY || event.key === null) refresh();
    };
    refresh();
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', refresh);
    window.addEventListener('pageshow', refresh);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('pageshow', refresh);
    };
  }, []);
  const stats = useMemo(() => calculateTrainingStats(catalog, solved ?? new Set()), [catalog, solved]);
  const pages = Math.max(1, Math.ceil(stats.contests.length / PER_PAGE));
  const currentPage = Math.min(page, pages);
  const start = (currentPage - 1) * PER_PAGE;
  const visible = stats.contests.slice(start, start + PER_PAGE);
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)
    .filter(i => pages <= 7 || i === 1 || i === pages || Math.abs(i - currentPage) <= 1);

  if (solved === null) return <p className="training-loading" role="status">正在读取训练进度…</p>;

  return <div className="training-dashboard">
    <section className="training-summary" aria-label="训练总览">
      <div className="training-card"><h2>已完成题目</h2><strong className="training-value">{stats.overall.completed}</strong><p>共 {stats.overall.total} 道题</p></div>
      <div className="training-card"><h2>未完成题目</h2><strong className="training-value">{stats.overall.remaining}</strong><p>继续下一道训练</p></div>
      <div className="training-card"><h2>整体完成率</h2><strong className="training-value">{formatTrainingRate(stats.overall)}</strong><ProgressBar row={stats.overall} label="整体完成率" /></div>
      <div className="training-card"><h2>已开始训练的比赛</h2><strong className="training-value">{stats.startedContests}<span> / {stats.contests.length}</span></strong><p>其中 {stats.completedContests} 场已全部完成</p></div>
    </section>

    {stats.overall.completed === 0 && <div className="training-empty"><p>还没有已完成的题目，在题单中标记后即可查看训练进度。</p></div>}

    <section className="table-card training-levels" aria-labelledby="training-levels-heading">
      <div className="table-toolbar"><h2 id="training-levels-heading" className="table-title">难度进度</h2></div>
      <div className="training-level-grid">{stats.difficulties.map(row => <div className={`training-level ${row.difficulty}`} key={row.difficulty}>
        <h3><span className={`difficulty-badge ${row.difficulty}`}>{difficultyLabels[row.difficulty]}</span></h3>
        <div className="training-level-count"><span className="training-count">{row.completed}</span><span> / {row.total} 道</span><strong>{formatTrainingRate(row)}</strong></div>
        <ProgressBar row={row} label={`${difficultyLabels[row.difficulty]}完成率`} />
        <span className="training-remaining">未完成 {row.remaining} 道<span className="sr-only">{difficultyLabels[row.difficulty]}</span></span>
      </div>)}</div>
    </section>

    <section className="table-card training-contests" aria-labelledby="training-contests-heading">
      <div className="table-toolbar"><h2 id="training-contests-heading" className="table-title">比赛进度<span className="result-count">{stats.contests.length}</span></h2><span className="muted">按比赛时间倒序</span></div>
      <div className="table-scroll"><table className="problem-table training-table">
        <caption className="sr-only">各比赛训练完成情况</caption>
        <thead><tr><th scope="col">比赛</th><th scope="col">已完成</th><th scope="col">未完成</th><th scope="col">完成率</th></tr></thead>
        <tbody>{visible.map(row => <tr key={row.contest.id}>
          <th scope="row"><a href={`${base}/contests/${row.contest.id}/`} title={row.contest.name}>{row.contest.shortName}</a></th>
          <td><span className="training-count">{row.completed}</span></td>
          <td><span className="training-count">{row.remaining}</span></td>
          <td><span>{formatTrainingRate(row)}</span><ProgressBar row={row} label={`${row.contest.shortName}完成率`} /></td>
        </tr>)}</tbody>
      </table></div>
      {stats.contests.length === 0 && <p className="empty-state">暂无比赛</p>}
      <nav className="pagination training-pagination" aria-label="训练比赛分页">
        <span aria-live="polite">{stats.contests.length ? `${start + 1}–${start + visible.length}` : '0'} / {stats.contests.length} 场比赛</span>
        {pages > 1 && <div>
          <button className="icon-button" aria-label="上一页" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={17} /></button>
          {pageNumbers.map((number, index) => <span key={number}>{index > 0 && pageNumbers[index - 1] !== number - 1 && <span className="page-ellipsis" aria-hidden="true">…</span>}<button className={`page-number ${currentPage === number ? 'current' : ''}`} aria-label={`第 ${number} 页`} aria-current={currentPage === number ? 'page' : undefined} onClick={() => setPage(number)}>{number}</button></span>)}
          <button className="icon-button" aria-label="下一页" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}><ChevronRight size={17} /></button>
        </div>}
      </nav>
    </section>
  </div>;
}
