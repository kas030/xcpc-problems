---
problemId: icpc-2022-xian/D
language: zh
status: qoj
source: https://qoj.ac/problem/5116/statement/zh_cn
sourceHash: 2fb83c3606fd8caefde753e000f609a7e4523074716081a14ce46a80bfbe4f6d
---

## 题目描述

时间限制：2 秒；内存限制：512 MB。

有 $n$ 名参赛者参加了 $m$ 场比赛。给定每场比赛的排名列表。第 $k$ 场比赛的排名列表是一个序列 $a_k$，表示第 $a_{k,i}$ 名参赛者的排名为 $i$。

SolarPea 和 PolarSea 是 $n$ 名参赛者中的两位。SolarPea 想要证明他比 PolarSea 更强。

定义 $x$ 比 $y$ $l$\-强，当且仅当存在一个长度为 $l+1$ 的序列 $b$，使得 $b_1 = x$，$b_{l+1} = y$，且对于所有 $1 \le i \le l$，在至少一场比赛中，$b_i$ 的排名比 $b_{i+1}$ 的排名更靠前。

共有 $q$ 次询问。在第 $i$ 次询问中，SolarPea 是参赛者 $x$，PolarSea 是参赛者 $y$。请找到最小的正整数 $l$，使得 SolarPea 比 PolarSea $l$\-强。

## 输入格式

第一行包含两个整数 $n$ ($2 \le n \le 10^5$) 和 $m$ ($1 \le m \le 5$)。

接下来的 $m$ 行，第 $i$ 行包含 $n$ 个整数 $a_{i,1}, a_{i,2}, \dots, a_{i,n}$。保证 $a_i$ 是 $1, 2, \dots, n$ 的一个排列。

下一行包含一个整数 $q$ ($1 \le q \le 10^5$)。

接下来的 $q$ 行，每行包含两个整数 $x$ 和 $y$ ($1 \le x, y \le n, x \neq y$)，表示一次询问。

## 输出格式

对于每次询问，输出一个数字 $l$ 表示答案。如果不存在合法的 $l$，则输出 $-1$。

## 样例

### 样例输入 1

```text
6 2
1 3 2 5 4 6
2 1 4 3 6 5
4
1 4
5 3
6 1
5 2
```

### 样例输出 1

```text
1
2
5
3
```
