---
problemId: icpc-2026-jiangxi-invitational/K
language: zh
status: reviewed
source: https://qoj.ac/download.php?type=statement&id=18282
sourceHash: 4dfebc3a31424185e8368de3fd2e662e70865d6c80b69e6294801bab6be1dc51
reviewedAt: '2026-11-13'
---

## 题目描述

时间限制：8 秒；内存限制：1024 MB。

你有一段遗留代码：

```text
for t = 1 to k do
    a[x1] ← (a[u1] × a[v1]) mod MOD
    a[x2] ← (a[u2] × a[v2]) mod MOD
    a[x3] ← (a[u3] × a[v3]) mod MOD
    ...
    a[xm] ← (a[um] × a[vm]) mod MOD
end for
```

其中 $\mathrm{MOD}=998244353$，对于 $i=1,\ldots,m$，都有 $x_i,u_i,v_i\in\{1,\ldots,n\}$。每轮循环中，按顺序执行这 $m$ 条赋值语句。

给定变量 $a_1,a_2,\ldots,a_n$ 的初始值，求循环执行 $k$ 轮后这些变量的最终值。你需要回答 $q$ 次这样的询问。

## 输入格式

第一行包含三个整数 $n,m,q$（$1\le n\le200$，$1\le m\le2\times10^5$，$1\le q\le200$）。

接下来 $m$ 行，每行包含三个整数 $x_i,u_i,v_i$（$1\le x_i,u_i,v_i\le n$）。

接下来 $q$ 行，每行表示一次询问，包含 $n+1$ 个整数：循环轮数 $k$（$1\le k\le10^6$），以及 $n$ 个变量的初始值 $a_1,a_2,\ldots,a_n$（$0\le a_i<998244353$）。

## 输出格式

对于每次询问，输出一行 $n$ 个整数，表示执行代码后 $a_1,a_2,\ldots,a_n$ 的最终值，均对 $998244353$ 取模。

## 样例

### 输入

```text
7 8 4
3 1 2
4 3 3
5 6 7
7 1 3
2 2 2
6 6 2
1 5 6
7 7 7
1 2 1 1 1 1 1 1
2 1 2 3 4 5 6 7
3 1 1 0 1 0 1 0
100 11 45 14 19 19 8 10
```

### 输出

```text
1 1 2 4 1 1 16
36864 16 4032 16257024 96 384 227524445
0 1 1 1 0 1 1
244858606 337827833 584144609 343808937 412777304 279017446 926699892
```
