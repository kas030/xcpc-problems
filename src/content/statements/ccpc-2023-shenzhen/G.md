---
problemId: ccpc-2023-shenzhen/G
language: zh
status: qoj
source: https://qoj.ac/problem/8334/statement/zh_cn
sourceHash: f73e97307354c334394e28de9e23dd42617b6869e15aca960b9e06ee78ee464f
---

## 题目描述

时间限制：2.5 秒；内存限制：512 MB。

设 $s$ 和 $t$ 为两个长度均为 $M$ 的字符串。定义 $f(s, t) = \sum_{i=1}^{M} [s_i \neq t_i]$。

给定 $N$ 个字符串 $s_1, s_2, \dots, s_N$ 和一个常数阈值 $K$。每个字符串恰好包含 $M$ 个小写字母。你需要执行 $Q$ 次以下查询：

-   给定一个长度为 $M$ 的字符串 $t$，计算 $\sum_{i=1}^{N} [f(s_i, t) \leq K]$。

## 输入格式

第一行包含四个整数 $N, Q, M$ 和 $K$ ($1 \leq N, Q \leq 300, 1 \leq M \leq 60, 000, 1 \leq K \leq 10$)。

接下来的 $N$ 行，第 $i$ 行包含一个恰好由 $M$ 个小写字母组成的字符串 $s_i$。

接下来的 $Q$ 行，第 $i$ 行包含一个恰好由 $M$ 个小写字母组成的字符串 $t$，表示一次查询。

## 输出格式

对于每次查询，输出一行，包含一个整数，表示答案。

## 样例

### 输入 1

```text
6 4 4 1
kaki
kika
manu
nana
tepu
tero
kaka
mana
teri
anan
```

### 输出 1

```text
2
2
1
0
```

### 输入 2

```text
8 6 7 3
delphis
aduncus
peronii
plumbea
clymene
hectori
griseus
electra
delphis
helpiii
perphii
clumeee
eleelea
ddlpcus
```

### 输出 2

```text
1
1
2
2
1
2
```
