---
title: "프로그래머스 - 시소 짝꿍 (L2)"
date: 2023-07-20
tags: ["Python", "Programmers"]
---

```python
def solution(weights):
    answer = 0
    wdict = {}
    
    weights.sort(reverse=True)
    for i in weights:
        if i in wdict:
            answer += wdict[i]
        if i*3/2 in wdict:
            answer += wdict[i*3/2]
        if i*2 in wdict:
            answer += wdict[i*2]
        if i*4/3 in wdict:
            answer += wdict[i*4/3]
        
        wdict[i] = wdict[i]+1 if i in wdict else 1
    return answer
```

### 문제

- 시소에는 중심으로부터 2m, 3m, 4m 떨어진 거리에 좌석이 존재한다
- 양쪽의 탑승한 사람의 무게와 시소 축과 좌석 간의 거리의 곱이 같아서 시소가 평행을 이룬다면 그 둘을 시소 짝꿍이라고 할 수 있다
- 사람들의 몸무게 배열이 주어질 때, 시소 짝꿍이 몇 쌍 존재하는지 구하라
- TC
  - input
    > [100,180,360,100,270]
  - ouput
    > 4 {(100, 100), (180, 360), (180, 270), (270, 360)}

### 해결방법
- 몸무게 배열을 내림차순으로 정렬한 뒤 비율을 계산하여 비교하였다
- 이때 dict의 key에는 몸무게, value에는 해당 몸무게를 가진 수를 저장하여 몸무게 같은 사람도 고려하였다
