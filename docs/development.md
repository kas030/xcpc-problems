# 本地开发

[返回 README](../README.md) · [数据与题面维护](maintenance.md)

项目使用 Astro + React + TypeScript，在本地构建后发布至 GitHub Pages。开发环境为 Node.js 24（`.nvmrc` 已指定）和 npm。

## 启动与验证

```sh
npm ci
npm run dev
```

打开 <http://localhost:4321/xcpc-problems/>。

| 命令 | 用途 |
| --- | --- |
| `npm test` | 排名、分组、筛选等测试 |
| `npm run check` | TypeScript 与 Astro 检查 |
| `npm run build` | 校验数据并输出 `dist/` |
| `npm run preview` | 预览生产构建 |
| `npm run sync` | 更新已收录榜单和待整理清单 |
| `npm run discover` | 只更新待整理清单 |
| `npm run catalog` | 修改比赛定义或 Markdown 后重新生成索引 |
| `npm run deploy` | 检查、构建、推送 `gh-pages` 并验证上线 |

按改动选择相关检查；纯文档修改无需构建。构建读取本地数据和题册，不依赖 XCPCIO、QOJ 或翻译服务在线。

## 目录与入口

| 路径 | 内容 |
| --- | --- |
| `src/pages/`、`src/components/`、`src/styles/` | 页面、交互和样式 |
| `src/lib/scoring.ts` | 排名与奖牌组分级算法 |
| `data/contests/` | 人工核对的比赛定义、QOJ 映射、题面来源 |
| `data/snapshots/` | 固定上游版本的最小化榜单快照 |
| `data/catalog.json` | 自动生成的网站索引 |
| `data/discovered.json` | 尚未整理的比赛，不直接进入网站 |
| `src/content/statements/` | 中文 Markdown 题面与元信息 |
| `src/content/original-statements/` | 英文原文 Markdown |
| `src/assets/statements/` | 官方 PDF 题册，每份只保存一次 |
| `src/lib/statement-sources.ts` | 原始题册地址与本地文件的映射 |
| `src/lib/statement-pdfs.ts` | 完整题册资源导入 |
| `scripts/` | 同步、候选映射提取、构建、校验和发布 |
| `public/.nojekyll` | 让 Pages 直接发布预先构建的静态文件 |

快照只保留统计需要的队伍 ID、分组和提交信息，不保存选手姓名、学校和联系方式。题目 ID 用于浏览器本地进度，更新已有题目时应保持稳定。

新增比赛、题面校对、统计边界和发布配置统一见 [维护流程](maintenance.md)。收录范围见 [比赛归档](archive-2022-2026.md)，中文题面维护进度见 [翻译进度](translation-progress.md)。
