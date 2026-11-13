---
problemId: icpc-2022-xian/E
language: zh
status: qoj
source: https://qoj.ac/problem/5117/statement/zh_cn
sourceHash: 183d89a4037e3fee7b82678bfea44e84a57592c680551fb8dea0c1762b85d8ff
---

## 题目描述

时间限制：1 秒；内存限制：512 MB。

我们定义函数 $f(x)$ 在所有非负整数 $x$ 上的取值如下：

$$
f(x) = \begin{cases} 1 & (x = 0) \\ f(\frac{x}{3}) + 1 & (x > 0 \land x \bmod 3 = 0) \\ f(x - 1) + 1 & (x > 0 \land x \bmod 3 \neq 0) \end{cases}
$$

计算 $\max_{x=l}^{r} f(x)$。 你需要独立回答 $T$ 组询问。

## 输入格式

第一行包含一个整数 $T$ ($1 \le T \le 10^4$)。 接下来 $T$ 行，每行包含两个整数 $l$ 和 $r$ ($1 \le l \le r \le 10^{18}$)，表示一组询问。

## 输出格式

输出 $T$ 行。第 $i$ 行包含一个整数，表示第 $i$ 组询问的答案。

## 样例

### 样例输入 1

```text
10
1 2
1 3
1 4
1 5
2 3
2 4
2 5
3 4
3 5
4 5
```

### 样例输出 1

```text
3
3
4
5
3
4
5
4
5
5
```
