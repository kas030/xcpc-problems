---
problemId: ccpc-2024-zhengzhou/I
language: zh
status: qoj
source: https://qoj.ac/problem/9776/statement/zh_cn
sourceHash: 19355455aa259039f6f47d274ffc250c8fcd6dc92cac4d2fdb967ce41b8abd3b
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1.0 秒；内存限制：32 MB。

Bobo 正在分析一组 $n$ 个人，其中第 $i$ 个人 ($1 \le i \le n$) 有两个属性 $x_i$ 和 $y_i$。不同人的属性值各不相同。对于任意两人 $1 \le i, j \le n$ ($i \neq j$)，Bobo 分别定义他们的好友指数 $\text{Friend}(i, j)$ 和仇敌指数 $\text{Enemy}(i, j)$ 如下：



$$
\text{Friend}(i, j) \triangleq \max(|x_i - x_j|, |y_i - y_j|), \quad \text{Enemy}(i, j) \triangleq |x_i - x_j| + |y_i - y_j|
$$



对于任意 $1 \le i, j \le n$ ($i \neq j$)，如果满足： 对于所有 $1 \le k \le n$ ($k \neq i$)，都有 $\text{Friend}(i, k) \ge \text{Friend}(i, j)$， 则 Bobo 称第 $j$ 个人是第 $i$ 个人的“最好朋友”。

同样，对于任意 $1 \le i, j \le n$ ($i \neq j$)，如果满足： 对于所有 $1 \le k \le n$ ($k \neq i$)，都有 $\text{Enemy}(i, k) \le \text{Enemy}(i, j)$， 则 Bobo 称第 $j$ 个人是第 $i$ 个人的“最坏仇敌”。

现在 Bobo 想知道，对于每个 $1 \le t \le n$，在仅考虑前 $t$ 个人的情况下，有多少个有序对 $(i, j)$ 满足 $1 \le i, j \le t, i \neq j$，且第 $j$ 个人既是第 $i$ 个人的最好朋友，又是第 $i$ 个人的最坏仇敌。

请注意本题不同寻常的内存限制。

## 输入格式

第一行包含一个整数 $n$ ($2 \le n \le 4 \times 10^5$)。 接下来 $n$ 行，每行包含两个空格分隔的整数，其中第 $i$ 行包含 $x_i$ 和 $y_i$ ($1 \le x_i, y_i \le 10^7$)。保证对于 $i \neq j$，满足 $x_i \neq x_j$ 或 $y_i \neq y_j$。

## 输出格式

输出 $n$ 行，每行包含一个整数，表示满足要求的有序对数量。

## 样例

### 输入格式 1

```text
2
1 5
1 10
```

### 输出格式 1

```text
0
2
```

### 输入格式 2

```text
4
2 5
5 3
5 7
8 5
```

### 输出格式 2

```text
0
2
4
4
```

### 说明

在第二个样例中，当只考虑第一个人时，没有满足要求的有序对。当考虑前两个人时，有两个满足要求的有序对：$(1, 2)$ 和 $(2, 1)$。当考虑前三个人时，有四个满足要求的有序对：$(1, 2), (1, 3), (2, 1)$ 和 $(3, 1)$。当考虑前四个人时，有四个满足要求的有序对：$(2, 1), (2, 4), (3, 1)$ 和 $(3, 4)$。

### 输入格式 3

```text
9
3 4
3 6
4 3
4 7
5 5
6 3
6 7
7 4
7 6
```

### 输出格式 3

```text
0
2
1
0
4
5
6
7
8
```

### 输入格式 4

```text
13
3 5
4 4
4 5
4 6
5 3
5 4
5 5
5 6
5 7
6 4
6 5
6 6
7 5
```

### 输出格式 4

```text
0
2
4
7
2
2
5
2
2
3
3
4
4
```
