---
problemId: icpc-2026-chengdu/F
language: zh
status: qoj
source: https://qoj.ac/problem/23597/statement/zh_cn
sourceHash: 52ccd4aac120a3ce2fed399420a6a431effe524fae8569840715754d1f8db787
---

## 题目描述

时间限制：5 秒；内存限制：1024 MB。

菜猫有一个由 $n$ 个小写英文字母组成的字符串 $S$。他想要构建一本词典，其中包含 $S$ 的 $k$ 个不同非空子串作为单词。子串是字符串中连续的一部分。内容相同的子串即使在 $S$ 的不同位置出现，也被视为同一个单词。

![problem\_23597\_b7c3639e439584b24d8e3cd0c7e7774e.png](../../../assets/qoj-statements/23597/fd78a21e6a47c251.png)

设 $\pi$ 是从字母 $\texttt{a}, \texttt{b}, \ldots, \texttt{z}$ 到 $26$ 个小写英文字母的某个排列中对应字母的映射。例如，排列 $\texttt{qwertyuiopasdfghjklzxcvbnm}$ 定义了如下映射：



$$
\begin{array}{c|cccccccccccccccccccccccccc}
c & \texttt{a} & \texttt{b} & \texttt{c} & \texttt{d} & \texttt{e} & \texttt{f} & \texttt{g} & \texttt{h} & \texttt{i} & \texttt{j} & \texttt{k} & \texttt{l} & \texttt{m} & \texttt{n} & \texttt{o} & \texttt{p} & \texttt{q} & \texttt{r} & \texttt{s} & \texttt{t} & \texttt{u} & \texttt{v} & \texttt{w} & \texttt{x} & \texttt{y} & \texttt{z} \\
\hline
\pi(c) & \texttt{q} & \texttt{w} & \texttt{e} & \texttt{r} & \texttt{t} & \texttt{y} & \texttt{u} & \texttt{i} & \texttt{o} & \texttt{p} & \texttt{a} & \texttt{s} & \texttt{d} & \texttt{f} & \texttt{g} & \texttt{h} & \texttt{j} & \texttt{k} & \texttt{l} & \texttt{z} & \texttt{x} & \texttt{c} & \texttt{v} & \texttt{b} & \texttt{n} & \texttt{m}
\end{array}
$$



对于字符串 $u = u_1 u_2 \cdots u_m$，定义



$$
\pi(u) = \pi(u_1)\pi(u_2) \cdots \pi(u_m).
$$



例如，在上述映射下，$\pi(\texttt{apple}) = \texttt{qhhst}$。

菜猫希望词典中包含一个单词 $w$，使得将任意这样的映射 $\pi$ 应用于词典中的每个单词后，$\pi(w)$ 在所得词典中始终是字典序最小的单词。

对于每个 $k = 1, 2, \ldots, n$，求包含 $k$ 个不同单词且满足要求的词典数量，对 $998\,244\,353$ 取模。两本词典被视为不同，当且仅当在应用任何映射之前它们包含的单词集合不同。

回顾一下，字符串 $a$ 的字典序小于字符串 $b$，是指 $a$ 是 $b$ 的前缀（且 $a \neq b$），或者存在下标 $i$（$1 \le i \le \min(|a|, |b|)$）满足 $a_i < b_i$，且对任意下标 $j$（$1 \le j < i$）都有 $a_j = b_j$。

## 输入格式

第一行包含一个整数 $T$（$1 \le T \le 10^4$），表示测试用例的数量。接下来是各测试用例的描述。

每个测试用例的第一行包含一个整数 $n$（$1 \le n \le 10^5$）。

第二行包含一个长度为 $n$ 的字符串 $S$，仅由小写英文字母组成。

保证所有测试用例中 $n$ 的总和不超过 $10^5$。

## 输出格式

对于每个测试用例，在一行中输出 $n$ 个整数。第 $k$ 个整数表示包含 $k$ 个不同单词且满足要求的词典数量，对 $998\,244\,353$ 取模。

## 样例

### 输入格式 1

```text
3
3
aab
4
ppqq
7
abcaabc
```

### 输出格式 1

```text
5 4 3
8 10 11 10
21 52 87 119 139 128 84
```

### 说明

下面每本词典都写成一个单词集合。

对于第一个测试用例 $S = \texttt{aab}$，当 $k = 1, 2, 3$ 时满足要求的词典如下：

| $k$ | 满足要求的单词集合 | 词典数量 |
| --- | --- | --- |
| $1$ | $\{\texttt{a}\,\},\ \{\texttt{b}\,\},\ \{\texttt{aa}\,\},\ \{\texttt{ab}\,\},\ \{\texttt{aab}\,\}$ | $5$ |
| $2$ | $\{\texttt{a}, \texttt{aa}\,\},\ \{\texttt{a}, \texttt{ab}\,\},\ \{\texttt{a}, \texttt{aab}\,\},\ \{\texttt{aa}, \texttt{aab}\,\}$ | $4$ |
| $3$ | $\{\texttt{a}, \texttt{aa}, \texttt{ab}\,\},\ \{\texttt{a}, \texttt{aa}, \texttt{aab}\,\},\ \{\texttt{a}, \texttt{ab}, \texttt{aab}\,\}$ | $3$ |

---

来源：[QOJ 中文题面](https://qoj.ac/problem/23597/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
