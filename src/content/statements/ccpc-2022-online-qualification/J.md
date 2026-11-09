---
problemId: ccpc-2022-online-qualification/J
language: zh
status: qoj
source: https://qoj.ac/problem/14543/statement/zh_cn
sourceHash: 31559eec8d6f2894be18f83c8d75f44ed7017289da677539f44b8e1132235276
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1.0 秒；内存限制：512 MB。

Alice 喜欢研究排列。对于一个 $n$ 阶排列 $P = (p_1, p_2, \dots, p_n)$，她定义 $w(P) = |S|$，其中 $S = \{p_i - p_{(i \bmod n)+1} \mid 1 \le i \le n\}$。例如，如果 $P = (2, 4, 5, 3, 1)$，那么 $S = \{2, -1, -2\}$，$w(P) = |S| = 3$。

Alice 希望 $S$ 尽可能简单，因此她想找到所有使得 $w(P)$ 最小的 $n$ 阶排列 $P$（她将这些排列定义为“好排列”）。然而，好排列的数量可能非常多。因此，她写下了三个整数 $m, s, t$，并希望你求出满足 $p_1 = s$ 且 $p_m = t$ 的好排列 $P = (p_1, p_2, \dots, p_n)$ 的数量。

## 输入格式

仅一行，包含 $4$ 个整数 $n, m, s, t$（$3 \le n \le 10^{12}$，$2 \le m \le n$，$1 \le s, t \le n$，$s \ne t$）。

## 输出格式

输出一行一个整数，表示答案。

## 样例

### 输入样例 1

```text
3 2 1 3
```

### 输出样例 1

```text
1
```

### 输入样例 2

```text
4 3 1 3
```

### 输出样例 2

```text
2
```

## 说明

一个 $n$ 阶排列是一个长度为 $n$ 的整数序列，且 $\{1, 2, \dots, n\}$ 中的每个元素都恰好出现一次。

---

来源：[QOJ 中文题面](https://qoj.ac/problem/14543/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
