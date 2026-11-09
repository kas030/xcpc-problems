---
problemId: icpc-2026-shenyang-invitational/H
language: zh
status: qoj
source: https://qoj.ac/problem/19020
sourceHash: 43c89c8c583c43ff9de9fef9405c8b4a3687accf5fc29f3948fcdfba4d0c0806
---

## 题目描述

时间限制：3 秒；内存限制：1024 MB。

小 N 定义了一个关于两个字符串 $X$ 和 $Y$（两个字符串下标从 $1$ 开始）的函数 $f(X, Y)$ ，满足：

$\begin{aligned} f(X, Y) = \sum_{i = 1}^{\min(\vert X \vert, \vert Y \vert)} [X_i = Y_i] \end{aligned}$

（对于一个命题 $A$ ，若 $A$ 为真命题，则 $[A] = 1$ ，否则，$[A] = 0$）

也就是字符串 $X$ 和 $Y$ 中对应字符相同的个数。例如 $f(\texttt{axc}, \texttt{abc}) = 2$ ，$f(\texttt{abxc}, \texttt{abc}) = 2$ ，$f(\texttt{abc}, \texttt{abxc}) = 2$

现在，小 N 给了一个长度为 $n$ 且只包含英文小写字母的字符串 $S$ ，$S_i$ 表示字符串 $S$ 中从第 $i$ 位开始的后缀，请你对于每个 $k = 1, 2, \dots n$ ，输出 $f(S_1, S_k) + f(S_2, S_k) + \dots + f(S_n, S_k)$ 。

## Input

输入共两行。

第一行，一个整数 $n$ $(1 \le n \le 10^5)$，表示字符串 $S$ 的长度。

第二行，一个长度为 $n$ 且只包含英文小写字母的字符串 $S$。

## Output

共 $n$ 行，第 $k$ 行表示 $f(S_1, S_k) + f(S_2, S_k) + \cdots + f(S_n, S_k)$ 的值。

## Examples

### Input 1

```text
3
abb
```

### Output 1

```text
4
4
2
```

### Input 2

```text
11
mississippi
```

### Output 2

```text
24
26
23
24
21
17
15
11
7
6
4
```

## Note

对于样例 1，$S_1 = \texttt{abb}$ ，$S_2 = \text{bb}$ ，$S_3 = \texttt{b}$。

在 $k = 1$ 时，$f(S_1, S_1) + f(S_2, S_1) + f(S_3, S_1) = 3 + 1 + 0 = 4$ 。

在 $k = 2$ 时，$f(S_1, S_2) + f(S_2, S_2) + f(S_3, S_2) = 1 + 2 + 1 = 4$ 。

在 $k = 3$ 时，$f(S_1, S_3) + f(S_2, S_3) + f(S_3, S_3) = 0 + 1 + 1 = 2$ 。
