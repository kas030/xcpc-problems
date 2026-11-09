---
problemId: icpc-2023-xian-invitational/F
language: zh
status: qoj
source: https://qoj.ac/problem/6733/statement/zh_cn
sourceHash: 2a69e9dfac9134e61a0a6add695a69598995bee4212f50c98eee4840f7105bef
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：3 秒；内存限制：1024 MB。

你好，这是 Moniphant！他有一个问题需要你来解决。

Moniphant 发现他可以穿梭于多个睡眠层级，并在每一层中遇到一个 Mofunfun。形式化地，共有 4 种操作：

1.  <strong>Sleep（睡觉）</strong>：Moniphant 下降到下一层睡眠。
2.  <strong>Wake up（醒来）</strong>：Moniphant 从当前睡眠层级上升，即回到上一层。
3.  <strong>Say “You are a pig!” to Mofunfun（对 Mofunfun 说“你是猪！”）</strong>：这会激怒当前层级的 Mofunfun，使其变得愤怒。
4.  <strong>Mofunfun’s retaliation（Mofunfun 的报复）</strong>：每一层的 Mofunfun 都会尝试对 Moniphant 进行报复，但只有愤怒的 Mofunfun 才会成功。成功的报复会将 Moniphant 送回愤怒程度最低的 Mofunfun 所在的层级，即存在愤怒 Mofunfun 的最小层级。报复后，该 Mofunfun 不再愤怒。注意，如果没有愤怒的 Mofunfun，此操作将被忽略。

上述四种操作对应于下图：

![原题图示](../../../assets/qoj-statements/6733/bd3e6ebc4022ea13.png)

注意，当 Moniphant 回到较小的层级时，当前层级的 Mofunfun 会消失。

现在考虑一个由 $n$ 个 Moniphant 组成的序列，索引从 $1$ 到 $n$。你的任务是对索引在 $[l, r]$ 范围内的所有 Moniphant 执行上述 4 种操作之一，或者确定某个特定 Moniphant 的睡眠层级。

每个 Moniphant 在问题开始前都经历了 $5 \times 10^5$ 次“Sleep”（第 1 种）操作。

## 输入格式

第一行包含两个整数 $n$ 和 $q$ ($1 \le n, q \le 5 \times 10^5$)，分别表示 Moniphant 的数量和操作的数量。

接下来的 $q$ 行，每行包含三个整数 $op, l, r$ ($op \in \{1, 2, 3, 4, 5\}, 1 \le l \le r \le n$)。如果 $op \le 4$，表示对范围 $[l, r]$ 内的 Moniphant 执行该类型的操作。如果 $op = 5$，则满足 $l = r$，你需要输出第 $l$ 个 Moniphant 的睡眠层级。

## 输出格式

对于每一个操作 5，输出一行，包含一个整数，表示答案。

## 样例

### 样例输入 1

```text
1 9
1 1 1
1 1 1
1 1 1
3 1 1
2 1 1
1 1 1
1 1 1
4 1 1
5 1 1
```

### 样例输出 1

```text
500004
```

### 样例输入 2

```text
3 7
2 1 3
3 1 3
1 1 3
1 1 3
5 1 1
4 1 3
5 1 1
```

### 样例输出 2

```text
500001
499999
```

## 说明

最后，Moniphant 希望你享受这场比赛！

![原题图示](../../../assets/qoj-statements/6733/b2f690ebdd9eca25.png)
