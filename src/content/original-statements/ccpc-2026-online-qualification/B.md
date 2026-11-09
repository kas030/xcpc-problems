---
problemId: ccpc-2026-online-qualification/B
language: en
status: official
source: https://qoj.ac/problem/20716
sourceHash: e54cd5cdc7fa49078d485a74bfa12675146a37a9a90ef0209fc796ed2a3b5751
---

## Problem Statement

Time limit: 1 s; Memory limit: 512 MB.

You have a fair six-sided die with positive integer face values $a_1,a_2,\ldots,a_6$. Construct another fair six-sided die with positive integer face values $b_1,b_2,\ldots,b_6$ whose sum is exactly $k$. Face values may repeat on either die.

Roll each die once, independently. The new die wins if and only if its value is strictly greater than the original die's value; a tie is not a win. Determine whether you can make it win at least $19$ of the $36$ equally likely pairs of faces (that is, with probability strictly greater than $50\%$). If so, construct such a die.

## Input

The first line contains six integers $a_1,a_2,\ldots,a_6$ ($1\le a_i\le 10^9$), the labels of the original die.

The second line contains an integer $k$ ($1\le k\le 10^{18}$), the required sum of the new die's labels.

## Output

If no valid new die exists, print `NO`.

Otherwise, print `YES` on the first line and six positive integers $b_1,b_2,\ldots,b_6$ on the second line. Their sum must be exactly $k$, and the new die must win at least $19$ of the $36$ pairs of faces.

The labels may appear in any order. If multiple answers exist, print any one. The strings `YES` and `NO` are case-sensitive.

## Examples

### Input 1

```text
1 2 3 4 5 6
25
```

### Output 1

```text
YES
1 1 2 7 7 7
```

### Input 2

```text
1 1 1 1 1 1
9
```

### Output 2

```text
NO
```

## Note

For the first example, another valid choice of labels is $5,4,4,4,4,4$. These labels sum to $5+4+4+4+4+4=25$. Its face labeled $5$ beats four faces of the original die, and each face labeled $4$ beats three. Thus, it wins $4+5\cdot3=19$ pairs.

In the second example, a face must be labeled at least $2$ to win. Each such face wins six pairs, so at least four are needed to win $19$ pairs. Even if the other two faces are labeled $1$, the sum is at least $2+2+2+2+1+1=10>9$.

---

Source: [Original statement on QOJ](https://qoj.ac/problem/20716). Original wording retained; formatting converted to Markdown.
