# XCPC 题单

从真实比赛榜单挑选训练题目。静态网站采用 Astro + React + TypeScript，通过 GitHub Actions 发布到 GitHub Pages，无需后端。

**[在线题单](https://kas030.github.io/xcpc-problems/)** · [分级规则](https://kas030.github.io/xcpc-problems/methodology/) · [维护流程](docs/maintenance.md)

当前收录 2024 ICPC 昆明、沈阳、南京及 CCPC 重庆，共 52 题。每题提供 QOJ、XCPCIO 榜单和官方中文 PDF 入口。重庆站仅配置了通用奖牌预设，13 题保持“待定”，等待实际奖牌边界核对。

## 功能

- 按难度、比赛、年份、中文题面及完成状态组合筛选，支持题名和 QOJ 编号搜索。
- 筛选条件保存在 URL，可复制分享；完成状态保存在当前浏览器。
- 每题展示金、银、铜牌组的通过队数与通过率，保留数据来源和固定版本。
- 官方 PDF 阅读入口；支持 Markdown、LaTeX 公式和译文校对状态。
- 每周自动发现新比赛、更新已收录榜单并提交数据 PR；合并后自动部署。

## 难度口径

采用三个**互不重叠**的奖牌组，按铜、银、金顺序检查赛内通过率，第一组达到 50% 即作为题目标签；全部未达到则为挑战题。任一奖牌组少于 5 队、最终榜未确认、只有奖牌比例预设、未裁定提交或奖牌边界并列时，保留待定。

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
```

构建只读取已提交的数据，不依赖 XCPCIO、QOJ 或翻译服务在线；阅读外部 PDF 仍需要访问原始网站。

## 目录

```text
data/contests/             人工核对的比赛定义、QOJ 映射、题面来源
data/snapshots/            固定上游版本的最小化榜单快照
data/catalog.json          自动生成的网站索引
data/discovered.json       尚未整理的比赛，不会直接进入网站
src/content/statements/   可选 Markdown 题面
src/lib/scoring.ts         排名与奖牌组分级算法
scripts/                  同步、候选映射提取、构建和校验
.github/workflows/        检查、数据 PR 和 Pages Deployment
```

快照只保留统计需要的队伍 ID、分组和提交信息，不保存选手姓名、学校和联系方式。

## 部署与更新

仓库 Settings → Pages → Source 选择 **GitHub Actions**。推送到 `main` 后，`Check and deploy Pages` 执行测试、类型检查、构建和 Deployment。默认地址为 `https://<owner>.github.io/<repo>/`。

`Update contest data` 每周一北京时间约 06:17 运行，也可在 Actions 中手动运行。需允许 GitHub Actions 创建 PR；有变更时更新 `data/weekly-update` 分支，无变更时不产生提交。新比赛的题目映射、奖牌资格和译文由维护者或 agent 按 [维护流程](docs/maintenance.md) 核对。

GitHub 可能在公开仓库长期无活动时暂停定时工作流；定期检查 Actions 状态。上游格式变化会使校验失败，已上线版本保持可用。

## 内容与许可

程序代码采用 [MIT](LICENSE)。榜单来自 [XCPCIO board-data](https://github.com/xcpcio/board-data)，保留上游版本和来源；题面及商标属于原作者。仓库不把第三方题面纳入代码许可，目前仅引用官方公开题册。新增转载或翻译前应确认来源许可，记录出处。详见 [来源说明](THIRD_PARTY.md)。
