---
problemId: ccpc-2022-online-qualification/M
language: zh
status: qoj
source: https://qoj.ac/problem/14546/statement/zh_cn
sourceHash: 2bab480a3fb0e10752d382ee68a935f2bc9b20a19fade7a2e88d31851dc7f0bc
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1.0 秒；内存限制：512 MB。

给定一个数组 $p_1, p_2, \dots, p_n$ 和一个整数 $k$。保证该数组最初是一个排列（$1 \le p_i \le n$，且对于任意 $1 \le i < j \le n$，有 $p_i \neq p_j$）。你可以进行任意次数的以下操作：

-   选择一个整数 $j$（$1 \le j \le n - k + 1$），定义 $m = \max(p_j, p_{j+1}, \dots, p_{j+k-1})$，然后同时对于所有整数 $i \in [j, j + k - 1]$，令 $p_i = m$。

求使数组 $p$ 中的所有元素都等于 $n$ 的最少操作次数。

## 输入格式

第一行包含两个整数 $n, k$（$2 \le n \le 1 \times 10^5, 2 \le k \le n$），表示数组的长度和一次操作中的参数。

第二行包含 $n$ 个整数 $p_1, p_2, \dots, p_n$（$1 \le p_i \le n$），表示数组 $p$。

## 输出格式

单行输出一个整数 $m$，表示最少操作次数。

## 样例

### 输入样例 1

```text
5 3
1 5 4 2 3
```

### 输出样例 1

```text
2
```
