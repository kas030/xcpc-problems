---
problemId: ccpc-2025-zhengzhou/G
language: zh
status: qoj
source: https://qoj.ac/problem/15307/statement/zh_cn
sourceHash: 1079014955e53474d2110aa76c361db2713ce5e696cd86cb10ebd036067347d1
---

## 题目描述

时间限制：1.0 秒；内存限制：1024 MB。

给定整数 $a, b, c$，你每次可以执行以下操作之一：

-   $a \leftarrow a + b$
-   $a \leftarrow a \oplus b$

其中 $\oplus$ 表示按位异或（XOR）操作。

你可以执行任意次数的操作，你想知道最终是否能使 $a$ 等于 $c$。

## 输入格式

每个输入文件包含多组测试数据。

输入的第一行包含一个整数 $T$ ($1 \le T \le 10^3$)，表示测试数据的组数。

对于每组测试数据，包含一行三个整数 $a, b, c$ ($0 \le a, c \le 10^{18}$，$1 \le b \le 1000$)。

保证在单个输入文件中，$\sum b^2 \le 10^6$。

## 输出格式

对于每组测试数据，如果最终能使 $a$ 等于 $c$，则输出 "YES"；否则输出 "NO"。

## 样例

### 输入样例 1

```text
5
1 6 7
7 5 13
8 3 16
7 6 17
2 7 8
```

### 输出样例 1

```text
YES
NO
YES
YES
NO
```
