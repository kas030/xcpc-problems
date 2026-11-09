---
problemId: ccpc-2023-online-qualification/D
language: zh
status: qoj
source: https://qoj.ac/problem/7515/statement/zh_cn
sourceHash: cd219c31c948b295bc11c9b81889b19d3df1894875bfc24cabb970c6bedb1668
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：2.0 秒；内存限制：512 MB。

给定一个整数序列 $f_0, f_1, \dots, f_{n-1}$，离散傅里叶变换得到一个复数序列 $F_0, F_1, \dots, F_{n-1}$，其中 

$$
F_t = \sum_{s=0}^{n-1} f_s e^{-2\pi ist/n}
$$

 对于每个 $t = 0, 1, \dots, n-1$，其中 $e^{i\theta} = \cos \theta + i \sin \theta$，$i$ 为虚数单位且满足 $i^2 = -1$。

你可以将 $f_k$ 重置为任意整数，以最小化 $|F_0|, |F_1|, \dots, |F_{n-1}|$ 中的最大值，其中 $|z| = |p + qi| = \sqrt{p^2 + q^2}$ ($p, q \in \mathbb{R}$) 为复数 $z$ 的模。

## 输入格式

第一行包含两个整数 $n$ ($1 \le n \le 2000$) 和 $k$ ($0 \le k < n$)。 第二行包含 $n$ 个整数 $f_0, f_1, \dots, f_{n-1}$ ($-2000 \le f_i \le 2000$)。

## 输出格式

输出一行，包含一个实数，表示在将 $f_k$ 重置为任意整数后， $|F_0|, |F_1|, \dots, |F_{n-1}|$ 中的最大值的最小值。

如果你的答案的绝对误差或相对误差不超过 $10^{-9}$，则视为正确。形式化地说，假设你的输出为 $a$，标准答案为 $b$，则当且仅当 $\frac{|a-b|}{\max\{1, |b|\}} \le 10^{-9}$ 时，你的输出被接受。

## 样例

### 样例输入 1

```text
3 2
1 1 0
```

### 样例输出 1

```text
2.0
```

---

来源：[QOJ 中文题面](https://qoj.ac/problem/7515/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
