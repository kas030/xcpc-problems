import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';
import { splitStatement } from '../src/lib/split-statement';
import { problemPdfPath, statementSources } from '../src/lib/statement-sources';
import { statementSchema, contestDefinitionSchema } from '../src/lib/schema';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parse as parseYaml } from 'yaml';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { load } from 'cheerio';

test('display equations do not swallow the following statement paragraphs or samples', async () => {
  const markdown = await readFile('src/content/statements/icpc-2026-shenyang-invitational/B.md', 'utf8');
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const renderer = await createMarkdownProcessor({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex], syntaxHighlight: false });
  const dom = load((await renderer.render(body)).code);
  assert.equal(dom('.katex-error').length, 0);
  assert(dom('.katex-display').length > 0, '求和式应显示为行间公式');
  assert.equal(dom('p').filter((_, p) => dom(p).text().startsWith('由于答案可能很大，请输出')).length, 1, '取模说明必须保留为正文');
  assert.equal(dom('.katex').filter((_, node) => dom(node).text().includes('由于答案可能很大')).length, 0, '中文正文不应进入公式');
  assert.deepEqual(dom('pre').map((_, pre) => dom(pre).text().trimEnd()).get(), ['5\n1\n2\n3\n10\n100', '0\n2\n10\n7732\n776991294']);
});

test('display equations preserve nested operation lists and their inline formulas', async () => {
  const markdown = await readFile('src/content/statements/icpc-2025-hongkong/L.md', 'utf8');
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const renderer = await createMarkdownProcessor({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex], syntaxHighlight: false });
  const dom = load((await renderer.render(body)).code);
  assert.equal(dom('ol > li').length, 5, '五种操作必须留在同一有序列表中');
  assert.equal(dom('ol > li:last-child > ul > li').length, 2, '第五种操作的两个分支必须保留');
  assert.equal(dom('ol .katex-display').length, 6);
  assert.equal(dom('.katex-error').length, 0);
  assert.equal(dom('pre').filter((_, node) => /如果|替换/.test(dom(node).text())).length, 0, '操作说明不应成为缩进代码块');
  const formulae = dom('ol > li:last-child > ul annotation').map((_, node) => dom(node).text()).get();
  assert(formulae.includes('y = x'));
  assert(formulae.includes('y = -x'));
});

test('Boolean expression syntax and the truth table survive Markdown conversion', async () => {
  const markdown = await readFile('src/content/statements/icpc-2024-ecfinal/F.md', 'utf8');
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const renderer = await createMarkdownProcessor({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex], syntaxHighlight: false });
  const dom = load((await renderer.render(body)).code);
  const table = dom('table').first();
  assert.equal(table.find('th').length, 4, '逻辑或符号不能拆成额外表格列');
  assert.equal(table.find('th').last().find('annotation').text(), 'x_1\\mid x_2');
  assert.deepEqual(table.find('tbody tr').map((_, row) => dom(row).find('td').map((_, cell) => dom(cell).text()).get().join('')).get(), ['0000', '0101', '1001', '1111']);
  const syntax = dom('li code').map((_, node) => dom(node).text()).get();
  assert(syntax.includes('(<expr>&<expr>)'));
  assert(syntax.includes('(<expr>|<expr>)'));
  assert.equal(dom('.katex-error').length, 0);
});

test('single-problem PDFs preserve the selected pages in order, including the final page', async () => {
  const source = await PDFDocument.create();
  for (const width of [100, 200, 300, 400]) source.addPage([width, 500]);
  const bytes = await source.save();
  const middle = await PDFDocument.load(await splitStatement(bytes, 2, 3));
  assert.deepEqual(middle.getPages().map(p => p.getWidth()), [200, 300]);
  const last = await PDFDocument.load(await splitStatement(bytes, 4, 4));
  assert.deepEqual(last.getPages().map(p => p.getWidth()), [400]);
  for (const [start, end] of [[0, 1], [3, 2], [1, 5], [1.5, 2]]) {
    await assert.rejects(splitStatement(bytes, start, end), /页码范围无效/);
  }
});

test('known booklets require explicit ranges; unknown source overrides never use a different booklet', () => {
  const statement = statementSchema.parse({
    url: 'https://codeforces.com/gym/105588/attachments/download/28814/2-statement-chinese.pdf',
    language: 'zh', format: 'pdf', page: 3, endPage: 5,
  });
  assert.equal(problemPdfPath('icpc-2024-kunming/A', statement), 'statements/icpc-2024-kunming/A.pdf');
  assert.throws(() => problemPdfPath('icpc-2024-kunming/A', { ...statement, endPage: undefined }), /页码范围/);
  assert.equal(problemPdfPath('icpc-2024-kunming/A', { ...statement, url: 'https://example.com/override.pdf' }), undefined);
  assert.equal(problemPdfPath('icpc-2024-kunming/A'), undefined);
  assert.equal(statementSchema.safeParse({ ...statement, endPage: 2 }).success, false);
  assert.equal(statementSchema.safeParse({ ...statement, page: undefined }).success, false);
});

