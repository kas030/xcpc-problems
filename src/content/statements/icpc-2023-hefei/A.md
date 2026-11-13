---
problemId: icpc-2023-hefei/A
language: zh
status: qoj
source: https://qoj.ac/problem/7874/statement/zh_cn
sourceHash: df60751af8ccb9abdc37f42eecc9ffaafb6e6adc30e841ab71889d14ea4b2014
---

## 题目描述

时间限制：3.0 秒；内存限制：256 MB。

Miss Burger 有三个正整数 $n, a, b$。她想要找到一个正整数解 $x$ ($1 \le x \le n - 1$)，满足以下两个条件：

-   $x^2 \equiv a \pmod n$
-   $\lfloor \sqrt[3]{x^2} \rfloor = b$

此外，保证 $n$ 是一个奇数且 $\gcd(a, n) = 1$。这里 $\gcd(x, y)$ 表示 $x$ 和 $y$ 的最大公约数。我们还保证存在唯一的解。

注意 $\lfloor x \rfloor$ 表示不超过 $x$ 的最大整数，例如 $\lfloor 0.5 \rfloor = 0, \lfloor 11.3 \rfloor = 11, \lfloor 101.9 \rfloor = 101, \lfloor 99 \rfloor = 99, \lfloor 0 \rfloor = 0, \lfloor 2 \rfloor = 2$。

## 输入格式

第一行包含一个整数 $n$ ($3 \le n \le 10^{100} - 1$)。 第二行包含一个整数 $a$ ($1 \le a \le n - 1$)。 第三行包含一个整数 $b$ ($1 \le b \le n - 1$)。

## 输出格式

输出一个整数，表示解 $x$。

## 样例

### 样例输入 1

```text
9
4
3
```

### 样例输出 1

```text
7
```

### 样例输入 2

```text
650849
253233
5059
```

### 样例输出 2

```text
359895
```

### 样例输入 3

```text
29268658540371639122046169677605538931
22216978925831646928504047924228222624
9226521123963832612770162
```

### 样例输出 3

```text
28025732380501848167087889769592298758
```
