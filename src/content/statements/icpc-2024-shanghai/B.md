---
problemId: icpc-2024-shanghai/B
language: zh
status: qoj
source: https://qoj.ac/problem/9038/statement/zh_cn
sourceHash: 15aaa51d8061683acbe2bf6967a7e406b94fcc64699df2b73b2fd7465e57bcb5
---

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

Aqua 正在学习图论。在学习了深度优先搜索（Depth-First Search）之后，他写下了如下伪代码：

```text
function dfs(u)
mark u as visited
output u
for v in vertices adjacent to u
if v is not visited, then
dfs(v)
Endif
Endfor
Endfunction

function run_dfs()
for v in all vertices
if v is not visited, then
dfs(v)
Endif
Endfor
Endfunction
```

Aqua 注意到第 4 行和第 12 行存在一些非确定性行为。具体来说，遍历顶点的顺序可能是不固定的！

因此，Aqua 向你提出了以下问题：给定一个包含 $n$ 个顶点和 $m$ 条边的无向图以及一个排列 $p_1, p_2, \dots, p_n$，为了使输出顺序能够成为排列 $p$，你需要添加的最少边数是多少？此外，你需要提供所添加的边，以便 Aqua 检查你的答案。

可以证明，Aqua 的问题总是存在解。

## 输入格式

第一行包含两个整数 $n, m$ ($1 \le n \le 3 \times 10^5, 0 \le m \le 5 \times 10^5$)，分别表示顶点数和边数。

接下来 $m$ 行，第 $i$ 行包含两个整数 $u_i, v_i$ ($1 \le u_i, v_i \le n, u_i \neq v_i$)，表示第 $i$ 条边连接顶点 $u_i$ 和 $v_i$。

最后一行包含 $n$ 个整数 $p_1, p_2, \dots, p_n$，表示给定的排列。

## 输出格式

第一行输出一个整数 $k$，表示你需要添加的最少边数。

接下来 $k$ 行，第 $i$ 行包含两个整数 $a_i, b_i$，表示你想要添加的连接顶点 $a_i$ 和 $b_i$ 的第 $i$ 条边 ($1 \le a_i, b_i \le n, a_i \neq b_i$)。

如果存在多种答案，你可以输出其中任意一种。

## 样例

### 输入 1

```text
6 6
1 3
1 4
2 3
3 4
3 6
5 6
1 2 3 4 5 6
```

### 输出 1

```text
2
1 2
4 5
```

### 输入 2

```text
8 8
2 8
3 8
5 6
1 6
6 3
8 7
2 3
4 3
1 8 7 5 4 2 3 6
```

### 输出 2

```text
4
1 8
7 5
5 4
4 2
```
