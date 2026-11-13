---
problemId: icpc-2026-jiangxi-invitational/H
language: zh
status: reviewed
source: https://qoj.ac/download.php?type=statement&id=18279
sourceHash: fc778444e3e7fef9d47af4d8c9872f1b2d1e9aa9c81b4e4065e8b6dfe49b8a70
reviewedAt: '2026-11-13'
---

## 题目描述

时间限制：2 秒；内存限制：1024 MB。

Alice 和 Bob 轮流进行游戏，Alice 先手。游戏开始前，有一个长度为 $n$ 的非负整数数组 $a_1,a_2,\ldots,a_n$，以及一个正整数 $k$。

每回合，当前玩家选择两个整数 $x,y$，满足 $0\le x\le k$、$1\le y\le n$ 且 $x\le a_y$。随后，将 $k$ 更新为 $x$，将 $a_y$ 更新为 $a_y-x$。选择 $x=0$ 的玩家立即失败。

谁拥有必胜策略？

## 输入格式

第一行包含一个整数 $t$（$1\le t\le10^5$），表示测试数据组数。对于每组测试数据：

第一行包含两个整数 $n,k$（$1\le n\le10^6$，$1\le k\le10^9$）。

第二行包含 $n$ 个整数 $a_1,a_2,\ldots,a_n$（$0\le a_i\le10^9$）。

保证单个输入文件中所有测试数据的 $n$ 之和不超过 $2\times10^6$。

## 输出格式

对于每组测试数据，单独输出一行一个字符串。如果先手 Alice 有必胜策略，输出 `Alice`；否则输出 `Bob`。

## 样例

### 输入

```text
3
2 2
1 2
4 5
15 15 8 9
11 2
4 2 9 12 0 15 9 14 5 6 12
```

### 输出

```text
Alice
Alice
Bob
```

## 说明

第一组测试数据中，Alice 能获胜的第一步只有 $(x,y)=(1,1)$ 和 $(x,y)=(1,2)$。
