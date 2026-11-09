---
problemId: icpc-2023-xian-invitational/G
language: zh
status: qoj
source: https://qoj.ac/problem/6747/statement/zh_cn
sourceHash: 266e7b2eda5b718311b14b1450bd34089e981545569940d08bcd0b625c4ba708
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1 秒；内存限制：256 MB。

寻找一个 $1 \dots n$ 的排列，使得 $\prod_{i=1}^{n} \text{lcm}(p_i, p_{(i \bmod n) + 1})$ 最大。

## 输入格式

一个整数 $n$，满足 $n \le 10^5$。

## 输出格式

输出 $n$ 个整数，即为答案。

## 样例

### 样例输入 1

```text
3
```

### 样例输出 1

```text
1 2 3
```

### 样例输入 2

```text
7
```

### 样例输出 2

```text
1 2 3 4 5 6 7
```
