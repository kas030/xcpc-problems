---
problemId: icpc-2022-ecfinal/F
language: zh
status: qoj
source: https://qoj.ac/problem/6303/statement/zh_cn
sourceHash: fcfd7cad70e7f2fd8d7333d83433f84996a53510c37caf18d9b8f5168b56fba2
---

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

这是一个交互式问题。

有一个隐藏的排列 $p_1, p_2, \dots, p_n$，它是 $\{1, 2, \dots, n\}$ 的一个排列。你需要通过询问 $p_l, \dots, p_r$ 的逆序对数量的奇偶性来找出这个排列。

你可以使用格式 “? l r” 进行询问，交互器将返回 $(\sum_{l \le i < j \le r} [p_i > p_j]) \pmod 2$。其中 $[p_i > p_j]$ 在 $p_i > p_j$ 时为 1，在 $p_i \le p_j$ 时为 0。

## 交互协议

首先，你需要读取整数 $n$ ($1 \le n \le 2000$)。

之后，你可以进行不超过 $4 \times 10^4$ 次询问。进行询问时，在单独的一行输出 “? l r” ($1 \le l \le r \le n$)，然后从标准输入读取响应。

给出答案时，在单独的一行输出 “! p\_1 p\_2 \\dots p\_n”。输出答案不计入 $4 \times 10^4$ 次询问的限制。

在此之后，你的程序应当终止。

在输出询问后，不要忘记输出换行并刷新缓冲区。在 C++ 中使用 `fflush(stdout)` 或 `cout.flush()`，在 Java 中使用 `System.out.flush()`，在 Pascal 中使用 `flush(output)`，或者在 Python 中使用 `stdout.flush()`。

保证排列是预先固定的。

## 样例

### 输入格式 1

```text
3
0
0
1
```

### 输出格式 1

```text
? 1 2
? 1 3
? 2 3
! 2 3 1
```
