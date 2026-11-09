---
problemId: ccpc-2026-nanchang-invitational/E
language: zh
status: qoj
source: https://qoj.ac/problem/18949/statement/zh_cn
sourceHash: 96a14ea134765c7a1a57059f8cbe0707db14b0f7af743c1df8fac8838e8eb8eb
---

## 题目描述

时间限制：2 秒；内存限制：256 MB。

这是一道交互题。

给定正整数 $n$，评测机会生成一个未知的长度为 $n$ 的 `01` 序列 $a_1,a_2,\dots,a_n$，你最多可以问评测机 $17$ 个问题，来求解这个 `01` 序列中 `1` 的个数，即 $\sum\limits_{i=1}^n a_i$。数据保证至少有一个 `1`。

对于每一次询问，你可以选择若干个位置 $i_1,i_2,\dots,i_k$，设 $I=\{i_1,i_2,\dots,i_k\}$，评测机会返回 $(\sum\limits_{j\in I} a_j) \cdot (\sum\limits_{j\notin I} a_j)$ 的结果。

## 输入格式

第一行一个正整数 $n$ $(1\le n\le 10^5)$，表示这个 `01` 序列的长度。

## 交互

对于询问，请按以下格式输出一行（不包括引号）：

`? k i_1 i_2 ... i_k` $(1\le k\le n,1\le i_1< i_2< \dots< i_k\le n)$。

对于输出答案，请按以下格式输出一行（不包括引号）：

`! s`，其中 $s=\sum\limits_{i=1}^n a_i$。

输出答案本身不计入查询次数。

交互器是非自适应的，也就是说，答案在参与者提出任何查询之前就已经确定了，并且不会依赖于参与者所提出的查询。

在输出每个查询之后，不要忘记输出换行并刷新输出缓冲区。

你可以使用如下语句来清空缓冲区：

-   对于 C/C++：`fflush(stdout)`
-   对于 C++：`std::cout << std::flush`
-   对于 Java：`System.out.flush()`
-   对于 Python：`sys.stdout.flush()`

## 样例

### 输入格式 1

```text
3

2
```

### 输出格式 1

```text
? 2 1 3

! 3
```

### 输入格式 2

```text
3

0

0
```

### 输出格式 2

```text
? 1 1

? 1 2

! 1
```

### 说明

第一个样例隐藏的数列为 $[1,1,1]$，第二个样例隐藏的数列为 $[0,1,0]$
