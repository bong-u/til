---
title: "프로그래머스 - 교점에 별 만들기 (L2)"
date: 2023-08-17
tags: ["Python", "Programmers"]
---

```python
def calc(a1, b1, c1, a2, b2, c2):
    if a1*b2-a2*b1 == 0:
        return (0.1, 0.1)
    return ((b1*c2-b2*c1)/(a1*b2-a2*b1), (c1*a2-a1*c2)/(a1*b2-a2*b1))

def solution(line):
    answer = []
    length = len(line)
    points = []
    size = [1e15, -1e15, 1e15,- 1e15]

    for i in range(length):
        for j in range(i):
            point = calc(line[i][0],line[i][1], line[i][2], line[j][0], line[j][1], line[j][2])
            if point[0]%1 != 0 or point[1]%1 != 0:
                continue
            x = int(point[0])
            y = int(point[1])
            points.append((x, y))
            size[0] = min(size[0], x)
            size[1] = max(size[1], x)
            size[2] = min(size[2], y)
            size[3] = max(size[3], y)                

    answer = [['.'] * (size[1]-size[0]+1) for _ in range(size[3]-size[2]+1)]
    for x, y in points:
        answer[size[3]-y][x-size[0]] = '*'

    return [''.join(i) for i in answer]
```

### 문제

- Ax + By + C = 0으로 표현할 수 있는 n개의 직선이 주어진다
- 이 직선들이 만나는 교점을 문자열 배열로 표현하라
- 빈공간은 '.', 점은 '*'로 표현한다
- TC
  - input
    > [[2, -1, 4], [-2, -1, 4], [0, -1, 1], [5, -8, -12], [5, 8, 12]]
  - ouput
    > ["....*....", ".........", ".........", "*.......*", ".........", ".........", ".........", ".........", "*.......*"]

### 해결방법

- 교점을 구하는 공식은 문제에서 주어진다
    - Ax + By + E = 0, Cx + Dy + F = 0 일 때
    $$ x = {BF-ED \over AD-BC}, y = {AF-EC \over AD-BC} $$
    - 이때 $(AD-BC)$가 0이면 두 직선은 평행하므로 계산을 하지 말아야한다 (그러지 않으면 DivideByZero 예외가 발생한다)
- 좌표평면의 크기를 size라는 리스트에 저장했는데, int값을 초과할 수 있으므로 충분히 크고 작은 수로 초기화해야한다
- 좌표평면의 좌표를 2차원 배열인덱스로 변환할 때, 다음과 같이 계산하였다
    ```python
    array[최대높이-y][x-최소넓이] = '*'
    ```
