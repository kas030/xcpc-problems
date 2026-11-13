---
problemId: icpc-2022-xian/J
language: zh
status: qoj
source: https://qoj.ac/problem/5122/statement/zh_cn
sourceHash: a06bb91fd9b9c079f90361e9f0c6ef000689288752c573a4a2ffaaebd19e6bd4
---

## 题目描述

时间限制：1 秒；内存限制：512 MB。

给定一个序列 $a_1, a_2, \dots, a_n$。

你需要选择零个或多个 $a$ 中的元素，使得：如果你选择了 $a_i$，那么在任何长度为 $i$ 的区间内（形式化地，对于任何 $1 \le j \le n - i + 1$，在 $a[j, j + i - 1]$ 中），你最多只能选择 2 个元素。

计算你所选元素的最大和。

## 输入格式

第一行包含一个整数 $n$ ($2 \le n \le 10^5$)。

第二行包含 $n$ 个整数 $a_1, a_2, \dots, a_n$ ($-10^9 \le a_i \le 10^9$)。

## 输出格式

输出一个整数，表示答案。

## 样例

### 样例输入 1

```text
4
1 4 3 2
```

### 样例输出 1

```text
7
```

### 样例输入 2

```text
3
-10 -10 -10
```

### 样例输出 2

```text
0
```
