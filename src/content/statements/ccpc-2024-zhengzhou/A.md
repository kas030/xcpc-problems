---
problemId: ccpc-2024-zhengzhou/A
language: zh
status: qoj
source: https://qoj.ac/problem/9768/statement/zh_cn
sourceHash: 02f1384e5dc8761216dd50c5a9b7ed29304feb2ab5ff0e84fcda91539ae7d757
---

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

给定三个正整数 $p_A, p_B, p_C$，Bobo 挑战你找出三个周期分别为 $p_A, p_B, p_C$ 的无限长二进制字符串 $A, B, C$，使得 $A \oplus B = C$，或者判断这是否不可能实现。

请参考“说明”部分以获取周期和异或的正式定义。

## 输入格式

第一行包含一个整数 $T$ ($1 \le T \le 10^4$)，表示测试用例的数量。 接下来是各测试用例的描述。 每个测试用例仅包含一行，包含三个整数 $p_A, p_B, p_C$ ($1 \le p_A, p_B, p_C \le 10^6$)。 保证所有测试用例中 $\max(p_A, p_B, p_C)$ 的总和不超过 $10^6$。

## 输出格式

对于每个测试用例，如果不存在解，输出一行 “NO”（不含引号）。否则，输出一行 “YES”（不含引号）。然后，在接下来的三行中分别输出长度为 $p_A, p_B, p_C$ 的二进制字符串，表示无限长字符串 $A, B, C$ 的前 $p_A, p_B, p_C$ 个字符。 你可以以任意大小写形式输出 “YES” 和 “NO”（例如，“yES”、“yes” 和 “Yes” 都会被识别为肯定回答）。

## 样例

### 样例输入 1

```text
2
2 3 6
2 3 5
```

### 样例输出 1

```text
YES
01
011
001110
NO
```

## 说明

设 $s = s_1s_2s_3 \dots$ 和 $t = t_1t_2t_3 \dots$ 为无限长二进制字符串。 $s$ 的周期是满足对于所有 $i \ge 1$ 都有 $s_i = s_{i+k}$ 的最小正整数 $k$。 字符串 $s$ 和 $t$ 的异或由 $s \oplus t$ 给出，满足对于所有 $i \ge 1$ 都有 $(s \oplus t)_i = s_i \oplus t_i$。
