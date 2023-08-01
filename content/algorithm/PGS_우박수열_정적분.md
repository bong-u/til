---
title: "프로그래머스 - 우박수열 정적분 (L2)"
date: 2023-08-01
---

```python
def solution(k, ranges):
    answer = []
    seq = [k]
    section = [0]
    while k > 1:
        if k%2 == 0:
            k = k//2
        else:
            k = k*3+1
        seq.append(k)
    
    for i in range(0, len(seq)-1):
        a, b = seq[i], seq[i+1]
        if a > b:
            a, b = b, a
            
        section.append((b-a)/2+a)
        if len(section) != 0:
            section[-1] += section[-2]
            
    for i in ranges:
        a, b = i[0], len(seq)+i[1]-1
        if a > b:
            answer.append(-1.0)
        else:
            answer.append(section[b]-section[a])
    return answer
```

### 문제

- 어떤 수 K에 대해 다음과 같은 작업을 반복하면 항상 1을 만들 수 있다.
  1. 입력된 수가 짝수라면 2로 나누고, 홀수라면 3을 곱하고 1을 더합니다.
  2. 결과로 나온 수가 1보다 크다면 1번 작업을 반복합니다.
- 주어진 수가 5라면 5 => 16 => 8 => 4 => 2 => 1 과 같이 만들 수 있다.
- 이러한 수열을 우박수열이라고 하는데, 이 수열을 좌표평면으로 옮겨서 점을 찍는다 
- 주어진 수가 5라면 (0, 5), (1, 16), (2, 8), (3, 4), (4, 2), (5, 1)에 점을 찍는다
- [시작하는 x좌표, 끝나는 점의 x에 대한 오프셋]이 주어질 때, 해당 구간의 정적분을 구하라
- 시작점보다 끝점이 큰 경우 정적분 결과는 -1로 정의한다

- TC
  - input
    > k:5, ranges:[[0,0],[0,-1],[2,-3],[3,-3]]
  - ouput
    > [33.0,31.5,0.0,-1.0]

### 해결방법
- seq에는 주어진 k에 대한 우박 수열을 저장한다
- section에는 seq의 각 구간의 정적분을 누적합으로 저장한다
- ranges를 순회하면서 누적합 배열에서 해당 구간의 정적분을 구한다
