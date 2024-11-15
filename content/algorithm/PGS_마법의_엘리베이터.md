---
title: "프로그래머스 - 마법의 엘리베이터 (L2)"
date: 2023-07-24
tags: ["Python", "Programmers"]
---

### 첫번째 BFS 풀이
```python
from collections import deque

def solution(storey):
    answer = 0
    q = deque()
    q.append((storey, 0))
    visited = [False] * (10**8+1)
    
    while q:
        cur, cnt = q.popleft()
        
        
        visited[cur] = True
        while cur != 0 and cur%10 == 0:
            cur = cur // 10
        if cur == 0:
            answer = cnt
            break
        for j in [-1, 1]:
            dest = cur + j
            if 0 <= dest <= 10**8 and not visited[dest]:
                q.append((dest, cnt+1))
    
    return answer
```

### 개선한 DFS 풀이
```python
answer = 10**8
def dfs(cur, cnt):
    global answer
    if cur == 0:
        answer = min(answer, cnt)
        return
    while cur % 10 == 0:
        cur /= 10

    if cur%10 < 5:
        dfs(cur//10, cnt+(cur%10))
    elif cur%10 > 5:
        dfs(cur//10+1, cnt+(10-cur%10))
    else:
        dfs(cur//10, cnt+(cur%10))
        dfs(cur//10+1, cnt+(10-cur%10))

def solution(storey):
    dfs(storey, 0)
    return answer
```

### 문제
- 주인공 민수는 한번 엘레베이터를 타면 -1, +1, -10, +10 등 절댓값이 $10^c$ (c>=0인 정수) 만큼 이동 할 수 있다
- 0층까지 갈려면 최소 몇 번 만에 이동할 수 있는지 구하라
- 1 <= storey <= 100,000,000
- TC
  - input
    > 16
  - ouput
    > 6

### 해결방법

- 처음에는 bfs를 이용해서 +1, -1 한번씩하며 비효율적으로 해결하였다
- 두번째 dfs풀이에서는 일의 자리에 따라 자릿수를 올리거나 내리고, 일의 자리를 한번에 계산하여 더 나은 풀이로 풀 수 있었다
