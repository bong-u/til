---
title: "프로그래머스 - 튜플 (L2)"
date: 2023-09-16
tags: ["Python", "Programmers"]
---

```python
from collections import defaultdict

def solution(s):
    count = defaultdict(int)
    for i in s[1:-1].replace('},{', '} {').split(' '):
        for j in i[1:-1].split(','):
            count[j] += 1
    return [int(i[0]) for i in sorted(count.items(), key=lambda x: x[1], reverse=True)]
```

### 문제

- 특정 튜플을 포현하는 집합이 담긴 문자열 s가 매개변수로 주어진다
- s가 표현하는 튜플을 배열에 담아 반환하라
- TC
  - input
    > "{{2},{2,1},{2,1,3},{2,1,3,4}}"
  - ouput
    > [2, 1, 3, 4]

### 해결방법

- 문제에서 원하는 튜플의 순서는 원소의 개수가 자주 등장하는 순서이다
- 각 원소의 개수를 세어 count라는 defaultdict에 넣는다
- count를 value 기준으로 정렬하여 key값을 list의 형태로 반환하라
