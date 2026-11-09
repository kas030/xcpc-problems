---
problemId: ccpc-2022-final/B
language: zh
status: qoj
source: https://qoj.ac/problem/6502/statement/zh_cn
sourceHash: e695cd3513227aedac372a114632e39764314ced536a44f9d0fa31e745a747d5
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：4 秒；内存限制：1024 MB。

最近，Little Cyan Fish 正在学习并查集（DSU）数据结构。这是一种强大的数据结构，允许你在图中添加边并测试图中两个顶点是否连通。

DSU 维护了一个由 $n$ 个顶点组成的有根森林结构。每个顶点 $x$ ($1 \le x \le n$) 都有一个唯一的父节点 $f[x]$。如果 $x = f[x]$，则 $x$ 是其子树的根。最初，每个顶点构成一棵单独的根树。也就是说，对于所有 $1 \le x \le n$，都有 $f[x] = x$。

DSU 的基本接口包含以下两个操作：

-   `find` $x$：返回 $x$ 所在树的根。
-   `unite` $x$ $y$：令 $x' \leftarrow \text{find}(x)$ 且 $y' \leftarrow \text{find}(y)$。如果 $x' = y'$，则什么都不做。否则，将 $x'$ 的父节点修改为 $y'$。

为了加速 `unite` 操作，Little Cyan Fish 使用了一种称为路径压缩（Path Compression）的优化：

-   如果我们对某个顶点 $x$ 调用 `find(x)`，我们将从 $x$ 到根路径上的每个顶点的父节点直接设置为根。

以下伪代码描述了 DSU 的细节。

```text
Algorithm 1 An implementation of DSU with Path Compression
1: procedure find(f, x)
2: if x = f[x] then
3: return x
4: end if
5: f[x] ← find(f, f[x])
6: return f[x]
7: end procedure
8: procedure unite(f, x, y)
9: x ← find(f, x)
10: y ← find(f, y)
11: if x ≠ y then
12: f[x] ← y
13: end if
14: end procedure
```

Little Cyan Fish 非常喜欢 DSU，所以他想玩一玩它。他得到了一个长度为 $n$ 的数组 $f$，其中最初 $f[i] = i$。然后，Little Cyan Fish 多次（可能为零次）执行了以下操作：

-   选择一个整数 $1 \le x \le n$，执行 `find(x)`。
-   选择两个整数 $1 \le x \le n$ 和 $1 \le y \le n$，执行 `unite(x, y)`。

他会在所有操作完成后给你数组 $f$。然而，你希望通过使用上述 DSU 操作将数组 $f$ 转换为另一个给定的数组 $g$。你想知道是否可以通过执行任何额外的操作，使得对于所有 $1 \le i \le n$，都有 $f[i] = g[i]$。

## 输入格式

输入包含多组测试数据。第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试数据的组数。

对于每组测试数据，第一行包含一个正整数 $n$ ($3 \le n \le 1000$)。

下一行包含 $n$ 个整数 $f_1, f_2, \dots, f_n$，表示 Little Cyan Fish 操作后的数组 $f$。保证数组 $f$ 可以通过上述操作生成。

接下来一行包含 $n$ 个整数 $g_1, g_2, \dots, g_n$，表示你想要将数组 $f$ 转换成的数组 $g$。

保证所有测试数据的 $n^2$ 之和不超过 $5 \times 10^6$。

## 输出格式

对于每组测试数据，如果无法将数组 $f$ 转换为数组 $g$，则输出一行 `NO`。

否则，输出的第一行应包含一个单词 `YES`。

输出的下一行应包含一个整数 $m$ ($0 \le m \le 2 \cdot n^2$)，表示你使用的操作次数。

接下来的 $m$ 行描述你使用的操作。每个操作按以下格式描述：

-   `1 x`：调用 `find(x)`。
-   `2 x y`：调用 `unite(x, y)`。

如果有多种方案，你可以输出其中任意一种。可以证明，如果存在任何解，则存在一个不超过 $2 \cdot n^2$ 次操作的方案。

## 样例

### 输入 1

```text
5
3
1 2 3
2 2 3
4
1 2 3 3
1 1 1 2
5
1 2 3 4 5
2 3 4 5 5
5
1 1 1 1 1
1 2 3 4 5
6
1 2 2 4 5 6
1 1 5 1 4 2
```

### 输出 1

```text
YES
1
2 1 2
YES
4
2 3 2
1 4
2 2 1
1 3
YES
4
2 1 2
2 1 3
2 2 4
2 3 5
NO
YES
7
2 6 2
2 2 5
1 3
2 2 4
1 2
2 2 1
1 2
```
