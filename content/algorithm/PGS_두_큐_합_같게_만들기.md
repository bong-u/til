---
title: "프로그래머스 - 두 큐 합 같게 만들기 (L2)"
date: 2023-08-09
---

```python
from collections import deque

def solution(queue1, queue2):
    sum1, sum2 = sum(queue1), sum(queue2)
    dq1 = deque(queue1)
    dq2 = deque(queue2)
    cnt = 0

    while cnt <= len(queue1)*2+1 and sum1 != sum2:
        if sum1 > sum2:
            tmp = dq1.popleft()
            dq2.append(tmp)
            sum1 -= tmp
            sum2 += tmp
        elif sum1 < sum2:
            tmp = dq2.popleft()
            dq1.append(tmp)
            sum1 += tmp
            sum2 -= tmp
        cnt += 1
        
    return cnt if sum1 == sum2 else -1
```

### 문제

- 길이가 같은 두 큐가 주어진다
- 두 큐의 합이 같아지도록 큐의 원소를 교환할 수 있는 최소 횟수를 구하라
- 큐의 pop은 왼쪽에서, push는 오른쪽에서 이루어진다
- TC
  - input
    > queue1 : [3, 2, 7, 2], queue2 : [4 ,6, 5, 1]
  - ouput
    > 2

### 해결방법

- deque를 이요해서 큐를 구현하였다
- 두 큐의 합이 같아질때까지, 합이 큰 큐에서 작은 큐로 원소를 이동시킨다
- 방법이 존재하지 않는 경우 무한루프가 발생하기 때문에, (큐의 길이)*2+1 만큼만 반복한다
