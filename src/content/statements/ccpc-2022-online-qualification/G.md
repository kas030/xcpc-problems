---
problemId: ccpc-2022-online-qualification/G
language: zh
status: qoj
source: https://qoj.ac/problem/14540/statement/zh_cn
sourceHash: ccd9c528f30636e550dc5dc9a367ae45cbdb3720effdf5107285aedd9cf6445f
---

## 题目描述

时间限制：1.0 秒；内存限制：512 MB。

源源在七夕节买了一只可爱的小狗。但在告诉他的爱人之前，他需要给小狗起个名字。

令 $\overline{s}$ 表示字符串 $s$ 的翻转。给定一个长度为 $n$ 的字符串 $s$，如果一个长度为 $n'$ ($n' < n$) 的字符串 $s'$ 既是 $s$ 的前缀，且 $\overline{s'}$ 也是 $s$ 的后缀，则称 $s'$ 是 $s$ 的一个 anti-border。

他的爱人非常喜欢 anti-border，因此源源决定为小狗选择一个拥有最长 anti-border 的名字。然而，源源只能选择一个他会拼写的名字。

正式地讲，源源会拼写的单词集合为 $\{s_1, s_2, s_3, \dots, s_n\}$。所有可能的名字组成的集合 $S$ 定义如下：

-   $s_i \in S$ ($1 \le i \le n$)。
-   若 $x, y \in S$，则 $x + y \in S$。这里的 $+$ 表示简单的字符串拼接。

令 $f(s)$ 表示 $s$ 的最长 anti-border 的长度。请帮助源源计算 $\max_{x \in S} \{f(x)\}$，或者告诉他结果是无穷大（infinity）。

## 输入格式

第一行包含一个整数 $n$，表示字符串的数量。

第 $i + 1$ 行（$1 \le i \le n$）包含一个字符串 $s_i$。

保证 $1 \le n \le 5000$，$1 \le \sum_{i=1}^n |s_i| \le 5000$，且单词仅由小写字母组成。

## 输出格式

如果结果为无穷大，输出 `INF`；否则输出一个整数表示结果。

## 样例

### 输入样例 1

```text
4
ab
cbba
bccd
eddc
```

### 输出样例 1

```text
6
```

### 输入样例 2

```text
3
abcdefg
gfe
dcba
```

### 输出样例 2

```text
INF
```

## 说明

在第一个样例中，当 $x = s_1 + s_3 + s_4 + s_2$ 时，$f(x) = 6$。可以证明不存在 $x \in S$ 使得 $f(x) > 6$。因此结果为 6。
