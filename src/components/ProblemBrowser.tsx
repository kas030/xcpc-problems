import { Fragment, useEffect, useMemo, useState } from 'react';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Check, ChevronLeft, ChevronRight, Ellipsis, Filter, Search, Share2, X } from 'lucide-react';
import type { Catalog, Difficulty } from '../lib/schema';
import { difficultyLabels, difficultyNames } from '../lib/schema';
import { emptyFilters, filterProblems, type Filters } from '../lib/filters';
import { parseBrowserState, readBrowserState, saveBrowserState, serializeBrowserState } from '../lib/browser-state';
import Select from './Select';
import { ProblemTable } from './ProblemTable';
import { progressSaveError, useSolvedProgress } from '../lib/use-solved-progress';

const PER_PAGE = 20;
export default function ProblemBrowser({ catalog }: { catalog: Catalog }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const { solved, toggleSolved } = useSolvedProgress();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState('');
  useEffect(() => {
    const saved = readBrowserState(location.search);
    setFilters(saved.filters);
    setPage(saved.page);
    const restore = () => {
      const state = parseBrowserState(location.search);
      setFilters(state.filters);
      setPage(state.page);
    };
    setReady(true);
    window.addEventListener('popstate', restore);
    return () => { window.removeEventListener('popstate', restore); };
  }, []);
  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(''), 3000); return () => clearTimeout(timer); } }, [toast]);
  const update = (patch: Partial<Filters>) => { setFilters(f => ({ ...f, ...patch })); setPage(1); };
  const toggleLevel = (level: Difficulty) => update({ difficulties: filters.difficulties.includes(level) ? filters.difficulties.filter(d => d !== level) : [...filters.difficulties, level] });
  const toggleContest = (id: string) => update({ contests: filters.contests.includes(id) ? filters.contests.filter(c => c !== id) : [...filters.contests, id] });
  const clear = () => { setFilters(emptyFilters()); setPage(1); };
  const filtered = useMemo(() => filterProblems(catalog.problems, filters, solved, catalog.contests), [catalog, filters, solved]);
  const sortDirectionLabel = filters.order === 'asc' ? '当前升序，切换为降序' : '当前降序，切换为升序';
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pages);
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1)
    .filter(number => number === 1 || number === pages || Math.abs(number - currentPage) <= 1);
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
          <ProblemTable problems={visible} contests={contestById} solved={solved} onToggleSolved={id => { if (!toggleSolved(id)) setToast(progressSaveError); }}/>
          {!filtered.length && <div className="empty-state"><Search size={30}/><h3>暂时没有符合条件的题目</h3></div>}
          <div className="pagination">
            <span>{filtered.length ? `${(currentPage - 1) * PER_PAGE + 1}–${Math.min(currentPage * PER_PAGE, filtered.length)}` : '0'} / {filtered.length} 道题</span>
            <div>
              <button className="icon-button" aria-label="上一页" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={17}/></button>
              {pageNumbers.map((number, index) => <Fragment key={number}>
                {index > 0 && pageNumbers[index - 1] !== number - 1 && <span className="page-ellipsis" aria-hidden="true"><Ellipsis size={16}/></span>}
                <button className={`page-number${currentPage === number ? ' current' : ''}`} aria-label={`第 ${number} 页`} aria-current={currentPage === number ? 'page' : undefined} onClick={() => setPage(number)}>{number}</button>
              </Fragment>)}
              <button className="icon-button" aria-label="下一页" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}><ChevronRight size={17}/></button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div className={`toast ${toast?'visible':''}`} role="status"><Check size={16}/>{toast}</div>
  </>;
}
