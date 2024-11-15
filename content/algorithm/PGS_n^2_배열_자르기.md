---
title: "프로그래머스 - n^2 배열 자르기 (L2)"
date: 2023-08-16
tags: ["Python", "Programmers"]
---

```python
def solution(n, left, right):
    answer = []
    start = (left//n, left%n)
    end = (right//n, right%n)

    for i in range(start[0], end[0]+1):
        line = [i+1]*(i+1) + [i for i in range(i+2, n+1)]
        answer += line
        
    return answer[start[1]:right-(start[0]*n)+1]
```

### 문제

- 정수 n, left, right가 주어진다
- n X n 크기의 2차원 배열을 만든다
- i=1,2,3..n에 대해서, 1행 1열부터 i형 i행까지 숫자 i로 채운다
- 1행, 2행.. n행을 모두 이어붙인 새로운 1차원 배열을 만든다
- 새로운 1차원 배열에서 left번째 숫자부터 right번째 숫자까지를 배열로 반환하라
- TC
  - input
    > n : 3, left : 2, right : 5
  - ouput
    > [3, 2, 2, 3]

### 해결방법
- answer에 필요한 행만 계산하여 붙인다
- 반환할때 offset을 계산하여 slicing한 리스트를 반환한다
