---
problemId: icpc-2023-online-qualification-1/B
language: zh
status: qoj
source: https://qoj.ac/problem/8073/statement/zh_cn
sourceHash: 2909c73067ab7e00b8e714b935e06af2481fdb15e873bc840d1f39a1ef7f4ebd
---

## 题目描述

时间限制：1.0 秒；内存限制：256 MB。

给定两个长度相等（从 1 开始索引）的字符串 $S_1$ 和 $S_2$。 现在你需要回答 $q$ 个询问，每个询问包含一个字符串 $T$。 询问要求计算满足条件 $S_1[i, j] + S_2[j + 1, k] = T$ 的整数三元组 $(i, j, k)$ ($1 \le i \le j < k \le |S_1|$) 的数量。 这里 $S[l, r]$ 表示字符串 $S$ 从索引 $l$ 到 $r$ 的子串，“+” 表示字符串的拼接。

## 输入格式

第一行包含一个字符串 $S_1$。 第二行包含一个字符串 $S_2$。 保证 $1 \le |S_1| = |S_2| \le 10^5$。 第三行包含一个正整数 $q$ ($1 \le q \le 2 \times 10^5$)，表示询问次数。 接下来的 $q$ 行，每行包含一个字符串 $T$ ($1 \le |T| \le 2 \times 10^5$)，表示询问的字符串。 保证 $\sum |T| \le 2 \times 10^5$，且所有输入字符串仅由小写字母组成。

## 输出格式

对于每个询问，输出一行，包含一个正整数，表示满足条件的三元组数量。

## 样例

### 输入 1

```text
aaababaa
aababbca
7
aa
abb
aab
ab
abc
bb
ba
```

### 输出 1

```text
3
1
3
2
2
1
0
```
