---
problemId: ccpc-2022-online-qualification/I
language: zh
status: qoj
source: https://qoj.ac/problem/14542/statement/zh_cn
sourceHash: ef0d5d451da1311ee6d4dfe76a3497fa04d773b96ade3ec51f0e83b67aeadbd6
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：1.0 秒；内存限制：512 MB。

有 $n$ 个城市和 $m$ 个运输计划。对于 $[1, n - 1]$ 中的每个整数 $i$，在第 $i$ 个城市和第 $(i + 1)$ 个城市之间有一条长度为 1km 的双向道路。第 $i$ 个运输计划是将 $v_i$ 吨货物从第 $a_i$ 个城市运输到第 $b_i$ 个城市。

运输 1 吨货物 1km 的花费为 1 元。你可以选择两个城市 $x, y$ 并在它们之间建造一个双向传送门。货物在这两个城市之间运输不需要任何花费。

完成所有 $m$ 个运输计划的最小总花费是多少？

## 输入格式

第一行包含两个整数 $n, m$ ($2 \le n \le 3000, 1 \le m \le 2 \times 10^5$)。

接下来的 $m$ 行，第 $i$ 行包含三个整数 $a_i, b_i, v_i$ ($1 \le a_i, b_i \le n, 1 \le v_i \le 10^6$)。

## 输出格式

一个整数，表示最小总花费。

## 样例

### 输入样例 1

```text
4 3
1 3 2
4 2 3
1 4 4
```

### 输出样例 1

```text
5
```

---

来源：[QOJ 中文题面](https://qoj.ac/problem/14542/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
