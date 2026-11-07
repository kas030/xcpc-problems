# 数据与内容来源

- **XCPCIO / board-data**：比赛索引、榜单配置和提交记录来自 <https://board.xcpcio.com/> 与 <https://github.com/xcpcio/board-data>。各场快照记录 commit SHA 和原始文件 SHA-256；网站中的来源链接定位到对应版本。上游许可见其仓库。
- **QOJ**：题名、比赛与题目映射的核对来源记录在 `data/contests/*.json` 的 `mappingSource` 中。网站提交链接指向 QOJ，不代为登录或提交代码。
- **2022–2026 新增归档**：题目编号与名称来自 QOJ 比赛页明确列出的逐题对应关系，保留 Universal Cup 别名对应的原赛事链接。新增题册仅链接到 QOJ 附件或命题方 [SUA Wiki](https://sua.ac/wiki/) 的官方发布页，不将下载用于核对的文件转载进仓库。覆盖范围与缺口见 `docs/archive-2022-2026.md`。
- **官方题册**：2024 ICPC 南京、昆明、沈阳及 CCPC 重庆的中文 PDF 来自 Codeforces Gym 附件，原始链接保存在比赛定义和 `src/lib/statement-pdfs.ts` 中。未经改写的题册副本保存在 `src/assets/statements/`，随站点发布供同域预览，每题保留原始题册链接。题面版权属于各比赛命题方，PDF 不纳入代码的 MIT 许可。
- **依赖**：Astro、React、KaTeX、Lucide 及其他 npm 依赖按各自许可证使用，确切版本见 `package-lock.json`。

新增题面转载或译文时，记录原作者、来源链接与许可依据。数据和题面纠错可通过仓库 Issues 提交。
