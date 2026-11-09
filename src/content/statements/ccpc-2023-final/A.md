---
problemId: ccpc-2023-final/A
language: zh
status: qoj
source: https://qoj.ac/problem/8542/statement/zh_cn
sourceHash: 080e44fab187d72d68efd17c9930d69f49f617c59e9b59a2ebe88f2dacc023b6
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1.0 秒；内存限制：1024 MB。

Little Cyan Fish 和他曾经的好友在 2022 年夏天发布了一道名为 “Add One” 的题目。他的朋友对“加一”这个概念非常着迷，并由此想出了许多点子。

两年过去了，当年的想法已经变得模糊。现在，Little Cyan Fish 想要和 Little Leaky Fish 玩一个游戏。

在这个游戏中，Little Leaky Fish 有一个整数序列 $x_1, x_2, \dots, x_n$。初始时，所有的 $x_i$ 都被设为 0。他可以执行以下操作任意多次：

-   选择一个整数 $k$ ($1 \le k \le n$)。然后，将所有 $1 \le i \le k$ 的 $x_i$ 加 1。该操作的代价为 $k$。
-   选择一个整数 $k$ ($1 \le k \le n$)。然后，将所有 $n - k + 1 \le i \le n$ 的 $x_i$ 加 1。该操作的代价为 $k$。

Little Cyan Fish 还有 $n$ 个整数 $y_1, y_2, \dots, y_n$。他希望 Little Leaky Fish 执行一系列操作，使得对于所有 $1 \le i \le n$，条件 $x_i \ge y_i$ 均成立。

这个任务对 Little Leaky Fish 来说太简单了。因此，他想知道达到目标所需的最小代价是多少。你的任务是编写一个程序来计算这个最小代价。

## 输入格式

输入包含多个测试用例。第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试用例的数量。

对于每个测试用例，第一行包含一个整数 $n$ ($1 \le n \le 10^6$)。 下一行包含 $n$ 个整数 $y_1, y_2, \dots, y_n$ ($0 \le y_i \le 10^9$)。

保证所有测试用例中 $n$ 的总和不超过 $10^6$。

## 输出格式

对于每个测试用例，输出一行，包含一个整数，表示答案。

## 样例

### 样例输入 1

```text
3
5
1 1 1 1 1
10
0 0 0 0 1000000000 0 0 0 0 0
13
1 1 4 5 1 4 1 9 1 9 8 1 0
```

### 样例输出 1

```text
5
5000000000
76
```
