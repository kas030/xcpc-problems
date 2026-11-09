---
problemId: ccpc-2022-final/C
language: zh
status: qoj
source: https://qoj.ac/problem/6503/statement/zh_cn
sourceHash: 27e4b744592fab3e022b432e7980821191ebaebc62ab5c14e21542c63baf7caa
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：2 秒；内存限制：1024 MB。

Little Cyan Fish 有一棵包含 $n$ 个顶点的树。每个顶点都被标记为 $1$ 到 $n$。现在他想从每个顶点 $x$ 开始进行深度优先搜索。DFS 序是深度优先搜索过程中访问节点的顺序。一个顶点在 DFS 序中出现在第 $j$ ($1 \le j \le n$) 个位置，意味着它是在访问了其他 $j-1$ 个顶点之后被访问的。由于节点的子节点可以以任意顺序遍历，因此可能存在多种不同的 DFS 序。以下伪代码描述了生成 DFS 序的方法。函数 `generate(x)` 返回从顶点 $x$ 开始的 DFS 序：

```text
procedure dfs(vertex x)
    Append x to the end of dfs_order
    for each son y of x do ▷ Sons can be iterated in arbitrary order.
        dfs(y) ▷ The order might be different in each iteration.
    end for
end procedure
procedure generate(x)
    Root the tree at vertex x
    Let dfs_order be a global variable
    dfs_order ← empty list
    dfs(x)
    return dfs_order
end procedure
```

令 $D_i$ 为调用 `generate(x)` 后返回的数组。Little Cyan Fish 记下了所有 $n$ 个序列 $D_1, D_2, \dots, D_n$。多年后，他已经记不清原始树的结构了。Little Cyan Fish 想知道如何利用这 $n$ 个序列恢复出原始树。请帮助他！

## 输入格式

输入包含多组测试数据。第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试数据的组数。

对于每组测试数据，第一行包含一个正整数 $n$ ($1 \le n \le 1000$)，表示树的顶点数。

接下来的 $n$ 行描述了原始树的 DFS 序。其中第 $i$ 行包含 $n$ 个整数 $D_{i,1}, D_{i,2}, \dots, D_{i,n}$，描述了一个 DFS 序。保证 $D_{i,1} = i$ 且 $D_i$ 是该原始树的一个合法 DFS 序。

保证所有测试数据的 $n^2$ 之和不超过 $2 \times 10^6$。

## 输出格式

对于每组测试数据，你需要输出 $n-1$ 行，描述你恢复出的树。在每一行中，输出两个整数 $u_i$ 和 $v_i$ ($1 \le u_i, v_i \le n$)，表示顶点 $u_i$ 和 $v_i$ 之间存在一条边。如果存在多种可能的解，你可以输出其中任意一个。保证至少存在一个解。

## 样例

### 样例输入 1

```text
4
2
1 2
2 1
3
1 2 3
2 1 3
3 2 1
4
1 2 3 4
2 1 3 4
3 2 4 1
4 2 1 3
5
1 2 4 3 5
2 4 1 3 5
3 5 1 2 4
4 2 1 3 5
5 3 1 2 4
```

### 样例输出 1

```text
1 2
1 2
2 3
1 2
2 3
2 4
1 2
1 3
2 4
3 5
```

---

来源：[QOJ 中文题面](https://qoj.ac/problem/6503/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
