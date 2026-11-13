---
problemId: icpc-2023-ecfinal/F
language: zh
status: qoj
source: https://qoj.ac/problem/8052/statement/zh_cn
sourceHash: ca32af1346818ac0a5719a9f08be78dda49f1a5cbdd10ca32dbb10d8660a247b
---

## 题目描述

时间限制：1.0 秒；内存限制：1024 MB。

这是关于 Kevin 和 Little Cyan Fish 的另一个故事。

Kevin 是国际凸多边形锦标赛（ICPC）的首席裁判。他为比赛提出了一个几何题目，但由于他在计算几何方面经验不足，他无法为该题的测试生成一个正确的凸多边形。

现在，Little Cyan Fish 正在教 Kevin 如何使用叉积来检查给定的多边形是否为凸多边形。Kevin 学得非常好。在那之后，Kevin 决定学习更多关于其他积形式的知识，特别是点积。

请注意，本题中点积的定义是非标准的：考虑两个长度为 $n$ 的数组，记作 $a_1, a_2, \dots, a_n$ 和 $b_1, b_2, \dots, b_n$。点积 $c = a \cdot b$ 的结果是一个长度为 $n$ 的新数组，其中每个元素 $c_i = a_i \cdot b_i$。例如，$[0, 8] \cdot [1, 5] = [0, 40]$ 且 $[2, 3] \cdot [4, 5] = [8, 15]$。

Little Cyan Fish 给 Kevin 一个整数 $1, 2, \dots, n$ 的排列 $a_1, a_2, \dots, a_n$，以及另一个定义为 $b_i = i$ 的排列。挑战在于通过交换排列 $a$ 中的相邻元素，使得 $a \cdot b$ 的结果序列单调不减。例如，排列 $a = [2, 1, 3]$ 满足此条件，因为 $a \cdot b = [2, 2, 9]$。然而，排列 $[3, 2, 1]$ 不满足该标准，因为 $a \cdot b = [3, 4, 3]$ 并不是单调不减的。

给定排列 $a$，你能帮助 Kevin 计算实现 Little Cyan Fish 设定的目标所需的最少交换次数吗？

## 输入格式

输入文件包含多组测试数据。输入的第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试数据的组数。

对于每组测试数据，第一行包含一个正整数 $n$ ($1 \le n \le 5 \times 10^5$)。

下一行包含 $n$ 个整数 $a_1, \dots, a_n$ ($1 \le a_i \le n$)，表示排列 $a$。保证 $a_1, \dots, a_n$ 构成一个排列，即当 $i \neq j$ 时，$a_i \neq a_j$。

保证所有测试数据的 $n$ 之和不超过 $5 \times 10^5$。

## 输出格式

输出一行，包含一个整数，表示答案。

## 样例

### 样例输入 1

```text
4
3
3 1 2
4
4 3 2 1
5
2 1 5 4 3
1
1
```

### 样例输出 1

```text
1
4
2
0
```
