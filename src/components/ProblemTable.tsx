import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Circle, FileText, MessagesSquare, Trophy } from 'lucide-react';
import { hasChinese } from '../lib/filters';
import { difficultyLabels, type Contest, type Problem } from '../lib/schema';
import { progressSaveError, useSolvedProgress } from '../lib/use-solved-progress';
import { problemHref } from '../lib/urls';

interface ProblemTableProps {
  problems: Problem[];
  caption?: string;
  contests?: ReadonlyMap<string, Contest>;
  solved: ReadonlySet<string>;
  onToggleSolved: (id: string) => void;
}

export function ProblemTable({ problems, caption, contests, solved, onToggleSolved }: ProblemTableProps) {
  return <div className="table-scroll"><table className="problem-table">
    {caption && <caption className="sr-only">{caption}</caption>}
    <thead><tr>
      <th scope="col" className="status-column"><span className="sr-only">完成状态</span></th>
      <th scope="col">题目</th>
      <th scope="col">难度</th>
      {contests && <th scope="col" className="contest-column">所属比赛</th>}
      <th scope="col" className="rate-column">赛内通过</th>
      <th scope="col" className="links-column">链接</th>
    </tr></thead>
    <tbody>{problems.map(p => {
      const completed = solved.has(p.id);
      const action = completed ? '取消完成' : '标记完成';
      const contest = contests?.get(p.contestId);
      const chinese = hasChinese(p);
      return <tr key={p.id} className={completed ? 'is-solved' : undefined}>
        <td className="status-column">
          <button type="button" className={`solve-button${completed ? ' solved' : ''}`} onClick={() => onToggleSolved(p.id)} aria-label={`${action} ${p.label}. ${p.title}`} aria-pressed={completed} title={action}>
            {completed ? <CheckCircle2 size={19} aria-hidden="true"/> : <Circle size={19} aria-hidden="true"/>}
          </button>
        </td>
        <td><div className="problem-heading">
          <a className="problem-title" href={problemHref(p.id)} target="_blank" rel="noopener noreferrer"><span className="problem-letter">{p.label}</span><span>{p.title}</span></a>
          {(contests || chinese || p.interactive) && <div className="problem-meta">
            {contests && <span className="compact-contest" data-series={p.series}>{p.contestShortName}</span>}
            {chinese && <span className="statement-indicator"><FileText size={11} aria-hidden="true"/>中文</span>}
            {p.interactive && <span className="statement-indicator"><MessagesSquare size={11} aria-hidden="true"/>交互题</span>}
          </div>}
        </div></td>
        <td><span className={`difficulty-badge ${p.difficulty}`} title={p.reason}>{difficultyLabels[p.difficulty]}</span></td>
        {contests && <td className="contest-column"><span className="contest-tag" data-series={p.series} title={contest?.name}>{p.contestShortName}</span></td>}
        <td className="rate-column">
          <div className="solve-count"><strong>{p.solved}</strong><span> / {p.participants}</span></div>
          <div className="tiny-track"><span style={{ width: `${100 * p.solved / Math.max(p.participants, 1)}%` }}/></div>
        </td>
        <td className="links-column"><div className="row-links">
          <a href={`https://qoj.ac/problem/${p.qojId}`} target="_blank" rel="noopener noreferrer" aria-label={`在 QOJ 打开 ${p.title}`} title="去 QOJ 提交">QOJ<ArrowUpRight size={12} aria-hidden="true"/></a>
          {contest && <a href={contest.boardUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.contestShortName} XCPCIO 榜单`} title="查看原始榜单"><Trophy size={14} aria-hidden="true"/></a>}
        </div></td>
      </tr>;
    })}</tbody>
  </table></div>;
}

export function ContestProblemTable({ problems, caption }: Pick<ProblemTableProps, 'problems' | 'caption'>) {
  const { solved, toggleSolved } = useSolvedProgress();
  const [saveFailed, setSaveFailed] = useState(false);
  return <>
    <ProblemTable problems={problems} caption={caption} solved={solved} onToggleSolved={id => setSaveFailed(!toggleSolved(id))}/>
    {saveFailed && <p className="notice" role="status">{progressSaveError}</p>}
  </>;
}
