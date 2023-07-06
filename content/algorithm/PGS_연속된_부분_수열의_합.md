---
title: "연속된 부분 수열의 합 (L2)"
date: 2023-07-06
---

```python
def solution(sequence, k):
    answer = []
    e = len(sequence)-1
    s = len(sequence)
    cur = 0
    
    while s >= 0:
        if cur < k:
            s -= 1
            cur += sequence[s]
        elif cur > k:
            cur -= sequence[e]
            e -= 1
        else:
            answer.append((s, e))
            s -= 1
            cur += sequence[s]
    answer.sort(key=lambda x: (x[1]-x[0], x[0]))
    return answer[0]
```

### 문제
* 수열과 k가 주어진다
* 수열의 부분합이 k가 되게 하는 시작인덱스와 끝인덱스를 구하라
* 이때, **길이가 짧은 수열을 찾는다, 길이가 같은것이 여러가지라면 시작인덱스가 작은 것을 찾는다**
* TC
    * input
        > [1, 2, 3, 4, 5], 7
    * ouput
        > [2, 3]

### 해결방법
* 투포인터를 활용해 답이 되는 모든 경우를 answer에 저장한다
* answer를 문제의 우선순위에 따라 정렬한뒤 첫번째 원소를 반환한다
