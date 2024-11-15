---
title: "프로그래머스 - 순위 검색 (L2)"
date: 2023-08-31
tags: ["Python", "Programmers"]
---

```python
from itertools import combinations
from collections import defaultdict
from bisect import bisect_left

def solution(infos, queries):
    answer = []
    dataset = defaultdict(list)

    for info in infos:
        token = info.split(' ')

        for j in range(5):
            for case in list(combinations([0,1,2,3], j)):
                temp = token[:-1]
                for c in case:
                    temp[c] = '-'
                dataset[''.join(temp)].append(int(token[-1]))
    for value in dataset.values():
        value.sort()

    for query in queries:
        query = query.replace(" and", "").split()
        target_key = ''.join(query[:-1])
        target_value = int(query[-1])
        count = 0

        if target_key in dataset:
            target_list = dataset[target_key]
            idx = bisect_left(target_list, target_value)
            count = len(target_list)-idx

        answer.append(count)
    return answer
```

### 문제

- 지원자가 지원서에 작성한 4가지 정보와, 특정 지원자의 지원서 점수가 문자열 배열로 주어진다
- 개발언어는 cpp, java, python 중 하나, 지원 직군에는 backend, frontend 중 하나,
- 지원 경력에는 junior, senior 중 하나, 소울푸드에는 chicken, pizza 중 하나가 주어진다

- 개발팀이 궁금해하는 문의 조건도 문자열 배열로 주어진다
- 개발언어와 직군, 경력, 소울푸드 조건은 "and"로 구분되어 있다
- '-'표시는 해당 조건을 고려하지 않는다는 뜻인데, 점수를 제외한 항목에 주어질 수 있다
- 문의조건에 해당하는 사람 중 코딩테스트 점수를 만족하는 사람의 수를 구하라
- TC
  - input
    > info:["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"]  
    > query:["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]
  - ouput
    > [1,1,1,1,2,4]

### 해결방법

- 언어, 직군, 경력, 소울푸드를 한번에 거르기 위해 dictionary에 key를 만들어주어야한다
- 모든 경우를 고려해주기 위해 '-'도 섞어가면서 해당 지원자를 찾을 수 있는 모든 쿼리를 구해서 key로 등록한다
- value에는 점수가 들어가는데 이후에 이분탐색을 하기위해 오름차순으로 정렬해준다
- bisect_left 함수를 통해 해당 점수 이상인 사람의 수를 구한다
