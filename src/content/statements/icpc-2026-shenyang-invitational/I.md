---
problemId: icpc-2026-shenyang-invitational/I
language: zh
status: qoj
source: https://qoj.ac/problem/19021
sourceHash: d198d721bc4bfdc1e1a1ac947568021b0640afa6d8aa345beaca3beca9ae04a8
---

## 题目描述

时间限制：2 秒；内存限制：1024 MB。

Bob 准备了 $n+1$ 枚硬币作为压岁钱送给 Alice。为了增加趣味性，他们决定玩一个游戏：

游戏开始时，Bob 拿出 $1$ 枚硬币给 Alice。此时 Alice 手中有 $1$ 枚硬币，Bob 手中有 $n$ 枚硬币。

接下来，Alice 可以重复进行以下操作，直到拿走 Bob 手中的全部硬币：

-   假设当前 Alice 手中有 $A$ 枚硬币，Bob 手中有 $B$ 枚硬币。Alice 可以选择一个正整数 $k$，满足 $1 \le k \le \gcd(A, B)$，并将 $k$ 枚硬币从 Bob 手中转移到自己手中。

其中 $\gcd(A, B)$ 表示 $A$ 与 $B$ 的最大公约数。

请问 Alice 最少需要进行多少次操作，才能拿走 Bob 手中的全部硬币？

## Input

第一行包含一个整数 $T$（$1 \le T \le 3 \times 10^3$），表示测试数据组数。

接下来 $T$ 行，每行包含一个整数 $n$（$1 \le n \le 10^9$）。

## Output

输出共 $T$ 行，每行输出一个整数，表示对应测试数据的最少操作次数。

## Examples

### Input 1

```text
2
5
9
```

### Output 1

```text
3
4
```

## Note

**第一组数据**（$n = 5$，Bob 初始有 5 枚）：

1.  初始 Alice 有 1 枚，Bob 有 5 枚。$\gcd(1, 5) = 1$，取 $k = 1$。Alice 硬币数变为 $2$，Bob 剩 $4$。
2.  $\gcd(2, 4) = 2$，取 $k = 2$。Alice 硬币数变为 $4$，Bob 剩 $2$。
3.  $\gcd(4, 2) = 2$，取 $k = 2$。Alice 硬币数变为 $6$，Bob 剩 $0$。

转移过程 Alice 的硬币数变化为：$1 \to 2 \to 4 \to 6$，共需 $3$ 步。

**第二组数据**（$n = 9$，Bob 初始有 9 枚）：

转移过程 Alice 的硬币数变化为：$1 \to 2 \to 4 \to 5 \to 10$。

共需 $4$ 步。
