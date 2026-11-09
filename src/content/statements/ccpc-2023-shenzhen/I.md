---
problemId: ccpc-2023-shenzhen/I
language: zh
status: qoj
source: https://qoj.ac/problem/8336/statement/zh_cn
sourceHash: 70baf273e90618eed4e0a06be0694c8f728a7d33219c94360c2d8dc780ec229b
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1.0 秒；内存限制：256 MB。

给定正整数 $n, k$，求不定方程 $a^k - b^k = n$ 的正整数解的个数。

## 输入格式

第一行包含一个整数 $T$ ($1 \le T \le 20$)，表示查询次数。接下来的 $T$ 行，每行包含两个整数 $n, k$，表示单次查询。保证 $1 \le n \le 10^{18}$，$3 \le k \le 64$。

## 输出格式

对于每个查询，输出一行，包含一个整数，表示答案。

## 样例

### 输入 1

```text
3
7 3
15 4
31 5
```

### 输出 1

```text
1
1
1
```
