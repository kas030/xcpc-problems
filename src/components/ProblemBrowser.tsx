import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownWideNarrow, ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronLeft, ChevronRight, Circle, FileText, Filter, RotateCcw, Search, Share2, Shuffle, SlidersHorizontal, Trophy, X } from 'lucide-react';
import type { Catalog, Difficulty } from '../lib/schema';
import { difficultyLabels, difficultyNames } from '../lib/schema';
import { emptyFilters, filterProblems, hasChinese, parseFilters, serializeFilters, type Filters } from '../lib/filters';

const STORAGE_KEY = 'xcpc-problems:solved:v1';
const PER_PAGE = 20;
export default function ProblemBrowser({ catalog, base }: { catalog: Catalog; base: string }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState('');
  const search = useRef<HTMLInputElement>(null);
  const known = useMemo(() => new Set(catalog.problems.map(p => p.id)), [catalog]);
  useEffect(() => {
    const restore = () => { setFilters(parseFilters(location.search)); setPage(1); };
    restore();
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (Array.isArray(saved)) setSolved(new Set(saved.filter(id => typeof id === 'string' && known.has(id))));
    } catch { /* Progress remains usable when storage is unavailable. */ }
    setReady(true);
    const shortcut = (event: KeyboardEvent) => {
      if (event.key === '/' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement) && !(event.target as HTMLElement)?.isContentEditable) { event.preventDefault(); search.current?.focus(); }
    };
    window.addEventListener('popstate', restore);
    window.addEventListener('keydown', shortcut);
    return () => { window.removeEventListener('popstate', restore); window.removeEventListener('keydown', shortcut); };
  }, [known]);
  useEffect(() => {
    if (!ready) return;
    const query = serializeFilters(filters);
    history.replaceState(null, '', `${location.pathname}${query ? '?' + query : ''}${location.hash}`);
  }, [filters, ready]);
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
  const filtered = useMemo(() => filterProblems(catalog.problems, filters, solved), [catalog, filters, solved]);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const activeCount = filters.difficulties.length + filters.contests.length + Number(!!filters.year) + Number(filters.chinese) + Number(filters.progress !== 'all');
  const levelCounts = Object.fromEntries(difficultyNames.map(d => [d, catalog.problems.filter(p => p.difficulty === d).length]));
  const contestById = new Map(catalog.contests.map(c => [c.id, c]));
  const years = [...new Set(catalog.contests.map(c => c.year))].sort((a, b) => b - a);
  const random = () => {
    const pool = filtered.filter(p => !solved.has(p.id));
    const choices = pool.length ? pool : filtered;
    if (choices.length) location.assign(`${base}/problems/${choices[Math.floor(Math.random() * choices.length)].id}/`);
  };
  const share = async () => {
    try { await navigator.clipboard.writeText(location.href); setToast('筛选链接已复制'); } catch { setToast('请复制浏览器地址栏中的链接'); }
  };
  return <>
    <section className="intro">
      <div><div className="eyebrow"><span className="status-dot" />XCPC TRAINING ARCHIVE</div><h1>下一题，从这里开始<span className="heading-dot">。</span></h1><p>从真实赛场找到适合你的题目，让每一次训练都有方向。</p></div>
      <div className="intro-stats"><div><strong>{catalog.problems.length}<small>道</small></strong><span>收录题目</span></div><div><strong>{catalog.contests.length}<small>场</small></strong><span>精选比赛</span></div><div className="progress-stat"><strong>{solved.size}<small>道</small></strong><span>已完成 <CheckCircle2 size={12} /></span></div></div>
    </section>
    <div className="browser-grid">
      <aside className={`filters-panel ${sidebarOpen ? 'mobile-open' : ''}`} aria-label="题目筛选">
        <div className="filter-top"><h2><SlidersHorizontal size={17} />筛选题目</h2><button className="icon-button muted" onClick={clear} aria-label="重置所有筛选" title="重置筛选"><RotateCcw size={15} /></button><button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="收起筛选"><X size={18}/></button></div>
        <fieldset className="filter-section"><legend>目标难度 <a href={`${base}/methodology/`} aria-label="查看难度计算方法" className="help-icon">?</a></legend><div className="level-options">{difficultyNames.map(d => <button key={d} className={`level-option ${filters.difficulties.includes(d) ? 'selected' : ''}`} aria-pressed={filters.difficulties.includes(d)} onClick={() => toggleLevel(d)}><span><span className={`level-dot ${d}`} />{difficultyLabels[d]}</span><span className="filter-count">{levelCounts[d]}</span></button>)}</div></fieldset>
        <fieldset className="filter-section"><legend>所属比赛 <span className="legend-hint">可多选</span></legend><div className="contest-options">{catalog.contests.map(c => <label key={c.id} className="checkbox-label"><input type="checkbox" checked={filters.contests.includes(c.id)} onChange={() => toggleContest(c.id)} /><span>{c.shortName}</span><span className="filter-count">{c.problemCount}</span></label>)}</div></fieldset>
        <div className="filter-section"><label className="filter-label" htmlFor="year">比赛年份</label><select id="year" value={filters.year} onChange={e => update({ year: e.target.value })}><option value="">全部年份</option>{years.map(y => <option key={y} value={y}>{y} 年</option>)}</select></div>
        <div className="filter-section"><label className="filter-label" htmlFor="progress">训练进度</label><select id="progress" value={filters.progress} onChange={e => update({ progress: e.target.value as Filters['progress'] })}><option value="all">全部题目</option><option value="todo">尚未完成</option><option value="done">已经完成</option></select><label className="checkbox-label language-filter"><input type="checkbox" checked={filters.chinese} onChange={e => update({ chinese: e.target.checked })}/><span>有中文题面</span><FileText size={14}/></label></div>
        <div className="sidebar-note"><Trophy size={18}/><p>难度来自真实榜单<br/><span>以各奖牌组 50% 通过率划分</span></p><a href={`${base}/methodology/`}>了解分级规则 <ArrowRight size={13}/></a></div>
      </aside>
      <section className="results-panel" aria-label="题目列表">
        <div className="search-toolbar"><div className="search-box"><Search size={19}/><input ref={search} type="search" aria-label="搜索题目" placeholder="搜索题目、比赛或 QOJ 编号…" value={filters.query} onChange={e => update({ query: e.target.value })} onKeyDown={e => { if (e.key === 'Escape') update({ query: '' }); }}/><kbd>/</kbd></div><button className="button button-primary random-button" aria-label="随机一题" onClick={random} disabled={!filtered.length}><Shuffle size={16}/><span>随机一题</span></button><button className="button mobile-filter" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)}><Filter size={16}/>筛选{activeCount ? ` ${activeCount}` : ''}</button></div>
        {(activeCount > 0 || filters.query) && <div className="active-filters"><span className="muted">已筛选</span>{filters.difficulties.map(d => <button key={d} className="filter-chip" onClick={() => toggleLevel(d)}>{difficultyLabels[d]}<X size={12}/></button>)}{filters.contests.map(id => <button key={id} className="filter-chip" onClick={() => toggleContest(id)}>{contestById.get(id)?.shortName ?? id}<X size={12}/></button>)}{filters.year && <button className="filter-chip" onClick={() => update({year:''})}>{filters.year}<X size={12}/></button>}{filters.chinese && <button className="filter-chip" onClick={() => update({chinese:false})}>中文题面<X size={12}/></button>}<button className="text-button" onClick={clear}>清除全部</button></div>}
        <div className="table-card"><div className="table-toolbar"><div className="table-title">{activeCount || filters.query ? '筛选结果' : '全部题目'}<span className="result-count" aria-live="polite">{filtered.length}</span></div><div className="table-actions"><button className="icon-button" aria-label="复制筛选链接" title="分享筛选" onClick={share}><Share2 size={16}/></button><span className="toolbar-divider"/><ArrowDownWideNarrow size={15}/><select aria-label="题目排序" value={filters.sort} onChange={e => update({sort:e.target.value as Filters['sort']})}><option value="recent">最近比赛</option><option value="difficulty">难度从低到高</option><option value="rate">通过率从低到高</option></select></div></div>
          <div className="table-scroll"><table className="problem-table"><thead><tr><th className="status-column"><span className="sr-only">完成状态</span></th><th>题目</th><th>难度</th><th className="contest-column">所属比赛</th><th className="rate-column">赛内通过</th><th className="links-column">链接</th></tr></thead><tbody>{visible.map(p => <tr key={p.id} className={solved.has(p.id) ? 'is-solved' : ''}><td className="status-column"><button className={`solve-button ${solved.has(p.id) ? 'solved' : ''}`} onClick={() => toggleSolved(p.id)} aria-label={`${solved.has(p.id) ? '取消完成' : '标记完成'} ${p.label}. ${p.title}`} aria-pressed={solved.has(p.id)} title="完成状态仅保存在当前浏览器">{solved.has(p.id) ? <CheckCircle2 size={19}/> : <Circle size={19}/>}</button></td><td><a className="problem-title" href={`${base}/problems/${p.id}/`}><span className="problem-letter">{p.label}</span><span>{p.title}</span></a><div className="problem-subline"><a className="compact-contest" href={`${base}/contests/${p.contestId}/`}>{p.contestShortName}</a><span className="mono">QOJ #{p.qojId}</span>{hasChinese(p) && <span className="statement-indicator"><FileText size={11}/>中文</span>}{p.interactive && <span>交互题</span>}</div></td><td><a href={`${base}/problems/${p.id}/#difficulty`} className={`difficulty-badge ${p.difficulty}`} title={p.reason}><span className="badge-dot"/>{difficultyLabels[p.difficulty]}</a></td><td className="contest-column"><button className="contest-tag" title={contestById.get(p.contestId)?.name} onClick={() => update({ contests: [p.contestId] })}>{p.contestShortName}</button></td><td className="rate-column"><div className="solve-count"><strong>{p.solved}</strong><span> / {p.participants}</span></div><div className="tiny-track"><span style={{width:`${100*p.solved/Math.max(p.participants,1)}%`}}/></div></td><td className="links-column"><div className="row-links"><a href={`https://qoj.ac/problem/${p.qojId}`} target="_blank" rel="noopener noreferrer" aria-label={`在 QOJ 打开 ${p.title}`} title="去 QOJ 提交">QOJ<ArrowUpRight size={12}/></a><a href={contestById.get(p.contestId)?.boardUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.contestShortName} XCPCIO 榜单`} title="查看原始榜单"><Trophy size={14}/></a></div></td></tr>)}</tbody></table></div>
          {!filtered.length && <div className="empty-state"><Search size={30}/><h3>暂时没有符合条件的题目</h3><p>试试减少一个筛选条件，或换个关键词。</p><button className="button" onClick={clear}>重置筛选</button></div>}
          <div className="pagination"><span>{filtered.length ? `${(currentPage-1)*PER_PAGE+1}–${Math.min(currentPage*PER_PAGE,filtered.length)}` : '0'} / {filtered.length} 道题</span><div><button className="icon-button" aria-label="上一页" disabled={currentPage===1} onClick={()=>setPage(currentPage-1)}><ChevronLeft size={17}/></button>{Array.from({length:pages},(_,i)=>i+1).filter(i=>i===1||i===pages||Math.abs(i-currentPage)<=1).map((i,index,arr)=><span key={i}>{index>0&&arr[index-1]!==i-1&&<span className="page-ellipsis">…</span>}<button className={`page-number ${currentPage===i?'current':''}`} aria-label={`第 ${i} 页`} aria-current={currentPage===i?'page':undefined} onClick={()=>setPage(i)}>{i}</button></span>)}<button className="icon-button" aria-label="下一页" disabled={currentPage===pages} onClick={()=>setPage(currentPage+1)}><ChevronRight size={17}/></button></div></div>
        </div>
        <div className="results-footnote"><span><span className="status-dot"/>数据更新于 {catalog.updatedAt.slice(0,10)}</span><span>完成状态仅保存在当前浏览器</span></div>
      </section>
    </div>
    <div className={`toast ${toast?'visible':''}`} role="status"><Check size={16}/>{toast}</div>
  </>;
}
