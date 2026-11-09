<div align="center">

<a href="https://kas030.github.io/xcpc-problems/">
  <img src="public/logo.png" alt="XCPC 训练题单 Logo" width="120" />
</a>

# XCPC 训练题单

从真实比赛榜单出发，找到适合自己的下一道题。

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat-square&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js 24](https://img.shields.io/badge/Node.js-24-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)

</div>

---

## 在这里可以做什么

按比赛中的实际通过情况挑题，适合日常训练、赛后补题，也方便和队友分享训练范围。打开网站即可使用，无需注册本站账号。

| 选题与训练 | 使用方式 |
| --- | --- |
| 🎯 按目标选题 | 组合筛选难度、比赛、年份和完成状态，搜索题名、比赛或 QOJ 编号 |
| 📊 查看难度依据 | 查看金、银、铜牌组的通过队数与通过率，跳转原始比赛榜单 |
| 📖 阅读题面 | 阅读已收录的中文题面、单题 PDF 和完整题册，通过 QOJ 入口提交代码 |
| ✅ 记录训练进度 | 手动标记已完成题目，筛选未完成题目继续训练 |
| 🔗 分享训练范围 | 复制筛选链接，和队友查看同一组筛选条件 |

目前收录 **2022–2026 年 · 72 场比赛 · 920 道题**，涵盖区域赛、总决赛、邀请赛和网络赛。收录范围见 [比赛归档](docs/archive-2022-2026.md)，最新题目以在线题单为准。

完成状态仅保存在当前浏览器，清除浏览器网站数据会丢失进度。分享链接会保留筛选条件，不会分享你的完成记录。

## 开始训练

1. **挑选题目**：打开 [在线题单](https://kas030.github.io/xcpc-problems/)，选择目标难度。想补某场比赛时，再选择比赛或年份。
2. **阅读并提交**：进入题目详情查看题面和通过率，通过 QOJ 链接提交代码。
3. **记录进度**：通过后手动标记为已完成，下次可筛选“未完成”继续练习。

## 难度怎么看

难度依据正式队伍的**赛内通过率**划分。金、银、铜牌组互不重叠，按下表从上往下判断，取第一个满足条件的标签。

| 难度 | 判定条件 |
| --- | --- |
| 签到题 | 铜牌组通过率 ≥ 90%，且全部正式队伍通过率 ≥ 80% |
| 铜牌题 | 铜牌组通过率 ≥ 50% |
| 银牌题 | 银牌组通过率 ≥ 50% |
| 金牌题 | 金牌组通过率 ≥ 50% |
| 挑战题 | 各奖牌组均未达到 50% |

标签用于辅助选题，跨比赛比较时还需结合赛事级别。缺少奖牌人数的比赛会按比例估算分组，并在比赛页标注。详见 [分级说明](https://kas030.github.io/xcpc-problems/methodology/)。

## 题面与反馈

题面入口因题目而异，提供已收录的官方题面、QOJ 中文版或中文译文。需要核对题意时，可查看原文或原始题册。

遇到题目映射错误、题面问题、链接失效或难度统计异常，欢迎 [提交 Issue](https://github.com/kas030/xcpc-problems/issues/new)，附上题目链接、问题描述和参考来源。也可以在这里建议补充比赛。

## 参与项目

想在本地运行、补充比赛或修正题面？请参阅 [开发指南](docs/development.md) 与 [维护流程](docs/maintenance.md)。

程序代码采用 [MIT 许可](LICENSE)。榜单数据来自 [XCPCIO board-data](https://github.com/xcpcio/board-data)，题面及商标属于原作者，题面不纳入代码的 MIT 许可。完整来源与许可说明见 [THIRD_PARTY.md](THIRD_PARTY.md)。
