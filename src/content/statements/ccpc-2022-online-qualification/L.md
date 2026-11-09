---
problemId: ccpc-2022-online-qualification/L
language: zh
status: qoj
source: https://qoj.ac/problem/14545/statement/zh_cn
sourceHash: a1fae328b813d8f2cbaa4cdfc41dc3ef0ae66d8b88b3a919134a4d2f1ff149bc
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1.0 秒；内存限制：512 MB。

给定一棵拥有 $n$ 个顶点的树。对于一个整数 $k$，你需要删除树中不少于 $k$ 条边，使得最小连通分量的大小尽可能大。

请对每个 $k$ ($0 \le k \le n - 1$)，计算最小连通分量大小的最大可能值。

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 10^5$)。

接下来的 $n - 1$ 行，每行包含两个整数 $u$ 和 $v$ ($1 \le u, v \le n, u \neq v$)，表示一条边 $(u, v)$。

## 输出格式

输出 $n$ 行，第 $i$ 行包含一个整数，表示 $k = i - 1$ 时的答案。

## 样例

### 样例输入 1

```text
10
1 2
1 7
2 3
2 4
2 9
4 5
4 6
5 10
6 8
```

### 样例输出 1

```text
10
5
2
2
1
1
1
1
1
1
```
