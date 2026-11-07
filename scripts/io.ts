import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { contestDefinitionSchema } from '../src/lib/schema';
import { contestNameSchema, epochSeconds } from './board-index';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const at = (...parts: string[]) => resolve(root, ...parts);
export async function readJson<T>(path: string): Promise<T> { return JSON.parse(await readFile(path, 'utf8')); }
export async function writeJson(path: string, data: unknown) {
  const text = JSON.stringify(data, null, 2) + '\n';
  try { if (await readFile(path, 'utf8') === text) return false; } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, text, 'utf8');
  return true;
}
export async function definitions() {
  const entries = (await readdir(at('data/contests'))).filter(f => f.endsWith('.json')).sort();
  const result = [];
  for (const entry of entries) {
    const item = contestDefinitionSchema.parse(await readJson(at('data/contests', entry)));
    if (`${item.id}.json` !== entry) throw new Error(`比赛 ID 与文件名不一致：${entry}`);
    if (new Set(item.problems.map(p => p.label)).size !== item.problems.length) throw new Error(`题号重复：${entry}`);
    if (new Set(item.problems.map(p => p.qojId)).size !== item.problems.length) throw new Error(`QOJ 题号重复：${entry}`);
    result.push(item);
  }
  return result;
}
const id = z.union([z.string(), z.number()]).transform(String);
export const rawConfigSchema = z.object({
  contest_name: contestNameSchema,
  start_time: epochSeconds, end_time: epochSeconds, penalty: z.number().nonnegative().default(1200),
  problem_quantity: z.number().int().positive().optional(),
  problems: z.array(z.object({ id, label: z.string() })).min(1),
  medal: z.union([z.string(), z.record(z.string(), z.object({ gold: z.number().optional(), silver: z.number().optional(), bronze: z.number().optional() }))]).optional(),
  options: z.object({
    submission_timestamp_unit: z.enum(['second', 'millisecond']).optional(),
    calculation_of_penalty: z.enum(['in_minutes', 'in_seconds', 'accumulate_in_seconds_and_finally_to_the_minute']).optional(),
  }).optional(),
});
const flag = z.union([z.boolean(), z.literal(0), z.literal(1)]).optional();
export const rawTeamSchema = z.array(z.object({
  id: id.optional(), team_id: id.optional(),
  group: z.union([z.array(z.string()), z.string()]).optional(),
  official: flag, unofficial: flag, girl: flag,
}).refine(t => t.id !== undefined || t.team_id !== undefined, '队伍缺少 ID').transform(t => ({
  team_id: t.id ?? t.team_id!,
  group: [...new Set([...(typeof t.group === 'string' ? [t.group] : t.group ?? []), ...(['official', 'unofficial', 'girl'] as const).filter(key => t[key])])],
})));
export const rawRunSchema = z.array(z.object({
  id: id.optional(), submission_id: id.optional(), team_id: id, problem_id: id,
  timestamp: z.number(), status: z.string().min(1),
  action: z.never().optional(),
})).transform(runs => {
  const suppliedIds = new Set(runs.flatMap(r => r.id ?? r.submission_id ?? []));
  return runs.map((run, index) => {
    // Old archives contain adjudicated rows without submission IDs. Keep every
    // row (including identical attempts); never merge them by team/time/problem.
    let anonymousId = `row:${index}`;
    while (suppliedIds.has(anonymousId)) anonymousId = `_${anonymousId}`;
    return { submission_id: run.id ?? run.submission_id ?? anonymousId, team_id: run.team_id, problem_id: run.problem_id, timestamp: run.timestamp, status: run.status };
  });
});
export const snapshotSchema = z.object({
  schemaVersion: z.literal(1), revision: z.string().regex(/^[a-f0-9]{40}$/),
  syncedAt: z.iso.datetime(), hashes: z.record(z.string(), z.string()),
  config: rawConfigSchema, teams: rawTeamSchema, runs: rawRunSchema,
});
export async function fetchText(url: string) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000), headers: { 'User-Agent': 'xcpc-problems/0.1 (+https://github.com/kas030/xcpc-problems)' } });
    if (response.ok) return response.text();
    if ((response.status === 429 || response.status >= 500) && attempt < 2) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      continue;
    }
    throw new Error(`请求失败 ${response.status}：${url}`);
  }
  throw new Error(`无法获取 ${url}`);
}
