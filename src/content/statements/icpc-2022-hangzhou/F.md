---
problemId: icpc-2022-hangzhou/F
language: zh
status: qoj
source: https://qoj.ac/problem/5306/statement/zh_cn
sourceHash: bb71f06fbcfa30ee2a5896c59a63666a71933e41e3aeb380112f28fa4a8f2f7e
---

## 题目描述

时间限制：1.5 秒；内存限制：1024 MB。

Grammy 加入了 $n + 1$ 个 QQ 群，编号为 $0 \sim n$。Rice 老师在 0 号群中。

每天，Grammy 的朋友们会向 $1 \sim n$ 号群发送消息，Grammy 会挑选出 Rice 老师喜欢的消息并将其转发到 0 号群。

这里我们将消息定义为由小写字母组成的字符串，当且仅当字符串 “bie” 是消息的子串时，Rice 老师喜欢该消息。

现在，给定 $1 \sim n$ 号群中的消息，Grammy 将按顺序从 1 号群搜索到 $n$ 号群，逐个检查群内的消息。对于每条消息，如果 Rice 老师喜欢它且它之前没有在 0 号群中出现过，Grammy 就会将其挑选出来并转发到 0 号群。这里的“出现过”是指相同的消息之前已经被转发到 0 号群过。

请按顺序输出所有 Grammy 将转发到 0 号群的消息。对于每个群，如果 Grammy 无法挑选出任何消息，则输出一行 “Time to play Genshin Impact, Teacher Rice!”。

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 10^4$)，表示 QQ 群的数量。接下来的行描述了 $1$ 到 $n$ 号群中的消息。

对于第 $i$ 个群，第一行包含一个整数 $m_i$ ($0 \le m_i \le 10^4$)，表示该群中消息的数量。接下来的 $m_i$ 行，每行包含一个非空字符串 $s_{i,j}$，表示一条消息。

保证 $\sum m_i \le 10^4$，$\sum |s_{i,j}| \le 10^4$，且所有消息仅由小写字母组成。

## 输出格式

输出每条消息，按顺序表示所有 Grammy 将转发到 0 号群的消息。对于每个群，如果 Grammy 无法挑选出任何消息，则输出一行 “Time to play Genshin Impact, Teacher Rice!”。

## 样例

### 样例输入 1

```text
6
1
biebie
1
adwlknafdoaihfawofd
3
ap
ql
biebie
2
pbpbpbpbpbpbpbpb
bbbbbbbbbbie
0
3
abie
bbie
cbie
```

### 样例输出 1

```text
biebie
Time to play Genshin Impact, Teacher Rice!
Time to play Genshin Impact, Teacher Rice!
bbbbbbbbbbie
Time to play Genshin Impact, Teacher Rice!
abie
bbie
cbie
```
