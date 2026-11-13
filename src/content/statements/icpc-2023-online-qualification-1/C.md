---
problemId: icpc-2023-online-qualification-1/C
language: zh
status: qoj
source: https://qoj.ac/problem/8074/statement/zh_cn
sourceHash: 01ee2e419407d94281ecc86116aeeae179f10dca9c62c918ab936df74aa7eeb7
---

## 题目描述

时间限制：6.0 秒；内存限制：1024 MB。

给定 $n$ 个数对 $(a_1, b_1), (a_2, b_2), \dots, (a_n, b_n)$，你需要执行 $q$ 次操作。每次操作属于以下两种形式之一：

-   “1 $k$ $a$ $b$” ($1 \le k \le n, 1 \le a, b \le 10^9$)：将第 $k$ 个数对修改为 $(a, b)$。
-   “2 $x$ $l$ $r$” ($1 \le x \le 10^9, 1 \le l \le r \le n$)：求 $a_i \times x + b_i$ 的最大值，其中 $l \le i \le r$。

## 输入格式

第一行包含两个整数 $n$ 和 $q$ ($1 \le n, q \le 500\,000$)，分别表示数对的数量和操作的数量。

接下来 $n$ 行，每行包含两个整数 $a_i$ 和 $b_i$ ($1 \le a_i, b_i \le 10^9$)，表示第 $i$ 个数对。

接下来 $q$ 行，每行描述一个操作，格式如上所述。

## 输出格式

对于每个查询，输出一行，包含一个整数，表示答案。

## 样例

### 输入 1

```text
3 5
2 3
1 5
3 1
2 1 1 3
2 3 1 2
1 3 1 1
2 3 3 3
2 2 1 3
```

### 输出 1

```text
6
9
4
7
```
