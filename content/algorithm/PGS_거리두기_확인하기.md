---
title: "프로그래머스 - 거리두기 확인하기 (L2)"
date: 2023-08-22
tags: ["Python", "Programmers"]
---

```python
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]
def quest(table):
    table = [list(line) for line in table]
    for j in range(5):
        for i in range(5):
            if table[i][j] == 'P':
                flag = [False]*4
                target = []
                for k in range(4):
                    nx = i+dx[k]
                    ny = j+dy[k]
                    if 0 <= nx < 5 and 0 <= ny < 5:
                        target.append((nx, ny))
                        flag[k] = True

                for x, y in target:
                    if table[x][y] == 'C' or table[x][y] == 'P':
                        return 0
                    if table[x][y] == 'O':
                        table[x][y] = 'C'

                target = []
                if flag[0] and flag[2] and table[i-1][j] == 'O' and table[i][j-1] == 'O':
                    target.append((i-1, j-1))
                if flag[0] and flag[3] and table[i-1][j] == 'O' and table[i][j+1] == 'O':
                    target.append((i-1, j+1))
                if flag[1] and flag[2] and table[i+1][j] == 'O' and table[i][j-1] == 'O':
                    target.append((i+1, j-1))
                if flag[1] and flag[3] and table[i+1][j] == 'O' and table[i][j+1] == 'O':
                    target.append((i+1, j+1))

                for x, y in target:
                    if table[x][y] == 'P':
                        return 0
    return 1

def solution(places):
    answer = []
    for table in places:
        answer.append(quest(table))
    return answer
```

### 문제

- 대기실 구조를 대기실별로 담은 2차원 문자열 배열 places가 매개변수로 주어진다
- 대기실은 5개이며, 각 대기실은 5X5 크기이다
- 거리두기를 위하여 응시자들 끼리는 맨해튼 거리가 2이하로 앉지 말아야 한다
- 단, 응시자가 앉아있는 자리 사이가 파티션으로 막혀 있을 경우에는 허용한다
- 'P'는 응시자가 앉아있는 자리, 'O'는 빈테이블, 'X'는 파티션을 의미한다
- 각 대기실별로 거리두기를 잘 지켰는지 여부를 1차원 배열에 담아 반환하라
- TC
  - input
    > [["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]
  - ouput
    > [1, 0, 1, 1, 1]

### 해결방법
- 먼저, 응시자의 상하좌우로 'C'를 표시하고, 다른 응시자가 'C'공간을 침범할 경우 거리두기를 지키지 않은 것으로 판단한다
- 그 다음, 파티션으로 막혀있지 않은 대각선 위치에 다른 응시자가 있다면 거리두기를 지키지 않은 것으로 판단한다
- 거리두기 여부에 따라 quest함수가 0 또는 1을 반환하고, 이를 answer에 담아 반환한다
