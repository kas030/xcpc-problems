---
problemId: icpc-2022-ecfinal/J
language: zh
status: qoj
source: https://qoj.ac/problem/6307/statement/zh_cn
sourceHash: 734fbd1d1dc370971a9fb6f5c81f68afc028344da706aa355ff52d6cbdad9178
---

## 题目描述

时间限制：1 秒；内存限制：1024 MB。

Prof. Pang 和 Prof. Shou 喜欢玩追逐游戏。

游戏地图包含 $n$ 个房间和 $n - 1$ 条双向通道。游戏地图是连通的，这意味着地图构成了一棵树。

起初，Prof. Pang 在房间 $u$，而 Prof. Shou 在房间 $v$ ($u \neq v$)。Prof. Pang 和 Prof. Shou 轮流行动，Prof. Shou 先手。在每一回合中，玩家知道自己和对方的位置，并可以决定留在当前房间，或者移动到与当前房间直接相连的另一个房间。当 Prof. Pang 和 Prof. Shou 处于同一个房间时，Prof. Shou 即被 Prof. Pang 抓住。

Prof. Pang 和 Prof. Shou 都足够聪明。Prof. Pang 希望在有限的回合内抓住 Prof. Shou。Prof. Shou 不希望在任何有限的回合内被 Prof. Pang 抓住。

Prof. Shou 对每次都被抓住感到厌倦，于是找 Prof. Fei 寻求帮助。Prof. Shou 请 Prof. Fei 添加一些通道，使得对于任何初始房间对 $(u, v)$，Prof. Pang 都无法在有限的回合内抓住他。Prof. Fei 很懒，所以他希望添加尽可能少的通道。如果无论如何添加通道，总存在一对房间 $(u, v)$ 使得 Prof. Pang 可以抓住 Prof. Shou，则输出 $-1$。

## 输入格式

第一行包含一个整数 $T$ ($1 \le T \le 10^4$)，表示测试用例的数量。

对于每个测试用例，第一行包含一个整数 $n$ ($2 \le n \le 10^5$)，表示房间的数量。

接下来的 $n - 1$ 行，每行包含两个整数 $u$ 和 $v$ ($1 \le u, v \le n$)，表示连接房间 $u$ 和房间 $v$ 的通道。

保证所有测试用例的 $n$ 之和不超过 $2 \times 10^5$，且房间和通道始终构成一棵树。

## 输出格式

对于每个测试用例，输出一个数字，表示需要添加的最少通道数量，如果无法做到则输出 $-1$。

## 样例

### 输入格式 1

```text
4
2
1 2
4
1 2
2 3
3 4
4
1 2
2 3
2 4
5
1 2
2 3
3 4
3 5
```

### 输出格式 1

```text
-1
1
-1
2
```
