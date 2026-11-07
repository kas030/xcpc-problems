import { createHash } from 'node:crypto';
import { at, definitions, fetchText, readJson, rawConfigSchema, rawRunSchema, rawTeamSchema, writeJson } from './io';
import { buildCatalog } from './build-catalog';
import type { Snapshot } from '../src/lib/schema';
import { analyzeBoard } from '../src/lib/scoring';
import { flattenIndex, isCompetition } from './board-index';

const args = process.argv.slice(2);
const only = args.find(a => a.startsWith('--contest='))?.slice('--contest='.length);
const known = await definitions();
if (only && !known.some(c => c.id === only)) throw new Error(`未知比赛：${only}`);
const index = flattenIndex(JSON.parse(await fetchText('https://board.xcpcio.com/data/index/contest_list.json')));
if (!index.length) throw new Error('比赛索引为空，停止更新');
const discovered = index.filter(c => isCompetition(c.sourcePath) && !known.some(k => k.sourcePath === c.sourcePath))
  .sort((a, b) => b.startTime - a.startTime || a.sourcePath.localeCompare(b.sourcePath));
if (!args.includes('--discover-only')) {
  const ref = JSON.parse(await fetchText('https://api.github.com/repos/xcpcio/board-data/commits/main'));
  if (!/^[a-f0-9]{40}$/.test(ref.sha)) throw new Error('上游版本无效');
  const pendingWrites: { path: string; snapshot: Snapshot }[] = [];
  for (const definition of known.filter(c => !only || c.id === only)) {
    const texts: Record<string, string> = {};
    // Fetch one contest against one immutable revision; bounded parallel reads.
    await Promise.all(['config', 'team', 'run'].map(async name => {
      texts[name] = await fetchText(`https://raw.githubusercontent.com/xcpcio/board-data/${ref.sha}/data/${definition.sourcePath}/${name}.json`);
    }));
    const hashes = Object.fromEntries(Object.entries(texts).map(([name, text]) => [name, createHash('sha256').update(text).digest('hex')]));
    const target = at('data/snapshots', `${definition.id}.json`);
    let previous: Snapshot | undefined;
    try { previous = await readJson<Snapshot>(target); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
    if (previous && Object.keys(hashes).every(key => hashes[key] === previous!.hashes[key])) {
      console.log(`${definition.shortName}：源数据未变化`); continue;
    }
    const config = rawConfigSchema.parse(JSON.parse(texts.config));
    const teams = rawTeamSchema.parse(JSON.parse(texts.team));
    const runs = rawRunSchema.parse(JSON.parse(texts.run));
    if (definition.finalVerified && config.end_time > Date.now() / 1000) throw new Error(`${definition.id} 尚未结束`);
    if (config.problems.map(p => p.label).sort().join(',') !== definition.problems.map(p => p.label).sort().join(',')) throw new Error(`${definition.id} 题目映射需要重新核对`);
    analyzeBoard(config, teams, runs, definition);
    pendingWrites.push({ path: target, snapshot: { schemaVersion: 1, revision: ref.sha, syncedAt: new Date().toISOString(), hashes, config, teams, runs } });
    console.log(`${definition.shortName}：${teams.length} 支队伍，${runs.length} 条提交`);
  }
  // Network/parse failures cannot replace a complete snapshot with partial data.
  for (const item of pendingWrites) await writeJson(item.path, item.snapshot);
  const catalog = await buildCatalog();
  console.log(`题库：${catalog.contests.length} 场 / ${catalog.problems.length} 题`);
}
await writeJson(at('data/discovered.json'), discovered);
console.log(`待整理比赛：${discovered.length} 场（不会在未核对映射时自动发布）`);
