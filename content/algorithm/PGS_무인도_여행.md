---
title: "무인도 여행 (L2)"
date: 2023-07-17
---

```python
from collections import deque

vx = [0, 0, -1, 1]
vy = [-1, 1, 0, 0]

def solution(maps):
    N = len(maps)
    M = len(maps[0])
    answer = []
    
    visited = [[False]*M for _ in range(N)]
    
    for i in range(N):
        for j in range(M):
            if maps[i][j] != 'X' and not visited[i][j]:
                cnt = 0
                q = deque()
                q.append((j, i))
                visited[i][j] = True
                while q:
                    cx, cy = q.popleft()
                    cnt += int(maps[cy][cx])
                    for k in range(4):
                        nx = cx + vx[k]
                        ny = cy + vy[k]
                        if 0 <= nx < M and 0 <= ny < N and maps[ny][nx] != 'X' and not visited[ny][nx]:
                            q.append((nx, ny))
                            visited[ny][nx] = True
                answer.append(cnt)
    if len(answer) == 0:
        return [-1]
    return sorted(answer)
```

### 문제

- 문자열 배열 maps가 주어진다
- 바다는 'X', 섬은 숫자로 표현되는데, 숫자는 섬에서 최대한 보낼수 있는 날짜 수이다
- 각 섬에서 최대한 며칠씩 머무를 수 있는지 오름차순으로 정렬해서 반환하라
- 없다면 -1을 배열에 담아 반환하라
- TC
  - input
    > ["X591X","X1X5X","X231X", "1XXX1"]
  - ouput
    > [1, 1, 27]

### 해결방법

- BFS로 간단하게 풀었다