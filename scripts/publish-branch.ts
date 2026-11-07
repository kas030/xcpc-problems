import { spawnSync } from 'node:child_process';
import { cp, lstat, mkdir, mkdtemp, readdir, realpath, rm } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';

export function git(cwd: string, args: string[], input?: string) {
  const result = spawnSync('git', args, {
    cwd, input, encoding: 'utf8', timeout: 120_000,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`git ${args[0]} 失败：${result.stderr.trim()}`);
  return result.stdout.trim();
}

/** Publish a complete output tree as a normal fast-forward commit; never check out or force-push source branches. */
export async function publishBranch(options: {
  directory: string;
  remote: string;
  cacheDirectory: string;
  sourceCommit: string;
  author: { name: string; email: string };
}) {
  const directory = resolve(options.directory);
  for (const required of ['index.html', '.nojekyll']) {
    if (!(await lstat(join(directory, required))).isFile()) throw new Error(`构建缺少 ${required}`);
  }
  for (const file of await readdir(directory, { recursive: true })) {
    if (file.split(/[\\/]/).some(part => part === '.git' || part === '.github')) throw new Error('发布产物不应包含 Git 配置或工作流');
    if ((await lstat(join(directory, file))).isSymbolicLink()) throw new Error(`Pages 产物包含符号链接：${file}`);
  }
  await mkdir(options.cacheDirectory, { recursive: true });
  const cache = await realpath(options.cacheDirectory);
  const staging = await mkdtemp(join(cache, 'pages-'));
  try {
    git(staging, ['init', '-b', 'gh-pages']);
    git(staging, ['config', 'user.name', options.author.name]);
    git(staging, ['config', 'user.email', options.author.email]);
    git(staging, ['config', 'core.autocrlf', 'false']);
    git(staging, ['remote', 'add', 'origin', options.remote]);
    const existing = git(staging, ['ls-remote', '--heads', 'origin', 'refs/heads/gh-pages']);
    let parent: string | undefined;
    if (existing) {
      git(staging, ['fetch', '--depth=1', 'origin', 'refs/heads/gh-pages:refs/remotes/origin/gh-pages']);
      parent = git(staging, ['rev-parse', 'refs/remotes/origin/gh-pages']);
    }
    for (const name of await readdir(directory)) {
      await cp(join(directory, name), join(staging, name), { recursive: true });
    }
    git(staging, ['add', '--all']);
    const tree = git(staging, ['write-tree']);
    if (parent && tree === git(staging, ['rev-parse', `${parent}^{tree}`])) return { changed: false, commit: parent };
    const commit = git(staging, ['commit-tree', tree, ...(parent ? ['-p', parent] : []), '-m', `Deploy ${options.sourceCommit}`]);
    git(staging, ['update-ref', 'refs/heads/gh-pages', commit]);
    // Concurrent publishers fail safely with a non-fast-forward error.
    git(staging, ['push', 'origin', 'refs/heads/gh-pages:refs/heads/gh-pages']);
    return { changed: true, commit };
  } finally {
    // Only remove the unique staging directory created by this invocation.
    const resolved = await realpath(staging);
    const child = relative(cache, resolved);
    if (child && !child.startsWith(`..${sep}`) && child !== '..' && !isAbsolute(child) && child.startsWith('pages-')) {
      await rm(resolved, { recursive: true, force: true });
    }
  }
}
