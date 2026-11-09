---
problemId: ccpc-2026-qinhuangdao-invitational/D
language: zh
status: qoj
source: https://qoj.ac/problem/18947
sourceHash: a2a47f9c618ebeb6396f1612fa25e41e488f5c6da62e03bdbac5a71d6b8d8308
---

## 题目描述

时间限制：5 秒；内存限制：256 MB。

我们可以定义 $AB$ 表示两个字符串 $A$，$B$ 相连接，例如 $A = \texttt{aab}$，$B = \texttt{ab}$，则 $AB = \texttt{aabab}$。

并递归地定义 $A^1=A$，$A^n = A^{n - 1} A$（$n \ge 2$ 且为正整数）。例如 $A = \texttt{abb}$，则 $A^3=\texttt{abbabbabb}$。

现给定一个长度为 $n$ 的字符串 $S$，给定常数 $k$，求 $S = A^iB_1B_2\dots B_kC^j$ 的方案数，其中 $A,B_1,B_2,\dots,B_k,C$ 为任意非空字符串，$i,j$ 为任意正整数。

两种方案不同当且仅当 $A$、$B_1$、$B_2$、$\dots$、$B_k$、$C$、$i$、$j$ 中有至少一个字符串或数字不同。

答案要对 $998244353$ 取模。

## Input

第一行两个正整数 $n,k\ (2\le n\le5\times 10^5,0\le k\le n-2)$，第二行一个字符串 $S$，意义见题目描述。$S$ 仅由英文小写字母构成。

## Output

输出一行一个整数表示答案。

## Examples

### Input 1

```text
5 1
aabcc
```

### Output 1

```text
11
```

### Input 2

```text
6 2
aaaaaa
```

### Output 2

```text
19
```

### Input 3

```text
8 1
aabaabcd
```

### Output 3

```text
27
```

## Note

对于第一组样例，有以下 $11$ 种方案：

-   $A = a,   \quad B_1 = a,   \quad C = bcc, \quad i = 1, \quad j = 1$
-   $A = a,   \quad B_1 = ab,  \quad C = cc,  \quad i = 1, \quad j = 1$
-   $A = a,   \quad B_1 = abc, \quad C = c,   \quad i = 1, \quad j = 1$
-   $A = aa,  \quad B_1 = b,   \quad C = cc,  \quad i = 1, \quad j = 1$
-   $A = aa,  \quad B_1 = bc,  \quad C = c,   \quad i = 1, \quad j = 1$
-   $A = aab, \quad B_1 = c,   \quad C = c,   \quad i = 1, \quad j = 1$
-   $A = a,   \quad B_1 = ab,  \quad C = c,   \quad i = 1, \quad j = 2$
-   $A = a,   \quad B_1 = b,   \quad C = c,   \quad i = 2, \quad j = 2$
-   $A = aa,  \quad B_1 = b,   \quad C = c,   \quad i = 1, \quad j = 2$
-   $A = a,   \quad B_1 = b,   \quad C = cc,  \quad i = 2, \quad j = 1$
-   $A = a,   \quad B_1 = bc,  \quad C = c,   \quad i = 2, \quad j = 1$
