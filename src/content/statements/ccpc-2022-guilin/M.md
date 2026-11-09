---
problemId: ccpc-2022-guilin/M
language: zh
status: qoj
source: https://qoj.ac/problem/6820/statement/zh_cn
sourceHash: 5138bf99d2ef5f6f9e049646d758c956c6e4a032d2607dba9e30b5db6b17b711
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：3.0 秒；内存限制：512 MB。

决赛总是令人兴奋的。表演者们竭尽全力吸引观众的注意，然后完成一场完美的谢幕。作为题目的最后一道题，也是整套题目的压轴戏，我们想让你回顾一个简单的算法。像我一样，这可能是你学过的第一个算法，叫做冒泡排序（Bubble Sort）。

```text
void bubble_sort ( int a [] , int n ) { // 0 - based , sort from lowest to highest
    for ( int i = 1; i < n ; i ++) {
        for ( int j = 0; j < n - i ; j ++) {
            if ( a [ j ] > a [ j + 1]) {
                swap ( a [ j ] , a [ j + 1]);
            }
        } // after i - th inner iteration , a [ n - i ] is correct
    }
}
```

给定一个长度为 $n$ 的排列，众所周知，冒泡排序在最坏情况下的运行时间为 $\Omega(n^2)$。计算算法中 “swap” 的调用次数是一个非常经典的想法。随着你能力的提升，你现在需要在一个动态变化的排列中计算这个次数，其中可能会发生以下事件：

-   <strong>反转（Reverse）</strong>排列，即将排列替换为 $p' = \{p_n, p_{n-1}, \dots, p_2, p_1\}$。
-   将排列向左<strong>移位（Shift）</strong> 1 位，即将排列替换为 $p' = \{p_2, p_3, \dots, p_n, p_1\}$。

你需要做的是，在每次操作后，输出如果使用上述冒泡排序代码对排列进行排序时，将会调用的 “swap” 次数。

## 输入格式

第一行包含两个整数 $n, m$ ($1 \le n \le 3 \times 10^5, 1 \le m \le 6 \times 10^5$)，分别表示排列的长度和操作次数。

第二行包含 $n$ 个由空格分隔的整数，第 $i$ 个数表示初始的 $p_i$。

第三行包含一个长度为 $m$ 的字符串，由字符 ‘R’ 和 ‘S’ 组成。第 $i$ 个字符表示第 $i$ 次操作，其中 ‘R’ 表示反转操作，‘S’ 表示移位操作。

保证 $p$ 是 $1, 2, \dots, n$ 的一个合法排列。

## 输出格式

第一行输出对初始排列 $p$ 进行冒泡排序时将会调用的 “swap” 次数。

第二行输出一个长度为 $m$ 的数字字符串。第 $i$ 个数字表示在第 $i$ 次操作后，对排列进行冒泡排序时将会调用的 “swap” 次数，对 10 取模。

## 样例

### 输入 1

```text
5 10
5 4 3 2 1
SSSSRSSSSR
```

### 输出 1

```text
10
6446466400
```
