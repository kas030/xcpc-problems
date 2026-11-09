---
problemId: ccpc-2023-guilin/C
language: zh
status: qoj
source: https://qoj.ac/problem/7679/statement/zh_cn
sourceHash: a42d643fd50bd22415609455218d9e3ec9cc2f8ec60ad332501d3c919a7b356f
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1.0 秒；内存限制：1024 MB。

Prof. Chen 是算术运算和二进制运算的大师。今天他给学生 Putata 和 Budada 布置的家庭作业是：对于给定的序列 $\{a_n\}$，求出序列 $\{1, 2, \dots, n\}$ 的非空子序列 $\{i_1, i_2, \dots, i_m\}$（满足 $1 \le i_1 < i_2 < i_3 < \dots < i_m \le n$，$1 \le m \le n$），使得对于所有的 $x \in [1, m]$，都有 $a_{i_x} \mid \bigoplus_{j=1}^m a_{i_j}$。

这里 $\oplus$ 表示按位异或运算，$\bigoplus_{j=1}^m a_{i_j}$ 等于所有 $a_{i_j}$（$1 \le j \le m$）的按位异或和。我们称 $x \mid s$ 当且仅当存在非负整数 $k$ 使得 $s = k \cdot x$。

请帮助 Putata 和 Budada 完成他们的作业。为了打破传说，请输出答案对 $998\,244\,353$ 取模的结果。

## 输入格式

第一行包含一个整数 $t$ ($1 \le t \le 2 \cdot 10^5$)，表示测试用例的数量。

对于每个测试用例，第一行包含一个整数 $n$ ($1 \le n \le 2 \cdot 10^5$)，表示序列的长度。

第二行包含 $n$ 个整数，第 $i$ 个整数为 $a_i$ ($1 \le a_i \le n$)，表示序列的第 $i$ 个元素。注意可能存在 $i \neq j$ 使得 $a_i = a_j$。

保证所有测试用例的 $n$ 之和不超过 $2 \cdot 10^5$。

## 输出格式

对于每个测试用例，输出一行一个整数，表示答案。

## 样例

### 样例输入 1

```text
2
3
1 2 3
5
3 3 5 1 1
```

### 样例输出 1

```text
4
11
```

---

来源：[QOJ 中文题面](https://qoj.ac/problem/7679/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
