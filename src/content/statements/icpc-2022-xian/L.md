---
problemId: icpc-2022-xian/L
language: zh
status: qoj
source: https://qoj.ac/problem/5124/statement/zh_cn
sourceHash: ab666bb0462c503ae7d526b6fbf7985b4b36c0b3fab653a07ddfac2d0dc36bc5
---

## 题目描述

时间限制：2 秒；内存限制：512 MB。

给定一棵有 $n$ 个节点的树 $T$，根节点为 $1$。定义 $\text{subtree}(u)$ 为 $u$ 的子树中所有节点的集合。

称一个节点子集 $S$ 是“好的”，当且仅当 $S$ 满足以下至少一个条件： <em>对于 $S$ 中所有 $u \neq v$ 的节点，满足 $u \in \text{subtree}(v)$ 或 $v \in \text{subtree}(u)$。</em> 对于 $S$ 中所有 $u \neq v$ 的节点，满足 $u \notin \text{subtree}(v)$ 且 $v \notin \text{subtree}(u)$。

你需要将 $T$ 的所有节点划分为若干个好的子集，并计算所需的最少子集数量。

## 输入格式

第一行包含一个整数 $Q$ ($1 \le Q \le 10^5$)，表示测试用例的数量。 对于每个测试用例，第一行包含一个整数 $n$ ($1 \le n \le 10^6$)。下一行包含 $n-1$ 个整数 $p_2, p_3, \dots, p_n$ ($1 \le p_i < i$)，表示对于每个 $i = 2, 3, \dots, n$，节点 $p_i$ 和 $i$ 之间有一条边。 保证所有测试用例的 $n$ 之和不超过 $10^6$。

## 输出格式

对于每个测试用例，输出一个整数，表示答案。

## 样例

### 输入 1

```text
2
7
1 1 2 2 2 3
5
1 2 3 4
```

### 输出 1

```text
3
1
```
