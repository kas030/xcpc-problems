---
problemId: ccpc-2025-zhengzhou/E
language: zh
status: qoj
source: https://qoj.ac/problem/15305/statement/zh_cn
sourceHash: 01c862ac88a5f63f0b9146510b403c963b9c52e7f0bce39fe2b1069ec46c4ab9
---

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

Little Ika: Doo Doo Doo ∼.

Hyacinthia 想要前往“云端遗迹”黎明之眼（Eye of Dawn）的中心寻找战利品，但有 $n$ 道墙阻挡了她的去路。第 $i$ 道墙是一个以原点 $(0, 0)$ 为圆心、半径为 $r_i$ 的圆。墙上有 $k_i$ 个门，第 $j$ 个门的坐标由 $r_i \cdot \cos \left( \frac{2\pi}{M} \cdot p_{i,j} \right), r_i \cdot \sin \left( \frac{2\pi}{M} \cdot p_{i,j} \right)$ 给出。墙的厚度和门的宽度均可忽略不计，且 Hyacinthia 不能飞越墙壁。

Hyacinthia 想要向你询问 $m$ 次。每次她会告诉你她的起始点，你需要回答到中心的最短距离。保证起始点位于某道墙的内侧，且紧贴墙面。

## 输入格式

第一行包含两个整数 $n, m$ ($2 \le n \le 2 \cdot 10^5, 1 \le m \le 2 \cdot 10^5$)，分别表示墙的数量和询问次数。

接下来 $n$ 行描述每道墙。每行以两个整数 $r_i, k_i$ ($1 \le r_i \le 10^8, 0 \le k_i \le 2 \cdot 10^5$) 开头，表示第 $i$ 道墙是一个半径为 $r_i$ 且有 $k_i$ 个门的圆。随后是 $k_i$ 个整数 $p_{i,1}, p_{i,2}, \dots, p_{i,k_i}$，表示第 $j$ 个门的坐标为 $r_i \cdot \cos \left( \frac{2\pi}{M} \cdot p_{i,j} \right), r_i \cdot \sin \left( \frac{2\pi}{M} \cdot p_{i,j} \right)$，其中 $M = 3.6 \cdot 10^8$。保证 $0 \le p_{i,1} < p_{i,2} < \dots < p_{i,k_i} < M$，$k_n = 0$，$\sum_{i=1}^n k_i \le 2 \cdot 10^5$，且 $1 \le r_1 < r_2 < \dots < r_n \le 10^8$。

接下来 $m$ 行，每行包含两个整数 $t_i, q_i$，表示如果 Hyacinthia 从第 $t_i$ 道墙内侧的点 $r_{t_i} \cdot \cos \left( \frac{2\pi}{M} \cdot q_i \right), r_{t_i} \cdot \sin \left( \frac{2\pi}{M} \cdot q_i \right)$ 出发，到原点的最短距离是多少（如果无法到达，请输出 “-1”）。

## 输出格式

对于每次询问，输出一行一个浮点数表示答案。如果无法到达，输出 “-1”。如果相对误差或绝对误差不超过 $10^{-6}$，则认为答案正确。

## 样例

### 样例输入 1

```text
3 4
2 2 0 90000000
5 0
8 0
1 114514
2 0
2 180000000
3 233
```

### 样例输出 1

```text
2.0000000000
5.0000000000
7.4056093871
-1
```
