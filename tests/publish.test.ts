import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { git, publishBranch } from '../scripts/publish-branch';

test('branch publication keeps history, removes obsolete assets, preserves main, and skips identical builds', async () => {
  const temporaryParent = await realpath(tmpdir());
  const fixture = await mkdtemp(join(temporaryParent, 'xcpc-publish-test-'));
  try {
    const remote = join(fixture, 'remote.git');
    const source = join(fixture, 'source');
    const output = join(fixture, 'output');
    await mkdir(source);
    await mkdir(output);
    git(fixture, ['init', '--bare', remote]);
    git(source, ['init', '-b', 'main']);
    git(source, ['config', 'user.name', 'Publication Test']);
    git(source, ['config', 'user.email', 'test@example.invalid']);
    await writeFile(join(source, 'source.txt'), 'source stays intact');
    git(source, ['add', '--all']);
    git(source, ['commit', '-m', 'Initial source']);
    git(source, ['push', remote, 'main']);
    const sourceCommit = git(source, ['rev-parse', 'HEAD']);
    await writeFile(join(output, 'index.html'), '<h1>First build</h1>');
    await writeFile(join(output, 'old.css'), 'body{}');
    const options = { directory: output, remote, cacheDirectory: join(fixture, 'cache'), sourceCommit, author: { name: 'Publication Test', email: 'test@example.invalid' } };
    await assert.rejects(publishBranch(options), /ENOENT/);
    await writeFile(join(output, '.nojekyll'), '');
    const first = await publishBranch(options);
    assert.equal(first.changed, true);
    assert.equal(git(remote, ['show', 'gh-pages:index.html']), '<h1>First build</h1>');
    assert.equal((await publishBranch(options)).changed, false);
    await rm(join(output, 'old.css'));
    await writeFile(join(output, 'index.html'), '<h1>Second build</h1>');
    const second = await publishBranch(options);
    assert.equal(second.changed, true);
    assert.equal(git(remote, ['rev-parse', 'gh-pages^']), first.commit);
    assert.equal(git(remote, ['ls-tree', '--name-only', 'gh-pages']).includes('old.css'), false);
    assert.equal(git(remote, ['rev-parse', 'main']), sourceCommit);
    assert.equal(git(source, ['branch', '--show-current']), 'main');
    assert.equal(git(source, ['status', '--porcelain']), '');
  } finally {
    const resolved = await realpath(fixture);
    if (dirname(resolved) === temporaryParent) await rm(resolved, { recursive: true, force: true });
  }
});
