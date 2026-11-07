# 项目指引

XCPC 训练题单，使用 Astro + React + TypeScript，开发环境为 Node.js 24 和 npm。网站由 GitHub Pages 托管，采用本地构建、分支发布。

## 代码入口

- `src/pages/`、`src/components/`、`src/styles/`：页面、交互和样式。
- `src/lib/scoring.ts`：按互不重叠的奖牌组统计赛内通过率，以 50% 为分级阈值。
- `data/contests/`：比赛定义与 QOJ 映射；`data/snapshots/`、`data/catalog.json` 由脚本生成。
- `src/content/statements/`：Markdown 题面；完整维护流程见 `docs/maintenance.md`。

## 常用命令

- 开发：`npm ci`、`npm run dev`。
- 更新数据：`npm run sync`；修改比赛定义或 Markdown 后运行 `npm run catalog`。
- 验证：`npm test`、`npm run check`、`npm run build`，按改动选择相关检查；纯文档修改无需构建。
- 发布：提交并推送 `main` 后运行 `npm run deploy`，脚本完成检查、构建、推送 `gh-pages` 和上线验证，不依赖 GitHub Actions。

## 维护要点

- 题目 ID 为 `比赛ID/题号`，用于浏览器本地进度；更新已有题目时保持 ID 稳定，确需变更时迁移记录。
- 新比赛核对 QOJ 映射、最终榜和奖牌分组；缺少奖牌人数时，按有赛内通过记录的正式队伍数，以累计 10%、30%、60% 向上取整分组，难度仅分铜、银、金、挑战四档。
- 沿用现有结构和界面风格，具体需求优先，避免为小改动增加复杂流程。
