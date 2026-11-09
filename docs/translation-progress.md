# 中文题面收录与翻译进度

记录日期：2026-11-09（Asia/Shanghai）。本轮按用户“把无题面的补全”的要求，已补入最后 66 道站内无题面的题目，验证已完成，用户已确认 PDF 预览正常。其余已有英文题目的中文收录不在本轮范围内。

本记录根据仓库索引、语言记录、Markdown 和本地 PDF 核对生成。站内题面已全部覆盖，中文题面仍未全量覆盖。发布通过 `npm run deploy` 核对线上 `build-info.json` 与源码提交是否一致。

## 范围和计数

| 项目 | 数量 |
| --- | ---: |
| 全站题目 / 比赛 | 920 / 72 |
| 站内题面覆盖 / 缺失 | 920 / 0 |
| 有中文题面 | 674 |
| 原有官方中文，维持原样 | 259 |
| 需要核对中文来源的候选题目 | 661 |
| 候选中已收录中文版本 | 415 |
| QOJ 中文 Markdown | 392 |
| QOJ 中文 PDF | 8 |
| 已校对的本站译文 | 15 |
| 待补中文题目（均已有英文 PDF） | 246 |
| 候选题已全部完成中文收录的比赛 | 31 |
| 中文部分完成的比赛 | 2 |

待补中文的 246 道仍须先核对 QOJ 中文来源，不能全部视为需要自译。原有 259 道官方中文不在下方候选清单中。

## 本轮无题面补全

| 比赛 | 本轮补齐 | 中文 | 仅英文 |
| --- | ---: | ---: | ---: |
| 2026 CCPC 网络预选赛 | 11 | 9 | 2（H、K） |
| 2026 ICPC 沈阳邀请赛 | 5 | 5 | 0 |
| 2026 CCPC 南昌邀请赛 | 13 | 13 | 0 |
| 2026 CCPC 秦皇岛邀请赛 | 13 | 13 | 0 |
| 2026 ICPC 南昌邀请赛 | 13 | 0 | 13 |
| 2023 ICPC 西安邀请赛 | 11 | 11 | 0 |
| 合计 | 66 | 51 | 15 |

- 新增 44 份 QOJ 中文 Markdown、7 份 QOJ 中文 PDF、16 份官方英文单题 PDF；英文 PDF 中 15 份补空缺，另 1 份为西安邀请赛 H 提供原文与图示来源。
- 西安邀请赛 H 的 QOJ 中文页有四处 IMAGE_PLACEHOLDER。已从对应英文原题第 2–3 页提取四张图，按原顺序恢复，补图依据保存在语言核对记录中。保留 QOJ AI 翻译声明，未改标为本站校对译文。
- 南昌邀请赛 E／秦皇岛邀请赛 F 的原文明确说明是交互题，补上 interactive 标记。全部题目 ID、QOJ 映射、通过率和难度保持不变。
- 本轮通过浏览器读取公开题面；直接 HTTP 请求遇到 Cloudflare 403 验证，浏览器可正常读取。未调用模型 API、未重新翻译原题。
- 工作缓存位于 .cache/missing-statements/，不作为网站运行依赖。

## 本轮验证

- 用户已确认 PDF 实际预览正常。按后续要求移除本轮 51 份中文题面的题末来源、转换和版权说明，保留元数据中的来源与补图依据，并同步更新导入脚本和维护规则。

- 392 份 QOJ Markdown 的渲染后全文、公式及样例比对通过；比较时归一化排版引号、破折号和空白。
- 363 份带 rawArticle 的浏览器缓存与规范化正文比对通过；另有 12 份旧缓存不含 rawArticle，不计为本项验证通过。
- npm test：40 项通过。npm run check：0 错误、0 警告、0 提示。
- npm run build：成功，共 1002 页，日志 .cache/missing-statements/build.log。
- 构建后的全部 920 个题目页都有阅读卡片和正文或 PDF；868 个 PDF 预览引用、137 个图片引用均指向存在的本地文件，所有题目页均无 KaTeX 错误。覆盖报告：.cache/missing-statements/site-coverage.json。
- 与 HEAD 索引比对，题目 ID、QOJ 映射、统计字段及原有 259 道官方中文均未改变。
- 新增 PDF 已渲染检查页码、跨页样例和图示。西安 H 的四张补图已在生产预览中全部加载，中文／英文切换正常。
- 2023 CCPC 网络赛 E 原有公式中的中文引号仍会产生 KaTeX Unicode 严格模式警告，不影响渲染；未擅自改写原文。

## 已确定的处理规则

1. 原来有官方中文题面的题目保持原样；题目 ID 保持稳定。
2. 用户后续要求优先提供 QOJ 现有的简体或繁体中文版本。HTML 转为 Markdown，PDF 保留原文件；状态标为 qoj，不标为本站已校对译文。
3. QOJ 自带 AI 翻译声明时保留声明。即使已核验转换完整性，也不能声称整份 QOJ 译文经过人工校对。
4. 只有确认 QOJ 也无中文后，才自行翻译并对照原文核验，完成后标为 reviewed；模型初稿不得直接入库。
5. 有官方英文来源时，支持中文与官方英文切换。现有中文默认显示；QOJ 原始题面本身为中文且没有已核实英文来源时，不虚构英文切换项。
6. 限流、空页、PDF 尚未检查等情况不能判为“只有英文”。保存公开题面及来源，不保存登录凭据。

## 已实现功能及内容位置

