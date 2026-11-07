import type { Statement } from './schema';

// Source URLs must match exactly, including per-problem overrides.
export const statementSources: Record<string, string> = {
  'https://codeforces.com/gym/106030/attachments/download/32796/day1.pdf': 'ccpc-2024-chongqing.pdf',
  'https://codeforces.com/gym/105588/attachments/download/28814/2-statement-chinese.pdf': 'icpc-2024-kunming.pdf',
  'https://codeforces.com/gym/105484/attachments/download/28235/contest-zh.pdf': 'icpc-2024-nanjing.pdf',
  'https://codeforces.com/gym/105578/attachments/download/28638/2024-shenyang-statement-zh.pdf': 'icpc-2024-shenyang.pdf',
};

export function problemPdfPath(id: string, statement?: Statement) {
  if (statement?.format !== 'pdf' || !statementSources[statement.url]) return undefined;
  if (!statement.page || !statement.endPage || statement.endPage < statement.page) {
    throw new Error(`单题 PDF 缺少有效页码范围：${id}`);
  }
  return `statements/${id}.pdf`;
}
