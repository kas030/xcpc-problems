---
problemId: icpc-2024-online-qualification-1/M
language: zh
status: qoj
source: https://qoj.ac/problem/9320/statement/zh_cn
sourceHash: e479bf418c807b85df6031e5118db588814f201132a9452e3b10dda1e29ca444
---

## 题目描述

时间限制：1.0 秒；内存限制：1024 MB。

你将获得一场 ICPC 风格比赛的所有提交记录。对于每一条提交，你都知道队伍名称、题目 ID 以及该提交是被接受（accepted）还是被拒绝（rejected）。你的任务是确定哪道题是最简单的。

如果你不熟悉 ICPC 规则，这里有一个简要说明：

-   每支队伍可以对一道题进行多次提交。如果一支队伍对某道题的提交中至少有一次被接受，则认为该队伍解决了这道题。
-   解决某道题的队伍数量是指至少有一次该题被接受提交的不同队伍的数量。

我们将比赛中最简单的题目定义为被最多队伍解决的题目。如果有多个题目被相同数量的队伍解决，则题目 ID 字典序最小的题目被认为是最简单的。

当且仅当队伍名称不同时，两支队伍被视为不同。同样，当且仅当题目 ID 不同时，两个题目被视为不同。

## 输入格式

第一行包含一个整数 $t$ ($1 \le t \le 1000$)，表示测试用例的数量。

对于每个测试用例：

第一行包含一个整数 $n$ ($1 \le n \le 10^5$)，表示提交的数量。

接下来的 $n$ 行，每行包含一个队伍名称、一个题目 ID 和提交结果。

-   队伍名称是一个非空字符串，最多包含 10 个字符，可以包含大小写英文字母。
-   题目 ID 是一个大写英文字母（'A' 到 'Z'）。
-   提交结果为 accepted 或 rejected。

保证每个测试用例中至少有一个 accepted 提交。

同时保证所有测试用例的提交总数不超过 $10^5$。

## 输出格式

对于每个测试用例，输出一行，包含最简单题目的题目 ID。

## 样例

### 输入 1

```text
2
5
teamA A accepted
teamB B rejected
teamC A accepted
teamB B accepted
teamD C accepted
4
teamA A rejected
teamB A accepted
teamC B accepted
teamC B accepted
```

### 输出 1

```text
A
A
```
