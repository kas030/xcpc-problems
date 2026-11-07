import { z } from 'zod';

// Recent XCPCIO exports use epoch milliseconds and localized text objects.
// Snapshots keep epoch seconds; submission timestamps retain their declared unit.
export const epochSeconds = z.number().nonnegative().transform(value => value >= 100_000_000_000 ? value / 1000 : value);
export const contestNameSchema = z.union([
  z.string().min(1),
  z.object({ fallback_lang: z.string(), texts: z.record(z.string(), z.string()) }).transform(value => {
    const name = value.texts['zh-CN'] ?? value.texts[value.fallback_lang] ?? value.texts.en ?? Object.values(value.texts)[0];
    if (!name) throw new Error('比赛名称为空');
    return name;
  }),
  z.record(z.string(), z.string()).refine(value => Object.keys(value).length > 0, '比赛名称为空'),
]);

export interface IndexEntry { sourcePath: string; name: string; startTime: number; endTime: number }
export function flattenIndex(node: unknown): IndexEntry[] {
  if (!node || typeof node !== 'object') return [];
  const item = node as Record<string, unknown>;
  if (typeof item.board_link === 'string' && item.config) {
    const config = z.object({ contest_name: contestNameSchema, start_time: epochSeconds, end_time: epochSeconds }).parse(item.config);
    return [{ sourcePath: item.board_link.replace(/^\//, ''), name: typeof config.contest_name === 'string' ? config.contest_name : Object.values(config.contest_name).join(' / '), startTime: config.start_time, endTime: config.end_time }];
  }
  return Object.values(item).flatMap(flattenIndex);
}

export function isCompetition(path: string) {
  return /^(icpc|ccpc)\//.test(path) && !/warmup|practice|dress-rehearsal/.test(path);
}
