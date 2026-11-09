---
problemId: ccpc-2022-guangzhou/F
language: zh
status: qoj
source: https://qoj.ac/problem/8143/statement/zh_cn
sourceHash: 6478e11e01d80d421cfd79a0b32111a4cf48c065883332046f82cd1def87c499
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：2.5 秒；内存限制：256 MB。

设 $f(a, b, m)$ 为同余方程的最小非负整数解：



$$
ax \equiv b \pmod{m}
$$



若该方程无解，则 $f(a, b, m) = 0$。

给定 $n, a, b$，计算 $\sum_{i=1}^{n} f(a, b, i) \pmod{998244353}$。

## 输入格式

第一行包含一个整数 $T$ ($1 \le T \le 5$)，表示测试用例的数量。

接下来 $T$ 行，每行包含三个正整数 $n, a, b$ ($1 \le n \le 10^{18}, 1 \le a, b \le 10^6$)。

## 输出格式

输出 $T$ 行。第 $i$ 行包含第 $i$ 个测试用例的答案。

## 样例

### 样例输入 1

```text
5
5 4 3
5 3 4
10 5 8
10 8 5
100 79 97
```

### 样例输出 1

```text
2
3
15
10
2519
```

---

来源：[QOJ 中文题面](https://qoj.ac/problem/8143/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
