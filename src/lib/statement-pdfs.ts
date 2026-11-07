import chongqing from '../assets/statements/ccpc-2024-chongqing.pdf?url';
import kunming from '../assets/statements/icpc-2024-kunming.pdf?url';
import nanjing from '../assets/statements/icpc-2024-nanjing.pdf?url';
import shenyang from '../assets/statements/icpc-2024-shenyang.pdf?url';
import { base } from './urls';

// Astro's dev asset imports omit base; iframe navigations must include it.
// Build imports already include base, so leave those URLs unchanged.
const pdfUrl = (url: string) => url.startsWith(`${base}/`) ? url : `${base}${url}`;

// Match the exact source URL so a per-problem override never uses another booklet.
// Vite emits each PDF once, with a content hash.
export const statementPdfs = new Map<string, string>([
  ['https://codeforces.com/gym/106030/attachments/download/32796/day1.pdf', pdfUrl(chongqing)],
  ['https://codeforces.com/gym/105588/attachments/download/28814/2-statement-chinese.pdf', pdfUrl(kunming)],
  ['https://codeforces.com/gym/105484/attachments/download/28235/contest-zh.pdf', pdfUrl(nanjing)],
  ['https://codeforces.com/gym/105578/attachments/download/28638/2024-shenyang-statement-zh.pdf', pdfUrl(shenyang)],
]);
