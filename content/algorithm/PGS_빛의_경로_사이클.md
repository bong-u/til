---
title: "프로그래머스 - 빛의 경로 사이클 (L2)"
date: 2023-08-20
---

```python
dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
def solution(grid):
    N = len(grid)
    M = len(grid[0])
    grid = [list(line) for line in grid]
    route = [[[False]*4 for _ in range(M)] for _ in range(N)]
    answer = []
    
    for i in range(M):
        for j in range(N):
            for k in range(4):
                cur = [i, j]
                dir = k
                cnt = 0
                while not route[cur[1]][cur[0]][dir]:
                    cnt += 1
                    route[cur[1]][cur[0]][dir] = True
                    cur[0] = (cur[0]+dx[dir]) % M
                    cur[1] = (cur[1]+dy[dir]) % N

                    if grid[cur[1]][cur[0]] == 'L':
                        dir = (dir-1) % 4
                    elif grid[cur[1]][cur[0]] == 'R':
                        dir = (dir+1) % 4
                if cnt != 0:
                    answer.append(cnt)

    return sorted(answer)
```

### 문제

- 각 칸마다 S, L, 또는 R가 써져 있는 격자가 있다
- 격자에 빛을 쏘고자 한다
- 빛이 도달한 칸이 S칸이면 직진, L이면 왼쪽으로, R이면 오른쪽으로 꺾는다
- 빛이 격자를 넘어간 경우, 반대쪽 끝으로 다시 돌아온다
- 빛이 이동할 수 있는 경로 사이클의 길이를 오름차순으로 정렬하여 반환하라
- TC
  - input
    > ["SL","LR"]
  - ouput
    > [16]

### 해결방법

- route라는 배열에 각 칸마다 빛이 어느 방향으로 이동했는지 기록한다
- 똑같은 경로로 빛이 이동할 때까지 cnt를 증가시켜서 answer에 넣는다
- 위 과정을 빛을 쏜 적 없는 모든 경우에 대해 반복한다

### 배운 점

- 나머지 연산을 이용해서 음수를 처리할 수 있다는 것을 알게되었다
    - ex) -1 % 4 = 3