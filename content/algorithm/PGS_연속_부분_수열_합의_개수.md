---
title: "프로그래머스 - 연속 수열 합의 개수 (L2)"
date: 2023-08-06
tags: ["Python", "Programmers"]
---

- 첫번째 풀이
    ```python
    def solution(elements):
        result = set()
        length = len(elements)
        elements = elements*2
        for i in range(length):
            temp = 0
            for j in range(length):
                temp += elements[i+j]
                result.add(temp)
        
        return len(result)
    ```
- 개선한 풀이
    ```python
    def solution(elements):
    result = set()
    length = len(elements)
    for i in range(length):
        temp = 0
        for j in range(length):
            temp += elements[(i+j)%length]
            result.add(temp)
    
    return len(result)
    ```

### 문제

- 주어진 정수 배열로 원형 수열을 만든다
- 원형 수열의 연속된 부분 수열의 합의 개수를 구하여라
- TC
  - input
    > [7,9,1,1,4]
  - ouput
    > 18

### 해결방법

- 첫번째 풀이에서는 배열을 2배로 늘려서 원형 수열을 만들었다
- 개선한 풀이에서는 mod 연산을 이용해서 원형 수열을 만들었다
- set를 이용해서 중복을 제거하고 원소 개수를 반환하였다
