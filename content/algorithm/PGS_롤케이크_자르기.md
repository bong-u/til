---
title: "프로그래머스 - 롤케이크 자르기 (L2)"
date: 2023-08-03
tags: ["Python", "Programmers"]
---

```python
def solution(topping):
    answer = 0
    length = len(topping)
    toppingA = []
    toppingB = []
    setA = set()
    setB = set()

    for i in range(length-1):
        setA.add(topping[i])
        setB.add(topping[length-i-1])
        toppingA.append(len(setA))
        toppingB.append(len(setB))

    toppingB = toppingB[::-1]
    for i in range(length-1):
        if toppingA[i] == toppingB[i]:
            answer+=1
    return answer
```

### 문제

- 롤케이크 위에 올려진 토핑번호의 정수 배열 topping이 주어진다
- 롤케이크를 잘랐을 때, 두 조각의 토핑 종류를 똑같이 만드는 방법의 수를 구하라
- TC
  - input
    > [1, 2, 1, 3, 1, 4, 1, 2]
  - ouput
    > 2

### 해결방법
- toppingA에는 왼쪽에서부터 토핑 종류의 누적합을,
- toppingB에는 오른쪽에서부터 토핑 종류의 누적합을 저장한다
- toppingB를 역순으로 만든다
- toppingA,B를 순회하면서 두 리스트의 값을때 양쪽의 토핑 종류 개수가 같으므로, answer를 1 증가시킨다
