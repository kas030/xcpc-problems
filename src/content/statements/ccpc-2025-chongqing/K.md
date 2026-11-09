---
problemId: ccpc-2025-chongqing/K
language: zh
status: qoj
source: https://qoj.ac/problem/15429/statement/zh_cn
sourceHash: 3cc7af5f7d5f2f1182d99713dee8e8bc43cc15335ede88e9b7a94cbd69f9024e
---

## 题目描述

时间限制：1.0 秒；内存限制：256 MB。

在 KMP 算法中，`next` 数组（也称为 LPS 数组，即最长公共前后缀数组，或失配函数）是一个核心概念。给定一个长度为 $n$ 的字符串 $S = s_1s_2\dots s_n$，其 `next` 数组 $next[1..n]$ 的定义为：$next[i]$ 表示子串 $S[1..i]$ 的最长相同真前缀和真后缀的长度，特别地，$next[1] = 0$。形式化地，其定义为：



$$
next[i] = \max_{k=0,\dots,i-1} \{k : S[1\dots k] = S[i-k+1\dots i]\}
$$



这里，$S[l..r]$ 定义为字符串 $S$ 中从第 $l$ 个字符到第 $r$ 个字符构成的子串。我们认为对于 $\forall 1 \le i \le n$，$S[1\dots 0] = S[i+1\dots i]$，它们均为空字符串。

给定一个长度为 $n$ 的数组 $A[1..n]$。你需要计算有多少个定义在字符集 $\Sigma$ 上、长度为 $n$ 的不同字符串 $S$，其 `next` 数组恰好等于给定的数组 $A$。字符集的大小为 $m$。输出满足条件的字符串数量模 $998\,244\,353$ 的值。

## 输入格式

单个输入文件中包含多组测试数据。输入的第一行包含一个整数 $T$（$1 \le T \le 10^5$），表示测试数据的组数。

对于每组测试数据：

-   第一行包含两个整数 $n$（$2 \le n \le 10^5$）和 $m$（$1 \le m \le 10^6$），分别表示给定数组的长度和字符集的大小。
-   第二行包含 $n$ 个空格分隔的整数，表示给定的数组 $A$。保证对于 $\forall 1 \le i \le n$，有 $0 \le A_i \le i - 1$。

保证所有测试数据的 $n$ 之和不超过 $5 \times 10^5$，即 $\sum n \le 5 \times 10^5$。

## 输出格式

对于每组测试数据，输出一行，包含一个整数，表示满足条件的字符串数量模 $998\,244\,353$ 的值。

## 样例

### 输入样例 1

```text
3
3 3
0 1 2
7 3
0 0 0 1 2 3 0
7 3
0 0 0 1 2 3 1
```

### 输出样例 1

```text
3
24
0
```

## 说明

对于样例中的第二组数据，假设字符集 $\Sigma = \{'a', 'b', 'c'\}$。满足要求的 $24$ 个字符串为：

```text
abbabbb abbabbc abcabcb abcabcc acbacbb acbacbc
accaccb accaccc baabaaa baabaac bacbaca bacbacc
bcabcaa bcabcac bccbcca bccbccc caacaaa caacaab
cabcaba cabcabb cbacbaa cbacbab cbbcbba cbbcbbb
```
