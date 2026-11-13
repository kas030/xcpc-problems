---
problemId: icpc-2023-hefei/L
language: zh
status: qoj
source: https://qoj.ac/problem/7885/statement/zh_cn
sourceHash: 2360cf87fa430a7ce51153e985664a88ddf92ca42244af80d0c600b0cc3825ab
---

## 题目描述

时间限制：3.0 秒；内存限制：512 MB。

在 Ham 先生的班级里，有 $n$ 名学生，编号为 $1$ 到 $n$。一天，学生 $1$ 获知了一条信息。随后，学生们开始互相传播这条信息。

学生之间的关系由一个包含 $n$ 个顶点和 $m$ 条边的有向图表示。每条边都有一个权重 $w$，为一个 $0$ 到 $1$（含）之间的实数。信息传播过程按照以下伪代码进行：

```text
Algorithm 1 SPREAD
1: Let aware[1..n] be a new array initialized as False
2: Let visited[1..n] be a new array initialized as False
3: procedure DFS(u)
4: if visited[u] then
5: return
6: end if
7: visited[u] ← True
8: for (u, v, w) ∈ edges starting from u do
9:  Enumerate edges in the order of input 
10: if aware[u] and not aware[v] then
11: with probability w, aware[v] ← True
12: end if
13: DFS(v)
14: end for
15: end procedure
16: procedure SPREAD
17: aware[1] ← True  The first student knows the information at the beginning
18: DFS(1)
19: end procedure
```

请计算对于所有 $1 \le i \le n$，学生 $i$ 通过此过程获知信息的概率。换句话说，计算上述伪代码中 `aware[u]` 为 `True` 的概率。

## 输入格式

第一行包含两个整数 $n$ 和 $m$ ($3 \le n \le 10^5$, $n - 1 \le m \le 3 \cdot 10^5$)，分别表示学生人数和关系数量。

接下来的 $m$ 行，每行包含四个整数 $u_i, v_i, p_i$ 和 $q_i$ ($1 \le u_i, v_i \le n, 0 \le p_i \le q_i \le 10^5, q_i \neq 0$)，表示从学生 $u_i$ 到学生 $v_i$ 的关系，权重为 $w_i = \frac{p_i}{q_i}$。

保证不存在从学生 $i$ 到学生 $i$ 的关系 ($1 \le i \le n$)，且从学生 $i$ 到学生 $j$ 最多只有一条关系 ($1 \le i, j \le n$)。同时保证在过程中所有学生都能从学生 $1$ 到达。

## 输出格式

输出 $n$ 行，第 $i$ 行包含一个整数 $x_i$，表示学生 $i$ 在过程结束后获知信息的概率，对 $998\,244\,353$ 取模。

形式上，可以证明答案是一个有理数 $\frac{p}{q}$。为了避免精度问题，请输出整数 $(pq^{-1} \pmod M)$ 作为答案，其中 $M = 998\,244\,353$ 且 $q^{-1}$ 是满足 $qq^{-1} \equiv 1 \pmod M$ 的整数。

## 样例

### 输入 1

```text
4 4
1 2 1 2
2 3 1 2
2 4 1 2
4 3 1 1
```

### 输出 1

```text
1
499122177
623902721
748683265
```

### 输入 2

```text
6 12
1 2 81804 95651
2 3 39701 95895
2 4 6178 17992
3 5 72756 84510
5 6 40007 83640
2 6 60491 92219
5 3 37590 47735
4 5 6867 20289
4 3 75051 93231
6 5 48102 54448
6 1 40190 45274
1 5 37010 60312
```

### 输出 2

```text
1
947252499
124986918
535320090
929273289
551177734
```

## 说明

对于第一个样例，过程展开如下：

-   学生 $1$ 最初获知信息。
-   我们选择边 $(1, 2, \frac{1}{2})$。结果，学生 $2$ 以 $\frac{1}{2}$ 的概率获知信息。
-   我们选择边 $(2, 3, \frac{1}{2})$。
-   我们选择边 $(2, 4, \frac{1}{2})$。因此，学生 $4$ 以 $\frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$ 的概率获知信息。
-   我们选择边 $(4, 3, 1)$。

现在，分析学生 $3$ 保持未获知信息的情况。这可能发生在以下两种情形中：

-   当我们选择边 $(1, 2, \frac{1}{2})$ 时，学生 $2$ 未获知信息。
-   当我们选择边 $(1, 2, \frac{1}{2})$ 时，学生 $2$ 获知了信息，但当我们选择边 $(2, 3, \frac{1}{2})$ 时学生 $3$ 未获知信息，且当我们选择边 $(2, 4, \frac{1}{2})$ 时学生 $4$ 未获知信息。

因此，学生 $3$ 获知信息的概率为：$1 - \frac{1}{2} - \frac{1}{2} \times \frac{1}{2} \times \frac{1}{2} = \frac{3}{8}$。
