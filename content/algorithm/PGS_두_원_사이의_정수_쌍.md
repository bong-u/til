---
title: "두 원 사이의 정수 쌍(L2)"
date: 2023-07-05
---

```python
import math

def calc1(r):
    result = 0
    for i in range(1, r):
        result += math.floor(math.sqrt(r**2 - i**2))
    return result*4 + r*4 + 1

def calc2(r):
    result = 0
    for i in range(1, r):
        a = math.sqrt(r**2 - i**2)
        result += math.floor(a)
        if a % 1 == 0:
            result -= 1
    return result*4 + r*4 + 1

def solution(r1, r2):
    return calc1(r2)-calc2(r1)+4
```

### 문제
* 두 원의 반지름 r1, r2가 주어진다.
* 두 원 사이의 공간에 x좌표와 y좌표가 모두 정수인 점의 개수를 구하라
* 이때, 각 원 위의 점도 포함하여 센다.
* TC
    * input
        > r1:2, r2:3
    * ouput
        > 20

### 해결방법
* ( 원의 1사분면에 존재하는 점의 개수 * 4 + 축에 있는 점 + 원점) 과 같은 방식으로 구한다
* 큰 원과 작은 원을 계산할 때 로직이 조금 다른데, 작은 원의 테두리에 걸친 점은 답에 포함시켜야한다는 것을 주의한다.

### 느낀 점
* 작은 원에서 고려해야하는 사항을 생각해내지못해 오래 걸렸다.
