---
title: "프로그래머스 - 귤 고르기 (L2)"
date: 2023-07-28
---

```python
def solution(k, tangerine):
    D = {}
    for i in tangerine:
        if i in D:
            D[i] += 1
        else:
            D[i] = 1
    D = sorted(D.items(), key=lambda x: -x[1])
    answer = 0
    for _, num in D:
        k -= num
        answer += 1
        if k <= 0:
            break
        
    return answer
```

### 문제

- 귤의 개수 k와 귤의 개수를 담은 배열 tangerine이 주어진다
- 귤 k개를 고를 때, 크기가 서로 다른 종류의 수의 최소값을 구하라
- TC
  - input
    > k: 6, tangerine: [1, 3, 2, 5, 4, 5, 2, 3]	
  - ouput
    > 3

### 해결방법
- 딕셔너리에 귤의 종류와 개수를 저장한다
- 딕셔너리를 귤의 개수 기준으로 내림차순 정렬한다
- 가장 많은 귤의 종류부터 순회하면서 k를 귤의 개수만큼 감소시키고, answer에 1을 더한다
- k가 0 이하가 되면 순회를 종료한다
