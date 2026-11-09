---
problemId: ccpc-2023-shenzhen/M
language: zh
status: qoj
source: https://qoj.ac/problem/8340/statement/zh_cn
sourceHash: 0a7222295c3f59ade1267f3faf20f3c0a744b426646e78d8463c36c5278d9dbe
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：0.5 秒；内存限制：512 MB。

给定 $N$ 个整数 $a_1, \dots, a_N$ 以及模数 $M = 10^K - 1$。求满足 $a_i + a_j + a_k \equiv 0 \pmod M$ 的所有三元组 $(i, j, k)$ ($1 \le i \le j \le k \le N$) 的数量。

## 输入格式

第一行包含两个整数 $N$ 和 $K$ ($1 \le N \le 500, 1 \le K \le 2 \times 10^4$)。

接下来的 $N$ 行，第 $i$ 行包含一个整数 $a_i$。保证 $0 \le a_i < 10^{20000}$。

## 输出格式

输出一行，包含一个整数，表示满足条件的三元组数量。

## 样例

### 输入格式 1

```text
4 1
0
1
10
17
```

### 输出格式 1

```text
3
```
