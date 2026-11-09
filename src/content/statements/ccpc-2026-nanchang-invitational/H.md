---
problemId: ccpc-2026-nanchang-invitational/H
language: zh
status: qoj
source: https://qoj.ac/problem/18952/statement/zh_cn
sourceHash: 4cfe0a987c06323414f6b4561a004aaa129b72653ed4434d311d9d16f51df9cb
---

## 题目描述

时间限制：1 秒；内存限制：256 MB。

南昌拌粉是当地早餐的灵魂，而一碗正宗拌粉的关键在于配料的搭配。老字号"万方"拌粉有一份祖传秘方：一碗拌粉的<strong>总鲜度</strong>与<strong>总辣度</strong>的比值必须<strong>恰好等于</strong> $A:B$，只有这样才能激发出最绝妙的口感。

现在店里有 $n$ 种配料可供选择，第 $i$ 种配料的鲜度为 $U_i$，辣度为 $D_i$，价格为 $C_i$。<strong>每种配料最多只能加一份</strong>。

你带了 $M$ 块钱，想要选择<strong>至少一种</strong>配料加入拌粉中。你需要满足以下条件：

-   所选配料的总价格不超过 $M$；
-   所选配料的总鲜度与总辣度的比值恰好为 $A:B$。

在所有满足条件的方案中，你希望拌粉的<strong>总鲜度尽可能大</strong>。求这个最大总鲜度。如果无论如何都无法配出绝妙比例，输出 $-1$。

## 输入格式

第一行包含四个整数 $n, M, A, B$ ($1 \le n \le 26$, $1 \le M \le 10^9$, $1 \le A, B \le 10^4$)，分别表示配料的种类数、你的预算、以及目标比例的两个分量。

接下来 $n$ 行，每行包含三个整数 $U_i, D_i, C_i$ ($1 \le U_i, D_i, C_i \le 10^9$)，表示第 $i$ 种配料的鲜度、辣度和价格。

## 输出格式

输出一个整数，表示满足条件下的最大总鲜度。如果无法满足条件，输出 $-1$。

## 样例

## Input 1

```text
3 10 1 1
3 3 4
2 4 3
4 4 5
```

## Output 1

```text
7
```

## Input 2

```text
2 5 1 2
3 3 4
2 4 10
```

## Output 2

```text
-1
```
