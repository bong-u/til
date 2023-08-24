---
title: "프로그래머스 - 행렬 테두리 회전하기 (L2)"
date: 2023-08-24
---

```python
dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]

def solution(rows, columns, queries):
    table = [[(j*columns)+i+1 for i in range(columns)] for j in range(rows)]
    answer = []

    for y1, x1, y2, x2 in queries:
        min_num = 10000
        x1 -= 1
        y1 -= 1
        x2 -= 1
        y2 -= 1
        direction = 0
        curX, curY = x1, y1
        postNum = table[y1][x1]
        while True:
            curX = curX+dx[direction]
            curY = curY+dy[direction]

            temp = table[curY][curX]
            table[curY][curX] = postNum
            postNum = temp

            min_num = min(min_num ,postNum)

            if ((curX == x2 and curY == y1) or
                (curX == x2 and curY == y2) or
                (curX == x1 and curY == y2)):
                direction += 1
            
            if curX == x1 and curY == y1:
                break

        answer.append(min_num)

    return answer
```

### 문제
- rows X columns 크기의 행렬이 있다
- 행렬에는 1부터 rows x columns 까지의 수가 순서대로 적혀있다
- (x1, y1, x2, y2)인 정수 4개로 표현된 회전이 주어진다
- 각 회전 마다 x1 행 y1 열부터 x2 행 y2 열까지의 영역에 해당하는 직사각형에서 테두리에 있는 숫자들을 한 칸씩 시계방향으로 회전시킨다
- 회전에 의해 위치가 바뀐 숫자들 중 가장 작은 숫자들을 순서대로 배열에 담아 return 하라
- TC
  - input
    > rows: 6 columns: 6  
    > queries: [[2,2,5,4],[3,3,6,6],[5,1,6,3]]
  - ouput
    > [8, 10, 25]

### 해결방법
- 꼭짓점에 도달할 때마다 direction 변수를 1 증가시켜서 방향을 바꿔주었다
