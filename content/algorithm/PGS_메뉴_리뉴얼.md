---
title: "프로그래머스 - 메뉴 리뉴얼 (L2)"
date: 2023-09-04
---

```python
from itertools import combinations
from collections import defaultdict

def solution(orders, course):
    answer = []

    for i in course:
        dataset = defaultdict(int)

        for j in orders:
            for k in combinations(j, i):
                # ABC, ACB를 같은 것으로 취급하기 위해 정렬
                dataset[''.join(sorted(k))] += 1

        if len(dataset) == 0:
            continue

        max_value = max(dataset.values())

        # 2번 이상 주문된 메뉴만 추가
        if max_value == 1:
            continue
        
        for k, _ in filter(lambda x:x[1] == max_value, dataset.items()):
            answer.append(''.join(k))

    return sorted(answer)
```

### 문제

- 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders, 코스 요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 주어진다
- 손님들이 함께 주문한 단품메뉴들 중, 가장 많이 함께 주문한 단품메뉴 조합을 코스요리 메뉴로 구성하려고 한다
- 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성되어야하며, 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합만을 코스요리 메뉴 후보에 포함한다
- 코스요리 메뉴의 구성을 문자열 형식으로 배열에 담아 사전순으로 오름차순 정렬하여 return하라
- TC
  - input
    > orders: ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"]  
    > course: [2,3,4]
  - ouput
    > ["AC", "ACDE", "BCFG", "CDE"]

### 해결방법

- combinations를 사용하여 모든 조합을 구해서 defaultdict로 개수를 센다
- defaultdict의 value 중 최대값을 구하고, 최대값과 같은 value를 가진 key를 answer에 추가한다
