---
title: "프로그래머스 - 점 찍기 (L2)"
date: 2023-07-27
---

```python
import math

def solution(k, d):
    answer = 0
    
    for x in range(0, d+1, k):
        a = math.floor((d**2-x**2)**0.5) // k + 1
        answer += a
        
    return answer
```

### 문제

- 2차원 좌표 평면에서 (x*k (x=0,1,2,3...), y*k (y=0,1,2,3...)) 지점에 점을 찍는다
- 원점과의 거리가 d가 넘으면 점을 찍지 않는다
- k와 d가 주어질 때, 점이 총 몇 개 찍히는지 구하라
- TC
  - input
    > k:2, d:4
  - ouput
    > 6

### 해결방법
- 반지름이 d인 원안에 (k의 배수, k의 배수)점을 몇 개 찍을 수 있는지 구했다
