---
problemId: ccpc-2023-final/J
language: zh
status: qoj
source: https://qoj.ac/problem/8551/statement/zh_cn
sourceHash: 3a62edee018cc8edd63ce08aff7f163093b5fbf6435c3b7dc7cd79b899d9cd99
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

Little Cyan Fish 有一棵包含 $n$ 个顶点的树。每个顶点都被标记为 $1$ 到 $n$。现在他想从顶点 $1$ 开始进行深度优先搜索。DFS 序是深度优先搜索过程中访问节点的顺序。如果一个顶点在 DFS 序中处于第 $j$ 个位置（$1 \le j \le n$），意味着它是在访问了其他 $j-1$ 个顶点之后被访问的。由于节点的子节点可以以任意顺序遍历，因此存在多种可能的 DFS 序。以下伪代码描述了生成 DFS 序的方法。函数 `generate(x)` 返回从顶点 $x$ 开始的 DFS 序：

```text
Algorithm 1 An implementation of depth-first search
1: procedure dfs(vertex x)
2: Append x to the end of dfs_order
3: for each son y of x do  Sons can be iterated in arbitrary order.
4: dfs(y)  The order might be different in each iteration.
5: end for
6: end procedure
7: procedure generate(x)
8: Root the tree at vertex x
9: Let dfs_order be a global variable
10: dfs_order ← empty list
11: dfs(x)
12: return dfs_order
13: end procedure
```

Little Cyan Fish 在整棵树上进行了 $Q$ 次深度优先搜索，每次都获得了一个 DFS 序。不幸的是，Little Cyan Fish 的内存有限，他只记得每个 DFS 序的一个片段。更不幸的是，Little Cyan Fish 无法确定他的记忆是否正确。对于每个片段，他只记得 $k$ 个数字 $a_1, a_2, \dots, a_k$。他想寻求你的帮助：是否存在一个 DFS 序，使得 $a_1, a_2, \dots, a_k$ 是该 DFS 序的一个连续子段？

## 输入格式

第一行包含两个整数 $n$ 和 $Q$ ($1 \le n, Q \le 10^5$)。

接下来的 $(n - 1)$ 行，第 $i$ 行包含两个整数 $u_i$ 和 $v_i$ ($1 \le u_i, v_i \le n$)，表示树中连接顶点 $u_i$ 和 $v_i$ 的一条边。

接下来的 $Q$ 行描述了所有查询。第 $i$ 行首先包含一个整数 $k_i$ ($k_i \ge 1$)，然后是 $k_i$ 个整数 $a_1, a_2, \dots, a_{k_i}$ ($1 \le a_i \le n$)，表示一个查询。

保证所有查询的 $k_i$ 之和不超过 $10^6$。

## 输出格式

对于每个查询，输出一行 “Yes” 或 “No”，表示答案。

## 样例

### 输入 1

```text
6 7
1 2
1 3
2 4
3 5
2 6
2 4 1
2 4 2
2 4 3
2 4 4
2 4 5
2 4 6
6 1 2 6 4 3 5
```

### 输出 1

```text
No
No
Yes
No
No
Yes
Yes
```

---

来源：[QOJ 中文题面](https://qoj.ac/problem/8551/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
