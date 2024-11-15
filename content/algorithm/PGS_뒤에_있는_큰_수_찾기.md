---
title: "프로그래머스 - 뒤에 있는 큰 수 찾기 (L2)"
date: 2023-07-18
tags: ["Python", "Programmers"]
---

```python
def solution(numbers):
    stack = []
    answer = [-1] * len(numbers)

    for i in range(len(numbers)):
        while stack and stack[-1][1] < numbers[i]:
            answer[stack[-1][0]] = numbers[i]
            stack.pop()
        stack.append((i, numbers[i]))
        print(stack)

    return answer
```

### 문제

- 정수로 이루어진 배열 numbers가 주어진다
- 자신 보다 뒤에 있는 숫자 중 가장 크면서 가까운 수를 뒷 큰수라고 한다
- 모든 원소에 대해서 뒷 큰수를 구하여라 (존재하지 않으면 -1)
- TC
  - input
    > [2, 3, 3, 5]
  - ouput
    > [3, 5, 5, -1]

### 해결방법

- numbers를 순회하면서 수행한다
- stack의 top이 현재 원소보다 작으면 뒷 큰수를 찾은 것이므로 stack에서 pop하고, answer에 현재 원소를 저장한다
- stack에 현재 원소와 그 인덱스를 push한다

### 다른 사람 풀이

- stack에 index만 저장하여 그때그때 numbers에서 값을 가져온다

  ```python
  def solution(numbers):
      answer = [-1] * len(numbers)
      stack = []

      for i in range(len(numbers)):
          while stack and numbers[stack[-1]] < numbers[i]:
              answer[stack.pop()] = numbers[i]
          stack.append(i)

      return answer
  ```
