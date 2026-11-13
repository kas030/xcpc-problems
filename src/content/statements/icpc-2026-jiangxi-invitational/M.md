---
problemId: icpc-2026-jiangxi-invitational/M
language: zh
status: reviewed
source: https://qoj.ac/download.php?type=statement&id=18284
sourceHash: acc98a4fcdb4e020ad5158a272c70a886288a0fe0d854a030ccb1c7cf938a4ec
reviewedAt: '2026-11-13'
---

## 题目描述

时间限制：2 秒；内存限制：1024 MB。

你负责管理“构造王坝”的阀门矩阵。

给定一个 $n\times m$ 的矩阵 $a$，其中 $n,m$ 均为偶数，矩阵中的所有元素是 $1$ 到 $n\times m$ 之间互不相同的正整数。

你可以按任意顺序执行以下两种操作：

- 选择第 $i$ 行（$1\le i\le n$），将这一行左右翻转。也就是说，对于所有 $1\le j\le m/2$，交换 $a_{i,j}$ 和 $a_{i,m-j+1}$。
- 选择第 $j$ 列（$1\le j\le m$），将这一列上下翻转。也就是说，对于所有 $1\le i\le n/2$，交换 $a_{i,j}$ 和 $a_{n-i+1,j}$。

判断能否通过有限次操作，将 $a$ 变为目标矩阵 $b$。目标矩阵按行依次填入 $1,2,\ldots,n\times m$，即 $b_{i,j}=(i-1)\times m+j$。

如果可以，请构造一个不超过 **9961 次操作**的操作序列。允许不进行任何操作，即操作序列可以为空。可以证明，如果存在可行的操作序列，就一定存在一个不超过 $9961$ 次操作的序列。

## 输入格式

第一行包含一个正整数 $t$（$1\le t\le25$），表示测试用例数。

对于每个测试用例，第一行包含两个正整数 $n,m$（$2\le n,m\le134$），表示矩阵 $a$ 的行数和列数。

接下来 $n$ 行，每行包含 $m$ 个正整数 $a_{i,1},a_{i,2},\ldots,a_{i,m}$，表示矩阵中的元素。

保证 $n,m$ 均为偶数，且 $1$ 到 $n\times m$ 中的每个整数在矩阵 $a$ 中恰好出现一次。

## 输出格式

对于每个测试用例，如果能在有限次操作后将矩阵 $a$ 变为目标矩阵 $b$，第一行输出 `Yes`。

接下来一行输出一个非负整数 $\mathrm{cnt}$，表示操作次数。必须满足 $0\le\mathrm{cnt}\le9961$。此限制针对每个测试用例，不限制所有测试用例的操作次数之和。

然后输出 $\mathrm{cnt}$ 行，每行包含两个整数 $\mathrm{op},\mathrm{idx}$。其中 $\mathrm{op}\in\{0,1\}$：

- 当 $\mathrm{op}=0$ 时，翻转第 $\mathrm{idx}$ 行，要求 $1\le\mathrm{idx}\le n$。
- 当 $\mathrm{op}=1$ 时，翻转第 $\mathrm{idx}$ 列，要求 $1\le\mathrm{idx}\le m$。

如果不存在合法操作序列，只输出一行 `No`。

答案不区分大小写。例如，`yEs`、`yes`、`Yes` 和 `YES` 都会被识别为肯定回答。

## 样例

### 输入

```text
4
2 4
4 3 2 1
8 7 6 5
2 4
1 3 2 4
5 6 7 8
4 2
1 2
3 4
7 8
5 6
4 4
4 15 14 16
8 6 11 12
5 7 10 9
13 3 2 1
```

### 输出

```text
Yes
2
0 1
0 2
Yes
5
1 2
0 1
1 2
0 1
1 2
No
No
```

## 说明

第二个测试用例的操作过程如下。

初始矩阵为

$$
\begin{bmatrix}1&3&2&4\\5&6&7&8\end{bmatrix}.
$$

翻转第 $2$ 列后，得到

$$
\begin{bmatrix}1&6&2&4\\5&3&7&8\end{bmatrix}.
$$

翻转第 $1$ 行后，得到

$$
\begin{bmatrix}4&2&6&1\\5&3&7&8\end{bmatrix}.
$$

翻转第 $2$ 列后，得到

$$
\begin{bmatrix}4&3&6&1\\5&2&7&8\end{bmatrix}.
$$

翻转第 $1$ 行后，得到

$$
\begin{bmatrix}1&6&3&4\\5&2&7&8\end{bmatrix}.
$$

最后翻转第 $2$ 列，得到目标矩阵

$$
\begin{bmatrix}1&2&3&4\\5&6&7&8\end{bmatrix}.
$$

第三个和第四个测试用例的目标矩阵分别为

$$
\begin{bmatrix}1&2\\3&4\\5&6\\7&8\end{bmatrix},\qquad
\begin{bmatrix}1&2&3&4\\5&6&7&8\\9&10&11&12\\13&14&15&16\end{bmatrix}.
$$

可以证明，这两个测试用例均无解。
