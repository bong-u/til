---
title: "프로그래머스 - 수식 최대화 (L2)"
date: 2023-09-16
---

```python
from itertools import permutations
def solution(expression):
    answer = 0
    operations = list(filter(lambda x: not x.isdigit(), expression))
    numbers = expression.replace('-','+').replace('*','+').split('+')
    expression = [int(numbers[0])]

    for i in range(len(operations)):
        expression.append(operations[i])
        expression.append(int(numbers[i+1]))

    for case in permutations(('+', '-', '*'), 3):
        temp = expression[::-1]
        for op in case:
            stack = []
            while temp:
                if temp[-1] == op:
                    temp.pop()
                    a = stack.pop()
                    b = temp.pop()
                    stack.append(eval(str(a)+op+str(b)))
                else:
                    stack.append(temp.pop())
            temp = stack[::-1]
        answer = max(answer, abs(temp[0]))
    return answer
```

### 문제

- 숫자와 3가지 연산문자(+, -, *)만으로 이루어진 수식이 주어진다
- 연산자의 수식을 재배치하여 얻을 수 있는 결과값의 절대값 중 가장 큰 값을 구하라
- TC
  - input
    > "100-200*300-500+20"
  - ouput
    > 60420

### 해결방법
- itertools.permutation을 이용하여 연산자의 우선순위를 재배치하는 6가지 경우를 구한다
- expression에 연산자와 숫자를 분리하여 저장한다
- expression을 뒤집어서 연산자 우선순위에 따라 eval함수를 이용해 계산한다
- 계산 결과값의 절대값 중 가장 큰 값을 구한다

### 막혔던 부분
- 한번 계산하고 난 후 temp를 stack에 저장할 때 뒤집어서 저장해야하는데 그냥 저장해서 계속 틀렸다
