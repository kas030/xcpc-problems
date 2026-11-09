---
problemId: icpc-2025-hongkong/H
language: zh
status: qoj
source: https://qoj.ac/problem/15439/statement/zh_cn
sourceHash: 60dea37338b97ddd65628e46b26db2de606277d7c68c1c9d9d938a31dd597407
---

## 题目描述

时间限制：1.0 秒；内存限制：1024 MB。

给你一个长度为 $n$ 的字符串 $s$。

对于每个满足 $1 \le i \le n$ 的位置 $i$，令 $t_i$ 为从 $s$ 中删除第 $i$ 个字符（并保持所有其他字符的相对顺序）后得到的字符串。

对于两个字符串 $x$ 和 $y$，令 $\text{lcp}(x, y)$ 表示它们的最长公共前缀的长度，即满足 $x$ 和 $y$ 的前 $\ell$ 个字符相等（即 $x_1 = y_1, x_2 = y_2, \dots, x_\ell = y_\ell$）的最大整数 $\ell \ge 0$。

你的任务是选择两个不同的位置 $i$ 和 $j$，使得 $\text{lcp}(t_i, t_j)$ 的值尽可能大，并计算这个可能的最大值。

形式化地说，你需要求出



$$
\max_{1 \le i < j \le n} \text{lcp}(t_i, t_j).
$$



你不需要输出 $i$ 或 $j$，只需输出 $\text{lcp}(t_i, t_j)$ 的最大值。

## 输入格式

第一行包含一个整数 $T$（$1 \le T \le 2 \cdot 10^5$），表示测试用例的数量。

每个测试用例包含一行，为一个字符串 $s$（$2 \le |s| \le 5 \cdot 10^5$）。保证 $s$ 仅包含小写英文字母，且所有测试用例中 $|s|$ 的总和不超过 $5 \cdot 10^5$。

## 输出格式

对于每个测试用例，在单独的一行输出一个整数，表示在所有满足 $i \neq j$ 的下标对中，$\text{lcp}(t_i, t_j)$ 的最大可能值。

## 样例

### 输入样例 1

```text
5
abac
abbbb
cbacb
babcc
aa
```

### 输出样例 1

```text
2
4
3
4
1
```
