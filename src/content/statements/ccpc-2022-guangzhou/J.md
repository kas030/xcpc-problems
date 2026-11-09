---
problemId: ccpc-2022-guangzhou/J
language: zh
status: qoj
source: https://qoj.ac/problem/8147/statement/zh_cn
sourceHash: b53a0085001996ad792a61a7eb42a6ab2e0b5a9bd42ccde706583041a6ed4d96
---

## 题目描述

时间限制：2.0 秒；内存限制：256 MB。

世界上有许多整数序列，你的任务是找出有多少个序列是“好的”。 一个长度为 $n$ 的整数序列 $a_i$ 是好的，当且仅当以下所有条件成立：

-   $\forall i \in [1, n], 4S_i = a_i^2 + 2a_i + 1$
-   $\forall i \in [1, n], |a_i| \le m$

其中 $S_i = \sum_{j=1}^i a_j$。 给定 $n$ 和 $m$，保证 $m$ 是奇数。 由于答案可能非常大，请输出其对 $998\,244\,353$ 取模的结果。

## 输入格式

仅一行，包含两个整数 $n$ 和 $m$ ($1 \le n \le 10^7, 1 \le m \le 2n, m$ 为奇数)。

## 输出格式

输出一个整数——满足条件的“好的”序列的数量，对 $998\,244\,353$ 取模。

## 样例

### 样例输入 1

```text
9 13
```

### 样例输出 1

```text
124
```

### 样例输入 2

```text
500 999
```

### 样例输出 2

```text
195157058
```
