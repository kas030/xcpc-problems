---
problemId: ccpc-2025-zhengzhou/J
language: zh
status: qoj
source: https://qoj.ac/problem/15310/statement/zh_cn
sourceHash: 220fd8834e42f3cbb53912d38bf343954042eeedeb97e3f0c99f562a5006e031
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

给定一个长度为 $n$ ($n \ge 2$) 的整数序列 $a_1, a_2, \dots, a_n$，以及一个长度为 $m$ ($m \ge 2$) 的整数序列 $b_1, b_2, \dots, b_m$。我们可以构造一个 $n \times m$ 的矩阵 $c$，使得对于所有的 $1 \le i \le n, 1 \le j \le m$，有 $c_{i,j} = a_i \oplus b_j$，其中 $\oplus$ 表示按位异或（bitwise XOR）操作。

请你求出有多少个下标对 $(i, j)$ ($1 \le i < n, 1 \le j < m$)，满足 $c$ 中由以下形式给出的子矩阵： 

$$
\begin{bmatrix}
c_{i,j} & c_{i,j+1} \\
c_{i+1,j} & c_{i+1,j+1}
\end{bmatrix}
$$

 具有如下形式： 

$$
\begin{bmatrix}
x & x + 1 \\
x + 2 & x + 3
\end{bmatrix}
$$

 也就是说，满足 $c_{i,j+1} = c_{i,j} + 1$，$c_{i+1,j} = c_{i,j} + 2$ 且 $c_{i+1,j+1} = c_{i,j} + 3$。

## 输入格式

第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试用例的数量。

对于每个测试用例：

-   第一行包含两个空格分隔的整数 $n, m$ ($2 \le n, m \le 2 \times 10^5$)，表示矩阵 $c$ 的行数和列数。
-   第二行包含 $n$ 个空格分隔的整数，表示 $a_1, a_2, \dots, a_n$ ($0 \le a_i < 2^{30}$)。
-   第三行包含 $m$ 个空格分隔的整数，表示 $b_1, b_2, \dots, b_m$ ($0 \le b_i < 2^{30}$)。

保证所有测试用例中 $n$ 的总和不超过 $2 \times 10^5$，且 $m$ 的总和不超过 $2 \times 10^5$。

## 输出格式

对于每个测试用例，输出单行一个整数，表示满足条件的下标对 $(i, j)$ 的数量。

## 样例

### 输入样例 1

```text
5
2 2
0 2
0 1
3 3
6 4 2
6 7 10
5 4
4 6 5 1 3
1 0 2 3
7 2
7 3 1 4 0 0 1
6 5
5 5
1 7 5 3 1
3 2 7 7 6
```

### 输出样例 1

```text
1
2
1
0
6
```
