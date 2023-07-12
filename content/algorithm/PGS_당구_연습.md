---
title: "당구 연습(L2)"
date: 2023-07-12
---

```python
def solution(m, n, startX, startY, balls):
    answer = []
    for bx, by in balls:
        tmp = []
        for x, y in [(-1*startX, startY), (startX, -1*startY), (startX, 2*n-startY), (2*m-startX, startY)]:
            if bx==x and (y < 0 < by < startY or startY < by < n < y):
                continue
            if by==y and (x < 0 < bx < startX or startX < bx < m < x):
                continue
            tmp.append ((x-bx)**2+(y-by)**2)
        answer.append(min(tmp))
    
    
    return answer
```

### 문제
* 수구와 적구의 좌표가 주어진다
* 원쿠션으로 적구를 맞히는데 필요한 최소한의 거리를 구하라
* TC
    * input
        > 10, 10, 3, 7, [[7, 7], [2, 7], [7, 3]]
    * ouput
        > [52, 37, 116]

### 해결방법
* [질문하기]에서 점대칭에 관한 힌트를 얻고, 수구를 다이 밖으로 보내서 직선거리를 계산하였다
* 공이 일직선으로 있을때 다이보다 공에 먼저 부딪히지 않도록 신경써야한다.
  * 예를 들어, 수구를 왼쪽으로 칠 때
     > 다이 <- 적구 <- 수구 (X)  
     > 다이 <- 수구 <- 적구 (O)