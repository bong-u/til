---
title: "프로그래머스 - 쿼드압축 후 개수 세기 (L2)"
date: 2023-09-07
---

```python
answer = [0, 0]

def solution(arr):
    def recursion(sx, sy, k):
        global answer
        origin = arr[sy][sx]
        cnt = 0
        for i in range(sx, sx+k):
            for j in range(sy, sy+k):
                if origin != arr[j][i]:
                    recursion(sx, sy, k//2)
                    recursion(sx+k//2, sy, k//2)
                    recursion(sx, sy+k//2, k//2)
                    recursion(sx+k//2, sy+k//2, k//2)
                    return
        answer[origin] += 1

    recursion(0, 0, len(arr))
    return answer
```

### 문제

- 0과 1로 이루어진 2^n x 2^n 크기의 2차원 정수 배열 arr을 압축하려 한다
- 압축하는 방법은
    1. 당신이 압축하고자 하는 특정 영역을 S라고 정의한다
    2. 만약 S 내부에 있는 모든 수가 같은 값이라면, S를 해당 수 하나로 압축시킨다
    3. 그렇지 않다면, S를 정확히 4개의 균일한 정사각형 영역으로 쪼갠 뒤, 각 정사각형 영역에 대해 같은 방식의 압축을 시도한다
- TC
  - input
    > [[1,1,0,0],[1,0,0,0],[1,0,0,1],[1,1,1,1]]
  - ouput
    > [4,9]

### 해결방법

- recursion함수를 만들어서 재귀적으로 풀었다
- recursion함수 인자의 k는 현재 영역의 길이를 의미한다