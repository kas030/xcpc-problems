---
problemId: ccpc-2022-weihai/A
language: zh
status: qoj
source: https://qoj.ac/problem/9591/statement/zh_cn
sourceHash: 2f569211d79313dc5462d8ef8cf4bed37339015dadbcfee397ec49bb0d3592a8
---

## 题目描述

时间限制：1.0 秒；内存限制：256 MB。

Lope the Bear 经常观看游戏赛事。他有一项特殊技能：毒奶（Dunai）。每当他通过为他认为会获胜的队伍加油来预测比赛结果时，结果往往适得其反。最近，一场名为《刀塔 2 国际邀请赛》（_Daota 2 The International_）的比赛即将开始。现在是 Lope 再次展示他毒奶技能的时候了。

在《刀塔 2》游戏中，每支队伍有 5 名选手，对应 1 到 5 号位。《刀塔 2 国际邀请赛》已经举办了 $n$ 届。为了更好地进行毒奶，Lope 查询了每一届的冠军队伍，包括 5 名选手的姓名和位置。此外，他还查询了即将参加本次比赛的 $m$ 名选手，包括他们的姓名和位置，但不知道队伍将如何组建。已知的是，对于每一位曾经获得过冠军的选手，他在队伍中的位置永远不会改变。

Lope 想要预测这 $m$ 名选手将如何组队，以满足以下条件：

-   每名选手最多被分配到一个队伍（也可以不被分配）。
-   队伍由 5 个不同的位置组成，每个位置恰好有一名选手。
-   每个队伍至少包含一名曾经获得过冠军的选手。

Lope 想知道最多可以组成多少支队伍。

## 输入格式

第一行包含一个整数 $n$ ($1 \le n \le 100$)，表示比赛已举办的届数。

接下来 $n$ 行，每行包含 5 个由空格分隔的字符串，表示冠军队伍中 5 名选手的姓名，分别对应 1 到 5 号位。

下一行包含一个整数 $m$ ($1 \le m \le 1000$)，表示即将参加比赛的选手人数。

接下来 $m$ 行，每行包含一个字符串和一个 1 到 5 之间的整数，表示选手的姓名和位置。保证所有选手的姓名各不相同，且对于每一位曾经获得过冠军的选手，他在队伍中的位置永远不会改变。

保证每个选手姓名的字符串仅由英文字母和数字组成，且长度不超过 20。

## 输出格式

输出一个整数，表示最多可以组成的队伍数量。

## 样例

### 样例输入 1

```text
1
Kanon Keke Chisato Sumire Ren
9
Kanon 1
Keke 2
Chisato 3
Sumire 4
Ren 5
Kinako 1
Mei 2
Shiki 3
Natsumi 4
```

### 样例输出 1

```text
1
```

### 样例输入 2

```text
11
skiter Nine 33 Saksa Sneyking
Yatoro TORONTOTOKYO Collapse Mira Miposhka
ana Topson Ceb JerAx N0tail
ana Topson Ceb JerAx N0tail
MATUMBAMAN Miracle MinDContRoL GH KuroKy
shadow bLink Faithbian iceice y
Fear SumaiL UNiVeRsE Aui2000 ppd
Hao Mu xiao8 Banana SanSheng
Loda s4 AdmiralBulldog EGM Akke
Zhou Ferrari430 YYF ChuaN Faith
ArtStyle Dendi XBOCT LighTofHeaveN Puppey
100
Ame 1
NothingToSay 2
Faithbian 3
XinQ 4
y 5
Yuragi 1
bzm 2
ATF 3
Taiga 4
Misha 5
Yatoro 1
TORONTOTOKYO 2
Collapse 3
Mira 4
Miposhka 5
K1 1
ChrisLuck 2
Wisper 3
Gojira 4
Stinger 5
Monet 1
Ori 2
Xxs 3
BoBoKa 4
SiameseC 5
Pakazs 1
DarkMago 2
Sacred 3
Matthew 4
Pandaboo 5
```

### 样例输出 2

```text
14
```
