---
problemId: icpc-2026-xian/G
language: zh
status: reviewed
source: https://qoj.ac/download.php?type=attachments&id=4593&r=0
sourceHash: 4e0577496017549ba450ab8d05926d74ef195b33175a63b8446ec822d8fab5e0
reviewedAt: '2026-11-08'
---

## 题目描述

输入文件：标准输入；输出文件：标准输出。时间限制：2 秒；内存限制：1024 MB。

Geopelia 正在收集 Gungnir 的碎片。Gungnir 共有 $2^n$ 种碎片，编号为 $0,1,\dots,2^n-1$。为了复原它，对于每个 $0\le i<2^n$，Geopelia 都需要恰好 $a_i$ 枚标号为 $i$ 的碎片。

为了获得这些碎片，Geopelia 可以任意多次执行以下操作：

- 选择两个整数 $m$ 和 $k$，满足 $0\le m<2^n$ 且 $0\le k<2^n$。
- 获得分别标有 $0\oplus k,1\oplus k,\dots,m\oplus k$ 的每种碎片各一枚。

其中 $\oplus$ 表示两个非负整数的按位异或。

请帮助 Geopelia 求出复原 Gungnir 所需的最少操作次数。注意，Geopelia 不能移除任何已经获得的碎片。

## 输入格式

第一行包含一个整数 $T$（$1\le T\le 10^4$），表示测试用例数。对于每组测试用例：

- 第一行包含一个整数 $n$（$0\le n\le 19$）。
- 第二行包含 $2^n$ 个整数 $a_0,a_1,\dots,a_{2^n-1}$（$0\le a_i\le 10^6$），其中 $a_i$ 表示所需标号为 $i$ 的碎片数量。

保证所有测试用例的 $2^n$ 之和不超过 $2^{19}$。

## 输出格式

对于每组测试用例，输出一个整数，表示最少的操作次数。

## 样例

**样例输入**

```text
5
0
100000
1
114 514
2
1 1 1 1
3
0 13 0 0 0 7 2 1
4
1 2 2 1 3 3 3 3 1 0 0 0 0 0 0 0
```

**样例输出**

```text
100000
514
1
21
3
```
