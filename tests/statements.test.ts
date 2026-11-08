import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';
import { splitStatement } from '../src/lib/split-statement';
import { problemPdfPath, statementSources } from '../src/lib/statement-sources';
import { statementSchema, contestDefinitionSchema } from '../src/lib/schema';
import { readFile, readdir } from 'node:fs/promises';

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
