---
title: "프로그래머스 - 디펜스 게임 (L2)"
date: 2023-07-26
tags: ["Python", "Programmers"]
---

```python
import heapq

def solution(n, k, enemy):
    heap = []
    cnt = 0 
    for i in enemy:
        n -= i
        heapq.heappush(heap, -i)
        while n < 0:
            k -= 1
            if not heap or k < 0:
                return cnt
            tmp = -heapq.heappop(heap)
            n += tmp
        cnt += 1
    return cnt
```

### 문제

- n: 가지고 있는 병사 수
- k: 사용할 수 있는 무적권 스킬 수
- enemy: 라운드마다 존재하는 적 수의 배열
- 라운드마다 enemy[i]명 만큼 소모하여 enemy[i]마리의 적을 막을 수 있다
- 무적권을 적절히 사용하여 버틸 수 있는 최대 라운드 수를 구하라
- TC
  - input
    > n: 7, k: 3, enemy: [4, 2, 4, 5, 3, 3, 1]
  - ouput
    > 5

### 해결방법

- enemy를 순회하면서 힙에 병사 수를 저장하면서, 가지고 있는 병사를 소모한다
- 가지고 있는 병사 수가 음수가 되면 가장 병사가 많은 라운드에서 무적권을 사용한다
