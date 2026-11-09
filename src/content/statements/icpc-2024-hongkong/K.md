---
problemId: icpc-2024-hongkong/K
language: zh
status: qoj
source: https://qoj.ac/problem/9925/statement/zh_cn
sourceHash: 9971ebb9531042995153228877a03d8b868c0c1820fec41cbbb19c032047cf50
---

> QOJ 将此版本标注为 AI 翻译，可能存在不准确之处；有疑问时请核对原文。

## 题目描述

时间限制：2.0 秒；内存限制：1024 MB。

Gamenjoy 有一个只由 “L” 和 “R” 组成的喜爱字符串。 然而，Gamenjoy 淘气的弟弟 Gamanyong 修改了这个字符串。形式化地，他进行了若干次（可能为零次）操作，每次操作可以是以下两种之一：

-   选择字符串中一个不是第一个字符的 “L”，并删除其左侧的字符。
-   选择字符串中一个不是最后一个字符的 “R”，并删除其右侧的字符。

当 Gamenjoy 回家时，他已经无法分辨哪一个是他的喜爱字符串了。幸运的是，他记得弟弟修改前字符串的样子。Gamenjoy 在家里找到了 $q$ 个字符串，并询问他们的父亲 Oibuth，每个字符串是否可能是他原来的喜爱字符串。现在 Oibuth 向你求助。请帮他回答 Gamenjoy 的问题。

## 输入格式

第一行包含一个整数 $T$ ($1 \le T \le 10^5$)，表示测试用例的数量。 对于每个测试用例，第一行包含一个字符串 $s$ ($1 \le |s| \le 5 \cdot 10^5$)，仅由 “L” 和 “R” 组成，表示原始字符串。 第二行包含一个整数 $q$ ($1 \le q \le 5 \cdot 10^5$)，表示 Gamenjoy 家中字符串的数量。 接下来的 $q$ 行中，第 $i$ 行包含一个字符串 $t_i$ ($1 \le |t_i| \le |s|$)，仅由 “L” 和 “R” 组成，表示 Gamenjoy 家中的一个字符串。 保证所有测试用例中 $|s|$ 的总和、 $q$ 的总和以及 $|t_i|$ 的总和均不超过 $10^6$。

## 输出格式

对于 Gamenjoy 家中的每个字符串，如果该字符串可能是他的喜爱字符串，则输出 “YES”。否则，输出 “NO”。

## 样例

### 输入 1

```text
2
RRLLRRLL
4
LLLLL
LLR
LRLR
R
RLLLLLL
3
LLLLL
RL
RRL
```

### 输出 1

```text
NO
YES
NO
YES
YES
YES
NO
```

---

来源：[QOJ 中文题面](https://qoj.ac/problem/9925/statement/zh_cn)。保留 QOJ 提供的中文内容，仅转换为 Markdown 排版；原题及图示版权归原作者所有。
