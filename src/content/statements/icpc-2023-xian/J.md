---
problemId: icpc-2023-xian/J
language: zh
status: qoj
source: https://qoj.ac/problem/9251/statement/zh_cn
sourceHash: 85738c23823dee048154e78d21edb3ec6adc3d9b9dbe2179dc343abcfdce523c
---

## 题目描述

时间限制：2.0 秒；内存限制：32 MB。

共有 $10^9 + 1$ 个图，每个图都有 $n$ 个顶点。在第 $0$ 号图 $G_0(V_0, E_0)$ 中，对于所有 $1 \le i < n$，顶点 $i$ 和 $i + 1$ 之间有一条边。

记 $d_i(x, y)$ 为在第 $i$ 号图中顶点 $x$ 和 $y$ 之间的最短路径长度。如果 $x$ 和 $y$ 互不可达，则令 $d_i(x, y)$ 为 $-1$。在第 $i$ 号图（$i \ge 1$）中，当且仅当 $d_{i-1}(x, y) \ge k$ 时，顶点 $x$ 和 $y$ 之间存在一条边。

共有 $q$ 次询问。每次询问给定五个数字 $t, n, k, x, y$。你需要输出 $d_t(x, y)$。

## 输入格式

第一行包含一个数字 $q$ ($1 \le q \le 10^6$)。

接下来的 $q$ 行中，每行包含五个数字 $t, n, k, x, y$ ($0 \le t \le 10^9, 2 \le n \le 10^9, 1 \le k \le 10^9, 1 \le x, y \le n, x \neq y$)，表示一次询问。

## 输出格式

对于每次询问，输出一行，包含一个数字 $d_t(x, y)$。

## 样例

### 输入 1

```text
5
1 5 3 2 4
1 10 4 2 4
2 10 5 2 4
1 3 2 1 3
1 3 2 1 2
```

### 输出 1

```text
3
2
-1
1
-1
```
