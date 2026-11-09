---
problemId: ccpc-2025-jinan/I
language: zh
status: qoj
source: https://qoj.ac/problem/15040/statement/zh_cn
sourceHash: 2ee8c3a4045abd6474d79168c7bf7360510bcc21c0777b26664146c6ff572d31
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

一个由小写字母组成、长度为 $k$ 的字符串 $t$ 被称为 CCPC（Character-Character-Palindrome-Character，字符-字符-回文-字符）字符串，当且仅当它满足以下性质：

-   $t$ 的长度至少为 4，即 $k \ge 4$；
-   $t$ 的第一个字符、第二个字符和最后一个字符相等，即 $t_1 = t_2 = t_k$；
-   $t$ 的剩余部分是一个回文串，即 $t_3 t_4 \dots t_{k-1}$ 是一个回文串。

例如，`ccpc`、`ppap`、`zzzz` 和 `aabcddcba` 都是 CCPC 字符串，而 `jinan`、`aaa` 和 `oovoo` 则不是。

字符串 $s$ 的子串可以用两个下标 $1 \le l \le r \le |s|$ 来表示，对应内容为 $s_l s_{l+1} \dots s_r$。在本题中，两个子串被视为不同的，当且仅当所选的下标 $l, r$ 不相同。给定一个仅包含小写字母的字符串 $s$，首先计算其中 CCPC 子串的数量。然后将进行 $n$ 次操作，每次操作会在 $s$ 的左侧或右侧插入一个小写字母。你需要确定每次插入后 CCPC 子串的数量。

## 输入格式

本题包含多组测试数据。输入的第一行包含一个整数 $T$（$1 \le T \le 100$），表示测试数据的组数。

对于每组测试数据：

第一行包含一个仅由小写字母组成的字符串 $s$（$4 \le |s| \le 5 \times 10^5$），表示字符串的初始内容。

下一行包含一个整数 $n$（$1 \le n \le 5 \times 10^5$），表示操作的次数。

接下来的一行包含 $n$ 个长度为 2 的字符串 $c_1, c_2, \dots, c_n$，用空格隔开。这里 $c_i$ 表示第 $i$ 次操作的内容：第一个字符为 `L` 表示在左侧插入，为 `R` 表示在右侧插入；第二个字符表示要插入的小写字母。

保证所有测试数据的 $|s|$ 之和以及 $n$ 之和均不超过 $5 \times 10^5$。

## 输出格式

对于每组测试数据，输出一行，包含 $n + 1$ 个整数。第一个整数表示初始状态下的答案，随后是 $n$ 个整数，其中第 $i$ 个整数表示前 $i$ 次操作后的答案。

## 样例

### 输入样例 1

```text
2
iloveccpc
6
Rj Ri Ln La Ln Ln
cpcpccp
9
Lc Lc Rp Rc Lc Lc Rp Rp Rc
```

### 输出样例 1

```text
1 1 1 1 1 1 2
0 2 3 3 4 5 7 8 8 9
```

## 说明

对于第二组测试数据，在所有操作完成后，字符串 $s$ 的内容为 `cccccpcpccppcppc`。其中的 CCPC 子串包括：$s_{1\dots4} = \text{cccc}$，$s_{1\dots5} = \text{ccccc}$，$s_{2\dots5} = \text{cccc}$，$s_{3\dots10} = \text{cccpcpcc}$，$s_{4\dots7} = \text{ccpc}$，$s_{4\dots9} = \text{ccpcpc}$，$s_{9\dots13} = \text{ccppc}$，$s_{9\dots16} = \text{ccppcppc}$，以及 $s_{11\dots14} = \text{ppcp}$。
