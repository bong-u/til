---
title: "프로그래머스 - 숫자 카드 나누기 (L2)"
date: 2023-07-31
tags: ["Python", "Programmers"]
---

- 첫번째 통과한 풀이
    ```python
    import math

    def gcd(a, b):
        while b > 0:
            a, b = b, a%b
        return a

    def gcdOfArr(l):
        result = l[0]
        for i in range(1, len(l)):
            result = gcd(result, l[i])
        return result

    def solution(arrayA, arrayB):
        a1 = gcdOfArr(arrayA)
        for i in arrayB:
            if i % a1 == 0:
                a1 = 0
                break
        a2 = gcdOfArr(arrayB)
        for i in arrayA:
            if i % a2 == 0:
                a2 = 0
                break
        return max(a1, a2)
    ```

- 개선한 풀이
    ```python
    import math
    from functools import reduce

    def gcd(a, b):
        while b > 0:
            a, b = b, a%b
        return a

    def solution(arrayA, arrayB):
        a1 = reduce(gcd, arrayA)
        a1 = 0 if any(i % a1 == 0 for i in arrayB) else a1
        a2 = reduce(gcd, arrayB)
        a2 = 0 if any(i % a2 == 0 for i in arrayA) else a2
        return max(a1, a2)
    ```

### 문제

- 철수가 가진 숫자의 배열 arrayA, 영희가 가진 숫자의 배열 arrayB가 주어진다
- 철수가 가진 카드들의 모든 숫자를 나눌 수 있고, 영희가 가진 숫자는 하나도 나눌 수 없는 양의 정수 a
- 영희가 가진 카드들의 모든 숫자를 나눌 수 있고, 철수가 가진 숫자는 하나도 나눌 수 없는 양의 정수 a
- 가장 큰 양의 정수 a를 구하라, 없다면 0을 반환하라
- TC
  - input
    > [14, 35, 119]
  - ouput
    > 7

### 해결방법

- 프로그래머스에서 지원하는 파이썬이 3.8이라서 내장함수 math.gcd(3.9부터 지원)를 사용하지 못했다
- 유클리드 호제법 기억이 나지 않아서 약간의 구글링을 통해 해결하였다
- reduce와 any함수를 통해 코드의 길이를 대폭 감소 시킬 수 있었다, 자주 활용하자
