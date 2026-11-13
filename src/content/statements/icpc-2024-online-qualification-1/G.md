---
problemId: icpc-2024-online-qualification-1/G
language: zh
status: qoj
source: https://qoj.ac/problem/9314/statement/zh_cn
sourceHash: e951ac303dc4034dc1fa8cbc10ddbe386fb2c1b6d750005b370d931e439ede86
---

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

今天是 YQH 的生日，她收到了一份长度为 $n$ 的正整数序列，记作 $\{a_i\}_{i=1}^n$ 作为礼物。

YQH 对中位数非常感兴趣，因此她想求出这个序列的“中位数的中位数的中位数”。具体来说，令 $b_{l,r}$ 为多重集 $\{a_i\}_{l \le i \le r}$ 的中位数，令 $c_{l,r}$ 为多重集 $\{b_{i,j}\}_{l \le i \le j \le r}$ 的中位数。那么，YQH 想要找到的是多重集 $\{c_{l,r}\}_{1 \le l \le r \le n}$ 的中位数。然而，她觉得这个任务太难了，所以请求你的帮助。

注意：如果你不熟悉中位数的概念，大小为 $m$ 的多重集的中位数是其中第 $\lceil m/2 \rceil$ 小的元素。

## 输入格式

第一行包含一个正整数 $n$。 第二行包含 $n$ 个正整数，表示 $a_1, \dots, a_n$。

数据保证 $1 \le n \le 2000$ 且 $1 \le a_i \le 10^9$。

## 输出格式

输出一行，包含一个整数，表示答案。

## 样例

### 样例输入 1

```text
4
1 3 1 7
```

### 样例输出 1

```text
1
```

### 样例输入 2

```text
8
3 3 8 4 5 3 8 5
```

### 样例输出 2

```text
4
```