test('archived booklets have valid, non-overlapping problem ranges in the matching source', async () => {
  const definitions = await Promise.all((await readdir('data/contests')).filter(f => f.endsWith('.json')).map(async file =>
    contestDefinitionSchema.parse(JSON.parse(await readFile(`data/contests/${file}`, 'utf8')))));
  assert.equal(new Set(Object.values(statementSources)).size, Object.keys(statementSources).length, '题册映射重复');
  for (const [url, file] of Object.entries(statementSources)) {
    const bytes = await readFile(`src/assets/statements/${file}`);
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', file);
    const pdf = await PDFDocument.load(bytes);
    const matches = definitions.flatMap(c => c.problems.map(p => ({ id: `${c.id}/${p.label}`, statement: p.statement ?? c.statement })))
      .filter(p => p.statement?.url === url);
    assert(matches.length > 0, `题册未关联题目：${file}`);
    const used = new Set<number>();
    for (const { id, statement } of matches) {
      assert(problemPdfPath(id, statement), id);
      assert(statement!.endPage! <= pdf.getPageCount(), `页码超出题册：${id}`);
      for (let page = statement!.page!; page <= statement!.endPage!; page++) {
        assert(!used.has(page), `题面范围重叠：${id}，第 ${page} 页`);
        used.add(page);
      }
    }
  }
});

test('Chinese statements retain their source and distinguish QOJ copies from reviewed translations', async () => {
  const catalog = JSON.parse(await readFile('data/catalog.json', 'utf8'));
  const languageAudit = JSON.parse(await readFile('data/statement-languages.json', 'utf8'));
  const files = await readdir('src/content/statements', { recursive: true });
  const hashes = new Map<string, string>();
  for (const file of files.filter(f => f.endsWith('.md'))) {
    const content = await readFile(`src/content/statements/${file}`, 'utf8');
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert(frontmatter, file);
    const meta = parseYaml(frontmatter[1]);
    if (meta.status === 'qoj') {
      const record = languageAudit.problems[meta.problemId];
      assert.equal(record?.status, 'chinese', `QOJ 中文版未核实：${file}`);
      assert.equal(meta.source, record.source, file);
      assert.equal(meta.sourceHash, record.sourceHash, `QOJ 正文版本不一致：${file}`);
      assert.equal(meta.language, 'zh', file);
      assert.doesNotMatch(content, /QOJMATH\d+TOKEN|QOJSAMPLE\d+TOKEN|<!--\s*FIGURE:/, file);
      if (meta.format === 'pdf') {
        const bytes = await readFile(`src/assets/qoj-statements/${record.qojId}/statement-zh.pdf`);
        assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', file);
        assert.equal(createHash('sha256').update(bytes).digest('hex'), meta.sourceHash, file);
        assert.equal(record.format, 'pdf', file);
      }
      continue;
    }
    if (meta.status !== 'reviewed') continue;
    const problem = catalog.problems.find((p: { id: string }) => p.id === meta.problemId);
    assert(problem, file);
    assert.equal(meta.language, 'zh', file);
    assert.equal(problem.statement?.language, 'en', `不翻译官方中文题面：${file}`);
    assert.equal(problem.statement?.provenance, 'official', file);
    assert.equal(languageAudit.problems[meta.problemId]?.qojId, problem.qojId, `未核对 QOJ 中文版本：${file}`);
    assert.equal(languageAudit.problems[meta.problemId]?.status, 'english-only', `尚未确认 QOJ 没有中文：${file}`);
    assert.equal(meta.source, problem.statement.url, file);
    assert.match(meta.reviewedAt, /^\d{4}-\d{2}-\d{2}$/, file);
    const pdfFile = statementSources[meta.source];
    if (pdfFile) {
      if (!hashes.has(pdfFile)) hashes.set(pdfFile, createHash('sha256').update(await readFile(`src/assets/statements/${pdfFile}`)).digest('hex'));
      assert.equal(meta.sourceHash, hashes.get(pdfFile), `原文发生变化，请重新核对：${file}`);
    }
    if (problem.statement.format === 'html') {
      const original = await readFile(`src/content/original-statements/${meta.problemId}.md`, 'utf8');
      const originalFrontmatter = original.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      assert(originalFrontmatter, file);
      const originalMeta = parseYaml(originalFrontmatter[1]);
      assert.equal(originalMeta.language, 'en', file);
      assert.equal(originalMeta.status, 'official', file);
      assert.equal(originalMeta.source, meta.source, file);
      assert.equal(originalMeta.sourceHash, meta.sourceHash, `英文网页原文已变化：${file}`);
      const samples = (text: string) => [...text.matchAll(/```text\r?\n([\s\S]*?)\r?\n```/g)].map(m => m[1].replace(/\r\n/g, '\n'));
      assert.deepEqual(samples(content), samples(original), `中英文样例不一致：${file}`);
    }
    const body = content.slice(frontmatter[0].length);
    assert.doesNotMatch(body, /<!--\s*FIGURE:|\[\[FIGURE|\\\(|\\\)|\\\[|\\\]/, `未完成图示或不支持的数学分隔符：${file}`);
  }
});
