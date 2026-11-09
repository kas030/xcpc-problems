---
problemId: icpc-2026-chengdu/A
language: zh
status: qoj
source: https://qoj.ac/problem/23592/statement/zh_cn
sourceHash: ba13a7a0c917a961e0263758569c01bda4baa00dbf494836aa589c6c8d970c62
---

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

_平均值的平均值并不总是等于平均值。_

VegiCat 刚刚学习了线段树，想要练习使用它们。

对于正整数 $n$，他考虑序列 $a_i = i$（$1 \le i \le n$）。他决定建立一棵线段树来回答该序列上的**区间平均值**查询。

在 VegiCat 的线段树中，每个节点对应一个区间 $[l, r]$ 并存储一个值 $v_{l,r}$，VegiCat 希望用它表示该区间上的平均值。根节点对应整个区间 $[1, n]$。

![problem\_23592\_1a491bf2ea3d5c638f75cb749b35c44a.png](../../../assets/qoj-statements/23592/9ce1e3ef9cd637a0.png)

然而，VegiCat 错误地认为父区间的平均值总是等于其两个子节点中所存储值的平均值。因此，他将两个子节点中存储的值相加并将和除以 $2$。

VegiCat 首先通过调用 $\text{Build}(1, n)$ 构建线段树。在线段树构建完成后，他通过调用 $\text{Query}(1, n, L, R)$ 来回答区间 $[L, R]$ 的查询。这两个递归过程如算法 1 所示。

**算法 1** 构建与查询



$$
\begin{array}{rl}
1: & \textbf{procedure } \text{Build}(l, r) \\
2: & \quad \textbf{if } l = r \textbf{ then} \\
3: & \quad \quad v_{l,l} \leftarrow a_l \\
4: & \quad \quad \textbf{return} \\
5: & \quad \textbf{end if} \\
6: & \quad m \leftarrow \left\lfloor \dfrac{l + r}{2} \right\rfloor \\
7: & \quad \text{Build}(l, m) \\
8: & \quad \text{Build}(m + 1, r) \\
9: & \quad v_{l,r} \leftarrow \dfrac{v_{l,m} + v_{m+1,r}}{2} \\
10: & \textbf{end procedure} \\[6pt]
11: & \textbf{procedure } \text{Query}(l, r, L, R) \\
12: & \quad \textbf{if } L \le l \textbf{ and } r \le R \textbf{ then} \\
13: & \quad \quad \textbf{return } v_{l,r} \\
14: & \quad \textbf{end if} \\
15: & \quad m \leftarrow \left\lfloor \dfrac{l + r}{2} \right\rfloor \\
16: & \quad \textbf{if } R \le m \textbf{ then} \\
17: & \quad \quad \textbf{return } \text{Query}(l, m, L, R) \\
18: & \quad \textbf{else if } L > m \textbf{ then} \\
19: & \quad \quad \textbf{return } \text{Query}(m + 1, r, L, R) \\
20: & \quad \textbf{end if} \\
21: & \quad x \leftarrow \text{Query}(l, m, L, R) \\
22: & \quad y \leftarrow \text{Query}(m + 1, r, L, R) \\
23: & \quad \textbf{return } \dfrac{x + y}{2} \\
24: & \textbf{end procedure}
\end{array}
$$



尽管 VegiCat 的算法在一般情况下是不正确的，但它对某些区间会返回正确的平均值。请统计这类区间的数量。

对于一个区间 $[L, R]$，其真实平均值为



$$
\frac{\sum_{i=L}^{R} a_i}{R - L + 1}.
$$



更确切地说，请统计满足 $1 \le L \le R \le n$ 且使得下式成立的数对 $(L, R)$ 的数量：



$$
\text{Query}(1, n, L, R) = \frac{\sum_{i=L}^{R} a_i}{R - L + 1}.
$$



所有平均值均作为精确的**有理数**进行计算，不进行四舍五入或截断。

## 输入格式

第一行包含一个整数 $T$（$1 \le T \le 10^4$），表示测试数据的组数。接下来是各组测试数据的描述。

接下来的 $T$ 行中，每行包含一个整数 $n$（$1 \le n \le 10^6$），表示序列的长度。

保证所有测试数据中 $n$ 的总和不超过 $2 \cdot 10^6$。

## 输出格式

对于每组测试数据，输出一个整数——使得 VegiCat 的查询过程恰好返回真实平均值的区间 $[L, R]$ 的数量。

## 样例

### 样例输入 1

```text
3
1
5
14
```

### 样例输出 1

```text
1
10
35
```

### 说明

对于第二组测试数据，$n = 5$，共有 $10$ 个合法区间：



$$
\begin{aligned}
&[1, 1],\ [1, 2],\ [2, 2],\ [2, 3],\ [2, 5], \\
&[3, 3],\ [3, 4],\ [4, 4],\ [4, 5],\ [5, 5].
\end{aligned}
$$



例如，查询 $[2, 5]$ 返回



$$
\frac{\frac{2+3}{2} + \frac{4+5}{2}}{2} = \frac{7}{2},
$$



这等于 $2, 3, 4, 5$ 的真实平均值。因此，$[2, 5]$ 被计入答案。

相比之下，查询 $[1, 5]$ 返回



$$
\frac{\frac{\frac{1+2}{2}+3}{2} + \frac{4+5}{2}}{2} = \frac{27}{8},
$$



而其真实平均值为 $3$。因此，$[1, 5]$ 不被计入答案。

---

来源：[QOJ 中文题面](https://qoj.ac/problem/23592/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