- 详情页提供“QOJ 中文 / 官方英文”或“中文翻译 / 官方英文”切换，保留原题册入口。支持英文 PDF、英文 HTML 和 QOJ 中文 PDF。
- 中文 Markdown：src/content/statements/；英文 HTML 原文：src/content/original-statements/。
- 题面图片和中文 PDF：src/assets/qoj-statements/；英文 HTML 图片：src/assets/original-statements/；自译图示：src/assets/translations/。
- QOJ 语言核对结果、来源哈希、AI 声明与排版修复依据：data/statement-languages.json。顶层 checkedAt 是早期日期，浏览器抓取时间以逐题 capturedAt 等字段为准。
- 已校对译文为 icpc-2026-xian 的 A–M，以及 ccpc-2026-online-qualification 的 B、N，共 15 题，均已核对 QOJ 未提供中文语言选项。
- QOJ 中文 PDF 共 8 份：ccpc-2022-final/J，以及 ccpc-2026-online-qualification 的 E、F、G、I、J、L、M。单题英文 PDF 在此前 27 份基础上新增 16 份，共 43 份。
- 索引生成与测试检查语言来源、哈希、官方中文排除、英文 HTML 关联和样例完整性。完整维护规则见 [maintenance.md](maintenance.md)。

## 先前中文收录断点（2026-11-09 上午）

本轮补空缺之前，最近完成的是 icpc-2024-hangzhou/B–F（QOJ 9727–9731），因此杭州站当前完成 A–F。

