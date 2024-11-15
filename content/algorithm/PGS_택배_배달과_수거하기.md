---
title: "프로그래머스 - 택배 배달과 수거하기 (L2)"
date: 2023-07-21
tags: ["Python", "Programmers"]
---

```python
def solution(cap, n, deliveries, pickups):
    answer = 0
    tempD = 0
    tempP = 0
    for i in range(n-1, -1, -1):
        tempD += deliveries[i]
        tempP += pickups[i]
        
        while tempD > 0 or tempP > 0:
            tempD -= cap
            tempP -= cap
            answer += (i+1)*2
    return answer
```

### 문제

- 트럭에 실을 수 있는 재활용 택배 상자의 최대개수 cap, 배달할 집의 개수 n
- 택배 상자의 개수를 담은 deliveries, 재활용 택배 상자의 개수를 담은 pickups가 주어진다
- 트럭하나로 모든 배달과 수거를 마치고 돌아올 수 있는 최소 이동 거리를 구하라
- TC
  - input (cap, n, deliveries, pickups)
    > 4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]
  - ouput
    > 16 

### 해결방법

- 배열을 거꾸로 순회하면서 배달, 수거 상자의 수를 더한다
- 해당 값이 0보다 크면 트럭에 실을 수 있는 최대 개수인 cap을 빼주고 거리를 계산해준다
