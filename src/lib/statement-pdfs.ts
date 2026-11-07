import { statementSources } from './statement-sources';
import { base } from './urls';

const assets = import.meta.glob<string>('../assets/statements/*.pdf', { eager: true, query: '?url', import: 'default' });

// Astro's dev asset imports omit base; iframe navigations must include it.
// Build imports already include base, so leave those URLs unchanged.
const pdfUrl = (url: string) => url.startsWith(`${base}/`) ? url : `${base}${url}`;

// Match the exact source URL so a per-problem override never uses another booklet.
// Vite emits each PDF once, with a content hash.
export const statementPdfs = new Map(Object.entries(statementSources).map(([source, file]) => {
  const asset = assets[`../assets/statements/${file}`];
  if (!asset) throw new Error(`本地题册缺失：${file}`);
  return [source, pdfUrl(asset)];
}));