若继续补其余中文，原断点是 [icpc-2024-hangzhou/G，QOJ 9732](https://qoj.ac/problem/9732)，之后依次为 H–M（9733–9738）。杭州完成后，原计划继续 2024 成都站 A–M（9535–9547），再处理其他已有英文 PDF 的比赛；本轮后已无缺少站内题面的比赛。

2026-11-09 10:06 左右访问恢复，约每 40–60 秒抓取一题，成功获取上述 5 题；约 10:10 在 G 题重新遇到 Too many requests。约 10:15 冷却五分钟后重试仍未取得正文。此前也出现过十分钟冷却未恢复的情况。以上是历史观测，不是对当前 QOJ 可用性的实时判断。

尚未通过响应头确认实际状态码、Retry-After、配额或限流计数维度；不能声称已找到安全频率或保证某个等待时间能恢复。后续应先检查响应头，再决定等待策略。提议过每 2–3 分钟一题，但尚未验证有效。不要启动多路抓取或反复刷新错误页。

暂停时所有已抓取、符合收录条件的中文题面均已导入，没有可直接离线发布的剩余中文缓存。

## 恢复工作所需的本地资料

.cache/ 被 Git 忽略，以下资料仅在本机存在，不是仓库交付依赖。新环境需要重新准备这些辅助工具；已收录题面和网站构建不依赖它们。

| 路径 | 用途 |
| --- | --- |
| .cache/translation-remaining.json | 待处理题目详细数据；恢复时从当前 catalog 和 Markdown 重新计算 |
| .cache/qoj-browser/ | 浏览器取得的公开题面、实际语言链接、图片与 PDF 信息 |
| .cache/qoj-chinese/、.cache/qoj-imports/ | 规范化来源 HTML 与转换结果 |
| .cache/qoj-browser-bridge.py | 本地 127.0.0.1:5118 接收器，只接收公开题面 |
| .cache/import-browser-captures.mjs | 导入浏览器 HTML，按 QOJ ID 处理全部对应比赛题目 |
| .cache/import-qoj-chinese.mjs | 保护公式、样例、图片并转换 Markdown |
| .cache/import-browser-chinese-pdfs.py | 导入中文 PDF，逐个处理同一 QOJ ID 的所有候选题目 |
| .cache/register-browser-pdf.py | 注册已核实英文单题 PDF；仍使用首个匹配项，遇跨比赛重复题时需先调整 |
| .cache/verify-browser-captures.mjs | 核对原始 DOM 与规范化正文 |
| .cache/verify-qoj-conversion.mjs、.cache/verify-qoj-text.mjs | 核对公式、样例与渲染后的全文 |
| .cache/validate-statement-math.mjs、.cache/repair-qoj-format.mjs | 数学渲染检查及有据可查的源页排版修复 |
| .cache/translations/、.cache/translation-reviews/、.cache/translation-authored/ | 模型草稿、辅助核验及先前撰写内容；不是可直接发布的成品 |
| .cache/translation-progress.md | 早期过程记录；含已过时状态，恢复时以本记录和实际文件为准 |

浏览器调试最后使用 Edge。临时标签页和会话句柄可能已失效，恢复时先检查实际浏览器及本地端口，不沿用旧 tab ID/PID，也不要重复启动仍在运行的服务。抓取函数和标签页句柄仅在对应会话内有效，需按当前浏览器重新绑定。脚本已兼容 zh、zh_cn、zh_tw、zh-cn、zh-tw。

重复 QOJ ID 在 2026 南昌/秦皇岛邀请赛及 2022/2023 World Finals 中存在。获取一次正文后应按题目 ID 分别落盘，各自保留对应官方英文题册和页码，不能只处理第一个匹配项。

恢复前还须读取当前 AGENTS.md，保留其他任务新增的分级、界面及统计改动，不用旧 catalog 整体覆盖当前数据。模型凭据不写入仓库、进度文档或日志；需要模型辅助时由运行环境提供。

## 恢复顺序

1. 等用户明确要求恢复；核对当前分支、工作区和本记录的数量是否仍适用。
2. 检查 QOJ 访问状态及限流信息，确认页面真正加载；不把错误页记为无中文。
3. 从杭州 G 的实际语言菜单确认中文来源，依次继续；已知源码可用时复用缓存，避免重复请求。
4. 转换并核对全文、公式、全部样例和图片。QOJ 无中文时才使用草稿辅助翻译，对照原文逐项核验后入库。
5. 运行 npm run catalog，按改动运行测试、Astro 检查和构建；浏览器验证切换、PDF 页码、图示及移动端布局。
6. 更新本进度记录。提交、推送和部署按用户届时指令处理；未处理完全部候选题目不得将总目标标记为完成。

## 按比赛的完整进度表

下表包含需要核对中文来源的 52 场比赛。“待处理”仅指尚缺中文，全部题目均已有站内题面。

| 比赛 ID | 已完成 / 候选 | 已完成题号 | 待处理题号 |
| --- | ---: | --- | --- |
| icpc-2026-chengdu | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2026-xian | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| ccpc-2026-online-qualification | 12 / 14 | A、B、C、D、E、F、G、I、J、L、M、N | H、K |
| icpc-2026-shenyang-invitational | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| ccpc-2026-nanchang-invitational | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| ccpc-2026-qinhuangdao-invitational | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2026-jiangxi-invitational | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| icpc-2026-xian-invitational | 14 / 14 | A、B、C、D、E、F、G、H、I、J、K、L、M、N | — |
| icpc-2025-ecfinal | 12 / 12 | A、B、C、D、E、F、G、H、I、J、K、L | — |
| ccpc-2025-chongqing | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2025-hongkong | 12 / 12 | A、B、C、D、E、F、G、H、I、J、K、L | — |
| ccpc-2025-zhengzhou | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2025-shanghai | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| ccpc-2025-jinan | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2025-chengdu | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2025-xian | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2025-world-finals | 12 / 12 | A、B、C、D、E、F、G、H、I、J、K、L | — |
| icpc-2024-ecfinal | 12 / 12 | A、B、C、D、E、F、G、H、I、J、K、L | — |
| icpc-2024-hongkong | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| ccpc-2024-zhengzhou | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2024-shanghai | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2024-hangzhou | 6 / 13 | A、B、C、D、E、F | G、H、I、J、K、L、M |
| icpc-2024-chengdu | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| icpc-2024-world-finals | 0 / 12 | — | A、B、C、D、E、F、G、H、I、J、K、L |
| icpc-2024-online-qualification-1 | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| icpc-2022-world-finals | 0 / 11 | — | P、Q、R、S、T、U、V、W、X、Y、Z |
| icpc-2023-world-finals | 0 / 11 | — | A、B、C、D、E、F、G、H、I、J、K |
| ccpc-2023-final | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2023-ecfinal | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| icpc-2023-hangzhou | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| icpc-2023-hefei | 0 / 12 | — | A、B、C、D、E、F、G、H、I、J、K、L |
| icpc-2023-macau | 0 / 11 | — | A、B、C、D、E、F、G、H、I、J、K |
| ccpc-2023-shenzhen | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2023-shenyang | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| ccpc-2023-harbin | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| ccpc-2023-guilin | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2023-xian | 0 / 14 | — | A、B、C、D、E、F、G、H、I、J、K、L、M、N |
| icpc-2023-online-qualification-1 | 0 / 12 | — | A、B、C、D、E、F、G、H、I、J、K、L |
| ccpc-2023-online-qualification | 12 / 12 | A、B、C、D、E、F、G、H、I、J、K、L | — |
| icpc-2023-xian-invitational | 11 / 11 | A、B、C、D、E、F、G、H、I、J、K | — |
| ccpc-2022-final | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2022-ecfinal | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| icpc-2022-hongkong | 0 / 12 | — | A、B、C、D、E、F、G、H、I、J、K、L |
| icpc-2022-hangzhou | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| icpc-2022-jinan | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| ccpc-2022-mianyang | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2022-xian | 0 / 12 | — | A、B、C、D、E、F、G、H、I、J、K、L |
| ccpc-2022-guangzhou | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| icpc-2022-shenyang | 0 / 13 | — | A、B、C、D、E、F、G、H、I、J、K、L、M |
| ccpc-2022-weihai | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| ccpc-2022-guilin | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |
| ccpc-2022-online-qualification | 13 / 13 | A、B、C、D、E、F、G、H、I、J、K、L、M | — |

## 待补中文逐题清单

此表从当前候选题目生成，共 246 道，均已归档英文 PDF。

| 题目 ID | QOJ | 已登记原文 |
| --- | --- | --- |
| ccpc-2026-online-qualification/H | [20722](https://qoj.ac/problem/20722) | en / pdf / 第 1–2 页 |
| ccpc-2026-online-qualification/K | [20725](https://qoj.ac/problem/20725) | en / pdf / 第 1–2 页 |
| icpc-2026-jiangxi-invitational/A | [18272](https://qoj.ac/problem/18272) | en / pdf / 第 1–2 页 |
| icpc-2026-jiangxi-invitational/B | [18273](https://qoj.ac/problem/18273) | en / pdf / 第 1–2 页 |
| icpc-2026-jiangxi-invitational/C | [18274](https://qoj.ac/problem/18274) | en / pdf / 第 1–2 页 |
| icpc-2026-jiangxi-invitational/D | [18275](https://qoj.ac/problem/18275) | en / pdf / 第 1–2 页 |
| icpc-2026-jiangxi-invitational/E | [18276](https://qoj.ac/problem/18276) | en / pdf / 第 1–2 页 |
| icpc-2026-jiangxi-invitational/F | [18277](https://qoj.ac/problem/18277) | en / pdf / 第 1–4 页 |
| icpc-2026-jiangxi-invitational/G | [18278](https://qoj.ac/problem/18278) | en / pdf / 第 1–2 页 |
| icpc-2026-jiangxi-invitational/H | [18279](https://qoj.ac/problem/18279) | en / pdf / 第 1–1 页 |
| icpc-2026-jiangxi-invitational/I | [18280](https://qoj.ac/problem/18280) | en / pdf / 第 1–2 页 |
| icpc-2026-jiangxi-invitational/J | [18281](https://qoj.ac/problem/18281) | en / pdf / 第 1–1 页 |
| icpc-2026-jiangxi-invitational/K | [18282](https://qoj.ac/problem/18282) | en / pdf / 第 1–2 页 |
| icpc-2026-jiangxi-invitational/L | [18283](https://qoj.ac/problem/18283) | en / pdf / 第 1–1 页 |
| icpc-2026-jiangxi-invitational/M | [18284](https://qoj.ac/problem/18284) | en / pdf / 第 1–2 页 |
| icpc-2024-hangzhou/G | [9732](https://qoj.ac/problem/9732) | en / pdf / 第 10–10 页 |
| icpc-2024-hangzhou/H | [9733](https://qoj.ac/problem/9733) | en / pdf / 第 11–12 页 |
| icpc-2024-hangzhou/I | [9734](https://qoj.ac/problem/9734) | en / pdf / 第 13–14 页 |
| icpc-2024-hangzhou/J | [9735](https://qoj.ac/problem/9735) | en / pdf / 第 15–15 页 |
| icpc-2024-hangzhou/K | [9736](https://qoj.ac/problem/9736) | en / pdf / 第 16–16 页 |
| icpc-2024-hangzhou/L | [9737](https://qoj.ac/problem/9737) | en / pdf / 第 17–18 页 |
| icpc-2024-hangzhou/M | [9738](https://qoj.ac/problem/9738) | en / pdf / 第 19–19 页 |
| icpc-2024-chengdu/A | [9535](https://qoj.ac/problem/9535) | en / pdf / 第 2–2 页 |
| icpc-2024-chengdu/B | [9536](https://qoj.ac/problem/9536) | en / pdf / 第 3–3 页 |
| icpc-2024-chengdu/C | [9537](https://qoj.ac/problem/9537) | en / pdf / 第 4–5 页 |
| icpc-2024-chengdu/D | [9538](https://qoj.ac/problem/9538) | en / pdf / 第 6–6 页 |
| icpc-2024-chengdu/E | [9539](https://qoj.ac/problem/9539) | en / pdf / 第 7–7 页 |
| icpc-2024-chengdu/F | [9540](https://qoj.ac/problem/9540) | en / pdf / 第 8–8 页 |
| icpc-2024-chengdu/G | [9541](https://qoj.ac/problem/9541) | en / pdf / 第 9–9 页 |
| icpc-2024-chengdu/H | [9542](https://qoj.ac/problem/9542) | en / pdf / 第 10–10 页 |
| icpc-2024-chengdu/I | [9543](https://qoj.ac/problem/9543) | en / pdf / 第 11–11 页 |
| icpc-2024-chengdu/J | [9544](https://qoj.ac/problem/9544) | en / pdf / 第 12–13 页 |
| icpc-2024-chengdu/K | [9545](https://qoj.ac/problem/9545) | en / pdf / 第 14–14 页 |
| icpc-2024-chengdu/L | [9546](https://qoj.ac/problem/9546) | en / pdf / 第 15–15 页 |
| icpc-2024-chengdu/M | [9547](https://qoj.ac/problem/9547) | en / pdf / 第 16–17 页 |
| icpc-2024-world-finals/A | [10401](https://qoj.ac/problem/10401) | en / pdf / 第 1–2 页 |
| icpc-2024-world-finals/B | [10402](https://qoj.ac/problem/10402) | en / pdf / 第 3–4 页 |
| icpc-2024-world-finals/C | [10403](https://qoj.ac/problem/10403) | en / pdf / 第 5–6 页 |
| icpc-2024-world-finals/D | [10404](https://qoj.ac/problem/10404) | en / pdf / 第 7–7 页 |
| icpc-2024-world-finals/E | [10405](https://qoj.ac/problem/10405) | en / pdf / 第 9–10 页 |
| icpc-2024-world-finals/F | [10406](https://qoj.ac/problem/10406) | en / pdf / 第 11–12 页 |
| icpc-2024-world-finals/G | [10407](https://qoj.ac/problem/10407) | en / pdf / 第 13–14 页 |
| icpc-2024-world-finals/H | [10408](https://qoj.ac/problem/10408) | en / pdf / 第 15–16 页 |
| icpc-2024-world-finals/I | [10409](https://qoj.ac/problem/10409) | en / pdf / 第 17–18 页 |
| icpc-2024-world-finals/J | [10410](https://qoj.ac/problem/10410) | en / pdf / 第 19–19 页 |
| icpc-2024-world-finals/K | [10411](https://qoj.ac/problem/10411) | en / pdf / 第 21–22 页 |
| icpc-2024-world-finals/L | [10412](https://qoj.ac/problem/10412) | en / pdf / 第 23–24 页 |
| icpc-2024-online-qualification-1/A | [9308](https://qoj.ac/problem/9308) | en / pdf / 第 1–1 页 |
| icpc-2024-online-qualification-1/B | [9309](https://qoj.ac/problem/9309) | en / pdf / 第 2–2 页 |
| icpc-2024-online-qualification-1/C | [9310](https://qoj.ac/problem/9310) | en / pdf / 第 3–3 页 |
| icpc-2024-online-qualification-1/D | [9311](https://qoj.ac/problem/9311) | en / pdf / 第 4–5 页 |
| icpc-2024-online-qualification-1/E | [9312](https://qoj.ac/problem/9312) | en / pdf / 第 6–6 页 |
| icpc-2024-online-qualification-1/F | [9313](https://qoj.ac/problem/9313) | en / pdf / 第 7–7 页 |
| icpc-2024-online-qualification-1/G | [9314](https://qoj.ac/problem/9314) | en / pdf / 第 8–8 页 |
| icpc-2024-online-qualification-1/H | [9315](https://qoj.ac/problem/9315) | en / pdf / 第 9–9 页 |
| icpc-2024-online-qualification-1/I | [9316](https://qoj.ac/problem/9316) | en / pdf / 第 10–11 页 |
| icpc-2024-online-qualification-1/J | [9317](https://qoj.ac/problem/9317) | en / pdf / 第 12–12 页 |
| icpc-2024-online-qualification-1/K | [9318](https://qoj.ac/problem/9318) | en / pdf / 第 13–14 页 |
| icpc-2024-online-qualification-1/L | [9319](https://qoj.ac/problem/9319) | en / pdf / 第 15–16 页 |
| icpc-2024-online-qualification-1/M | [9320](https://qoj.ac/problem/9320) | en / pdf / 第 17–18 页 |
| icpc-2022-world-finals/P | [8680](https://qoj.ac/problem/8680) | en / pdf / 第 1–2 页 |
| icpc-2022-world-finals/Q | [8685](https://qoj.ac/problem/8685) | en / pdf / 第 3–4 页 |
| icpc-2022-world-finals/R | [8686](https://qoj.ac/problem/8686) | en / pdf / 第 5–6 页 |
| icpc-2022-world-finals/S | [8683](https://qoj.ac/problem/8683) | en / pdf / 第 7–7 页 |
| icpc-2022-world-finals/T | [8677](https://qoj.ac/problem/8677) | en / pdf / 第 9–10 页 |
| icpc-2022-world-finals/U | [8687](https://qoj.ac/problem/8687) | en / pdf / 第 11–12 页 |
| icpc-2022-world-finals/V | [8676](https://qoj.ac/problem/8676) | en / pdf / 第 13–14 页 |
| icpc-2022-world-finals/W | [8674](https://qoj.ac/problem/8674) | en / pdf / 第 15–16 页 |
| icpc-2022-world-finals/X | [8688](https://qoj.ac/problem/8688) | en / pdf / 第 17–18 页 |
| icpc-2022-world-finals/Y | [8689](https://qoj.ac/problem/8689) | en / pdf / 第 19–20 页 |
| icpc-2022-world-finals/Z | [8690](https://qoj.ac/problem/8690) | en / pdf / 第 21–22 页 |
| icpc-2023-world-finals/A | [8674](https://qoj.ac/problem/8674) | en / pdf / 第 1–2 页 |
| icpc-2023-world-finals/B | [8675](https://qoj.ac/problem/8675) | en / pdf / 第 3–4 页 |
| icpc-2023-world-finals/C | [8676](https://qoj.ac/problem/8676) | en / pdf / 第 5–6 页 |
| icpc-2023-world-finals/D | [8677](https://qoj.ac/problem/8677) | en / pdf / 第 7–8 页 |
| icpc-2023-world-finals/E | [8678](https://qoj.ac/problem/8678) | en / pdf / 第 9–10 页 |
| icpc-2023-world-finals/F | [8679](https://qoj.ac/problem/8679) | en / pdf / 第 11–12 页 |
| icpc-2023-world-finals/G | [8680](https://qoj.ac/problem/8680) | en / pdf / 第 13–14 页 |
| icpc-2023-world-finals/H | [8681](https://qoj.ac/problem/8681) | en / pdf / 第 15–16 页 |
| icpc-2023-world-finals/I | [8682](https://qoj.ac/problem/8682) | en / pdf / 第 17–18 页 |
| icpc-2023-world-finals/J | [8683](https://qoj.ac/problem/8683) | en / pdf / 第 19–19 页 |
| icpc-2023-world-finals/K | [8684](https://qoj.ac/problem/8684) | en / pdf / 第 21–22 页 |
| icpc-2023-ecfinal/A | [8047](https://qoj.ac/problem/8047) | en / pdf / 第 2–3 页 |
| icpc-2023-ecfinal/B | [8048](https://qoj.ac/problem/8048) | en / pdf / 第 4–5 页 |
| icpc-2023-ecfinal/C | [8049](https://qoj.ac/problem/8049) | en / pdf / 第 6–7 页 |
| icpc-2023-ecfinal/D | [8050](https://qoj.ac/problem/8050) | en / pdf / 第 8–9 页 |
| icpc-2023-ecfinal/E | [8051](https://qoj.ac/problem/8051) | en / pdf / 第 10–10 页 |
| icpc-2023-ecfinal/F | [8052](https://qoj.ac/problem/8052) | en / pdf / 第 11–11 页 |
| icpc-2023-ecfinal/G | [8053](https://qoj.ac/problem/8053) | en / pdf / 第 12–14 页 |
| icpc-2023-ecfinal/H | [8054](https://qoj.ac/problem/8054) | en / pdf / 第 15–16 页 |
| icpc-2023-ecfinal/I | [8055](https://qoj.ac/problem/8055) | en / pdf / 第 17–18 页 |
| icpc-2023-ecfinal/J | [8056](https://qoj.ac/problem/8056) | en / pdf / 第 19–20 页 |
| icpc-2023-ecfinal/K | [8057](https://qoj.ac/problem/8057) | en / pdf / 第 21–22 页 |
| icpc-2023-ecfinal/L | [8058](https://qoj.ac/problem/8058) | en / pdf / 第 23–23 页 |
| icpc-2023-ecfinal/M | [8059](https://qoj.ac/problem/8059) | en / pdf / 第 24–25 页 |
| icpc-2023-hangzhou/A | [8230](https://qoj.ac/problem/8230) | en / pdf / 第 2–4 页 |
| icpc-2023-hangzhou/B | [8231](https://qoj.ac/problem/8231) | en / pdf / 第 5–5 页 |
| icpc-2023-hangzhou/C | [8232](https://qoj.ac/problem/8232) | en / pdf / 第 6–7 页 |
| icpc-2023-hangzhou/D | [8233](https://qoj.ac/problem/8233) | en / pdf / 第 8–8 页 |
| icpc-2023-hangzhou/E | [8234](https://qoj.ac/problem/8234) | en / pdf / 第 9–9 页 |
| icpc-2023-hangzhou/F | [8235](https://qoj.ac/problem/8235) | en / pdf / 第 10–10 页 |
| icpc-2023-hangzhou/G | [8236](https://qoj.ac/problem/8236) | en / pdf / 第 11–12 页 |
| icpc-2023-hangzhou/H | [8237](https://qoj.ac/problem/8237) | en / pdf / 第 13–14 页 |
| icpc-2023-hangzhou/I | [8238](https://qoj.ac/problem/8238) | en / pdf / 第 15–16 页 |
| icpc-2023-hangzhou/J | [8239](https://qoj.ac/problem/8239) | en / pdf / 第 17–18 页 |
| icpc-2023-hangzhou/K | [8240](https://qoj.ac/problem/8240) | en / pdf / 第 19–20 页 |
| icpc-2023-hangzhou/L | [8241](https://qoj.ac/problem/8241) | en / pdf / 第 21–22 页 |
| icpc-2023-hangzhou/M | [8242](https://qoj.ac/problem/8242) | en / pdf / 第 23–23 页 |
| icpc-2023-hefei/A | [7874](https://qoj.ac/problem/7874) | en / pdf / 第 2–2 页 |
| icpc-2023-hefei/B | [7875](https://qoj.ac/problem/7875) | en / pdf / 第 3–3 页 |
| icpc-2023-hefei/C | [7876](https://qoj.ac/problem/7876) | en / pdf / 第 4–5 页 |
| icpc-2023-hefei/D | [7877](https://qoj.ac/problem/7877) | en / pdf / 第 6–6 页 |
| icpc-2023-hefei/E | [7878](https://qoj.ac/problem/7878) | en / pdf / 第 7–8 页 |
| icpc-2023-hefei/F | [7879](https://qoj.ac/problem/7879) | en / pdf / 第 9–9 页 |
| icpc-2023-hefei/G | [7880](https://qoj.ac/problem/7880) | en / pdf / 第 10–10 页 |
| icpc-2023-hefei/H | [7881](https://qoj.ac/problem/7881) | en / pdf / 第 11–12 页 |
| icpc-2023-hefei/I | [7882](https://qoj.ac/problem/7882) | en / pdf / 第 13–14 页 |
| icpc-2023-hefei/J | [7883](https://qoj.ac/problem/7883) | en / pdf / 第 15–15 页 |
| icpc-2023-hefei/K | [7884](https://qoj.ac/problem/7884) | en / pdf / 第 16–16 页 |
| icpc-2023-hefei/L | [7885](https://qoj.ac/problem/7885) | en / pdf / 第 17–18 页 |
| icpc-2023-macau/A | [7857](https://qoj.ac/problem/7857) | en / pdf / 第 2–3 页 |
| icpc-2023-macau/B | [7858](https://qoj.ac/problem/7858) | en / pdf / 第 4–4 页 |
| icpc-2023-macau/C | [7859](https://qoj.ac/problem/7859) | en / pdf / 第 5–6 页 |
| icpc-2023-macau/D | [7860](https://qoj.ac/problem/7860) | en / pdf / 第 7–8 页 |
| icpc-2023-macau/E | [7861](https://qoj.ac/problem/7861) | en / pdf / 第 9–10 页 |
| icpc-2023-macau/F | [7862](https://qoj.ac/problem/7862) | en / pdf / 第 11–12 页 |
| icpc-2023-macau/G | [7863](https://qoj.ac/problem/7863) | en / pdf / 第 13–15 页 |
| icpc-2023-macau/H | [7864](https://qoj.ac/problem/7864) | en / pdf / 第 16–17 页 |
| icpc-2023-macau/I | [7865](https://qoj.ac/problem/7865) | en / pdf / 第 18–19 页 |
| icpc-2023-macau/J | [7866](https://qoj.ac/problem/7866) | en / pdf / 第 20–21 页 |
| icpc-2023-macau/K | [7867](https://qoj.ac/problem/7867) | en / pdf / 第 22–23 页 |
| icpc-2023-shenyang/A | [7777](https://qoj.ac/problem/7777) | en / pdf / 第 2–3 页 |
| icpc-2023-shenyang/B | [7778](https://qoj.ac/problem/7778) | en / pdf / 第 4–4 页 |
| icpc-2023-shenyang/C | [7779](https://qoj.ac/problem/7779) | en / pdf / 第 5–6 页 |
| icpc-2023-shenyang/D | [7780](https://qoj.ac/problem/7780) | en / pdf / 第 7–7 页 |
| icpc-2023-shenyang/E | [7781](https://qoj.ac/problem/7781) | en / pdf / 第 8–9 页 |
| icpc-2023-shenyang/F | [7782](https://qoj.ac/problem/7782) | en / pdf / 第 10–11 页 |
| icpc-2023-shenyang/G | [7783](https://qoj.ac/problem/7783) | en / pdf / 第 12–13 页 |
| icpc-2023-shenyang/H | [7784](https://qoj.ac/problem/7784) | en / pdf / 第 14–15 页 |
| icpc-2023-shenyang/I | [7785](https://qoj.ac/problem/7785) | en / pdf / 第 16–17 页 |
| icpc-2023-shenyang/J | [7786](https://qoj.ac/problem/7786) | en / pdf / 第 18–18 页 |
| icpc-2023-shenyang/K | [7787](https://qoj.ac/problem/7787) | en / pdf / 第 19–20 页 |
| icpc-2023-shenyang/L | [7788](https://qoj.ac/problem/7788) | en / pdf / 第 21–23 页 |
| icpc-2023-shenyang/M | [7789](https://qoj.ac/problem/7789) | en / pdf / 第 24–25 页 |
| icpc-2023-xian/A | [9242](https://qoj.ac/problem/9242) | en / pdf / 第 1–1 页 |
| icpc-2023-xian/B | [9243](https://qoj.ac/problem/9243) | en / pdf / 第 2–2 页 |
| icpc-2023-xian/C | [9244](https://qoj.ac/problem/9244) | en / pdf / 第 3–3 页 |
| icpc-2023-xian/D | [9245](https://qoj.ac/problem/9245) | en / pdf / 第 4–4 页 |
| icpc-2023-xian/E | [9246](https://qoj.ac/problem/9246) | en / pdf / 第 5–5 页 |
| icpc-2023-xian/F | [9247](https://qoj.ac/problem/9247) | en / pdf / 第 6–6 页 |
| icpc-2023-xian/G | [9248](https://qoj.ac/problem/9248) | en / pdf / 第 7–7 页 |
| icpc-2023-xian/H | [9249](https://qoj.ac/problem/9249) | en / pdf / 第 8–8 页 |
| icpc-2023-xian/I | [9250](https://qoj.ac/problem/9250) | en / pdf / 第 9–9 页 |
| icpc-2023-xian/J | [9251](https://qoj.ac/problem/9251) | en / pdf / 第 10–10 页 |
| icpc-2023-xian/K | [9252](https://qoj.ac/problem/9252) | en / pdf / 第 11–11 页 |
| icpc-2023-xian/L | [9253](https://qoj.ac/problem/9253) | en / pdf / 第 12–12 页 |
| icpc-2023-xian/M | [9254](https://qoj.ac/problem/9254) | en / pdf / 第 13–13 页 |
| icpc-2023-xian/N | [9255](https://qoj.ac/problem/9255) | en / pdf / 第 14–15 页 |
| icpc-2023-online-qualification-1/A | [8072](https://qoj.ac/problem/8072) | en / pdf / 第 1–3 页 |
| icpc-2023-online-qualification-1/B | [8073](https://qoj.ac/problem/8073) | en / pdf / 第 4–4 页 |
| icpc-2023-online-qualification-1/C | [8074](https://qoj.ac/problem/8074) | en / pdf / 第 5–5 页 |
| icpc-2023-online-qualification-1/D | [8075](https://qoj.ac/problem/8075) | en / pdf / 第 6–6 页 |
| icpc-2023-online-qualification-1/E | [8076](https://qoj.ac/problem/8076) | en / pdf / 第 7–7 页 |
| icpc-2023-online-qualification-1/F | [8077](https://qoj.ac/problem/8077) | en / pdf / 第 8–8 页 |
| icpc-2023-online-qualification-1/G | [8078](https://qoj.ac/problem/8078) | en / pdf / 第 9–9 页 |
| icpc-2023-online-qualification-1/H | [8079](https://qoj.ac/problem/8079) | en / pdf / 第 10–10 页 |
| icpc-2023-online-qualification-1/I | [8080](https://qoj.ac/problem/8080) | en / pdf / 第 11–11 页 |
| icpc-2023-online-qualification-1/J | [8081](https://qoj.ac/problem/8081) | en / pdf / 第 12–12 页 |
| icpc-2023-online-qualification-1/K | [8082](https://qoj.ac/problem/8082) | en / pdf / 第 13–13 页 |
| icpc-2023-online-qualification-1/L | [8083](https://qoj.ac/problem/8083) | en / pdf / 第 14–14 页 |
| icpc-2022-ecfinal/A | [6298](https://qoj.ac/problem/6298) | en / pdf / 第 1–2 页 |
| icpc-2022-ecfinal/B | [6299](https://qoj.ac/problem/6299) | en / pdf / 第 3–3 页 |
| icpc-2022-ecfinal/C | [6300](https://qoj.ac/problem/6300) | en / pdf / 第 4–4 页 |
| icpc-2022-ecfinal/D | [6301](https://qoj.ac/problem/6301) | en / pdf / 第 5–5 页 |
| icpc-2022-ecfinal/E | [6302](https://qoj.ac/problem/6302) | en / pdf / 第 6–7 页 |
| icpc-2022-ecfinal/F | [6303](https://qoj.ac/problem/6303) | en / pdf / 第 8–8 页 |
| icpc-2022-ecfinal/G | [6304](https://qoj.ac/problem/6304) | en / pdf / 第 9–9 页 |
| icpc-2022-ecfinal/H | [6305](https://qoj.ac/problem/6305) | en / pdf / 第 10–11 页 |
| icpc-2022-ecfinal/I | [6306](https://qoj.ac/problem/6306) | en / pdf / 第 12–13 页 |
| icpc-2022-ecfinal/J | [6307](https://qoj.ac/problem/6307) | en / pdf / 第 14–14 页 |
| icpc-2022-ecfinal/K | [6308](https://qoj.ac/problem/6308) | en / pdf / 第 15–15 页 |
| icpc-2022-ecfinal/L | [6309](https://qoj.ac/problem/6309) | en / pdf / 第 16–16 页 |
| icpc-2022-ecfinal/M | [6310](https://qoj.ac/problem/6310) | en / pdf / 第 17–17 页 |
| icpc-2022-hongkong/A | [5455](https://qoj.ac/problem/5455) | en / pdf / 第 2–2 页 |
| icpc-2022-hongkong/B | [5456](https://qoj.ac/problem/5456) | en / pdf / 第 3–4 页 |
| icpc-2022-hongkong/C | [5457](https://qoj.ac/problem/5457) | en / pdf / 第 5–5 页 |
| icpc-2022-hongkong/D | [5458](https://qoj.ac/problem/5458) | en / pdf / 第 6–6 页 |
| icpc-2022-hongkong/E | [5459](https://qoj.ac/problem/5459) | en / pdf / 第 7–7 页 |
| icpc-2022-hongkong/F | [5460](https://qoj.ac/problem/5460) | en / pdf / 第 8–8 页 |
| icpc-2022-hongkong/G | [5461](https://qoj.ac/problem/5461) | en / pdf / 第 9–10 页 |
| icpc-2022-hongkong/H | [5462](https://qoj.ac/problem/5462) | en / pdf / 第 11–11 页 |
| icpc-2022-hongkong/I | [5463](https://qoj.ac/problem/5463) | en / pdf / 第 12–12 页 |
| icpc-2022-hongkong/J | [5464](https://qoj.ac/problem/5464) | en / pdf / 第 13–13 页 |
| icpc-2022-hongkong/K | [5465](https://qoj.ac/problem/5465) | en / pdf / 第 14–14 页 |
| icpc-2022-hongkong/L | [5466](https://qoj.ac/problem/5466) | en / pdf / 第 15–15 页 |
| icpc-2022-hangzhou/A | [5301](https://qoj.ac/problem/5301) | en / pdf / 第 1–1 页 |
| icpc-2022-hangzhou/B | [5302](https://qoj.ac/problem/5302) | en / pdf / 第 2–3 页 |
| icpc-2022-hangzhou/C | [5303](https://qoj.ac/problem/5303) | en / pdf / 第 4–4 页 |
| icpc-2022-hangzhou/D | [5304](https://qoj.ac/problem/5304) | en / pdf / 第 5–5 页 |
| icpc-2022-hangzhou/E | [5305](https://qoj.ac/problem/5305) | en / pdf / 第 6–6 页 |
| icpc-2022-hangzhou/F | [5306](https://qoj.ac/problem/5306) | en / pdf / 第 7–7 页 |
| icpc-2022-hangzhou/G | [5307](https://qoj.ac/problem/5307) | en / pdf / 第 8–9 页 |
| icpc-2022-hangzhou/H | [5308](https://qoj.ac/problem/5308) | en / pdf / 第 10–10 页 |
| icpc-2022-hangzhou/I | [5309](https://qoj.ac/problem/5309) | en / pdf / 第 11–11 页 |
| icpc-2022-hangzhou/J | [5310](https://qoj.ac/problem/5310) | en / pdf / 第 12–12 页 |
| icpc-2022-hangzhou/K | [5311](https://qoj.ac/problem/5311) | en / pdf / 第 13–13 页 |
| icpc-2022-hangzhou/L | [5312](https://qoj.ac/problem/5312) | en / pdf / 第 14–14 页 |
| icpc-2022-hangzhou/M | [5313](https://qoj.ac/problem/5313) | en / pdf / 第 15–16 页 |
| icpc-2022-jinan/A | [5137](https://qoj.ac/problem/5137) | en / pdf / 第 1–1 页 |
| icpc-2022-jinan/B | [5138](https://qoj.ac/problem/5138) | en / pdf / 第 2–3 页 |
| icpc-2022-jinan/C | [5139](https://qoj.ac/problem/5139) | en / pdf / 第 4–4 页 |
| icpc-2022-jinan/D | [5140](https://qoj.ac/problem/5140) | en / pdf / 第 5–7 页 |
| icpc-2022-jinan/E | [5141](https://qoj.ac/problem/5141) | en / pdf / 第 8–8 页 |
| icpc-2022-jinan/F | [5142](https://qoj.ac/problem/5142) | en / pdf / 第 9–10 页 |
| icpc-2022-jinan/G | [5143](https://qoj.ac/problem/5143) | en / pdf / 第 11–12 页 |
| icpc-2022-jinan/H | [5144](https://qoj.ac/problem/5144) | en / pdf / 第 13–13 页 |
| icpc-2022-jinan/I | [5145](https://qoj.ac/problem/5145) | en / pdf / 第 14–14 页 |
| icpc-2022-jinan/J | [5146](https://qoj.ac/problem/5146) | en / pdf / 第 15–15 页 |
| icpc-2022-jinan/K | [5147](https://qoj.ac/problem/5147) | en / pdf / 第 16–16 页 |
| icpc-2022-jinan/L | [5148](https://qoj.ac/problem/5148) | en / pdf / 第 17–17 页 |
| icpc-2022-jinan/M | [5149](https://qoj.ac/problem/5149) | en / pdf / 第 18–18 页 |
| icpc-2022-xian/A | [5113](https://qoj.ac/problem/5113) | en / pdf / 第 1–1 页 |
| icpc-2022-xian/B | [5114](https://qoj.ac/problem/5114) | en / pdf / 第 2–2 页 |
| icpc-2022-xian/C | [5115](https://qoj.ac/problem/5115) | en / pdf / 第 3–3 页 |
| icpc-2022-xian/D | [5116](https://qoj.ac/problem/5116) | en / pdf / 第 4–4 页 |
| icpc-2022-xian/E | [5117](https://qoj.ac/problem/5117) | en / pdf / 第 5–5 页 |
| icpc-2022-xian/F | [5118](https://qoj.ac/problem/5118) | en / pdf / 第 6–6 页 |
| icpc-2022-xian/G | [5119](https://qoj.ac/problem/5119) | en / pdf / 第 7–7 页 |
| icpc-2022-xian/H | [5120](https://qoj.ac/problem/5120) | en / pdf / 第 8–9 页 |
| icpc-2022-xian/I | [5121](https://qoj.ac/problem/5121) | en / pdf / 第 10–10 页 |
| icpc-2022-xian/J | [5122](https://qoj.ac/problem/5122) | en / pdf / 第 11–11 页 |
| icpc-2022-xian/K | [5123](https://qoj.ac/problem/5123) | en / pdf / 第 12–13 页 |
| icpc-2022-xian/L | [5124](https://qoj.ac/problem/5124) | en / pdf / 第 14–14 页 |
| icpc-2022-shenyang/A | [5433](https://qoj.ac/problem/5433) | en / pdf / 第 2–2 页 |
| icpc-2022-shenyang/B | [5434](https://qoj.ac/problem/5434) | en / pdf / 第 3–3 页 |
| icpc-2022-shenyang/C | [5435](https://qoj.ac/problem/5435) | en / pdf / 第 4–4 页 |
| icpc-2022-shenyang/D | [5436](https://qoj.ac/problem/5436) | en / pdf / 第 5–5 页 |
| icpc-2022-shenyang/E | [5437](https://qoj.ac/problem/5437) | en / pdf / 第 6–6 页 |
| icpc-2022-shenyang/F | [5438](https://qoj.ac/problem/5438) | en / pdf / 第 7–7 页 |
| icpc-2022-shenyang/G | [5439](https://qoj.ac/problem/5439) | en / pdf / 第 8–8 页 |
| icpc-2022-shenyang/H | [5440](https://qoj.ac/problem/5440) | en / pdf / 第 9–9 页 |
| icpc-2022-shenyang/I | [5441](https://qoj.ac/problem/5441) | en / pdf / 第 10–10 页 |
| icpc-2022-shenyang/J | [5442](https://qoj.ac/problem/5442) | en / pdf / 第 11–12 页 |
| icpc-2022-shenyang/K | [5443](https://qoj.ac/problem/5443) | en / pdf / 第 13–13 页 |
| icpc-2022-shenyang/L | [5444](https://qoj.ac/problem/5444) | en / pdf / 第 14–15 页 |
| icpc-2022-shenyang/M | [5445](https://qoj.ac/problem/5445) | en / pdf / 第 16–17 页 |
