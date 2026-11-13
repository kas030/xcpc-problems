---
problemId: icpc-2022-ecfinal/I
language: zh
status: qoj
source: https://qoj.ac/problem/6306/statement/zh_cn
sourceHash: 763d10e6b39745043aa931f69122575d21f55c20a268cb3b4bfa8460afab36d7
---

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

Prof. Shou 正在一个无向无权简单图上被 Prof. Pang 追逐。最初，Prof. Shou 位于顶点 $1$，他的目的地是顶点 $n$。Prof. Pang 位于顶点 $k$。

每一秒，Prof. Shou 可以选择一个相邻的顶点并移动到该顶点。随后，Prof. Shou 会受到 Prof. Pang 的攻击。攻击造成的伤害等于 $d - dis$，其中 $d$ 是 Prof. Pang 的攻击范围，$dis$ 是图中 Prof. Shou 和 Prof. Pang 之间的距离（最短路径上的边数）。然而，当 $dis \ge d$ 时，Prof. Pang 无法造成任何正伤害。在这种情况下，他不会进行非正伤害的攻击，而是会直接瞬移到 Prof. Shou 所在的顶点，并造成 $d$ 点伤害。（当 $dis < d$ 时，Prof. Pang 会停留在当前顶点。）

请计算 Prof. Shou 从顶点 $1$ 到达顶点 $n$ 所受到的总伤害的最小值。Prof. Shou 在顶点 $n$ 处会受到最后一次攻击。

## 输入格式

第一行包含 $4$ 个整数 $n, m, k, d$ ($2 \le n \le 10^5, n-1 \le m \le 2 \times 10^5, 1 \le k \le n, 1 \le d \le 2 \times 10^5$)。

接下来的 $m$ 行，每行包含两个整数 $a, b$ ($1 \le a, b \le n, a \neq b$)，表示图中的一条边。边是不同的。（$a \ b$ 和 $b \ a$ 表示同一条边。因此，这两行中只有一行会出现在输入中。）

保证图是连通的。

## 输出格式

输出一行，包含一个整数，表示答案。

## 样例

### 输入格式 1

```text
5 5 3 1
1 2
2 4
4 5
1 3
3 5
```

### 输出格式 1

```text
2
```

### 输入格式 2

```text
13 17 12 3
1 2
2 3
3 4
4 13
5 13
7 8
7 9
7 10
7 11
7 6
12 7
1 8
8 9
9 10
10 11
11 6
6 13
```

### 输出格式 2

```text
7
```
