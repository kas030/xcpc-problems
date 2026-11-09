---
problemId: ccpc-2022-weihai/G
language: zh
status: qoj
source: https://qoj.ac/problem/9597/statement/zh_cn
sourceHash: 564c29c2d4770c589f188b60fbf07901cd815b356d130f7cce10f20556e9ee45
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：3.0 秒；内存限制：256 MB。

![题目中的 Kotsuki the Cat](../../../assets/qoj-statements/9597/official-fix.png)

Kotsuki the Cat，与 FuuFuu 和 Pico 一起住在 KFP 公寓。作为一名老师，Kotsuki 每天都需要去学校授课。有一天，Kotsuki 给小学二年级的学生上了一堂数学课，涵盖了以下主题：

-   互质（Coprime）：如果两个整数的最大公约数为 1，则称它们互质。
-   按位异或（Bitwise XOR，$\oplus$）：按位异或是一种二元运算，它将两个整数的二进制形式的每一位进行逻辑异或运算。如果两个对应位中只有一个为 1，则结果为 1；如果两个对应位均为 0 或均为 1，则结果为 0。例如，$5 \oplus 3 = (101)_2 \oplus (011)_2 = (110)_2 = 6$。

课后，Kotsuki 给学生布置了家庭作业：

-   给定一个整数 $x$，对于不同的区间 $[l, r]$，请计算区间内满足 $kx \oplus x$ 与 $x$ 互质的整数 $k$ 的个数。形式化地，请计算： 
    
    $$
    \sum_{k=l}^{r} [\gcd(kx \oplus x, x) = 1]
    $$
    
     其中 $\gcd(a, b)$ 表示 $a$ 和 $b$ 的最大公约数，$[\ ]$ 表示艾弗森括号（Iverson bracket），即 $[P] = \begin{cases} 1 & \text{如果 } P \text{ 为真} \\ 0 & \text{否则} \end{cases}$。特别地，$\gcd(0, a) = a$。

你能完成这份二年级的家庭作业吗？

## 输入格式

第一行包含两个整数 $x$ ($1 \le x \le 10^6$) 和 $n$ ($1 \le n \le 10^5$)，其中 $n$ 表示区间的数量。

接下来 $n$ 行，每行包含两个整数 $l$ 和 $r$ ($1 \le l \le r \le 10^{12}$)，表示一个区间 $[l, r]$。

## 输出格式

对于每个区间，输出一行答案。

## 样例

### 输入格式 1

```text
15 2
1 4
11 4514
```

### 输出格式 1

```text
2
2252
```

### 说明

当 $x = 15$ 时，

-   $k = 1, \gcd(kx \oplus x, x) = \gcd(15 \oplus 15, 15) = \gcd(0, 15) = 15$
-   $k = 2, \gcd(kx \oplus x, x) = \gcd(30 \oplus 15, 15) = \gcd(17, 15) = 1$
-   $k = 3, \gcd(kx \oplus x, x) = \gcd(45 \oplus 15, 15) = \gcd(34, 15) = 1$
-   $k = 4, \gcd(kx \oplus x, x) = \gcd(60 \oplus 15, 15) = \gcd(51, 15) = 3$

因此区间 $[1, 4]$ 的答案为 2。
