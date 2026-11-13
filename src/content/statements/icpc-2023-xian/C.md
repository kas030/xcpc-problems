---
problemId: icpc-2023-xian/C
language: zh
status: qoj
source: https://qoj.ac/problem/9244/statement/zh_cn
sourceHash: 5615ca38fb6be3bda4ebe1fb7e28b5fbf336ec4671bf55b891b61be150239943
---

## 题目描述

时间限制：6.5 秒；内存限制：256 MB。

给定一个长度为 $n$ 的字符串 $s$。

我们称字符串 $t$ 在 $s$ 中被提及，当且仅当存在整数 $l, r$，满足 $1 \le l \le r \le n$，$\gcd(l, r) = 1$ 且 $s[l, r] = t$。

其中，$s[l, r]$ 定义为由 $s_l, s_{l+1}, \dots, s_r$ 连接而成的字符串，$\gcd(l, r)$ 表示 $l$ 和 $r$ 的最大公约数。

你需要计算所有不同的非空字符串中，在 $s$ 中被提及的字符串的长度之和。

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 100000$)。

第二行包含字符串 $s$，仅由小写英文字母组成。

## 输出格式

在一行中输出所有不同的非空且在 $s$ 中被提及的字符串的长度之和。

## 样例

### 输入 1

```text
4
abca
```

### 输出 1

```text
14
```
