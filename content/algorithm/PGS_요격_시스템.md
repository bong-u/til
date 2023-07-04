---
title: "요격 시스템 (L2)"
date: 2023-07-04
---

```python
def solution(targets):
    answer = 0
    targets.sort(key=lambda x:x[1])
    cur = 0
    
    for i in targets:
        if i[0] >= cur:
            answer += 1
            cur = i[1]
        
    return answer
```

### 문제
* 개구간 (s, e)의 리스트가 주어진다.
* 이때, 모든 개구간을 포함하는 최소 숫자의 수를 구하여라
* TC
    * input
        > [[4,5],[4,8],[10,14],[11,13],[5,12],[3,7],[1,4]]
    * ouput
        > 3

### 해결방법
* 개구간을 (s, e)에서 e를 정렬하여 해결하였다.
* s 기준으로 정렬해도 해결할 수 있다는데 나는 e로 정렬하는게 편했다
