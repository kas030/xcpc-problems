---
problemId: ccpc-2022-mianyang/I
language: zh
status: qoj
source: https://qoj.ac/problem/8042/statement/zh_cn
sourceHash: a15ecc995ae38f386edc3f61bc317a81f58af81ca27e0b91cfaefeac23391a7a
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：3.0 秒；内存限制：1024 MB。

Bobo 被要求解决以下数学问题：

给定 $m$ 对整数 $(x_1, t_1), (x_2, t_2), \dots, (x_m, t_m)$，其中 $0 \le x_i < n$ 且 $t_i \in \{0, 1\}$，计算满足以下条件的子集 $A \subseteq S_n = \{0, 1, \dots, n - 1\}$ 的数量：

-   $\forall 1 \le i \le m$，$x_i \in A$ 当且仅当 $t_i = 1$。
-   $A +_n (S_n \setminus A) = S_n$。

对于任意两个由非负整数组成的集合 $A, B$，$A +_n B$ 定义为： 

$$
A +_n B = \{(a + b) \pmod n \mid a \in A, b \in B\}
$$



答案可能非常大，请输出答案对 $998\,244\,353$ 取模的结果。

## 输入格式

每个测试包含多个测试用例。第一行包含一个整数 $T$ ($1 \le T \le 5$)，表示测试用例的数量。接下来包含每个测试用例的描述。

每个测试用例的第一行包含两个整数 $n$ 和 $m$ ($1 \le n \le 10^{18}, 0 \le m \le 5$)，分别表示全集的大小和整数对的数量。

接下来 $m$ 行，第 $i$ 行包含两个整数 $x_i, t_i$ ($0 \le x_i < n, t_i \in \{0, 1\}$)，描述第 $i$ 个整数对。

保证 $x_1, x_2, \dots, x_m$ 两两不同。

## 输出格式

对于每个测试用例，输出一个整数，表示所求答案对 $998\,244\,353$ 取模的结果。

## 样例

### 样例输入 1

```text
2
3 0
6 2
0 0
1 1
```

### 样例输出 1

```text
0
4
```
