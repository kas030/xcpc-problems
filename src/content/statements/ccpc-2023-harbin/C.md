---
problemId: ccpc-2023-harbin/C
language: zh
status: qoj
source: https://qoj.ac/problem/7748/statement/zh_cn
sourceHash: 79be7482a5996ca9c680d9edce2c595f89d93498263ec31b60ae1adcf21416eb
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：2.0 秒；内存限制：256 MB。

Karshilov 一如既往地喜欢字符串匹配问题。这一次，他给出了一个长度为 $n$ 的字符串 $S$，并为 $S$ 的每个前缀分配了一个权值。具体来说，$S$ 长度为 $i$ ($1 \le i \le n$) 的前缀记为 $pre_i$，其权值为 $w_i$。

对于任意字符串 $t$，他定义了一个价值函数 $f(t) = \sum_{i=1}^n w_i \cdot \text{occur}(t, pre_i)$，其中 $\text{occur}(t, pre_i)$ 表示 $pre_i$ 在字符串 $t$ 中出现的次数。例如：$\text{occur}(\text{heheh}, \text{heh}) = 2$ 且 $\text{occur}(\text{hhh}, \text{h}) = 3$。

现在，Karshilov 还有另一个长度为 $n$ 的字符串 $T$。他将向你提出 $m$ 个询问。每个询问包含两个整数 $l, r$，要求查询 $f(T[l, r])$ 的值，其中 $T[l, r]$ 表示字符串 $T$ 从第 $l$ 个字符到第 $r$ 个字符的子串（即 $T_l T_{l+1} \dots T_r$）。

你能像两年前那样解决 Karshilov 的询问吗？

## 输入格式

第一行包含两个整数 $n, m$ ($1 \le n, m \le 150, 000$)，分别表示字符串 $S$（及字符串 $T$）的长度和询问次数。

第二行包含一个长度为 $n$ 的字符串 $S$。

第三行包含一个长度为 $n$ 的字符串 $T$。

第四行包含 $n$ 个整数 $w_1, w_2, \dots, w_n$，其中 $w_i$ ($0 \le w_i \le 10^8$) 是 $pre_i$ 的权值。

接下来的 $m$ 行，每行包含两个整数 $l, r$ ($1 \le l \le r \le n$)，表示询问 $f(T[l, r])$ 的值。

字符串 $S$ 和 $T$ 均由小写字母组成。

## 输出格式

输出包含 $m$ 行。第 $i$ 行包含一个整数，表示第 $i$ 个询问的答案。

## 样例

### 样例输入 1

```text
8 5
abbabaab
aababbab
1 2 4 8 16 32 64 128
1 1
2 3
3 5
4 7
1 8
```

### 样例输出 1

```text
1
3
3
16
38
```

### 样例输入 2

```text
15 4
heheheheehhejie
heheheheheheheh
3 1 4 1 5 9 2 6 5 3 5 8 9 7 9
2 3
4 8
2 6
1 15
```

### 样例输出 2

```text
3
13
13
174
```

---

来源：[QOJ 中文题面](https://qoj.ac/problem/7748/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
