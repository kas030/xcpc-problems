---
problemId: icpc-2022-hangzhou/B
language: zh
status: qoj
source: https://qoj.ac/problem/5302/statement/zh_cn
sourceHash: 5445f5ff2dfcfd0c22463f1a48866906f5573823e40cd7b09ba0a88c90cd950a
---

## 题目描述

时间限制：6 秒；内存限制：1024 MB。

Putata 最近正在学习一种名为 Binary Adding 的实用算法。该算法允许你计算两个 $m$ 位二进制整数的和。

如果一个整数 $x$ 满足 $0 \le x < 2^m$，则称其为 $m$ 位二进制整数。$m$ 的二进制表示是一个长度为 $m$ 的 0-indexed 序列 $v$，其中 $\forall 0 \le i < m, v_i \in \{0, 1\}$，且 $x = \sum_{i=0}^{m-1} v_i 2^i$。保证对于所有 $m$ 位二进制整数，每个整数都有唯一的二进制表示。

计算两个二进制表示分别为 $\{a_i\}_{i=0}^{m-1}$ 和 $\{b_i\}_{i=0}^{m-1}$ 的 $m$ 位二进制整数之和的 Binary Adding 算法如下所示：

```text
Algorithm 1 BinaryAdding(a, b)
Input: input parameters a[0, . . . , m − 1], b[0, . . . , m − 1]
Output: output result sum[0, . . . , m], carry[0, . . . , m]
1: carry[0] := 0
2: for i := 0 to m − 1 do
3: sum[i] := a[i] ⊕ b[i] ⊕ carry[i]  ⊕ denotes xor operation
4: carry[i + 1] := (a[i] ∧ b[i]) ∨ (a[i] ∧ carry[i]) ∨ (b[i] ∧ carry[i])  ∧ denotes and operation, ∨
denotes or operation.
5: sum[m] := carry[m]
6: return sum[0, . . . , m], carry[0, . . . , m]
```

为了测试 Putata 是否真正掌握了该算法，Budada 准备为 Putata 出题。在出题之前，Budada 设计了一种计算题目难度的方法。假设题目是计算 $\{a_i\}_{i=0}^{m-1}$ 和 $\{b_i\}_{i=0}^{m-1}$ 的和，我们定义 $a, b$ 的进位集合为 $S(a, b) = \{x \mid \text{调用 } BinaryAdding(a, b) \text{ 时}, carry_x = 1\}$。Budada 有一个整数序列 $\{w_i\}_{i=1}^m$，表示在对应位发生进位时的计算难度。<strong>进位难度 (Carry Difficulty)</strong> 是所有发生进位的位中难度的最大值。如果没有发生进位，则进位难度为 0。

Budada 的题库是一个整数序列 $\{c_i\}_{i=1}^n$。每个整数都有一个对应的<strong>数值难度 (Numerical difficulty)</strong>，这也是一个整数序列 $\{d_i\}_{i=1}^n$。请注意，$c_i$ 不一定两两不同，且对于某些 $c_i = c_j$，对应的 $d_i$ 可能不等于 $d_j$。一个 Binary Adding 问题由两个整数组成，因此当 Budada 选择 $c_i$ 和 $c_j$ 来出题时，该问题的数值难度为 $d_i + d_j$。

Budada 想要为 Putata 准备最难的测试，因此他会选择两个整数 $i, j$（$1 \le i, j \le n$，不一定不同），并使用 $c_i, c_j$ 来出题。他想要最大化<strong>测试难度 (Test Difficulty)</strong>，即进位难度与该问题数值难度的乘积，并让你告诉他这个乘积。形式化地，最大测试难度为 $\max_{1 \le i, j \le n} \{\max\{\max\{w_x \mid x \in S(c_i, c_j)\}, 0\} \cdot (d_i + d_j)\}$。

Budada 的题库还有 $q$ 次更新，每次他会选择一个整数 $i$，并修改 $c_i, d_i$。你需要回答 $q+1$ 个版本的题库中各自的最大测试难度。

## 输入格式

第一行包含三个整数 $n, m, q$ ($1 \le n, q \le 10^5, 1 \le m \le 16$)，含义如上所述。

第二行包含 $m$ 个整数，第 $i$ 个整数为 $w_i$ ($1 \le w_i \le 10^9$)。

第三行包含 $n$ 个整数，第 $i$ 个整数为 $c_i$ ($0 \le c_i < 2^m$)。

第四行包含 $n$ 个整数，第 $i$ 个整数为 $d_i$ ($1 \le d_i \le 10^9$)。

接下来的 $q$ 行，每行包含三个整数 $x, u, v$。令 $lastans$ 为上一个版本的题库的最大测试难度，$x' = x \oplus lastans, u' = u \oplus lastans, v' = v \oplus lastans$ ($1 \le x' \le n, 0 \le u' < 2^m, 1 \le v' \le 10^9$)，这表示 Budada 将 $c_{x'}$ 修改为 $u'$，将 $d_{x'}$ 修改为 $v'$。这里“$\oplus$”表示按位异或运算符。请注意，你应该使用 64 位整数来存储 $x, u, v$。

## 输出格式

输出 $q+1$ 行，表示 $q+1$ 个版本的题库中各自的最大测试难度。

## 样例

### 输入 1

```text
5 3 3
1 2 4
0 0 1 2 7
10 10 5 3 1
27 24 29
20 16 19
13 8 9
```

### 输出 1

```text
24
16
8
0
```

## 说明

解密后的操作为： $x' = 3, u' = 0, v' = 5$。 $x' = 4, u' = 0, v' = 3$。 $x' = 5, u' = 0, v' = 1$。
