---
problemId: ccpc-2023-harbin/J
language: zh
status: qoj
source: https://qoj.ac/problem/7755/statement/zh_cn
sourceHash: 9f5820e726e0dae3ad14b497818dbaf2356cb8d9c871fa4cd4f09f56c7093f1a
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1.0 秒；内存限制：256 MB。

Plover 和 Georgia 正在森林图上玩一个游戏。给定一个包含 $n$ 个节点和 $m$ 条边的无向无环图（森林）。现在，Plover 和 Georgia 轮流对图进行操作，Georgia 先手。

每次操作必须是以下类型之一：

1.  选择图中的一条边，将其移除。
2.  选择图中的一个节点，将其连同与之相连的边一起移除。

当某一方无法进行操作时（即图为空），该方输掉游戏，另一方获胜。现在，假设 Plover 和 Georgia 都极其聪明，Georgia 想知道有多少种不同的第一步操作可以让她赢得游戏。

## 输入格式

第一行包含两个整数 $n, m(1 \le m < n \le 10^5)$，分别表示节点数和边数。

接下来的 $m$ 行，第 $i$ 行包含两个整数 $u_i, v_i(1 \le u_i < v_i \le n)$，表示连接 $u_i$ 号节点和 $v_i$ 号节点的一条边。

保证对于所有 $i, j(1 \le i < j \le m)$，满足 $u_i \neq u_j$ 或 $v_i \neq v_j$。

## 输出格式

输出一个整数 $W(0 \le W \le n + m)$，表示能让 Georgia 获胜的不同第一步操作的数量。

## 样例

### 样例输入 1

```text
3 1
1 2
```

### 样例输出 1

```text
2
```

### 样例输入 2

```text
4 3
1 2
2 3
3 4
```

### 样例输出 2

```text
3
```

## 说明

对于第一个样例，如果 Georgia 在第一步选择节点 1 或节点 2，她就能赢得游戏。

对于第二个样例，如果 Georgia 在第一步选择 3 条边中的任意一条，她就能赢得游戏。

---

来源：[QOJ 中文题面](https://qoj.ac/problem/7755/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
