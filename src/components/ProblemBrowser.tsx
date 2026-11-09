import { useEffect, useMemo, useState } from 'react';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, ArrowUpRight, Check, CheckCircle2, ChevronLeft, ChevronRight, Circle, FileText, Filter, MessagesSquare, Search, Share2, Trophy, X } from 'lucide-react';
import type { Catalog, Difficulty } from '../lib/schema';
import { difficultyLabels, difficultyNames } from '../lib/schema';
import { emptyFilters, filterProblems, hasChinese, type Filters } from '../lib/filters';
import { parseBrowserState, readBrowserState, saveBrowserState, serializeBrowserState } from '../lib/browser-state';
import Select from './Select';
import { readSolvedProgress, SOLVED_STORAGE_KEY as STORAGE_KEY } from '../lib/progress';

const PER_PAGE = 20;
export default function ProblemBrowser({ catalog, base }: { catalog: Catalog; base: string }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState('');
  const known = useMemo(() => new Set(catalog.problems.map(p => p.id)), [catalog]);
  useEffect(() => {
    const saved = readBrowserState(location.search);
    setFilters(saved.filters);
    setPage(saved.page);
    const restore = () => {
      const state = parseBrowserState(location.search);
      setFilters(state.filters);
      setPage(state.page);
    };
    setSolved(new Set([...readSolvedProgress()].filter(id => known.has(id))));
    setReady(true);
    window.addEventListener('popstate', restore);
    return () => { window.removeEventListener('popstate', restore); };
  }, [known]);
  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(''), 3000); return () => clearTimeout(timer); } }, [toast]);
  const update = (patch: Partial<Filters>) => { setFilters(f => ({ ...f, ...patch })); setPage(1); };
  const toggleLevel = (level: Difficulty) => update({ difficulties: filters.difficulties.includes(level) ? filters.difficulties.filter(d => d !== level) : [...filters.difficulties, level] });
  const toggleContest = (id: string) => update({ contests: filters.contests.includes(id) ? filters.contests.filter(c => c !== id) : [...filters.contests, id] });
  const clear = () => { setFilters(emptyFilters()); setPage(1); };
  const toggleSolved = (id: string) => {
    const next = new Set(solved);
    next.has(id) ? next.delete(id) : next.add(id);
    setSolved(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch { setToast('当前浏览器无法保存进度，本次标记仍然有效'); }
  };
  const filtered = useMemo(() => filterProblems(catalog.problems, filters, solved, catalog.contests), [catalog, filters, solved]);
  const sortDirectionLabel = filters.order === 'asc' ? '当前升序，切换为降序' : '当前降序，切换为升序';
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pages);
  useEffect(() => {
    if (!ready) return;
    if (page !== currentPage) setPage(currentPage);
    const query = serializeBrowserState(filters, currentPage);
    history.replaceState(history.state, '', `${location.pathname}?${query}${location.hash}`);
    saveBrowserState(query);
  }, [filters, page, currentPage, ready]);
  const visible = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const activeCount = filters.difficulties.length + filters.contests.length + Number(!!filters.year) + Number(filters.progress !== 'all');
  const levelCounts = Object.fromEntries(difficultyNames.map(d => [d, catalog.problems.filter(p => p.difficulty === d).length]));
  const contestById = new Map(catalog.contests.map(c => [c.id, c]));
  const years = [...new Set(catalog.contests.map(c => c.year))].sort((a, b) => b - a);
  const share = async () => {
    try { await navigator.clipboard.writeText(location.href); setToast('筛选链接已复制'); } catch { setToast('请复制浏览器地址栏中的链接'); }
  };
  return <>
    <h1 className="sr-only">XCPC 训练题单</h1>
    <div className="browser-grid">
      <aside id="problem-filters" className={`filters-panel ${sidebarOpen ? 'mobile-open' : ''}`} aria-label="题目筛选">
        <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="收起筛选"><X size={18}/></button>
        <fieldset className="filter-section"><legend>目标难度</legend><div className="level-options">{difficultyNames.map(d => <button key={d} className={`level-option ${filters.difficulties.includes(d) ? 'selected' : ''}`} aria-pressed={filters.difficulties.includes(d)} onClick={() => toggleLevel(d)}><span><span className={`level-dot ${d}`} />{difficultyLabels[d]}</span><span className="filter-count">{levelCounts[d]}</span></button>)}</div></fieldset>
        <fieldset className="filter-section"><legend>所属比赛</legend><div className="contest-options">{catalog.contests.map(c => <label key={c.id} className="checkbox-label"><input type="checkbox" checked={filters.contests.includes(c.id)} onChange={() => toggleContest(c.id)} /><span>{c.shortName}</span><span className="filter-count">{c.problemCount}</span></label>)}</div></fieldset>
        <div className="filter-section"><label className="filter-label" htmlFor="year">比赛年份</label><Select id="year" label="比赛年份" value={filters.year} onChange={year => update({ year })} options={[{ value: '', label: '全部年份' }, ...years.map(year => ({ value: String(year), label: `${year} 年` }))]} /></div>
        <div className="filter-section"><label className="filter-label" htmlFor="progress">训练进度</label><Select<Filters['progress']> id="progress" label="训练进度" value={filters.progress} onChange={progress => update({ progress })} options={[{ value: 'all', label: '全部题目' }, { value: 'todo', label: '未完成' }, { value: 'done', label: '已完成' }]} /></div>
      </aside>
      <section className="results-panel" aria-label="题目列表">
        <div className="search-toolbar"><div className="search-box"><Search size={18}/><input type="search" aria-label="搜索题目" placeholder="搜索题目、比赛或 QOJ 编号…" value={filters.query} onChange={e => update({ query: e.target.value })} onKeyDown={e => { if (e.key === 'Escape') update({ query: '' }); }}/></div><button className="button mobile-filter" aria-controls="problem-filters" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)}><Filter size={16}/>筛选{activeCount ? ` ${activeCount}` : ''}</button></div>
        {(activeCount > 0 || filters.query) && <div className="active-filters"><span className="muted">已筛选</span>{filters.difficulties.map(d => <button key={d} className="filter-chip" onClick={() => toggleLevel(d)}>{difficultyLabels[d]}<X size={12}/></button>)}{filters.contests.map(id => <button key={id} className="filter-chip" onClick={() => toggleContest(id)}>{contestById.get(id)?.shortName ?? id}<X size={12}/></button>)}{filters.year && <button className="filter-chip" onClick={() => update({year:''})}>{filters.year}<X size={12}/></button>}{filters.progress !== 'all' && <button className="filter-chip" onClick={() => update({ progress: 'all' })}>{filters.progress === 'todo' ? '未完成' : '已完成'}<X size={12}/></button>}<button className="text-button" onClick={clear}>清除全部</button></div>}
        <div className="table-card"><div className="table-toolbar"><div className="table-title">{activeCount || filters.query ? '筛选结果' : '全部题目'}<span className="result-count" aria-live="polite">{filtered.length}</span></div><div className="table-actions">
          <button className="icon-button" aria-label="复制筛选链接" title="分享筛选" onClick={share}><Share2 size={16}/></button><span className="toolbar-divider"/>
          <button type="button" className="icon-button sort-direction" aria-label={sortDirectionLabel} title={sortDirectionLabel} onClick={() => update({ order: filters.order === 'asc' ? 'desc' : 'asc' })}>
            {filters.order === 'asc' ? <ArrowUpNarrowWide size={16} aria-hidden="true"/> : <ArrowDownWideNarrow size={16} aria-hidden="true"/>}
          </button>
          <Select<Filters['sort']> id="sort" label="题目排序" value={filters.sort} onChange={sort => update({ sort })} options={[{ value: 'recent', label: '比赛时间' }, { value: 'difficulty', label: '难度' }, { value: 'rate', label: '通过率' }]} />
        </div></div>
          <div className="table-scroll"><table className="problem-table"><thead><tr><th className="status-column"><span className="sr-only">完成状态</span></th><th>题目</th><th>难度</th><th className="contest-column">所属比赛</th><th className="rate-column">赛内通过</th><th className="links-column">链接</th></tr></thead><tbody>{visible.map(p => <tr key={p.id} className={solved.has(p.id) ? 'is-solved' : ''}><td className="status-column"><button className={`solve-button ${solved.has(p.id) ? 'solved' : ''}`} onClick={() => toggleSolved(p.id)} aria-label={`${solved.has(p.id) ? '取消完成' : '标记完成'} ${p.label}. ${p.title}`} aria-pressed={solved.has(p.id)} title={solved.has(p.id) ? '取消完成' : '标记完成'}>{solved.has(p.id) ? <CheckCircle2 size={19}/> : <Circle size={19}/>}</button></td><td><div className="problem-heading"><a className="problem-title" href={`${base}/problems/${p.id}/`} target="_blank" rel="noopener noreferrer"><span className="problem-letter">{p.label}</span><span>{p.title}</span></a><div className="problem-meta"><span className="compact-contest" data-series={p.series}>{p.contestShortName}</span>{hasChinese(p) && <span className="statement-indicator"><FileText size={11}/>中文</span>}{p.interactive && <span className="statement-indicator"><MessagesSquare size={11} aria-hidden="true"/>交互题</span>}</div></div></td><td><span className={`difficulty-badge ${p.difficulty}`} title={p.reason}>{difficultyLabels[p.difficulty]}</span></td><td className="contest-column"><span className="contest-tag" data-series={p.series} title={contestById.get(p.contestId)?.name}>{p.contestShortName}</span></td><td className="rate-column"><div className="solve-count"><strong>{p.solved}</strong><span> / {p.participants}</span></div><div className="tiny-track"><span style={{width:`${100*p.solved/Math.max(p.participants,1)}%`}}/></div></td><td className="links-column"><div className="row-links"><a href={`https://qoj.ac/problem/${p.qojId}`} target="_blank" rel="noopener noreferrer" aria-label={`在 QOJ 打开 ${p.title}`} title="去 QOJ 提交">QOJ<ArrowUpRight size={12}/></a><a href={contestById.get(p.contestId)?.boardUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.contestShortName} XCPCIO 榜单`} title="查看原始榜单"><Trophy size={14}/></a></div></td></tr>)}</tbody></table></div>
          {!filtered.length && <div className="empty-state"><Search size={30}/><h3>暂时没有符合条件的题目</h3></div>}
          <div className="pagination"><span>{filtered.length ? `${(currentPage-1)*PER_PAGE+1}–${Math.min(currentPage*PER_PAGE,filtered.length)}` : '0'} / {filtered.length} 道题</span><div><button className="icon-button" aria-label="上一页" disabled={currentPage===1} onClick={()=>setPage(currentPage-1)}><ChevronLeft size={17}/></button>{Array.from({length:pages},(_,i)=>i+1).filter(i=>i===1||i===pages||Math.abs(i-currentPage)<=1).map((i,index,arr)=><span key={i}>{index>0&&arr[index-1]!==i-1&&<span className="page-ellipsis">…</span>}<button className={`page-number ${currentPage===i?'current':''}`} aria-label={`第 ${i} 页`} aria-current={currentPage===i?'page':undefined} onClick={()=>setPage(i)}>{i}</button></span>)}<button className="icon-button" aria-label="下一页" disabled={currentPage===pages} onClick={()=>setPage(currentPage+1)}><ChevronRight size={17}/></button></div></div>
        </div>
      </section>
    </div>
    <div className={`toast ${toast?'visible':''}`} role="status"><Check size={16}/>{toast}</div>
  </>;
}
