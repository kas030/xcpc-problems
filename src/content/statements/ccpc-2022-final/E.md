---
problemId: ccpc-2022-final/E
language: zh
status: qoj
source: https://qoj.ac/problem/6505/statement/zh_cn
sourceHash: a12e5ce852425ecc533071a8030f1ea829f7a51011113a4a2c6545a965d70d85
---

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

为了准备 CCPC 总决赛的题目，Little Cyan Fish 正在学习基础字符串理论。今天，Little Cyan Fish 学习了 CCPC 字符串的概念。一个字符串 $s$ 被称为 CCPC 字符串，当且仅当存在一个正整数 $t \ge 1$，使得 $s = \text{c}^{2t}\text{p}\text{c}^t$。

这里，$\text{c}^k$ 表示字符 c 重复 $k$ 次组成的字符串，$uv$ 表示将字符串 $u$ 和 $v$ 连接后得到的字符串。例如，ccpc、ccccpcc 和 ccccccpccc 是 CCPC 字符串，但 p、cpc、ccpcc、ccppc 和 cccpc 不是。

现在，Little Cyan Fish 有一个由 c、p 和问号 (?) 组成的字符串 $S$。他想要计算满足以下条件的整数对 $(l, r)$ 的数量：

-   $1 \le l \le r \le |S|$
-   对于字符串 $T = S[l \dots r]$，可以通过将问号 (?) 替换为 c 或 p，使得该字符串成为一个 CCPC 字符串。

## 输入格式

输入包含多组测试数据。第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试数据的组数。

对于每组测试数据，第一行包含一个字符串 $S$。字符串 $S$ 仅由英文字母 c、p 和问号 (?) 组成。

保证所有测试数据中 $|S|$ 的总和不超过 $10^6$。

## 输出格式

对于每组测试数据，输出一行，包含一个整数，表示答案。

## 样例

### 输入 1

```text
5
?cpc
ccp??
???c???
?c???cp??
?c?????cccp????
```

### 输出 1

```text
1
1
4
5
14
```

## 说明

在第一个样例中，所有合法的 $(l, r)$ 对如下：

| $l$ | $r$ | $S[l \dots r]$ | 替换后的字符串 |
| --- | --- | --- | --- |
| 1 | 4 | ?cpc | ccpc |

在第二个样例中，所有合法的 $(l, r)$ 对如下：

| $l$ | $r$ | $S[l \dots r]$ | 替换后的字符串 |
| --- | --- | --- | --- |
| 1 | 4 | ccp? | ccpc |

在第三个样例中，所有合法的 $(l, r)$ 对如下：

| $l$ | $r$ | $S[l \dots r]$ | 替换后的字符串 |
| --- | --- | --- | --- |
| 1 | 4 | ???c | ccpc |
| 3 | 6 | ?c?? | ccpc |
| 4 | 7 | c??? | ccpc |
| 1 | 7 | ???c??? | ccccpcc |

在第四个样例中，所有合法的 $(l, r)$ 对如下：

| $l$ | $r$ | $S[l \dots r]$ | 替换后的字符串 |
| --- | --- | --- | --- |
| 1 | 4 | ?c?? | ccpc |
| 2 | 5 | c??? | ccpc |
| 3 | 6 | ???c | ccpc |
| 5 | 8 | ?cp? | ccpc |
| 3 | 9 | ???cp?? | ccccpcc |

在第五个样例中，所有合法的 $(l, r)$ 对如下：

| $l$ | $r$ | $S[l \dots r]$ | 替换后的字符串 |
| --- | --- | --- | --- |
| 1 | 4 | ?c?? | ccpc |
| 2 | 5 | c??? | ccpc |
| 3 | 6 | ???? | ccpc |
| 4 | 7 | ???? | ccpc |
| 5 | 8 | ???c | ccpc |
| 9 | 12 | ccp? | ccpc |
| 12 | 15 | ???? | ccpc |
| 1 | 7 | ?c????? | ccccpcc |
| 2 | 8 | c?????c | ccccpcc |
| 3 | 9 | ?????cc | ccccpcc |
| 7 | 13 | ?cccp?? | ccccpcc |
| 1 | 10 | ?c?????ccc | ccccccpccc |
| 5 | 14 | ???cccp??? | ccccccpccc |
| 3 | 15 | ?????cccp???? | ccccccccpcccc |
