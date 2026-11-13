---
problemId: icpc-2024-online-qualification-1/I
language: zh
status: qoj
source: https://qoj.ac/problem/9316/statement/zh_cn
sourceHash: 0b3452cf464b31f32163614d3870f0029665d88957b1f9049b5d98ec7ac39fd2
---

## 题目描述

时间限制：1.0 秒；内存限制：1024 MB。

给定三维空间中的 $n$ 个点，任务是将它们划分为若干个互不相交的子集 $S_1, S_2, \dots, S_k$。对于任意 $i \neq j$，该划分必须满足以下三个条件中的至少一个：

1.  $\text{volume}(\text{conv}(S_i) \cap \text{conv}(S_j)) = 0$
2.  $\text{conv}(S_i) \subseteq \text{conv}(S_j)$
3.  $\text{conv}(S_j) \subseteq \text{conv}(S_i)$

其中，子集 $S_i$ 的凸包 $\text{conv}(S_i)$ 定义为： 

$$
\text{conv}(S_i) = \left\{ \sum_{p \in S_i} \lambda_p p \mid \lambda_p \geq 0, \sum_{p \in S_i} \lambda_p = 1 \right\}
$$

目标是最大化 

$$
6 \sum_{i=1}^k \text{volume}(\text{conv}(S_i))
$$

挑战在于找到一个最优划分，在满足上述约束的前提下，使得凸包体积之和最大。

## 输入格式

输入文件包含多组测试数据。第一行包含一个整数 $T$ ($1 \leq T \leq 3000$)，表示测试数据的组数。

对于每组测试数据，第一行包含一个整数 $n$ ($4 \leq n \leq 3000$)，表示点的数量。接下来的 $n$ 行，每行包含三个整数 $x_i, y_i, z_i$ ($0 \leq x_i, y_i, z_i \leq 10^6$)，表示三维空间中点 $p_i$ 的坐标。

保证任意四点不共面，且所有测试数据的 $n$ 之和不超过 $3000$。

## 输出格式

对于每组测试数据，输出一个整数，表示在给定条件下凸包体积之和的最大值乘以 6 的结果。可以证明该值始终为整数。

## 样例

### 输入 1

```text
2
4
0 0 1
0 0 2
0 1 1
1 1 1
10
2 6 3
2 9 0
2 1 0
3 7 3
0 5 6
10 9 2
4 4 2
8 5 2
4 6 9
6 7 5
```

### 输出 1

```text
1
943
```
