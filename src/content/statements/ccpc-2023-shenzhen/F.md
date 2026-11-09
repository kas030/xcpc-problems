---
problemId: ccpc-2023-shenzhen/F
language: zh
status: qoj
source: https://qoj.ac/problem/8333/statement/zh_cn
sourceHash: 09e51285227f6eb4022effd38e0f1623ccbb3123e90e7674ee06afa37abdab7d
---

## 题目描述

时间限制：1.0 秒；内存限制：256 MB。

给定一个包含 $n$ 个顶点和 $n$ 条边的无向图，你需要计算有多少种选择顶点 $p$ 和边 $(x, y)$ 的方案，使得移除边 $(x, y)$ 后，图变成一棵树，且当这棵树以 $p$ 为根时，每个节点的子节点数量不超过 3 个。保证至少存在一种可能的方案。

## 输入格式

第一行包含一个整数 $n$ ($2 \le n \le 10^5$)。

接下来的 $n$ 行描述了图的边。第 $i$ 行包含两个整数 $x_i$ 和 $y_i$ ($1 \le x_i, y_i \le n, x_i \neq y_i$)，表示第 $i$ 条边。

保证图中没有重边或自环。

## 输出格式

输出一行，包含一个整数，表示答案。

## 样例

### 输入 1

```text
6
1 2
1 3
1 4
1 5
1 6
2 3
```

### 输出 1

```text
10
```
