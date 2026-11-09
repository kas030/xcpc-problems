---
problemId: ccpc-2023-final/E
language: zh
status: qoj
source: https://qoj.ac/problem/8546/statement/zh_cn
sourceHash: ef4ad9525a05b99ba5f2ab87d5ca2784ac63a12ade6a80bde8783c970e4b4852
---

## 题目描述

时间限制：5.0 秒；内存限制：1024 MB。

故事还在继续。现在小青鱼（Little Cyan Fish）已经掌握了 Min 或 Max 的概念。他想通过处理一些整数元组来练习他的理解。

在这里，小青鱼得到了两个序列，每个序列都是从 $1$ 到 $n$ 的数字的一个排列，我们称之为 $a_1, a_2, \dots, a_n$ 和 $b_1, b_2, \dots, b_n$。最初，他有一个元组 $(x, y)$，其中 $x = a_1$ 且 $y = b_1$。对于随后的每个索引 $i$（从 $2$ 到 $n$），他必须按照 $i$ 的升序，选择并执行以下操作之一：

-   更新 $x \leftarrow \min(x, a_i)$ 且 $y \leftarrow \min(y, b_i)$。
-   更新 $x \leftarrow \max(x, a_i)$ 且 $y \leftarrow \max(y, b_i)$。

在执行完所有 $(n - 1)$ 次操作后，小青鱼最终会得到一个元组 $(x, y)$。挑战在于，对于 $0$ 到 $(n - 1)$ 的每个 $k$ 值，计算满足 $|x - y| = k$ 的所有不同最终元组 $(x, y)$ 的数量。

## 输入格式

输入包含多个测试用例。第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试用例的数量。

对于每个测试用例，第一行包含一个整数 $n$ ($2 \le n \le 5 \times 10^5$)。 下一行包含 $n$ 个整数 $a_1, a_2, \dots, a_n$ ($1 \le a_i \le n$，$a_i \neq a_j$，对于所有 $1 \le i < j \le n$)。 下一行包含 $n$ 个整数 $b_1, b_2, \dots, b_n$ ($1 \le b_i \le n$，$b_i \neq b_j$，对于所有 $1 \le i < j \le n$)。

保证所有测试用例的 $n$ 之和不超过 $5 \times 10^5$。

## 输出格式

对于每个测试用例，输出一行，包含 $n$ 个整数。第 $i$ 个整数表示 $k = i - 1$ 时的答案。

## 样例

### 样例输入 1

```text
4
2
1 2
2 1
5
2 4 1 5 3
2 4 1 5 3
5
1 2 3 4 5
5 4 3 2 1
8
5 8 3 4 2 7 1 6
4 6 3 8 5 1 2 7
```

### 样例输出 1

```text
2 0
5 0 0 0 0
2 2 2 2 0
5 5 2 2 1 0 0 0
```
