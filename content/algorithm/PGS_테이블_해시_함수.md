---
title: "프로그래머스 - 테이블 해시 함수 (L2)"
date: 2023-07-25
---

```python
def solution(data, col, row_begin, row_end):
    answer = 0
    data.sort(key=lambda x: (x[col-1], -x[0]))
    s = []
    for i in range(row_begin-1, row_end):
        s.append(sum(map(lambda x: x%(i+1), data[i]))) 
    
    for i in s:
        answer ^= i
    return answer
```

### 문제
1. 해시 함수는 col, row_begin, row_end을 입력으로 받는다
2. 테이블의 튜플을 col번째 컬럼의 값을 기준으로 오름차순 정렬을 하되, 만약 그 값이 동일하면 기본키인 첫 번째 컬럼의 값을 기준으로 내림차순 정렬한다
3. 정렬된 데이터에서 S_i를 i 번째 행의 튜플에 대해 각 컬럼의 값을 i 로 나눈 나머지들의 합으로 정의한다
4. row_begin ≤ i ≤ row_end 인 모든 S_i를 누적하여 bitwise XOR 한 값을 해시 값으로서 반환하라

- TC
  - input
    > data: [[2,2,6],[1,5,10],[4,2,9],[3,8,3]]  
    > col: 2, row_begin: 2, row_end: 3
  - ouput
    > 4

### 해결방법
- 구현해서 해결하였다
- lambda문이 많은 코드를 줄여주었다