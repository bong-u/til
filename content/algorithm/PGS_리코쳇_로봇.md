---
title: "리코쳇 로봇 (L2)"
date: 2023-07-11
---

```python
from collections import deque
visited = []
vx = [0, 0, -1, 1]
vy = [-1, 1, 0, 0]

def bfs(board, N, M, sp):
    global visited
    q = deque()
    q.append(sp+[1])
    
    while q:
        cy, cx, cnt = q.popleft()
        visited[cy][cx] = True
        for i in range(4):
            x = cx
            y = cy
            while True:
                x += vx[i]
                y += vy[i]
                if not (0 <= x < N and 0 <= y < M) or board[y][x] == 'D':
                    x -= vx[i]
                    y -= vy[i]
                    break
            if board[y][x] == 'G':
                return cnt
            if not visited[y][x]:
                q.append([y, x, cnt+1])
    return -1
        
def solution(board):
    global visited
    N = len(board[0])
    M = len(board)
    
    visited = [[False] * len(board[0]) for _ in range(len(board))]
    for i in range(M):
        for j in range(N):
            if board[i][j] == 'R':
                sp = [i, j]
                
    return bfs(board, N, M, sp)
```

### 문제
* 2차원 리스트 board가 주어진다
* '.'은 빈공간, 'R'은 처음위치, 'D'는 장애물, 'G'는 목표지점 이다
* 장애물이나 맨 끝까지 부딪힐때까지 한 방향으로 이동한다
* 목표지점에 정확이 멈춰설때까지 몇번 이동해야하는지 구하라, 도달할 수 없다면 -1을 반환하라
* TC
    * input
        > ["...D..R", ".D.G...", "....D.D", "D....D.", "..D...."]
    * ouput
        > 7

### 해결방법
* bfs로 풀었다
* 이때 queue안에 cnt변수도 넣어서 몇번 이동했는지 저장한다.
