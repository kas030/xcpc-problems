import { readFile } from 'node:fs/promises';
import { load } from 'cheerio';
import { at, fetchText, writeJson } from './io';

// Extract candidates for review. Never infer a contest mapping from consecutive IDs.
const args = process.argv.slice(2);
const value = (name: string) => args.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const source = value('url');
if (!source) throw new Error('用法：npm run import:qoj -- --url=https://qoj.ac/contest/1828 [--html=.cache/qoj.html]');
const url = new URL(source);
if (url.protocol !== 'https:' || url.hostname !== 'qoj.ac') throw new Error('来源必须是 https://qoj.ac/ 页面');
const html = value('html') ? await readFile(at(value('html')!), 'utf8') : await fetchText(url.href);
const $ = load(html);
const candidates = new Map<number, { qojId: number; title: string; label?: string }>();
$('a[href]').each((_, link) => {
  const href = $(link).attr('href')!;
  const match = new URL(href, url).pathname.match(/^\/problem\/(\d+)\/?$/);
  if (!match) return;
  const title = $(link).text().replace(/\s+/g, ' ').trim();
  if (!title || /^\d+$/.test(title)) return;
  const firstCell = $(link).closest('tr').find('td').first().text().trim();
  const label = /^[A-Z][0-9]?$/.test(firstCell) ? firstCell : undefined;
  candidates.set(Number(match[1]), { qojId: Number(match[1]), title, ...(label ? { label } : {}) });
});
if (!candidates.size) throw new Error('页面中没有可识别的题目链接。请在浏览器打开 QOJ，保存 HTML 后使用 --html；不要绕过访问限制。');
const output = at('.cache/qoj-candidates.json');
await writeJson(output, { source: url.href, reviewed: false, problems: [...candidates.values()] });
console.log(`已提取 ${candidates.size} 个候选项到 ${output}。请核对题号、题名和样例后写入比赛定义。`);
