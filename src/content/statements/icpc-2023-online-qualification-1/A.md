---
problemId: icpc-2023-online-qualification-1/A
language: zh
status: qoj
source: https://qoj.ac/problem/8072/statement/zh_cn
sourceHash: 67de28ebbc931e1093379ce124618d6438aab7f3e8bd8fbbe61867cba4378958
---

## 题目描述

时间限制：1.0 秒；内存限制：128 MB。

以下是 ICPC Asia EC Online Qualifiers 的当前排名规则，共有两场在线比赛。

1.  在每场比赛中，仅取每所大学排名最高的队伍的排名作为该大学的得分；
2.  在每场比赛中，参赛大学根据其得分进行排名；
3.  两场比赛的大学排名使用归并排序的方法进行合并。对于在不同比赛中获得相同排名的两所大学，在第一场比赛中获得该排名的大学排名优先。
4.  删除重复的大学，得到所有参赛大学的最终排名（仅保留每所大学的最高排名）。

假设第一场比赛有 $n$ 支队伍，第二场比赛有 $m$ 支队伍。 对于每场比赛，给定每支队伍的排名及其所属大学，请根据上述规则输出所有参赛大学的最终排名。 你可以通过样例更好地理解这个过程。

## 输入格式

第一行包含两个整数 $n, m$ ($1 \le n, m \le 10^4$)，分别表示参加第一场比赛和第二场比赛的队伍数量。

接下来 $n$ 行，第 $i$ 行包含一个仅由大写字母组成的字符串 $s_i$ ($1 \le |s_i| \le 10$)，表示第一场比赛中排名第 $i$ 的队伍所属大学的缩写。

接下来 $m$ 行，第 $i$ 行包含一个仅由大写字母组成的字符串 $t_i$ ($1 \le |t_i| \le 10$)，表示第二场比赛中排名第 $i$ 的队伍所属大学的缩写。

保证每所大学只有一个缩写。

## 输出格式

输出若干行，第 $i$ 行包含一个字符串，表示最终排名中第 $i$ 名的大学缩写。

你应该确保任何参赛大学的缩写恰好出现一次。

## 样例

### 输入 1

```text
14 10
THU
THU
THU
THU
XDU
THU
ZJU
THU
ZJU
THU
NJU
WHU
THU
HEU
PKU
THU
PKU
PKU
ZJU
NUPT
THU
NJU
CSU
ZJU
```

### 输出 1

```text
THU
PKU
XDU
ZJU
NJU
NUPT
WHU
HEU
CSU
```

## 说明

样例是 2022 ICPC Asia EC Online Contest 部分结果。

第一场比赛中，大学的排名为： THU XDU ZJU NJU WHU HEU

第二场比赛中，大学的排名为： PKU THU ZJU NUPT NJU CSU

根据规则合并这两场排名，大学的排名为： THU PKU XDU THU ZJU ZJU NJU NUPT WHU NJU HEU CSU

删除重复的大学后，我们得到最终排名。
