import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { readSolvedProgress, SOLVED_STORAGE_KEY } from '../lib/progress';
import { difficultyLabels, type Catalog } from '../lib/schema';
import { calculateTrainingStats, formatTrainingRate, type TrainingProgress } from '../lib/training';

function ProgressBar({ row, label }: { row: TrainingProgress; label: string }) {
  return <div className="training-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Number((row.rate * 100).toFixed(1))} aria-valuetext={`已完成 ${row.completed} / ${row.total} 道，${formatTrainingRate(row)}`}>
    <span style={{ width: `${row.rate * 100}%` }} />
  </div>;
}

export default function TrainingDashboard({ catalog, base }: { catalog: Catalog; base: string }) {
  const [solved, setSolved] = useState<Set<string> | null>(null);
  const [tooltip, setTooltip] = useState<{ id: string; x: number; y: number } | null>(null);
  const showTooltip = (id: string, x: number, y: number) => setTooltip({
    id, x: Math.max(8, Math.min(x + 12, window.innerWidth - 288)),
    y: Math.max(8, Math.min(y + 16, window.innerHeight - 100)),
  });
  useEffect(() => {
    const refresh = () => setSolved(readSolvedProgress());
    const onStorage = (event: StorageEvent) => {
      if (event.key === SOLVED_STORAGE_KEY || event.key === null) refresh();
    };
    const hideTooltip = () => setTooltip(null);
    window.addEventListener('scroll', hideTooltip, true);
    window.addEventListener('resize', hideTooltip);
    refresh();
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', refresh);
    window.addEventListener('pageshow', refresh);
    return () => {
      window.removeEventListener('scroll', hideTooltip, true);
      window.removeEventListener('resize', hideTooltip);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('pageshow', refresh);
    };
  }, []);
  const stats = useMemo(() => calculateTrainingStats(catalog, solved ?? new Set()), [catalog, solved]);
  const years = [...new Set(stats.contests.map(row => row.contest.year))].sort((a, b) => b - a);
  const active = stats.contests.find(row => row.contest.id === tooltip?.id);
  const heatLevel = (row: TrainingProgress) => row.completed === 0 ? 0 : row.rate < 0.25 ? 1 : row.rate < 0.5 ? 2 : row.rate < 1 ? 3 : 4;

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
      </div>)}</div>
    </section>

    <section className="table-card training-contests" aria-labelledby="training-contests-heading">
      <div className="table-toolbar"><h2 id="training-contests-heading" className="table-title">比赛进度</h2><span className="muted">按比赛时间倒序</span></div>
      <div className="training-heatmap">
        {years.map(year => <div className="training-heatmap-year" key={year}>
          <h3>{year}</h3>
          <div className="training-heatmap-cells" role="group" aria-label={`${year} 年比赛`}>
            {stats.contests.filter(row => row.contest.year === year).map(row => {
              const description = `${row.contest.name}：已完成 ${row.completed} / ${row.total} 道`;
              return <a key={row.contest.id} className="training-heatmap-cell" data-level={heatLevel(row)} href={`${base}/contests/${row.contest.id}/`} aria-label={description}
                onMouseEnter={event => showTooltip(row.contest.id, event.clientX, event.clientY)}
                onMouseMove={event => showTooltip(row.contest.id, event.clientX, event.clientY)}
                onMouseLeave={() => setTooltip(null)}
                onFocus={event => { const rect = event.currentTarget.getBoundingClientRect(); showTooltip(row.contest.id, rect.left, rect.bottom); }}
                onBlur={() => setTooltip(null)}
                onKeyDown={event => { if (event.key === 'Escape') setTooltip(null); }} />;
            })}
          </div>
        </div>)}
        {stats.contests.length === 0 && <p className="muted">暂无比赛</p>}
        <div className="training-heatmap-footer">
          <p className="training-heatmap-summary">共 {stats.contests.length} 场 · 已开始 {stats.startedContests} 场 · 已完成 {stats.completedContests} 场</p>
          <div className="training-heatmap-legend" aria-label="完成率图例：未开始、低于 25%、25% 至不足 50%、50% 至不足 100%、全部完成">
            <span>未开始</span>{[0, 1, 2, 3, 4].map(level => <span key={level} className="training-heatmap-cell" data-level={level} aria-hidden="true" />)}<span>全部完成</span>
          </div>
        </div>
      </div>
    </section>
    {tooltip && active && createPortal(<div className="training-heatmap-tooltip" role="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
      <strong>{active.contest.name}</strong>
      <span>已完成 {active.completed} / {active.total} 道</span>
    </div>, document.body)}
  </div>;
}
