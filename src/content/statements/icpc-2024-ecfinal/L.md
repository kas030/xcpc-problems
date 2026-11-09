---
problemId: icpc-2024-ecfinal/L
language: zh
status: qoj
source: https://qoj.ac/problem/9986/statement/zh_cn
sourceHash: e844a10a530574a849d82982d0693f3819e83a9959e0ecc4ed4baeca0c94a2ae
---

## 题目描述

时间限制：6.0 秒；内存限制：1024 MB。

企鹅 Tomorin 有一大堆石头！为了欣赏这些石头，她把其中一些放在地上，形成了 $n$ 堆石头。最初，第 $i$ 堆石头有 $a_i$ 个，其中 $a_i$ 是一个非负整数。Tomorin 打算移动她的石头，你的任务是根据她的指令帮助她移动石头。

-   `1 l r v`：Tomorin 重建了从 $l$ 到 $r$ 的每一堆石头，使每一堆都有 $v$ 个石头。更正式地说，对于所有满足 $l \le i \le r$ 的 $i$，执行 $a_i \leftarrow v$。
-   `2 l r`：Tomorin 观察从 $l$ 到 $r$ 的石头堆。作为一个对自然数有品味的细心企鹅，她不喜欢有数字被遗漏。为了公平地解决这个问题，令 $w$ 为在 $a[l \dots r]$ 中没有出现的最小自然数；然后 Tomorin 从她的收藏中取出 $w$ 个额外的石头放到这些堆中的每一堆。更正式地说，令 $w = \text{mex}(a_l, a_{l+1}, \dots, a_r)$；对于所有 $l \le i \le r$，执行 $a_i \leftarrow a_i + w$。这里，$\text{mex}(S) = \min (\{0, 1, 2, 3, \dots \} \setminus S)$。
-   `3 l r`：热情的饲养员 Rikki 要求计算从第 $l$ 堆到第 $r$ 堆的石头总数，以检查你是否在敷衍 Tomorin。更正式地说，计算 $\sum_{i=l}^{r} a_i$。

## 输入格式

第一行包含两个整数 $n$ 和 $m$ ($1 \le n \le 5 \times 10^5, 1 \le m \le 5 \times 10^5$)，分别表示序列的长度和操作次数。

第二行包含 $n$ 个整数 $a_1, a_2, \dots, a_n$ ($0 \le a_i \le 5 \times 10^5$)，表示序列 $a$。

接下来的 $m$ 行中，第 $i$ 行首先包含一个整数 $op_i$ ($op_i \in \{1, 2, 3\}$)，指定第 $i$ 次操作的类型。

-   如果 $op_i = 1$，则同一行后面跟着三个整数 $l, r$ 和 $v$ ($1 \le l \le r \le n, 0 \le v \le 5 \times 10^5$)；
-   否则，同一行后面跟着两个整数 $l$ 和 $r$ ($1 \le l \le r \le n$)。

## 输出格式

对于每一种第三类操作，输出一行包含答案。

## 样例

### 输入 1

```text
5 8
0 7 2 1 0
1 2 4 0
2 1 3
2 3 4
3 1 3
1 2 3 4
3 1 4
2 1 5
3 2 5
```

### 输出 1

```text
5
11
22
```
