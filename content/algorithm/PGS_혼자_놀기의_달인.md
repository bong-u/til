---
title: "프로그래머스 - 혼자 놀기의 달인 (L2)"
date: 2023-08-07
tags: ["Python", "Programmers"]
---

```python
def solution(cards):
    length = len(cards)
    visited = [False] * length
    answer = []
    
    for i in range(length):
        cnt = 0
        cur = i
        while not visited[cur-1]:
            visited[cur-1] = True
            cur = cards[cur-1]
            cnt += 1
        if cnt != 0:
            answer.append(cnt)
    
    if len(answer) <= 1:
        return 0
    answer.sort(reverse=True)
    return answer[0]*answer[1]
```

### 문제

- 주어진 배열 cards를 순회한다
- cards[i]번째 원소를 방문한다, 이미 방문한 원소인 경우 그만한다
- 한번 이어서 방문한 원소를 그룹화한다고 할 때, 두 그룹의 원소개수의 곱의 최대값을 구하라
- TC
  - input
    > [8,6,3,7,2,5,1,4]
  - ouput
    > 12

### 해결방법
- while문을 한번 돌면서, 원소의 방문여부를 체크하고, 방문한 원소의 개수를 센다
- 그룹화된 원소를 answer에 추가한다
- answer를 내림차순으로 정렬하고, 첫번째 두번째 원소의 곱을 반환한다
