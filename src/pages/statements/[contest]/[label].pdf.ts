import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { catalog } from '../../../lib/catalog';
import { problemPdfPath, statementSources } from '../../../lib/statement-sources';
import { splitStatement } from '../../../lib/split-statement';
import type { Problem } from '../../../lib/schema';

export const getStaticPaths = (() => catalog.problems
  .filter(problem => problemPdfPath(problem.id, problem.statement))
  .map(problem => ({ params: { contest: problem.contestId, label: problem.label }, props: { problem } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const problem = props.problem as Problem;
  const statement = problem.statement!;
  const source = await readFile(resolve('src/assets/statements', statementSources[statement.url]));
  const pdf = await splitStatement(source, statement.page!, statement.endPage!);
  return new Response(new Uint8Array(pdf), { headers: { 'Content-Type': 'application/pdf' } });
};
