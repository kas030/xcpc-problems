# 维护与新增比赛

## 常规更新

在 Node.js 24 环境执行 `npm ci`、`npm run sync`，随后运行 `npm test`、`npm run check`、`npm run build`。查看 `git diff -- data`，重点检查奖牌人数、题目难度变化、快照上游版本和新增发现项，再提交 PR。

也可以运行 `gh workflow run update-data.yml`。定时任务只负责确定性的抓取与计算，不调用付费翻译 API。无变化时保留快照时间和版本，避免无意义提交。

同步在同一个上游 commit 下读取 config/team/run，验证格式、题号和状态后写入最小化快照。网络或解析失败会终止任务。旧网站继续使用已部署的静态数据。

## 新增比赛

1. 从 `data/discovered.json` 选择比赛，打开 XCPCIO 榜单，确认是正式赛而非热身赛，并确认最终榜已解封。
2. 在 QOJ 找到对应比赛。逐题核对题号、标题、题面或样例，不能仅凭连续的题目 ID 或相似标题推测。
3. 复制 `data/contests/` 中相近的定义，修改 `id`、标称年份、完整名称、短标签、`sourcePath`、QOJ 比赛和题目 ID。文件名必须等于 `<id>.json`，ID 发布后保持稳定。
4. 填写最终榜证据 `finalEvidence` 和题目映射来源 `mappingSource`。只有已核对解封后的最终榜才设置 `finalVerified: true`。
5. 确认参与评奖的队伍分组，通常是 `official`。明确的上游奖牌数量用 `source-counts`；核对官方名单后的实际人数用 `verified-counts` 并附来源；只有比例预设时用 `unverified`，写明原因。金银铜人数均为各档人数，不能填累计名次。
6. 优先填写官方中文题面链接。`page` 是 PDF 的实际页序号，从 1 开始，包含封面；每题可以覆盖比赛级的题册信息。
7. 运行 `npm run sync -- --contest=<id>`。打开本地题单、题目详情和比赛页，核对三组通过率、题目数量和链接，再执行常规检查。

比赛标签：`YY-体系-站点[-附加标识]`，例如 `24-ICPC-南京`、`25-CCPC-总决赛`、`25-ICPC-西安-邀`、`25-ICPC-网1`。同年同站重名时加入赛事类型；完整名称在比赛页展示。

QOJ 候选提取命令：

```sh
npm run import:qoj -- --url=https://qoj.ac/contest/1828
```

若站点限制脚本访问，可在浏览器查看并保存 HTML，然后执行：

```sh
npm run import:qoj -- --url=https://qoj.ac/contest/1828 --html=.cache/qoj.html
```

输出为 `.cache/qoj-candidates.json`，只供核对，不会直接改写比赛定义。无法解析或不能确认时手动填写映射。

## 中文 Markdown 与翻译

优先顺序：官方中文 Markdown/HTML → 官方中文 PDF → 可用的英文 HTML → 英文 PDF。Codeforces Gym 的 HTML 页面通常便于提取结构，但不能假定所有比赛都具有对应页面；先核对它和 QOJ 的题目是否一致。

有官方中文题册时无需再翻译英文。第一版引用外部 PDF，不自动批量转载或翻译。外部站点可能限制嵌入，详情页提供“打开题册”入口。

确认可转载或翻译后，在 `src/content/statements/<contest-id>/<label>.md` 建立文件：

```yaml
---
problemId: icpc-2024-nanjing/E
language: zh
status: draft
source: https://qoj.ac/problem/9568
sourceHash: 可选，原始题面内容的 SHA-256
---
```

正文按“题目描述、输入格式、输出格式、数据范围、样例、说明”组织。数学使用 `$...$` 和 `$$...$$`；样例保留代码块、空行和大小写，图片使用已确认许可的资源。不要添加题解或算法提示。

校对重点：量词与否定、上下界与开闭区间、下标范围、精度误差、整数溢出范围、交互协议、时间和空间限制、样例对应关系。对照原文逐项核对后才设 `status: reviewed`，可增加 `reviewedAt`；官方原文设 `official`。`draft` 会在网站显示醒目的待校对提示。

运行 `npm run catalog` 更新元信息，再检查详情页中的公式、表格、图片、样例和手机布局。原始题册链接始终保留。未加入 Markdown 时自动显示 PDF 阅读入口。

## 数据异常处理

- 未裁定提交、奖牌边界并列或样本不足：保持待定，先找官方结果核对，不调整阈值迎合预期。
- 未知提交状态、时间单位或罚时规则：同步失败，查上游变更并补充有意义的统计测试。
- 新的队伍类别：先确认是否参与所选分组评奖，再修改 `eligibleGroup` 或资格逻辑。
- 同一提交重判：以同一 submission ID 的最后一次记录为准。
- 上游更新后分级变化：PR 中说明上游版本与原因；不要手改 `data/catalog.json`。

## GitHub 配置

- Pages 构建源设为 `workflow`，Deployment 使用 `github-pages` environment。
- `main` 推送与普通 PR 运行测试、类型检查和静态构建。
- 数据工作流使用最小范围的 `contents: write` 与 `pull-requests: write`，只提交 `data/`。
- `GITHUB_TOKEN` 创建的 PR 不会触发新的 PR workflow，所以更新任务在创建 PR 前已完成所有检查；合并到 main 时再次验证。
- 不需要仓库密钥或模型 API key。不要将登录 Cookie、QOJ 凭据或浏览器保存的整页 HTML 提交到仓库。
