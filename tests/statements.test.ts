import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';
import { splitStatement } from '../src/lib/split-statement';
import { problemPdfPath } from '../src/lib/statement-sources';
import { statementSchema } from '../src/lib/schema';

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
