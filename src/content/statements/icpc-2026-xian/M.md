---
problemId: icpc-2026-xian/M
language: zh
status: reviewed
source: https://qoj.ac/download.php?type=attachments&id=4593&r=0
sourceHash: 4e0577496017549ba450ab8d05926d74ef195b33175a63b8446ec822d8fab5e0
reviewedAt: '2026-11-08'
---

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

Uni 和队友正在通过 Linked VERSE 解锁一首高难度歌曲。解锁时，四名玩家同时游玩一首包含 $n$ 个音符的歌曲。

每名玩家的 Gauge 初始为 $2000$。对每个音符，每名玩家会得到以下五种判定之一：

| 判定 | 字符 | 对该玩家 Gauge 的影响 |
| --- | --- | --- |
| JUSTICE HEAVEN | `H` | 不扣除 |
| JUSTICE CRITICAL | `C` | 不扣除 |
| JUSTICE | `J` | 扣除 $50$ |
| ATTACK | `A` | 扣除 $100$ |
| MISS | `M` | 扣除 $200$ |

每名玩家还有一个独立的连击计数器。得到 `H` 时，自己的连击数增加 $1$；得到其他任何判定时，只将自己的连击数清零。某名玩家的连击数达到 $100$ 时，会让**其他三名玩家**的 Gauge 各增加 $30$，并将自己的连击数清零。

对于每个音符，四名玩家的判定**同时结算**：每名玩家的 Gauge 直接变为该音符所有增减同时生效后的值。结算后，若某名玩家的 Gauge 不小于 $2000$，则将其设为 $2000$。

Uni 发现，全部音符结算完毕后，只要某名玩家的 Gauge 曾经不大于 $0$，就会在游戏结束前被强制设为 $0$。请计算游戏结束时四名玩家的 Gauge。

## 输入格式

第一行包含正整数 $T$（$1\le T\le10^4$），表示测试用例数。

每个测试用例的第一行包含整数 $n$（$1\le n\le10^5$）。接下来四行，每行包含长度为 $n$ 的字符串 $s$，第 $i$ 个字符表示该玩家在第 $i$ 个音符上的判定。

所有字符串仅包含 `H`、`C`、`J`、`A`、`M`。所有测试用例的 $n$ 之和不超过 $10^5$。

## 输出格式

对每个测试用例，按输入顺序输出四名玩家的最终 Gauge。

## 样例

### 输入

```text
3
5
CCCCC
JJJJJ
AAAAA
MMMMM
10
HCJAMHCJAM
CHCHCHCHCH
JAMJAMJAMJ
MAJHAMMACH
103
MMMMMMMMMMCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
CJCJCJCJHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHJJJCJCJCJCJCJCJCJCJCJCJCJCJCJCJCJCJCJC
HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
```

### 输出

```text
2000 1750 1500 1000
1300 2000 900 1050
0 2000 830 1930
```

## 说明

原题册为适应排版，将最后一组样例中的长字符串分行显示；这里已按每行长度 $103$ 还原。原始样例也可从 Domjudge 下载。
