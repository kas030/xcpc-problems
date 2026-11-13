---
problemId: icpc-2022-hangzhou/K
language: zh
status: qoj
source: https://qoj.ac/problem/5311/statement/zh_cn
sourceHash: b0ebacdc351e4d4144658aa15d22f5265e9c5cf7a4d2a290d5fb4af8915f6318
---

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

Hui-Bot 教授是字符串理论和高级数据结构方面的大师，因此他提出了一个有趣的问题。给定一个由 $n$ 个仅包含小写英文字母的字符串组成的序列，当这些字符串按字典序进行比较时，该序列中有多少个逆序对？

作为 Hui-Bot 最杰出的学生，Putata 和 Budada 分别掌握了高超的字符串理论和高级数据结构技能，他们轻松地共同解决了这个问题。然而，存在 $q$ 个不同的平行宇宙，在这些宇宙中，字母表中的字符顺序与原始顺序不同。

形式化地，每个宇宙中的字母表是一个字符串，它是 26 个小写英文字母的一个排列，表示每个字符出现的顺序。

字符串 $a$ 在字典序上小于字符串 $b$，当且仅当满足以下条件之一： <em>$a$ 是 $b$ 的前缀，但 $a \neq b$；</em> 在 $a$ 和 $b$ 第一个不同的位置上，$a$ 对应的字符在字母表中的顺序早于 $b$ 对应的字符。

长度为 $n$ 的序列 $a$ 中的逆序对数量是指满足 $1 \le i < j \le n$ 且 $a_j < a_i$ 的有序对 $(i, j)$ 的数量。

请帮助 Putata 和 Budada 在每个宇宙中解决这个问题。

## 输入格式

第一行包含两个整数 $n, q$ ($1 \le n \le 5 \times 10^5, 1 \le q \le 5 \times 10^4$)，表示序列的长度。

接下来的 $n$ 行，第 $i$ 行包含一个字符串 $s_i$ ($1 \le |s_i| \le 10^6$)。保证字符串仅由小写英文字母组成，且 $\sum_{i=1}^n |s_i| \le 10^6$。

接下来的 $q$ 行，每行包含一个字符串 $t$，表示一个宇宙中的字母表。保证 $t$ 是 26 个小写英文字母的一个排列。

## 输出格式

输出 $q$ 行，表示在 $q$ 个宇宙中对应的答案。

## 样例

### 输入 1

```text
5 3
aac
oiputata
aaa
suikabudada
aba
abcdefghijklmnopqrstuvwxyz
qwertyuiopasdfghjklzxcvbnm
aquickbrownfxjmpsvethlzydg
```

### 输出 1

```text
4
3
4
```
