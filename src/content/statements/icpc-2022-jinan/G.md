---
problemId: icpc-2022-jinan/G
language: zh
status: qoj
source: https://qoj.ac/problem/5143/statement/zh_cn
sourceHash: 644770ca200df3cee62e67bc4e64630f5a9074cdd7db82fe1ae4ea300fc1a744
---

## 题目描述

时间限制：5 秒；内存限制：512 MB。

当 Prof. Pang 年轻时，他编写了如下的快速排序代码。请计算在调用 `quicksort(A, 1, n)` 时执行了多少次交换操作。其中 $A$ 是一个给定的长度为 $n$ 的排列。

算法 2 快速排序的实现

```text
1: procedure QUICKSORT(A, lo, hi)
2: if lo ≥ 0 and hi ≥ 0 and lo < hi then
3: p ← PARTITION(A, lo, hi)
4: QUICKSORT(A, lo, p)
5: QUICKSORT(A, p + 1, hi)
6: end if
7: end procedure
8: procedure PARTITION(A, lo, hi)
9: pivot ← A[floor((hi + lo)/2)]
10: i ← lo − 1
11: j ← hi + 1
12: while True do
13: repeat
14: i ← i + 1
15: until A[i] ≥ pivot
16: repeat
17: j ← j − 1
18: until A[j] ≤ pivot
19: if i ≥ j then
20: return j
21: end if
22: Swap A[i] with A[j]
23: end while
24: end procedure
```

## 输入格式

第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试用例的数量。

对于每个测试用例，第一行包含一个正整数 $n$ ($1 \le n \le 5 \times 10^5$)。下一行包含 $n$ 个整数 $a_1, \dots, a_n$ ($1 \le a_i \le n$)，表示排列 $A$。保证 $a_1, \dots, a_n$ 构成一个排列，即对于 $i \neq j$ 有 $a_i \neq a_j$。

保证所有测试用例的 $n$ 之和不超过 $5 \times 10^5$。

## 输出格式

对于每个测试用例，输出一行，包含调用 `quicksort(A, 1, n)` 时执行的交换次数。

## 样例

### 输入 1

```text
3
3
3 2 1
5
2 4 5 3 1
10
7 2 4 6 1 9 10 8 5 3
```

### 输出 1

```text
1
4
7
```
