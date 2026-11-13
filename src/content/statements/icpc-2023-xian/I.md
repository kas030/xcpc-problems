---
problemId: icpc-2023-xian/I
language: zh
status: qoj
source: https://qoj.ac/problem/9250/statement/zh_cn
sourceHash: f75ae7ce0359f37e7a1b63628bab6f990e3185a5c08eed5e800ec993a311446a
---

## 题目描述

时间限制：3.0 秒；内存限制：1024 MB。

给定一个长度为 $n$ 的数组 $a$。 我们定义区间 $[l, r]$ 的值为： 

$$
\max_{\substack{l \le i < j < k \le r \\ j-i \le k-j}} \gcd(a_i, a_j, a_k)
$$

 如果 $r - l \le 1$，则该值为 $0$。 共有 $q$ 次询问。对于每次询问，你需要求出特定区间的值。

## 输入格式

第一行包含两个整数 $n$ 和 $q$ ($3 \le n \le 1.5 \times 10^5$, $1 \le q \le 10^5$)。 第二行包含 $n$ 个整数 $a_1, a_2, \dots, a_n$ ($1 \le a_i \le 10^6$)。 接下来的 $q$ 行，每行包含两个整数 $l$ 和 $r$ ($1 \le l \le r \le n$)。

## 输出格式

对于每次询问，输出一行，一个整数，表示该区间的值。

## 样例

### 输入格式 1

```text
8 8
8 24 4 6 6 7 3 3
1 5
2 6
3 7
5 8
4 8
1 3
2 5
3 8
```

### 输出格式 1

```text
4
2
3
1
3
4
2
3
```
