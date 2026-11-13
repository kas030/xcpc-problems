---
problemId: icpc-2022-jinan/C
language: zh
status: qoj
source: https://qoj.ac/problem/5139/statement/zh_cn
sourceHash: 3e6bfb573920f6dd9b68194d072d9202819bb3775c4c512db3ad372cd44d6880
---

## 题目描述

时间限制：1.5 秒；内存限制：512 MB。

Prof. Pang 有一棵以顶点 1 为根的有根树，共有 $n$ 个节点。这些节点编号为 1 到 $n$。

现在他想从根节点开始进行深度优先搜索。他想知道对于每个节点 $v$，它出现在深度优先搜索序列中第 $j$ 个位置的方法数。深度优先搜索序列是指在深度优先搜索过程中访问节点的顺序。一个节点出现在该序列的第 $j$ ($1 \le j \le n$) 个位置，意味着它是在访问了其他 $j-1$ 个节点之后被访问的。由于节点的子节点可以以任意顺序遍历，因此存在多种可能的深度优先搜索序列。

Prof. Pang 想知道对于每个节点 $v$，有多少种不同的深度优先搜索序列使得 $v$ 出现在第 $j$ 个位置。对于每个 $v, j$ ($1 \le v, j \le n$)，计算该答案。由于答案可能非常大，请输出其对 998244353 取模的结果。

以下是该有根树深度优先搜索的伪代码。在调用 `main()` 后，`dfs_order` 即为深度优先搜索序列。

```text
Algorithm 1 An implementation of depth-first search
1: procedure dfs(vertex x)
2: Append x to the end of dfs_order
3: for each son y of x do ▷ Sons can be iterated in arbitrary order.
4: dfs(y)
5: end for
6: end procedure
7: procedure main()
8: Let dfs_order be a global variable
9: dfs_order ← empty list
10: dfs(1)
11: end procedure
```

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 500$)，表示树的顶点数。

接下来的 $n-1$ 行，每行描述树的一条边。第 $i$ 条边由两个整数 $u_i$ 和 $v_i$ 表示，即它所连接的顶点标签 ($1 \le u_i, v_i \le n, u_i \neq v_i$)。

保证给定的边构成一棵树。

## 输出格式

对于每个从 1 到 $n$ 的顶点 $v$，输出一行，包含 $n$ 个对 998244353 取模后的整数。第 $v$ 行的第 $j$ 个整数应为使得 $v$ 出现在第 $j$ 个位置的不同深度优先搜索序列的数量。

## 样例

### 输入 1

```text
5
1 2
1 3
3 4
3 5
```

### 输出 1

```text
4 0 0 0 0
0 2 0 0 2
0 2 2 0 0
0 0 1 2 1
0 0 1 2 1
```
