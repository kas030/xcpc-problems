import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const statements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/statements' }),
  schema: z.object({
    problemId: z.string(),
    language: z.enum(['zh', 'en']),
    status: z.enum(['official', 'draft', 'reviewed']),
    source: z.url({ protocol: /^https$/ }),
    sourceHash: z.string().optional(),
    reviewedAt: z.string().optional(),
  }),
});
export const collections = { statements };
