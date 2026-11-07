# 数据与内容来源

- **XCPCIO / board-data**：比赛索引、榜单配置和提交记录来自 <https://board.xcpcio.com/> 与 <https://github.com/xcpcio/board-data>。各场快照记录 commit SHA 和原始文件 SHA-256；网站中的来源链接定位到对应版本。上游许可见其仓库。
- **QOJ**：题名、比赛与题目映射的核对来源记录在 `data/contests/*.json` 的 `mappingSource` 中。网站提交链接指向 QOJ，不代为登录或提交代码。
- **官方题册**：首批比赛的中文 PDF 通过 Codeforces Gym 附件提供，原始链接保存在比赛定义中。题面版权属于各比赛命题方，本站引用和嵌入原始地址，未将题册纳入 MIT 许可。
- **依赖**：Astro、React、KaTeX、Lucide 及其他 npm 依赖按各自许可证使用，确切版本见 `package-lock.json`。

新增题面转载或译文时，记录原作者、来源链接与许可依据。数据和题面纠错可通过仓库 Issues 提交。
