---
problemId: icpc-2022-ecfinal/K
language: zh
status: qoj
source: https://qoj.ac/problem/6308/statement/zh_cn
sourceHash: f0a8955340da5f7eb6435a8dd5a7c9eb51aa6d88ef36185f02f6e227d52944cf
---

## 题目描述

时间限制：3 秒；内存限制：16 MB。

警告：内存限制异常！

给定一个序列 $a_0, \dots, a_{2n}$。初始时，所有数字均为零。

共有 $n$ 次操作。第 $i$ 次操作由两个整数 $l_i, r_i$ ($1 \le l_i < r_i \le 2n, 1 \le i \le n$) 表示，该操作将 $i$ 赋值给 $a_{l_i}, \dots, a_{r_i-1}$。保证所有 $2n$ 个整数 $l_1, l_2, \dots, l_n, r_1, r_2, \dots, r_n$ 互不相同。

你需要以任意顺序恰好执行每种操作一次。

你希望在执行完所有 $n$ 次操作后，最大化满足 $a_i \neq a_{i+1}$ 的 $i$ ($0 \le i < 2n$) 的数量。输出该最大数量。

## 输入

第一行包含一个整数 $n$ ($1 \le n \le 5 \times 10^3$)。

接下来的 $n$ 行中，第 $i$ 行包含一对整数 $l_i, r_i$ ($1 \le l_i < r_i \le 2n$)。保证所有 $2n$ 个整数 $l_1, l_2, \dots, l_n, r_1, r_2, \dots, r_n$ 互不相同。

## 输出

输出一行，包含一个整数，表示答案。

## 样例

### 输入格式 1

```text
5
2 3
6 7
1 9
5 10
4 8
```

### 输出格式 1

```text
9
```
