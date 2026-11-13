import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { problemPdfPath, statementSources } from '../../../lib/statement-sources';
import { splitStatement } from '../../../lib/split-statement';
import type { Catalog, Problem } from '../../../lib/schema';
import { buildCacheKey, createFileDigestReader } from '../../../lib/build-cache';

export const getStaticPaths = (async () => {
  // Track each PDF's inputs below instead of invalidating every PDF when the catalog changes.
  const catalog: Catalog = JSON.parse(await readFile(resolve('data/catalog.json'), 'utf8'));
  const digest = createFileDigestReader();
  return Promise.all(catalog.problems
    .filter(problem => problemPdfPath(problem.id, problem.statement))
    .map(async problem => ({
      params: { contest: problem.contestId, label: problem.label },
      props: { problem },
      cacheKey: buildCacheKey([
        problem.statement,
        await digest(resolve('src/assets/statements', statementSources[problem.statement!.url])),
      ]),
    })));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const problem = props.problem as Problem;
  const statement = problem.statement!;
  const source = await readFile(resolve('src/assets/statements', statementSources[statement.url]));
  const pdf = await splitStatement(source, statement.page!, statement.endPage!);
  return new Response(new Uint8Array(pdf), { headers: { 'Content-Type': 'application/pdf' } });
};
