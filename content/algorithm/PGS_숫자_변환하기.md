---
title: "프로그래머스 - 숫자 변환하기 (L2)"
date: 2023-07-19
tags: ["Python", "Programmers"]
---

```python
from collections import deque

def solution(x, y, n):
    q = deque()
    visited = [False] * 1000001
    q.append((x, 0))
    
    while q:
        cx, cnt = q.popleft()
        if cx == y:
            return cnt
        
        if cx + n <= y and not visited[cx+n]:
            q.append((cx+n, cnt+1))
            visited[cx+n] = True
        if cx * 2 <= y and not visited[cx*2]:
            q.append((cx*2, cnt+1))
            visited[cx*2] = True
        if cx * 3 <= y and not visited[cx*3]:
            q.append((cx*3, cnt+1))
            visited[cx*3] = True
    return -1
```

### 문제
* 자연수 x를 y로 변환시킬려고 한다
* 할 수 있는 연산은 3가지 (x에 n을 곱한다, x에 2를 곱한다, x에 3을 곱한다)
* 필요한 최소 연산 횟수를 구하여라
* TC
    * input
        > 10(x), 40(y), 5(n)
    * ouput
        > 2

### 해결방법
* BFS를 수행한다, 이때 방문한 숫자는 다시 방문하지 않는다
