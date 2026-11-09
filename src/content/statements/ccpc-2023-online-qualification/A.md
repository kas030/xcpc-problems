---
problemId: ccpc-2023-online-qualification/A
language: zh
status: qoj
source: https://qoj.ac/problem/7512/statement/zh_cn
sourceHash: 8904ea392eee67a9657b9b7c4b1860a6bb952466527079f9af7d209973ccbaa1
---

## 题目描述

时间限制：3.0 秒；内存限制：512 MB。

长度为 $n$ 的字符串 $A = a_1a_2 \dots a_n$ 是 $n$ 个字符 $a_1, a_2, \dots, a_n$ 的拼接，其长度记为 $|A|$。类似地，两个字符串 $A = a_1a_2 \dots a_n$ 和 $B = b_1b_2 \dots b_m$ 的拼接为 $a_1a_2 \dots a_nb_1b_2 \dots b_m$，记作 $A + B$。

两个长度均为 $n$ 的字符串 $A = a_1a_2 \dots a_n$ 和 $B = b_1b_2 \dots b_n$ 之间的编辑距离定义为满足 $a_i \neq b_i$ 的下标 $i$ 的个数。

我们将由字符串 $B$ 的前 $k$ 个字符组成的字符串（$k \le |B|$）称为 $B$ 的第 $k$ 个前缀。若字符串 $P$ 满足 $|P| \le |Q|$，且 $P$ 与 $Q$ 的第 $|P|$ 个前缀之间的编辑距离不超过 $1$，则称 $P$ 为 $Q$ 的一个“准前缀”（almost prefix）。

给定两个由小写英文字母组成的字符串 $S$ 和 $T$，你需要找出将 $S$ 分割成若干部分的所有方案，使得每一部分都是 $T$ 的一个非空准前缀，并计算所有方案中部分数量的平方和，结果对 $998244353$ 取模。更正式地，设 $S = P_1 + P_2 + \dots + P_n$ 为一种可能的分割方式，你需要计算：



$$
\left( \sum_{\substack{S=P_1+P_2+\dots+P_n \\ \forall i=1,2,\dots,n, P_i \text{ 是 } T \text{ 的准前缀}}} n^2 \right) \pmod{998244353}
$$



## 输入格式

输入的第一行包含一个字符串 $S$ ($1 \le |S| \le 1\,000\,000$)，仅由小写英文字母组成。 下一行包含一个字符串 $T$ ($1 \le |T| \le 1\,000\,000$)，仅由小写英文字母组成。

## 输出格式

输出一行，包含一个整数：所有分割方案中部分数量的平方和，对 $998244353$ 取模的结果。

## 样例

### 样例输入 1

```text
ababaab
aba
```

### 样例输出 1

```text
473
```

### 样例输入 2

```text
ac
ccpc
```

### 样例输出 2

```text
5
```

## 说明

在第一个样例中（$S = \text{ababaab}, T = \text{aba}$），共有 19 种分割方式： _1 种分为 3 部分的方案，即 $\text{ab} + \text{aba} + \text{ab}$；_ 6 种分为 4 部分的方案，例如 $\text{a} + \text{b} + \text{aba} + \text{ab}$； _7 种分为 5 部分的方案，例如 $\text{a} + \text{b} + \text{ab} + \text{a} + \text{ab}$；_ 4 种分为 6 部分的方案，例如 $\text{a} + \text{b} + \text{a} + \text{b} + \text{a} + \text{ab}$； \* 1 种分为 7 部分的方案，即 $\text{a} + \text{b} + \text{a} + \text{b} + \text{a} + \text{a} + \text{b}$。

因此，第一个样例的结果为 $(3^2 + 6 \times 4^2 + 7 \times 5^2 + 4 \times 6^2 + 7^2) \pmod{998244353} = 473$。
