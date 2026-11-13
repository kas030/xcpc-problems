---
problemId: icpc-2023-hefei/D
language: zh
status: qoj
source: https://qoj.ac/problem/7877/statement/zh_cn
sourceHash: 72edaba541dce6d776fc5e695090734075fe063c098fc239d03ea70b9d154c65
---

## 题目描述

时间限制：1.0 秒；内存限制：512 MB。

Mr. Ham 喜欢平衡。他将平衡的概念应用于整数数组。

一个平衡数组被定义为一个整数数组 $a_1, a_2, \dots, a_l$，满足以下条件：

-   存在一个整数 $k$，使得 $1 \le k \le \frac{l-1}{2}$。
-   对于每个 $i \in \{1, 2, \dots, l - 2k\}$，满足 $a_i + a_{i+2k} = 2a_{i+k}$。

给定一个数组 $a_1, a_2, \dots, a_n$，Mr. Ham 想要确定对于每个 $i \in \{1, 2, \dots, n\}$，$a_{1 \dots i}$ 是否为一个平衡数组。

请帮助 Mr. Ham 解决这个问题。

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 2 \times 10^6$)，表示数组 $A$ 的长度。

第二行包含 $n$ 个整数 $a_1, a_2, \dots, a_n$ ($1 \le a_i \le 2 \times 10^8$)。

为了减小输入文件的大小，$a_i$ 采用 62 进制编码，其中字符 $0 \dots 9, a \dots z, A \dots Z$ 分别对应数值 $0 \dots 61$。例如，Aa0 表示 $36 \times 62^2 + 10 \times 62 + 0 = 139004$。

## 输出格式

输出一个二进制字符串 $s_{1 \dots n}$，如果 $a_{1 \dots i}$ 是平衡数组，则 $s_i = 1$，否则 $s_i = 0$。

## 样例

### 样例输入 1

```text
3
1 2 3
```

### 样例输出 1

```text
001
```

### 样例输入 2

```text
9
1 2 3 2 5 4 3 8 5
```

### 样例输出 2

```text
001010111
```

### 样例输入 3

```text
9
1C 3f 4S 3h 88 6x 4W d1 8c
```

### 样例输出 3

```text
001010111
```
