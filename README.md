# XCPC 题单

从真实比赛榜单挑选训练题目。静态网站采用 Astro + React + TypeScript，在本地构建后推送到 `gh-pages` 分支，由 GitHub Pages 托管，无需后端或自定义 GitHub Actions 工作流。

**[在线题单](https://kas030.github.io/xcpc-problems/)** · [分级规则](https://kas030.github.io/xcpc-problems/methodology/) · [维护流程](docs/maintenance.md)

当前收录 2024 ICPC 昆明、沈阳、南京及 CCPC 重庆，共 52 题。每题提供 QOJ、XCPCIO 榜单和官方中文 PDF 入口，难度分为铜牌题、银牌题、金牌题和挑战题。

## 功能

- 按难度、比赛、年份、中文题面及完成状态组合筛选，支持题名和 QOJ 编号搜索。
- 筛选条件保存在 URL，可复制分享；完成状态保存在当前浏览器。
- 每题展示金、银、铜牌组的通过队数与通过率，保留数据来源和固定版本。
- 官方 PDF 同域预览、页码定位与原始题册入口；支持 Markdown、LaTeX 公式和译文校对状态。
- 本地命令发现新比赛、更新已收录榜单；核对后通过一条命令构建并发布。

## 难度口径

采用三个**互不重叠**的奖牌组，按铜、银、金顺序检查赛内通过率，第一组达到 50% 即作为题目标签；全部未达到则为挑战题。优先使用已配置的奖牌人数，缺少可用人数时，按有赛内通过记录的正式队伍数，以累计 10%、30%、60% 向上取整分组。页面会注明比例估算的依据。

小样本照常分类，空组跳过；分界并列队伍归入同一较高奖牌组，展示实际组内队数。未裁定提交暂不计入通过，未确认最终榜时按当前已裁定结果计算。没有正式队伍通过任何题时，所有题按挑战题收录并注明无通过记录。

只统计参与对应评奖分组的正式队伍，排除打星、场外和赛后提交。每场比赛按原始时间单位和罚时规则重建排名。这个标签用于训练，跨赛事比较时仍需结合比赛级别。完整说明见 [methodology.md](src/content/guides/methodology.md)。

## 本地运行

使用 Node.js 24 LTS（`.nvmrc` 已指定）。

```sh
npm ci
npm run dev
```

打开 <http://localhost:4321/xcpc-problems/>。

```sh
npm test            # 排名、分组、筛选等测试
npm run check       # TypeScript 与 Astro 检查
npm run build       # 校验数据并输出 dist/
npm run preview     # 预览生产构建
npm run sync        # 更新所有已收录比赛和待整理清单
npm run discover    # 只更新待整理清单
npm run catalog     # 修改比赛定义或 Markdown 后重新生成索引
npm run deploy      # 本地检查、构建、推送 gh-pages 并验证上线
```

构建只读取已提交的数据和题册，不依赖 XCPCIO、QOJ 或翻译服务在线。当前四场比赛的 PDF 随站点发布，阅读时无需访问 Codeforces；页面保留原始题册链接。

## 目录

```text
data/contests/             人工核对的比赛定义、QOJ 映射、题面来源
data/snapshots/            固定上游版本的最小化榜单快照
data/catalog.json          自动生成的网站索引
data/discovered.json       尚未整理的比赛，不会直接进入网站
src/content/statements/   可选 Markdown 题面
src/assets/statements/    官方 PDF 题册，每份只保存一次
src/lib/statement-pdfs.ts  原始题册地址与同域 PDF 资源的对应关系
src/lib/scoring.ts         排名与奖牌组分级算法
scripts/                  同步、候选映射提取、构建和校验
public/.nojekyll           让 Pages 直接发布预先构建的静态文件
```

快照只保留统计需要的队伍 ID、分组和提交信息，不保存选手姓名、学校和联系方式。

## 部署与更新

仓库 Settings → Pages → Source 选择 **Deploy from a branch**，发布源为 `gh-pages` 分支的根目录。该分支只保存构建产物与 `.nojekyll`，源码始终保存在 `main`。本仓库已停用 GitHub Actions，不再使用云端 runner 或定时工作流。

本地需安装 Git、已登录的 GitHub CLI（`gh auth login`）和 Node.js 24，并能向仓库推送。更新流程：

```sh
npm run sync
# 核对 data/ 中的变更；修改比赛定义或 Markdown 后运行 npm run catalog
git add data src
git commit -m "chore(data): update contest archive"
git push origin main
npm run deploy
```

无数据变更时跳过提交。发布要求在 `main` 分支、工作区干净且当前提交已推送；脚本自动运行测试、类型检查和构建，非强制推送发布分支，并核对线上 `build-info.json` 中的源码版本。Pages 更新通常需要等待一段时间；若验证超时，命令返回失败并保留已推送的产物。

定期更新改为维护者或 agent 执行 `npm run sync`，建议每周一次；目前没有云端定时任务。新比赛的题目映射、奖牌资格和译文仍按 [维护流程](docs/maintenance.md) 核对。上游格式变化会使校验失败，已上线版本保持可用。

GitHub 官方说明了 [`.nojekyll` 配合本地构建的直接发布方式](https://github.blog/changelog/2024-07-08-pages-legacy-worker-sunset/)。网站托管仍依赖 GitHub Pages 服务本身；如果账号限制影响 Pages 服务，也需要先解决该限制或迁移托管。

## 内容与许可

程序代码采用 [MIT](LICENSE)。榜单来自 [XCPCIO board-data](https://github.com/xcpcio/board-data)，保留上游版本和来源；题面及商标属于原作者。官方 PDF 副本用于同域阅读，不纳入代码的 MIT 许可，原始出处见比赛定义及页面链接。新增转载或翻译前应确认来源许可，记录出处。详见 [来源说明](THIRD_PARTY.md)。
