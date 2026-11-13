---
problemId: icpc-2024-chengdu/G
language: zh
status: qoj
source: https://qoj.ac/problem/9541/statement/zh_cn
sourceHash: 6924b4df2503a978e01307485dcc7b6739f8127042fcccd5362b8ffb29af5b12
---

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

给定一个长度为 $n$ 的整数数组 $a_1, a_2, \dots, a_n$，你可以对该数组执行任意次数的操作。 在每次操作中，你可以选择两个相邻的元素 $a_i$ 和 $a_{i+1}$ ($1 \le i < n$)，并在它们之间插入以下三个值之一：$a_i \text{ and } a_{i+1}$，$a_i \text{ or } a_{i+1}$ 或 $a_i \oplus a_{i+1}$。你的任务是确定在执行任意次数的操作后，数组中可能存在的不同值的最大数量。

注意：$x \text{ and } y$ 表示 $x$ 和 $y$ 的按位与运算。$x \text{ or } y$ 表示 $x$ 和 $y$ 的按位或运算。$x \oplus y$ 表示 $x$ 和 $y$ 的按位异或运算。

## 输入格式

第一行包含一个整数 $n$ ($2 \le n \le 10^5$)，表示数组的长度。 第二行包含 $n$ 个整数 $a_1, a_2, \dots, a_n$ ($0 \le a_i \le 10^9$)，表示数组的元素。

## 输出格式

输出一个整数，表示在执行任意次数的操作后，数组中可能存在的不同值的最大数量。

## 样例

### 输入 1

```text
2
2 3
```

### 输出 1

```text
4
```

### 输入 2

```text
2
3 4
```

### 输出 2

```text
4
```
