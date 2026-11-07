import { spawnSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { at, root } from './io';
import { git, publishBranch } from './publish-branch';

function gh(args: string[], input?: object) {
  const result = spawnSync('gh', args, {
    cwd: root, encoding: 'utf8', timeout: 60_000,
    input: input ? JSON.stringify(input) : undefined,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`GitHub 请求失败：${result.stderr.trim()}`);
  return result.stdout.trim();
}

const sourceCommit = git(root, ['rev-parse', 'HEAD']);
function assertSourceReady() {
  if (git(root, ['branch', '--show-current']) !== 'main') throw new Error('请从 main 分支发布');
  if (git(root, ['status', '--porcelain'])) throw new Error('请先提交源码和数据，再运行 npm run deploy');
  if (git(root, ['rev-parse', 'HEAD']) !== sourceCommit) throw new Error('构建期间源码发生变化，请重新发布');
  const remoteCommit = git(root, ['ls-remote', 'origin', 'refs/heads/main']).split(/\s/)[0];
  if (remoteCommit !== sourceCommit) throw new Error('请先 git push origin main，使发布内容对应已推送的提交');
}
assertSourceReady();
const repository = JSON.parse(gh(['repo', 'view', '--json', 'nameWithOwner'])).nameWithOwner as string;
if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('无法识别 GitHub 仓库');
const [owner, name] = repository.split('/');
const site = `https://${owner.toLowerCase()}.github.io`;
const base = name.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${name}`;
const url = `${site}${base === '/' ? '/' : `${base}/`}`;
const npm = process.env.npm_execpath;
if (!npm) throw new Error('请通过 npm run deploy 执行，以使用当前 Node.js 环境');

for (const command of ['test', 'check', 'build']) {
  const result = spawnSync(process.execPath, [npm, 'run', command], {
    cwd: root, stdio: 'inherit',
    env: { ...process.env, SITE_URL: site, BASE_PATH: base, ASTRO_TELEMETRY_DISABLED: '1' },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} 未通过，未发布`);
}
assertSourceReady();
await writeFile(at('dist/build-info.json'), JSON.stringify({ sourceCommit }, null, 2) + '\n');
const result = await publishBranch({
  directory: at('dist'), cacheDirectory: at('.cache'),
  remote: git(root, ['remote', 'get-url', 'origin']), sourceCommit,
  author: { name: git(root, ['config', 'user.name']), email: git(root, ['config', 'user.email']) },
});
console.log(result.changed ? `已推送 gh-pages：${result.commit}` : '产物未变化，无需创建发布提交');

const pages = JSON.parse(gh(['api', `repos/${repository}/pages`]));
if (pages.build_type !== 'legacy' || pages.source?.branch !== 'gh-pages' || pages.source?.path !== '/') {
  gh(['api', '--method', 'PUT', `repos/${repository}/pages`, '--input', '-'], {
    build_type: 'legacy', source: { branch: 'gh-pages', path: '/' },
  });
  console.log('Pages 已切换为 gh-pages 分支发布');
}

console.log(`等待 Pages 更新：${url}`);
const deadline = Date.now() + 180_000;
let nextNotice = Date.now() + 30_000;
while (Date.now() < deadline) {
  try {
    const response = await fetch(`${url}build-info.json?revision=${sourceCommit}`, { signal: AbortSignal.timeout(10_000), cache: 'no-store' });
    if (response.ok && (await response.json()).sourceCommit === sourceCommit) {
      console.log(`发布成功：${url}\n线上版本：${sourceCommit}`);
      process.exit(0);
    }
  } catch { /* CDN propagation can temporarily return errors. */ }
  if (Date.now() >= nextNotice) {
    console.log('仍在等待 Pages 服务同步…');
    nextNotice = Date.now() + 30_000;
  }
  await new Promise(resolve => setTimeout(resolve, 5000));
}
console.error(`产物已推送，但尚未确认上线。请检查 ${url}build-info.json 和仓库 Pages 状态；不要将推送成功视为上线成功。`);
process.exitCode = 1;
