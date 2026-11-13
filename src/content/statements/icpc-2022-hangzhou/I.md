---
problemId: icpc-2022-hangzhou/I
language: zh
status: qoj
source: https://qoj.ac/problem/5309/statement/zh_cn
sourceHash: 777c677e9ea83026d7debf226f9943a4ca13b81e3be5656c64c68158bbcca22c
---

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

这是一个交互式问题。

Grammy 有一个包含 $n$ 个顶点（$1 \le n \le 10^9$）的有向环图，顶点编号从 $1$ 到 $n$。有向环图是指由 $n$ 个顶点构成一个环的有向图。具体来说，图中共有 $n$ 个顶点和 $n$ 条边，且存在一个排列 $p_1, p_2, \dots, p_n$，使得图中存在从 $p_i$ 到 $p_{(i \bmod n)+1}$ 的单向边。

初始时，一个标记位于某个预先确定的顶点上。

你可以通过以下方式要求 Grammy 移动标记： “walk $x$”，其中 $0 \le x \le 10^9$。作为对查询的响应，Grammy 会将标记沿边移动恰好 $x$ 次，并告诉你移动后标记所在的位置。

如果你能在不超过 $10^4$ 次查询内猜出隐藏图中的顶点数（即 $n$），你就赢了。

图中的顶点和标记的初始位置是预先固定好的。

## 交互格式

你最多可以进行 $10^4$ 次查询。进行查询时，请在单独的一行中输出 “walk $x$”（$0 \le x \le 10^9$），然后从标准输入读取响应。

作为对查询的响应，交互器会将标记沿边移动恰好 $x$ 次，并输出移动后标记的位置。

给出答案时，请在单独的一行中输出 “guess $n$”，其中 $n$ 是隐藏图的大小（$1 \le n \le 10^9$）。输出答案不计入 $10^4$ 次查询的限制。

输出答案后，你的程序应立即终止。

在输出查询后，请务必输出换行符并刷新缓冲区。在 C++ 中使用 `fflush(stdout)` 或 `cout.flush()`，在 Java 中使用 `System.out.flush()`，在 Pascal 中使用 `flush(output)`，或在 Python 中使用 `stdout.flush()`。

题目保证图中的顶点和标记的初始位置是预先固定好的。

## 样例

### 样例输入 1

```text
3
10
4
5
3
5
```

### 样例输出 1

```text
walk 0
walk 1
walk 2
walk 3
walk 4
walk 6
guess 10
```
