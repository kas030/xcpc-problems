import { readFile } from 'node:fs/promises';
import { at, fetchText, writeJson } from './io';
import { extractQojCandidates } from './qoj-candidates';

// Extract candidates for review. Never infer a contest mapping from consecutive IDs.
const args = process.argv.slice(2);
const value = (name: string) => args.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const source = value('url');
if (!source) throw new Error('用法：npm run import:qoj -- --url=https://qoj.ac/contest/1828 [--html=.cache/qoj.html]');
const url = new URL(source);
if (url.protocol !== 'https:' || url.hostname !== 'qoj.ac') throw new Error('来源必须是 https://qoj.ac/ 页面');
const html = value('html') ? await readFile(at(value('html')!), 'utf8') : await fetchText(url.href);
const candidates = extractQojCandidates(html, url);
if (!candidates.length) throw new Error('页面中没有可识别的题目链接。请在浏览器打开 QOJ，保存 HTML 后使用 --html；不要绕过访问限制。');
const output = at('.cache/qoj-candidates.json');
await writeJson(output, { source: url.href, reviewed: false, problems: candidates });
console.log(`已提取 ${candidates.length} 个候选项到 ${output}。请核对题号、题名和样例后写入比赛定义。`);
