---
problemId: icpc-2022-hongkong/H
language: zh
status: qoj
source: https://qoj.ac/problem/5462/statement/zh_cn
sourceHash: e9e7c28e43bb2c3d232b8fc37cb6f9df53bbb45839b95cc1584d62adca2594fd
---

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

Rice 老师喜欢玩著名的游戏“鹅鸭杀”（Goose Goose Duck）。在游戏中，Rice 老师扮演鸭子，他的目标是击杀鹅。每击杀一只鹅，他都需要等待 $a$ 秒，以便他的击杀技能冷却。由于 Rice 老师的角色是连环杀手，他等待的时间取决于他击杀的鹅的类型。因为 Rice 老师是一名熟练的杀手，他可以将等待时间 $a$ 设置为 $[l, r]$ 中的任意整数。

Rice 老师每 $b$ 秒会遇到一只鹅。一旦 Rice 老师遇到一只鹅，如果他的击杀技能处于就绪状态，他可以选择击杀这只鹅；否则，鹅会立即逃跑，他将无法击杀这只鹅。Rice 老师想知道他击杀 $k$ 只鹅所需的最短时间。

## 输入格式

一行包含四个整数 $l, r, b, k$ ($1 \le l \le r \le 10^9$, $1 \le b, k \le 10^9$)。

## 输出格式

输出一个整数，表示 Rice 老师击杀 $k$ 只鹅所需的最短时间。

## 样例

### 样例输入 1

```text
6 6 3 3
```

### 样例输出 1

```text
18
```

### 样例输入 2

```text
2 3 5 4
```

### 样例输出 2

```text
20
```
