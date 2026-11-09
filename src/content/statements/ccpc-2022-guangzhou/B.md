---
problemId: ccpc-2022-guangzhou/B
language: zh
status: qoj
source: https://qoj.ac/problem/8139/statement/zh_cn
sourceHash: e49e20ae3db5dd8ef8b51b4d56e0f827c60efd4d00ac4ea89569f5334a980fae
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：4.0 秒；内存限制：512 MB。

Ayano 有三个整数数组 $a_1, \dots, a_n$，$b_1, \dots, b_n$ 和 $c_1, \dots, c_n$。初始时，每个 $b_i$ 和 $c_i$ 的值均为零。

现在她希望你执行 $q$ 次操作。操作共有两种类型：

-   `1 l r w` ($1 \le l \le r \le n, 1 \le w \le n$)：对于每个满足 $l \le i \le r$ 的 $i$，将 $a_i$ 设为 $w$。
-   `2 l r w` ($1 \le l \le r \le n, 1 \le w \le 10^9$)：对于每个满足 $l \le i \le r$ 的 $i$，将 $c_i$ 增加 $w$。

在每次操作结束时，对于每个 $i$ ($1 \le i \le n$)，Ayano 会将 $b_{a_i}$ 增加 $c_i$。

请在所有操作完成后告诉她数组 $b_1, \dots, b_n$ 的值。由于答案可能非常大，你只需要输出每个数对 $2^{64}$ 取模的结果。

## 输入格式

第一行包含两个整数 $n$ 和 $q$ ($1 \le n, q \le 5 \cdot 10^5$)，分别表示数组的长度和操作次数。

下一行包含 $n$ 个整数 $a_1, \dots, a_n$ ($1 \le a_i \le n$)。

接下来的 $q$ 行，每行包含四个整数 $t_i, l_i, r_i, w_i$ ($1 \le t_i \le 2$)，表示操作。

## 输出格式

输出一行，包含 $n$ 个整数。第 $i$ 个整数表示 $b_i$ 对 $2^{64}$ 取模的结果。

## 样例

### 样例输入 1

```text
5 6
1 2 3 4 5
2 2 4 1
1 2 3 3
2 3 4 3
1 3 5 4
2 1 5 2
1 1 3 2
```

### 样例输出 1

```text
2 12 12 36 0
```
