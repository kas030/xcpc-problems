---
problemId: icpc-2023-shenyang/D
language: zh
status: qoj
source: https://qoj.ac/problem/7780/statement/zh_cn
sourceHash: f0e84f53f123fdb2f606b5e0fd130d535926217f02a52bd750e0c3af6fb54da6
---

## 题目描述

时间限制：2.0 秒；内存限制：512 MB。

在不久的将来，LaTeX 这个几十年来一直是学术界和出版界支柱的古老排版系统，演化出了两个衍生版本——“Dark LaTeX”和“Light LaTeX”。这些衍生版本主要从不同角度优化了外观，以适应无屏幕显示技术。

为了进行兼容性试验，LaTeX 实验室通过分析获得了两个仅包含小写英文字母的非空字符串——Dark LaTeX 字符串 $S = s_1s_2 \dots s_{|S|}$ 和 Light LaTeX 字符串 $T = t_1t_2 \dots t_{|T|}$，其中 $|S|$ 表示 $S$ 的长度，$|T|$ 表示 $T$ 的长度。一个整数四元组 $(p, q, u, v)$ 被认为是可转换的，当且仅当 $1 \le p \le q \le |S|$，$1 \le u \le v \le |T|$，且 $s_p s_{p+1} \dots s_q t_u t_{u+1} \dots t_v$ 是一个平方串。

你的任务是帮助实验室找出可转换四元组的数量。

回想一下，平方串是指一个长度为偶数且前半部分与后半部分完全相同的字符串。例如，“aaaa”和“abcabc”是平方串，而“aaa”和“abcabd”则不是。

## 输入格式

输入包含两行，第一行包含 Dark LaTeX 字符串 $S$，第二行包含 Light LaTeX 字符串 $T$。

保证 $S$ 和 $T$ 仅由小写英文字母组成，且它们的长度均不超过 $5\,000$。

## 输出格式

输出一行一个整数，表示可转换四元组的数量。

## 样例

### 样例输入 1

```text
abab
ab
```

### 样例输出 1

```text
8
```

### 样例输入 2

```text
abab
abaaab
```

### 样例输出 2

```text
29
```

## 说明

在第一个样例中，可转换的四元组为 $(1, 1, 1, 1), (1, 2, 1, 2), (1, 3, 2, 2), (2, 2, 2, 2), (2, 4, 1, 1), (3, 3, 1, 1), (3, 4, 1, 2), (4, 4, 2, 2)$。
