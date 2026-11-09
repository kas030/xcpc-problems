import { pathToFileURL } from 'node:url';
import { readFile, readdir } from 'node:fs/promises';
import { parse as parseYaml } from 'yaml';
import { at, definitions, readJson, snapshotSchema, writeJson } from './io';
import { analyzeBoard, ALGORITHM_VERSION, THRESHOLD } from '../src/lib/scoring';
import type { Catalog, Contest, Problem } from '../src/lib/schema';

export async function buildCatalog(write = true): Promise<Catalog> {
  const contests: Contest[] = [];
  const problems: Problem[] = [];
  const languageAudit = await readJson<{ problems: Record<string, { qojId: number; status: string; source: string }> }>(at('data/statement-languages.json'));
  const configs = await definitions();
  for (const definition of configs) {
    const snapshot = snapshotSchema.parse(await readJson(at('data/snapshots', `${definition.id}.json`)));
    const labels = snapshot.config.problems.map(p => p.label).sort();
    if (labels.join(',') !== definition.problems.map(p => p.label).sort().join(',')) throw new Error(`${definition.id} 的榜单题号和 QOJ 映射不一致`);
    if (new Set(snapshot.config.problems.map(p => p.id)).size !== labels.length) throw new Error('上游题目 ID 重复');
    const analysis = analyzeBoard(snapshot.config, snapshot.teams, snapshot.runs, definition);
    const sourceUrl = `https://github.com/xcpcio/board-data/tree/${snapshot.revision}/data/${definition.sourcePath}`;
    const contest: Contest = {
      id: definition.id, name: definition.name, shortName: definition.shortName,
      year: definition.year, series: definition.series, kind: definition.kind,
      date: new Date(snapshot.config.start_time * 1000).toISOString(),
      boardUrl: `https://board.xcpcio.com/${definition.sourcePath}/`,
      qojUrl: new URL(definition.mappingSource).origin === 'https://qoj.ac' && new URL(definition.mappingSource).pathname === `/contest/${definition.qojContestId}` ? definition.mappingSource : `https://qoj.ac/contest/${definition.qojContestId}`,
      sourceUrl, sourceRevision: snapshot.revision, syncedAt: snapshot.syncedAt,
      participants: analysis.participants, problemCount: definition.problems.length,
      classificationNote: analysis.note, medalBasis: analysis.medalBasis,
      medalCounts: analysis.counts,
      ...(analysis.medalBasis === 'preset' ? {} : { medalSource: definition.medalPolicy.kind === 'verified-counts' ? definition.medalPolicy.source : `${sourceUrl.replace('/tree/', '/blob/')}/config.json` }),
      ...(definition.statement ? { statement: definition.statement } : {}),
    };
    contests.push(contest);
    for (const p of definition.problems) {
      const stats = analysis.problems.find(item => item.label === p.label)!;
      problems.push({
        id: `${definition.id}/${p.label}`, contestId: definition.id,
        contestShortName: definition.shortName, year: definition.year, series: definition.series,
        label: p.label, title: p.title, qojId: p.qojId, interactive: p.interactive,
        difficulty: stats.difficulty, reason: stats.reason, solved: stats.solved,
        participants: analysis.participants, cohorts: stats.cohorts,
        ...((p.statement ?? definition.statement) ? { statement: p.statement ?? definition.statement } : {}),
      });
    }
  }
  // Optional Markdown statements are curated independently from generated statistics.
  let files: string[] = [];
  try { files = await readdir(at('src/content/statements'), { recursive: true }); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
  for (const file of files.filter(f => f.endsWith('.md'))) {
    const content = await readFile(at('src/content/statements', file), 'utf8');
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatter) throw new Error(`题面缺少 frontmatter：${file}`);
    const meta = parseYaml(frontmatter[1]);
    const problem = problems.find(p => p.id === meta.problemId);
    if (!problem) throw new Error(`题面关联的题目不存在：${file}`);
    if (problem.markdown) throw new Error(`题面重复：${meta.problemId}`);
    if (!['official', 'qoj', 'draft', 'reviewed'].includes(meta.status) || !['zh', 'en'].includes(meta.language) || !/^https:\/\//.test(meta.source)) throw new Error(`题面元信息无效：${file}`);
    if (meta.format !== undefined && meta.format !== 'markdown' && !(meta.format === 'pdf' && meta.status === 'qoj')) throw new Error(`题面格式无效：${file}`);
    if (meta.status !== 'official' && problem.statement?.language === 'zh' && problem.statement.provenance === 'official') throw new Error(`已有官方中文题面，无需添加译文：${meta.problemId}`);
    if (meta.status !== 'official') {
      const language = languageAudit.problems[meta.problemId];
      if (!language || language.qojId !== problem.qojId) throw new Error(`请先核对 QOJ 中文题面是否可用：${meta.problemId}`);
      if (meta.status === 'qoj') {
        if (language.status !== 'chinese' || meta.language !== 'zh' || meta.source !== language.source) throw new Error(`QOJ 中文题面来源不一致：${meta.problemId}`);
      } else if (language.status !== 'english-only') throw new Error(`请先确认 QOJ 没有中文版本，再添加自译文：${meta.problemId}`);
    }
    if (content.slice(frontmatter[0].length).trim().length < 20) throw new Error(`题面正文为空：${file}`);
    if (meta.language === 'zh' && problem.statement?.language === 'en' && problem.statement.format === 'html') {
      const original = await readFile(at('src/content/original-statements', `${problem.id}.md`), 'utf8');
      const originalFrontmatter = original.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const originalMeta = originalFrontmatter && parseYaml(originalFrontmatter[1]);
      if (!originalMeta || originalMeta.problemId !== problem.id || originalMeta.language !== 'en' || originalMeta.status !== 'official' || originalMeta.source !== problem.statement.url) throw new Error(`缺少对应的英文原文：${problem.id}`);
      if (meta.status === 'reviewed' && meta.sourceHash !== originalMeta.sourceHash) throw new Error(`英文原文已变化，请重新核对译文：${problem.id}`);
    }
    problem.markdown = { status: meta.status, language: meta.language, source: meta.source };
  }
  contests.sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
  const order = new Map(contests.map((c, i) => [c.id, i]));
  problems.sort((a, b) => order.get(a.contestId)! - order.get(b.contestId)! || a.label.localeCompare(b.label));
  const catalog: Catalog = {
    schemaVersion: 2, algorithmVersion: ALGORITHM_VERSION, threshold: THRESHOLD,
    updatedAt: contests.map(c => c.syncedAt).sort().at(-1) ?? '1970-01-01T00:00:00.000Z',
    contests, problems,
  };
  if (write) await writeJson(at('data/catalog.json'), catalog);
  return catalog;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const catalog = await buildCatalog();
  console.log(`已生成 ${catalog.contests.length} 场比赛、${catalog.problems.length} 道题的索引。`);
}
