---
problemId: ccpc-2026-nanchang-invitational/B
language: zh
status: qoj
source: https://qoj.ac/problem/18946
sourceHash: 3f4d35fde6a21ab9ca3bf92c58c6dd10a1b920022dab1bc1b374109bfd05e655
---

## 题目描述

时间限制：10 秒；内存限制：512 MB。

给定一棵 $n$ 个节点的无根树 $T$，节点编号为 $1$ 到 $n$，每条边有一个整数边权（可能为负）。

定义树上两点 $a,b$ 的距离 $\operatorname{dis}(a,b)$ 为它们之间的唯一简单路径上的边权之和。

现有 $q$ 次查询，每次查询给定两个节点 $x$ 和 $y$，请你计算并输出：

$$
\max_{u \in T}\bigl(\operatorname{dis}(x,u)+\operatorname{dis}(y,u)\bigr)
$$

## Input

第一行两个整数 $n,q$ ($1\le n,q\le 5\times 10^5$)，分别表示树的节点数和查询次数。

接下来 $n-1$ 行，每行三个整数 $u,v,w$ ($1\le u,v\le n$, $|w|\le 10^9$)，表示节点 $u$ 与节点 $v$ 之间有一条边权为 $w$ 的边。保证输入构成一棵树。

接下来 $q$ 行，每行两个整数 $x,y$ ($1\le x,y\le n$)，表示一次查询。

## Output

共 $q$ 行，对于每次查询，输出一行一个整数，表示所求的最大值。

## Examples

### Input 1

```text
4 3
1 2 1
2 3 2
2 4 -1
1 1
1 2
1 3
```

### Output 1

```text
6
5
3
```
