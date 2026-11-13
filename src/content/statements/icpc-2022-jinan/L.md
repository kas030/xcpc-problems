---
problemId: icpc-2022-jinan/L
language: zh
status: qoj
source: https://qoj.ac/problem/5148/statement/zh_cn
sourceHash: 4e9bb69e1c4fa321867bbc7c61abaca417ba422951aabfc7c10a0a1a482879f2
---

## 题目描述

时间限制：4 秒；内存限制：512 MB。

给定一棵具有 $n$ 个顶点 $1, 2, \dots, n$ 的无根加权树 $T$。请回答一些查询。

我们定义 $\text{dist}(i, j)$ 为树 $T$ 中顶点 $i$ 和顶点 $j$ 之间的距离。

对于每个查询，给定两个整数 $l, r$。请回答以下值： 

$$
\min_{l \le i < j \le r} (\text{dist}(i, j))
$$

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 2 \times 10^5$)，表示树的顶点数。

接下来的 $n - 1$ 行，每行描述树的一条边。第 $i$ 条边由三个整数 $a_i, b_i, w_i$ ($1 \le a_i, b_i \le n, 1 \le w_i \le 10^9$) 表示，分别为其连接的顶点标签及其权重。

随后一行包含一个整数 $q$ ($1 \le q \le 10^6$)，表示查询次数。

接下来的 $q$ 行，每行包含两个整数 $l, r$ ($1 \le l \le r \le n$)，描述一个查询。

保证给定的边构成一棵树。

## 输出格式

对于每个查询，输出一行答案。如果不存在满足 $1 \le i < j \le r$ 的 $i, j$，则答案为 $-1$。

## 样例

### 输入 1

```text
5
1 2 5
1 3 3
1 4 4
3 5 2
5
1 1
1 4
2 4
3 4
2 5
```

### 输出 1

```text
-1
3
7
7
2
```
