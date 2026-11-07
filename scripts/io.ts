import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { contestDefinitionSchema } from '../src/lib/schema';

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
  contest_name: z.union([z.string(), z.record(z.string(), z.string())]),
  start_time: z.number(), end_time: z.number(), penalty: z.number().nonnegative().default(1200),
  problem_quantity: z.number().int().positive().optional(),
  problems: z.array(z.object({ id, label: z.string() })).min(1),
  medal: z.union([z.string(), z.record(z.string(), z.object({ gold: z.number().optional(), silver: z.number().optional(), bronze: z.number().optional() }))]).optional(),
  options: z.object({
    submission_timestamp_unit: z.enum(['second', 'millisecond']).optional(),
    calculation_of_penalty: z.enum(['in_minutes', 'in_seconds', 'accumulate_in_seconds_and_finally_to_the_minute']).optional(),
  }).optional(),
});
export const rawTeamSchema = z.array(z.object({
  team_id: id,
  group: z.union([z.array(z.string()), z.string()]).transform(v => typeof v === 'string' ? [v] : v),
}));
export const rawRunSchema = z.array(z.object({
  submission_id: id, team_id: id, problem_id: id,
  timestamp: z.number(), status: z.string().min(1),
  action: z.never().optional(),
}));
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
