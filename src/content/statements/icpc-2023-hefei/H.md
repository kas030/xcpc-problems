---
problemId: icpc-2023-hefei/H
language: zh
status: qoj
source: https://qoj.ac/problem/7881/statement/zh_cn
sourceHash: a0a88a46ec3ca4515133f13b0a5b12b97085f3b09bfc642dd803b9dfd2a32dd0
---

## 题目描述

时间限制：1.0 秒；内存限制：1024 MB。

Mr. Ham 在算法课程中学习了计算复杂度。设 $T(n)$ 为算法在输入规模为 $n$ 时所需的运行时间。例如，对于归并排序算法，我们有以下递归方程：

$$
T(n) = 2T\left(\left\lfloor\frac{n}{2}\right\rfloor\right) + O(n)
$$

我们可以从算法教材中得到其上界 $T(n) = O(n \log n)$。

Mr. Ham 是一个热爱学习和探索的好孩子，所以他决定尝试一个更难的问题。考虑两个相互调用的算法 $A_1(n)$ 和 $A_2(n)$。它们满足以下调用关系：

$A_1(n)$ 调用 $A_2\left(\left\lfloor\frac{n}{2}\right\rfloor\right), A_2\left(\left\lfloor\frac{n}{3}\right\rfloor\right), A_2\left(\left\lfloor\frac{n}{5}\right\rfloor\right)$ 和 $A_2\left(\left\lfloor\frac{n}{7}\right\rfloor\right)$，

$A_2(n)$ 调用 $A_1\left(\left\lfloor\frac{n}{2}\right\rfloor\right), A_1\left(\left\lfloor\frac{n}{3}\right\rfloor\right), A_1\left(\left\lfloor\frac{n}{4}\right\rfloor\right)$ 和 $A_1\left(\left\lfloor\frac{n}{5}\right\rfloor\right)$。

Mr. Ham 想知道这两个算法所需的精确时间。

该问题可以形式化描述如下：

设 $f(n)$ 为 $A_1(n)$ 所需的操作数，$g(n)$ 为 $A_2(n)$ 所需的操作数。它们满足以下递归关系：

$$
f(n) = \max\left(n, g\left(\left\lfloor\frac{n}{2}\right\rfloor\right) + g\left(\left\lfloor\frac{n}{3}\right\rfloor\right) + g\left(\left\lfloor\frac{n}{5}\right\rfloor\right) + g\left(\left\lfloor\frac{n}{7}\right\rfloor\right)\right)
$$

$$
g(n) = \max\left(n, f\left(\left\lfloor\frac{n}{2}\right\rfloor\right) + f\left(\left\lfloor\frac{n}{3}\right\rfloor\right) + f\left(\left\lfloor\frac{n}{4}\right\rfloor\right) + f\left(\left\lfloor\frac{n}{5}\right\rfloor\right)\right)
$$

给定 $f(0), g(0)$ 和 $M$ 的值，Mr. Ham 想知道 $f(m)$ 和 $g(m)$ 的值，结果对 $M$ 取模。

注意 $\lfloor x \rfloor$ 表示不超过 $x$ 的最大整数，例如 $\lfloor 0.5 \rfloor = 0, \lfloor 11.3 \rfloor = 11, \lfloor 101.9 \rfloor = 101, \lfloor 99 \rfloor = 99, \lfloor 0 \rfloor = 0, \lfloor 2 \rfloor = 2$。

## 输入格式

第一行包含四个数字，即 $f(0), g(0), T, M$ ($0 \le f(0), g(0), T \le 10^5, 2 \le M \le 10^{15}$)。

接下来的 $T$ 行，每行包含一个整数 $m$ ($0 \le m \le 10^{15}$)，用于查询 $f(m) \pmod M$ 和 $g(m) \pmod M$ 的值。

## 输出格式

输出 $T$ 行，每行包含两个数字 $f(m) \pmod M$ 和 $g(m) \pmod M$，中间用空格分隔。

## 样例

### 样例输入 1

```text
1958 920 10 100000000000
0
1
2
3
10
100
200
1000
19580920
20232023
```

### 样例输出 1

```text
1958 920
3680 7832
10592 9554
17504 11276
50294 64826
784112 893714
1894550 1905470
12057866 12979424
71481494756 48626708512
28127864908 7251681354
```

### 样例输入 2

```text
0 0 10 100000000000
0
1
2
3
4
10
20
30
40
100
```

### 样例输出 2

```text
0 0
1 1
2 2
3 3
4 4
11 12
25 26
41 41
55 58
162 172
```
