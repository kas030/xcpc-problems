---
problemId: icpc-2023-xian-invitational/I
language: zh
status: qoj
source: https://qoj.ac/problem/6744/statement/zh_cn
sourceHash: 76b7cd8291c78e649b0b007f431d39b050ac78aefc99599d032229b19e1f2e78
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

假设你有一个正整数 $x$，你可以在一次操作中将其转换为 $x - 1$ 或 $x + \lfloor \sqrt{2x} + 1.5 \rfloor$。

求将 $x$ 转换为另一个正整数 $y$ 所需的最少操作次数。

## 输入格式

输入包含多组测试数据。

第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试数据的组数。

对于每组测试数据，包含两个整数 $x_i$ 和 $y_i$ ($1 \le x_i, y_i \le 10^{18}$)。

## 输出格式

对于每组测试数据，输出一行，包含一个整数，表示答案。

## 样例

### 输入格式 1

```text
2
5 1
1 5
```

### 输出格式 1

```text
4
3
```
