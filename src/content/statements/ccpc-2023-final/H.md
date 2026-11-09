---
problemId: ccpc-2023-final/H
language: zh
status: qoj
source: https://qoj.ac/problem/8549/statement/zh_cn
sourceHash: 706e333f88d6e54aab1a55ff6affdfa8c3162cbd90b336c5bf73ea5ca1190c30
---

## 题目描述

时间限制：1.0 秒；内存限制：1024 MB。

在参加完中国大学生程序设计竞赛总决赛（CCPC Final）后，Kevin 和 Little Cyan Fish 决定玩一个新游戏。

Kevin 有一个长度为 $2n$ 的整数序列 $a_1, a_2, \dots, a_{2n}$。他和 Little Cyan Fish 轮流从序列中移除一个元素，剩余的元素将拼接在一起形成一个新的序列。Kevin 先手。当序列中只剩下一个元素时游戏结束。Kevin 不喜欢回文串，因此，如果在游戏过程中的任何时刻（包括初始序列），序列是一个回文串，则 Little Cyan Fish 获胜。如果序列在变成回文串之前只剩下一个元素，则 Kevin 获胜。

如果 Kevin 和 Little Cyan Fish 都采取最优策略，谁会获胜？

一个序列 $b_1, b_2, \dots, b_m$ 是回文串，当且仅当对于每个 $1 \le i \le m$，满足条件 $b_i = b_{m+1-i}$。

## 输入格式

输入包含多个测试用例。第一行包含一个整数 $T$ ($1 \le T \le 10^4$)，表示测试用例的数量。

对于每个测试用例，第一行包含一个整数 $n$ ($1 \le n \le 10^6$)，第二行包含 $2n$ 个整数 $a_1, a_2, \dots, a_{2n}$ ($1 \le a_i \le 2n$)，表示该整数序列。

保证所有测试用例的 $n$ 之和不超过 $10^6$。

## 输出格式

对于每个测试用例，如果 Kevin 获胜，输出一行 “Kevin”；如果 Little Cyan Fish 获胜，输出一行 “Qingyu”。

## 样例

### 输入 1

```text
3
3
1 1 4 5 1 4
2
1 2 3 4
4
1 2 2 3 2 1 1 4
```

### 输出 1

```text
Qingyu
Kevin
Qingyu
```
