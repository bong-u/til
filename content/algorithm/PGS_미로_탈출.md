---
title: "프로그래머스 - 미로 탈출 (L2)"
date: 2023-07-14
tags: ["Python", "Programmers"]
---

```python
from collections import deque

vx = [0, 0, -1, 1]
vy = [-1, 1, 0, 0]

def bfs(maps, N, M, p1, p2):
    visited = [[False]*M for _ in range(N)]
    q = deque()
    q.append(list(p1)+[0])

    while q:
        curY, curX, cnt = q.popleft()

        if p2 == (curY, curX):
            return cnt

        for i in range(4):
            x = curX + vx[i]
            y = curY + vy[i]
            if 0 <= x < M and 0 <= y < N and not visited[y][x] and maps[y][x] != 'X':
                visited[y][x] = True
                q.append([y, x, cnt+1])
    return -1

def solution(maps):
    answer = 0
    N = len(maps)
    M = len(maps[0])

    sp = (0, 0)
    lp = (0, 0)
    ep = (0, 0)

    for i in range(N):
        for j in range(M):
            if maps[i][j] == 'S':
                sp = (i, j)
            elif maps[i][j] == 'L':
                lp = (i, j)
            elif maps[i][j] == 'E':
                ep = (i, j)

    tmp = bfs(maps, N, M, sp, lp)
    if tmp == -1:
        return -1

    answer += tmp

    tmp = bfs(maps, N, M, lp, ep)
    if tmp == -1:
        return -1

    answer += tmp

    return answer
```

### 문제

- 미로를 나타낸 문자열 배열 maps가 주어진다
- S: 시작지점, E: 출구, L: 레버, O: 통로, X: 벽이라고 하자
- 시작지점에서 출발해서 레버를 경유하여 출구까지 최단 거리를 구하라
- 탈출이 불가능하면 -1을 반환하라
- TC
  - input
    > ["SOOOL","XXXXO","OOOOO","OXXXX","OOOOE"]
  - ouput
    > 16

### 해결방법

- BFS로 시작지점 -> 레버, 레버 -> 출구 두 가지를 따로 구해서 더한다
