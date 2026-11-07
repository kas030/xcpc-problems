import { pathToFileURL } from 'node:url';
import { readFile, readdir } from 'node:fs/promises';
import { parse as parseYaml } from 'yaml';
import { at, definitions, readJson, snapshotSchema, writeJson } from './io';
import { analyzeBoard, ALGORITHM_VERSION, THRESHOLD } from '../src/lib/scoring';
import type { Catalog, Contest, Problem } from '../src/lib/schema';

export async function buildCatalog(write = true): Promise<Catalog> {
  const contests: Contest[] = [];
  const problems: Problem[] = [];
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
    if (!['official', 'draft', 'reviewed'].includes(meta.status) || !['zh', 'en'].includes(meta.language) || !/^https:\/\//.test(meta.source)) throw new Error(`题面元信息无效：${file}`);
    if (content.slice(frontmatter[0].length).trim().length < 20) throw new Error(`题面正文为空：${file}`);
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
