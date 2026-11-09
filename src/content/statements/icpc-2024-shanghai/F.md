---
problemId: icpc-2024-shanghai/F
language: zh
status: qoj
source: https://qoj.ac/problem/9042/statement/zh_cn
sourceHash: 8e437bb3ebc77f2f10561d6e4ce8af7f3f1378accb36e5e0eba3e878e900794a
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：3.0 秒；内存限制：1024 MB。

你听说过 Bogosort 吗？Bogosort 是一种非常有趣的随机排序算法，它可以在最好情况下以 $O(n)$ 的时间复杂度对一个包含 $n$ 个元素的数组进行排序。该算法描述如下：

-   均匀地随机打乱整个数组。
-   检查数组是否有序。

是的，读完上面的算法后，你会意识到 Bogosort 的期望时间复杂度实际上是 $O(n \cdot n!)$！

Bogosort 非常迷人，但它运行得太慢了，这非常令人遗憾。因此，让我们通过使用以下算法“快速 Bogosort”（Fast Bogosort）来优化它，以对 $1$ 到 $n$ 的排列进行排序：

-   如果数组已经有序，则停止。
-   否则，将数组尽可能多地划分为若干段，使得每一段对应区间 $[l_i, r_i]$ 且恰好包含数字 $[l_i, r_i]$ 的排列。注意，这些段不能重叠，且它们的并集必须是整个范围 $[1, n]$。
-   对于划分出的每一段 $[l, r]$，如果 $l < r$，则调用 `shuffle(l, r)` 来均匀地随机打乱该段内的数字。

如果我们只关心调用 `shuffle(l, r)` 的次数，很明显原始的 Bogosort 的期望调用次数为 $n!$。现在，给定一个 $1$ 到 $n$ 的排列，请计算 Fast Bogosort 调用 `shuffle(l, r)` 的期望次数。

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 10^5$)，表示数组的长度。 第二行包含 $n$ 个整数 $a_1, a_2, \dots, a_n$，表示数组的内容。保证 $a_1, a_2, \dots, a_n$ 是 $1 \sim n$ 的一个排列。

## 输出格式

输出 Fast Bogosort 调用 `shuffle(l, r)` 的期望次数。可以证明该期望值总是一个有理数。此外，在本题的数据范围内，还可以证明当该值表示为最简分数 $\frac{P}{Q}$ 时，满足 $Q \not\equiv 0 \pmod{998244353}$。因此，存在唯一的整数 $R$ 使得 $R \times Q \equiv P \pmod{998244353}$，且 $0 \le R < 998244353$。请输出这个 $R$。

## 样例

### 样例输入 1

```text
5
2 1 5 3 4
```

### 样例输出 1

```text
332748123
```

### 样例输入 2

```text
10
4 2 3 1 6 5 9 7 10 8
```

### 样例输出 2

```text
453747445
```

---

来源：[QOJ 中文题面](https://qoj.ac/problem/9042/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
