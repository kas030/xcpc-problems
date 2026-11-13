---
problemId: icpc-2023-xian/N
language: zh
status: qoj
source: https://qoj.ac/problem/9255/statement/zh_cn
sourceHash: 6f80b0ae47117f48c52c1e8c4bd421abba49bdbcc982e5fd88748ea1890e76e8
---

## 题目描述

时间限制：1.0 秒；内存限制：256 MB。

你需要计算一段 Python 程序的输出结果。

为了简化问题，代码满足以下约束。程序恰好有 5 行。代码的第一行是：

```text
ans=0
```

第二行和第三行的形式为：

```text
for i in range(a,b,c):
    for j in range(d,e,f):
```

其中，$i$ 和 $j$ 是循环变量。$i$ 和 $j$ 可以是任意两个不同的小写英文字母。$a, b, c, d, e, f$ 可以是不含前导零的整数，或者是之前已经引入的循环变量。也就是说，$d, e$ 和 $f$ 可以是 $i$。标记 $c$ 或 $f$（或两者）可以省略。当省略时，它们等于 1。

代码的第四行形式为：

```text
ans+=j
```

其中，$j$ 是内层循环的循环变量（注意它可能是除 $j$ 以外的其他字母）。

代码的第五行是：

```text
print(ans)
```

对于任何 $c \neq 0$，Python 语言中的语句：

```text
for i in range(a,b,c):
```

解释如下：

-   如果 $c > 0$，$i$ 将依次取值 $a, a + c, a + 2c, \dots$ 直到 $a + kc$，其中 $k$ 是满足 $a + kc < b$ 的最大整数。如果 $a \ge b$，$i$ 将不会取任何值。
-   如果 $c < 0$，$i$ 将依次取值 $a, a + c, a + 2c, \dots$ 直到 $a + kc$，其中 $k$ 是满足 $a + kc > b$ 的最大整数。如果 $a \le b$，$i$ 将不会取任何值。

## 输入格式

5 行，表示代码。

保证每行末尾没有多余空格。但是，输入文件末尾可能存在额外的换行符。请注意，输入文件中的每个制表符（tab）均由 4 个空格表示。

保证 $1 \le a, b, |c|, d, e, |f| \le 10^6$。

## 输出格式

一个整数，表示程序的输出。

## 样例

### 输入格式 1

```text
ans=0
for a in range(1,3):
    for b in range(5,1,-2):
        ans+=b
print(ans)
```

### 输出格式 1

```text
16
```

### 说明

对于第一个样例，$a$ 将依次取值 1, 2，对于 $a$ 取的每一个值，$b$ 将取值 5, 3，因此答案为 $2 \times (5 + 3) = 16$。

### 输入格式 2

```text
ans=0
for q in range(100,50,-1):
    for i in range(q,77,20):
        ans+=i
print(ans)
```

### 输出格式 2

```text
2092
```

你可以使用 Python 解释器测试这些程序。
