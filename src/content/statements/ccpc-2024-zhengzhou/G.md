---
problemId: ccpc-2024-zhengzhou/G
language: zh
status: qoj
source: https://qoj.ac/problem/9774/statement/zh_cn
sourceHash: daf6008fbffd259ec6eff6ea3f2cd6aa37ecd02b03edcdfa344ee187de06771a
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

Bobo 正在处理一个长度为 $n$ 的整数序列 $a_1, a_2, \dots, a_n$。他需要依次处理 $q$ 个查询。 每个查询属于以下两种类型之一：

-   $1 \ L \ R \ v$ ($1 \le L \le R \le n, 0 \le v \le 2 \cdot 10^5$)：对于所有 $i \in [L, R]$，更新 $a_i \leftarrow a_i + v$；
-   $2 \ L \ R$ ($1 \le L < R \le n, R - L + 1$ 为偶数)：判断元素 $a_L, a_{L+1}, \dots, a_R$ 是否可以划分为 $(R - L + 1)/2$ 对整数，使得每一对的和相等。

你的任务是帮助 Bobo 高效地处理这些查询。

## 输入格式

第一行包含两个整数 $n, q$ ($1 \le n, q \le 2 \cdot 10^5$)。 第二行包含 $n$ 个整数 $a_1, a_2, \dots, a_n$ ($0 \le a_i \le 2 \cdot 10^5$)。 接下来 $q$ 行，每行包含一个查询，格式如题目描述所述。

## 输出格式

对于每个第二类查询，如果元素 $a_L, a_{L+1}, \dots, a_R$ 可以划分为 $(R - L + 1)/2$ 对和相等的整数，则输出 “YES”（不含引号）；否则输出 “NO”（不含引号）。 输出 “YES” 和 “NO” 时不区分大小写（例如，“yES”、“yes” 和 “Yes” 均会被识别为肯定回答）。

## 样例

### 样例输入 1

```text
8 4
1 2 3 4 5 6 7 8
2 1 8
1 1 4 4
2 1 6
2 1 8
```

### 样例输出 1

```text
YES
NO
YES
```
