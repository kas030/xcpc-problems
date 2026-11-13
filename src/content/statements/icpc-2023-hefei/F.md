---
problemId: icpc-2023-hefei/F
language: zh
status: qoj
source: https://qoj.ac/problem/7879/statement/zh_cn
sourceHash: e3cbbde5ec00ecd2db9c8e1359582283db97b94074b4877bbb3eacac23b65b15
---

## 题目描述

时间限制：1.0 秒；内存限制：256 MB。

Miss Burger 正在参加 2023 ICPC 亚洲合肥区域赛。她想通过找到最简单的题目来快速获得首杀。

Miss Burger 观察了志愿者提前准备的所有气球的颜色（这是不允许的，所以请不要这样做）。如果某种颜色的气球数量超过气球总数的 50%，那么该颜色所代表的题目就被认为是最简单的题目。每种颜色都用一个仅由小写字母组成的字符串表示。

现在 Miss Burger 提供了她所看到的所有气球的颜色，并希望你告诉她哪种颜色代表最简单的题目。

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 10^5$)，表示 Miss Burger 看到的气球总数。

接下来的 $n$ 行包含一个字符串 $s_i$ ($1 \le |s_i| \le 10$)，表示一个气球的颜色，该字符串仅由小写字母组成。

## 输出格式

如果能确定最简单的题目，输出该最简单题目对应的颜色。

如果无法确定最简单的题目，输出 “uh-oh”（不含引号）。

## 样例

### 输入 1

```text
5
red
green
red
red
blue
```

### 输出 1

```text
red
```

### 输入 2

```text
3
red
blue
yellow
```

### 输出 2

```text
uh-oh
```

## 说明

在第一个样例中，Miss Burger 看到了 5 个气球，颜色分别为 “red”、“green”、“red”、“red” 和 “blue”。颜色为 “red” 的题目出现了 3 次，超过了气球总数的 50%，因此它是最简单的题目。所以输出为 “red”。
