---
problemId: icpc-2022-shenyang/H
language: zh
status: qoj
source: https://qoj.ac/problem/5440/statement/zh_cn
sourceHash: 2df9409af86f38ebb983b27b25991daed9fe005af814d0ebffb62c3cc5442585
---

## 题目描述

时间限制：3 秒；内存限制：512 MB。

给定 $n$ 个字符串 $S_1, S_2, \dots, S_n$，你需要计算由这些字符串所构成的不同 $P\text{-}P\text{-}Palindromes$ 的数量。

回文串是指一个从左往右读和从右往左读都一样的字符串。例如，“a”、“level” 和 “otto” 是回文串，而 “aab” 和 “icpc” 不是。

$P\text{-}P\text{-}Palindrome$ 是一个非空回文串的有序对 $(P, Q)$，使得 $P$ 和 $Q$ 均为某个 $S_i$ ($1 \le i \le n$) 的子串，且 $P + Q$ 也是一个回文串。这里 $P + Q$ 表示将 $P$ 和 $Q$ 按顺序连接，即若 $P = p_1p_2 \dots p_{|P|}$ 且 $Q = q_1q_2 \dots q_{|Q|}$，则 $P + Q = p_1p_2 \dots p_{|P|}q_1q_2 \dots q_{|Q|}$，其中 $|S|$ 表示字符串 $S$ 的长度。

注意，当且仅当 $P$ 不同或 $Q$ 不同时，两个 $P\text{-}P\text{-}Palindrome$ 被视为不同。

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 10^6$)，表示给定字符串的数量。

接下来 $n$ 行，第 $i$ 行包含一个仅由小写英文字母组成的字符串 $S_i$ ($1 \le |S_i| \le 10^6$)。

保证所有给定字符串的总长度不超过 $10^6$。

## 输出格式

输出一行，包含一个整数，表示由这 $n$ 个字符串构成的不同 $P\text{-}P\text{-}Palindromes$ 的数量。

## 样例

### 样例输入 1

```text
2
aaaa
aaa
```

### 样例输出 1

```text
16
```

### 样例输入 2

```text
3
abaaa
abbbba
bbbaba
```

### 样例输出 2

```text
28
```
