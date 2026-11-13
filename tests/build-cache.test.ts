import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildCacheKey, createFileDigestReader } from '../src/lib/build-cache';

test('PDF keys track bytes and page ranges, including same-size replacements', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'xcpc-build-cache-'));
  try {
    const file = join(directory, 'booklet.pdf');
    await writeFile(file, 'first');
    const first = await createFileDigestReader()(file);
    const key = buildCacheKey([{ page: 1, endPage: 2 }, first]);
    assert.equal(key, buildCacheKey([{ page: 1, endPage: 2 }, await createFileDigestReader()(file)]));
    assert.notEqual(key, buildCacheKey([{ page: 1, endPage: 3 }, first]));
    await writeFile(file, 'other');
    const next = await createFileDigestReader()(file);
    assert.notEqual(first, next);
    assert.notEqual(key, buildCacheKey([{ page: 1, endPage: 2 }, next]));
    await assert.rejects(createFileDigestReader()(join(directory, 'missing.pdf')), { code: 'ENOENT' });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('statement body, metadata, removal, and original text affect page keys', () => {
  const entry = { body: 'statement', data: { status: 'qoj' } };
  const key = buildCacheKey([entry, undefined]);
  assert.notEqual(key, buildCacheKey([{ ...entry, body: 'corrected' }, undefined]));
  assert.notEqual(key, buildCacheKey([{ ...entry, data: { status: 'reviewed' } }, undefined]));
  assert.notEqual(key, buildCacheKey([undefined, undefined]));
  assert.notEqual(key, buildCacheKey([entry, { body: 'original' }]));
});
