---
problemId: ccpc-2022-online-qualification/D
language: zh
status: qoj
source: https://qoj.ac/problem/14537/statement/zh_cn
sourceHash: 8b21ace300b7442b7dcefaabca4f145a0044c155b74afacafa75f3f9d5a1af1d
---

## 题目描述

时间限制：3.0 秒；内存限制：512 MB。

给你一个长度为 $n$ 的指针序列，其初始化方式如下：

```text
using integer = long long;
integer *A[MAXN]; //MAXN is a constant larger than n
for (int i = 1; i <= n; ++i)
A[i] = new integer(0);
```

你需要维护以下五种操作：

-   `1 L1 R1 L2 R2` ($R1 - L1 = R2 - L2$，$[L1, R1]$ 和 $[L2, R2]$ 是 $[1, n]$ 内不相交的区间)
-   `2 L R k b` ($1 \le L \le R \le n$ 且 $0 \le k, b \le 10^4$)
-   `3 L R v` ($0 \le L \le R \le 10^9$ 且 $0 \le v \le 10^9$)
-   `4 p v` ($1 \le p \le n$ 且 $0 \le v \le 10^9$)
-   `5 p` ($1 \le p \le n$)

对于每种类型的操作，你需要高效地处理对应的过程：

### 操作 1

```text
for (int i = 0; i <= R1 - L1; ++i) //copy A[L1, R1] to A[L2, R2]
A[L2 + i] = A[L1 + i];
```

### 操作 2

```text
for (integer i = 0; i <= R - L; ++i) //assign an arithmetic sequence to A[L, R]
A[L + i] = new integer(k * i + b);
```

### 操作 3

```text
for (int i = 1; i <= n; ++i) //change the value in [L, R] to v
if (*A[i] >= L && *A[i] <= R)
*A[i] = v;
```

### 操作 4

```text
*A[p] = v; //single point modification
```

### 操作 5

```text
cout << *A[p] << endl; //Output the value of A[pos]
```

## 输入格式

输入的第一行包含两个整数 $n$ ($1 \le n \le 10^6$) 和 $m$ ($1 \le m \le 10^5$)，分别表示序列的长度和操作的次数。

接下来的 $m$ 行，每行包含一个如上所述格式的查询。

## 输出格式

对于所有操作 5，输出一个整数表示答案。

## 样例

### 输入样例 1

```text
5 10
5 1
2 1 5 1 1
1 1 2 3 4
4 1 8
5 3
3 7 8 2
3 2 5 6
5 1
5 2
5 5
```

### 输出样例 1

```text
0
8
6
6
6
```
