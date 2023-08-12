---
title: "프로그래머스 - k진수에서 소수 개수 구하기 (L2)"
date: 2023-08-12
---

```python
def convert10toN(n, k):
    result = ''
    while n > 1:
        result = str(n%k)+ result
        n = n // k
    return (str(n)+result).lstrip('0')

def is_prime(n):
    if n <= 1:
        return False
    
    end = int(n**(1/2))+1
    for i in range(2, end):
        if n%i == 0:
            return False
    return True


def solution(n, k):
    A = convert10toN(n, k)
    answer = 0
    for i in A.split('0'):
        if i == '': continue
        if is_prime(int(i)):
            answer += 1
    
    return answer
```

### 문제

- 양의 정수 n과 k가 주어진다
- n을 k진수로 변환했을 때, 아래 조건에 맞는 소수가 몇 개인지 구하라
> 0P0, P0, 0P, P 
- TC
  - input
    > n: 437674, k: 3
  - ouput
    > 3

### 해결방법

- 10진수를 k진수로 변환하는 함수, 소수인지 판별하는 함수를 정의해서 해결하였다
- 소수를 판별할 때, 에라토스테네스의 체를 사용했다가, 런타임에러를 보고, 제곱근까지 나누어보는 방식으로 바꿨다