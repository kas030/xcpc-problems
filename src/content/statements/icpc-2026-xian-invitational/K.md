---
problemId: icpc-2026-xian-invitational/K
language: zh
status: qoj
source: https://qoj.ac/problem/17352/statement/zh_cn
sourceHash: 1db7ad024537b664604d6d6e311b1ce7d771e25fb722fd212ea6254888dd53b3
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：3 秒；内存限制：512 MB。

Yuki 有一棵拥有 $2^n$ 个节点的树，节点编号为 $0$ 到 $2^n - 1$。第 $i$ 条边连接节点 $u_i$ 和节点 $v_i$。

设 $\text{lca}_r(u, v)$ 表示以节点 $r$ 为根时，节点 $u$ 和 $v$ 的最近公共祖先（LCA）。

你需要帮助 Yuki 计算：



$$
\bigoplus_{0 \le u < v < 2^n} \text{lca}_{u \oplus v}(u, v)
$$



其中 $\oplus$ 表示按位异或（XOR）运算。

## 输入格式

本题包含多个测试用例。

第一行包含一个正整数 $t$ ($1 \le t \le 10^4$)，表示测试用例的数量。

对于每个测试用例：

-   第一行包含一个正整数 $n$ ($1 \le n \le 21$)。
-   接下来的 $2^n - 1$ 行，每行包含两个整数 $u_i, v_i$ ($0 \le u_i, v_i < 2^n, u_i \neq v_i$)。

保证输入构成一棵树，且所有测试用例中 $2^n$ 的总和不超过 $2^{21}$。

## 输出格式

对于每个测试用例，输出一行，包含一个整数，表示答案。

## 样例

### 输入样例 1

```text
4
1
0 1
2
0 1
1 2
2 3
3
0 1
0 2
0 3
0 4
0 5
0 6
0 7
3
4 5
2 6
3 7
0 2
1 5
2 7
6 4
```

### 输出样例 1

```text
1
2
0
4
```

## 说明

对于第一个测试用例：

-   当以节点 $1$ 为根时，节点 $0$ 和 $1$ 的最近公共祖先是节点 $1$，因此答案为 $\text{lca}_1(0, 1) = 1$。

对于第二个测试用例：

-   我们计算所有点对 $(u, v)$ 的 $\text{lca}_{u \oplus v}(u, v)$：
    
    -   $(0, 1)$: $0 \oplus 1 = 1$，$\text{lca}_1(0, 1) = 1$。
    -   $(0, 2)$: $0 \oplus 2 = 2$，$\text{lca}_2(0, 2) = 2$。
    -   $(0, 3)$: $0 \oplus 3 = 3$，$\text{lca}_3(0, 3) = 3$。
    -   $(1, 2)$: $1 \oplus 2 = 3$，$\text{lca}_3(1, 2) = 2$。
    -   $(1, 3)$: $1 \oplus 3 = 2$，$\text{lca}_2(1, 3) = 2$。
    -   $(2, 3)$: $2 \oplus 3 = 1$，$\text{lca}_1(2, 3) = 2$。
-   异或和为 $1 \oplus 2 \oplus 3 \oplus 2 \oplus 2 \oplus 2 = 2$。

---

来源：[QOJ 中文题面](https://qoj.ac/problem/17352/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
