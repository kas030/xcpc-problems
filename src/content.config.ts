import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const statements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/statements' }),
  schema: z.object({
    problemId: z.string(),
    language: z.enum(['zh', 'en']),
    status: z.enum(['official', 'qoj', 'draft', 'reviewed']),
    format: z.enum(['markdown', 'pdf']).default('markdown'),
    source: z.url({ protocol: /^https$/ }),
    sourceHash: z.string().optional(),
    reviewedAt: z.string().optional(),
  }),
});
const originals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/original-statements' }),
  schema: z.object({
    problemId: z.string(),
    language: z.literal('en'),
    status: z.literal('official'),
    source: z.url({ protocol: /^https$/ }),
    sourceHash: z.string().regex(/^[a-f0-9]{64}$/),
  }),
});
export const collections = { statements, originals };
