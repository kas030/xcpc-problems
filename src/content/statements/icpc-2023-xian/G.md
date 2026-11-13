---
problemId: icpc-2023-xian/G
language: zh
status: qoj
source: https://qoj.ac/problem/9248/statement/zh_cn
sourceHash: 2f71c04247862556a6a0ea6662b8ad69434e77e629282425e1774712a417cc81
---

## 题目描述

时间限制：1.0 秒；内存限制：128 MB。

给定一个整数 $n$。对于每个满足 $p \le q$ 且 $pq \mid n$ 的整数对 $(p, q)$，记 $r = \frac{p}{q}$。求 $r$ 的不同取值的个数。

## 输入格式

输入的第一行包含一个整数 $q$ ($1 \le q \le 2000$)，表示测试用例的数量。接下来的 $q$ 行，每行包含一个整数 $n$ ($1 \le n \le 10^{10}$)。

## 输出格式

对于每个测试用例，输出一行：一个整数，表示 $r$ 的不同取值的个数。

## 样例

### 样例输入 1

```text
10
1
2
3
4
5
6
7
8
9
10
```

### 样例输出 1

```text
1
2
2
3
2
5
2
4
3
5
```
