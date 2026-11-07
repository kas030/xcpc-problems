import { z } from 'zod';

export const medalNames = ['bronze', 'silver', 'gold'] as const;
export type Medal = typeof medalNames[number];
export type MedalBasis = 'verified-counts' | 'source-counts' | 'preset';
export const difficultyNames = [...medalNames, 'challenge'] as const;
export type Difficulty = typeof difficultyNames[number];
export const difficultyLabels: Record<Difficulty, string> = {
  bronze: '铜牌题', silver: '银牌题', gold: '金牌题', challenge: '挑战题',
};

const publicUrl = z.url({ protocol: /^https$/ });
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const statementSchema = z.object({
  url: publicUrl,
  language: z.enum(['zh', 'en']),
  format: z.enum(['pdf', 'html']),
  page: z.number().int().positive().optional(),
  endPage: z.number().int().positive().optional(),
  provenance: z.enum(['official', 'translation']).default('official'),
}).refine(s => s.endPage === undefined || (s.page !== undefined && s.endPage >= s.page), {
  message: '结束页码必须不小于起始页码', path: ['endPage'],
});
export const medalCountsSchema = z.object({
  gold: z.number().int().nonnegative(), silver: z.number().int().nonnegative(), bronze: z.number().int().nonnegative(),
});
export const contestDefinitionSchema = z.object({
  id: slug,
  name: z.string().min(1),
  shortName: z.string().min(1).max(28),
  year: z.number().int().min(1970).max(2100),
  series: z.enum(['ICPC', 'CCPC']),
  kind: z.enum(['regional', 'final', 'invitational', 'provincial', 'online']),
  sourcePath: z.string().regex(/^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+$/),
  qojContestId: z.number().int().positive(),
  mappingSource: publicUrl,
  finalVerified: z.boolean(),
  finalEvidence: publicUrl,
  eligibleGroup: z.string().default('official'),
  medalPolicy: z.discriminatedUnion('kind', [
    z.object({ kind: z.literal('source-counts') }),
    z.object({ kind: z.literal('verified-counts'), counts: medalCountsSchema, source: publicUrl }),
  ]).default({ kind: 'source-counts' }),
  statement: statementSchema.optional(),
  problems: z.array(z.object({
    label: z.string().regex(/^[A-Z][0-9]?$/),
    title: z.string().min(1),
    qojId: z.number().int().positive(),
    interactive: z.boolean().default(false),
    statement: statementSchema.optional(),
  })).min(1),
});
export type ContestDefinition = z.infer<typeof contestDefinitionSchema>;
export type Statement = z.infer<typeof statementSchema>;

export interface BoardConfig {
  contest_name: string | Record<string, string>;
  start_time: number;
  end_time: number;
  penalty: number;
  problem_quantity?: number;
  problems: { id: string; label: string }[];
  medal?: string | Record<string, { gold?: number; silver?: number; bronze?: number }>;
  options?: {
    submission_timestamp_unit?: 'second' | 'millisecond';
    calculation_of_penalty?: 'in_minutes' | 'in_seconds' | 'accumulate_in_seconds_and_finally_to_the_minute';
  };
}
export interface BoardTeam { team_id: string; group: string[] }
export interface BoardRun { submission_id: string; team_id: string; problem_id: string; timestamp: number; status: string }
export interface Snapshot {
  schemaVersion: 1;
  revision: string;
  syncedAt: string;
  hashes: Record<string, string>;
  config: BoardConfig;
  teams: BoardTeam[];
  runs: BoardRun[];
}
export interface CohortStat { solved: number; total: number; rate: number | null }
export interface Problem {
  id: string;
  contestId: string;
  contestShortName: string;
  year: number;
  series: 'ICPC' | 'CCPC';
  label: string;
  title: string;
  qojId: number;
  interactive: boolean;
  difficulty: Difficulty;
  reason: string;
  solved: number;
  participants: number;
  cohorts: Record<Medal, CohortStat>;
  statement?: Statement;
  markdown?: { status: 'official' | 'draft' | 'reviewed'; language: 'zh' | 'en'; source: string };
}
export interface Contest {
  id: string;
  name: string;
  shortName: string;
  year: number;
  series: 'ICPC' | 'CCPC';
  kind: ContestDefinition['kind'];
  date: string;
  boardUrl: string;
  qojUrl: string;
  sourceUrl: string;
  sourceRevision: string;
  syncedAt: string;
  participants: number;
  problemCount: number;
  classificationNote: string;
  medalBasis: MedalBasis;
  medalCounts: Record<Medal, number>;
  medalSource?: string;
  statement?: Statement;
}
export interface Catalog {
  schemaVersion: 2;
  algorithmVersion: string;
  threshold: number;
  updatedAt: string;
  contests: Contest[];
  problems: Problem[];
}
