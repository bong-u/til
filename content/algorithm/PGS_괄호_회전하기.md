---
title: "프로그래머스 - 괄호 회전하기 (L2)"
date: 2023-08-28
tags: ["Python", "Programmers"]
---

```python
def check(string):
    stack = []
    for i in string:
        if i == '(' or i == '{' or i == '[':
            stack.append(i)
        else:
            if len(stack) == 0:
                return False
            if i == ')':
                if stack[-1] != '(': return False
            if i == '}':
                if stack[-1] != '{': return False
            if i == ']':
                if stack[-1] != '[': return False
            stack.pop()
    if len(stack) != 0: return False
    return True

def solution(s):
    s = list(s)
    result = 0
    for i in range(len(s)):
        if check(s):
            result += 1
        s.append(s.pop(0))
    return result
```

### 문제

- 괄호를 포함하는 문자열 S가 주어진다
- 문자열 S를 왼쪽으로 x(0 <= x < s의 길이)만큼 왼쪽으로 회전시켰을때 S가 올바른 괄호 문자열이 되게하는 x의 개수를 구하라 
- TC
  - input
    > "[](){}"
  - ouput
    > 3

### 해결방법
- S를 왼쪽으로 한 칸씩 당기면서 check함수를 호출한다
- check함수에서는 스택을 이용하여 매개로 받은 문자열이 올바른 괄호 문자열인지 판단한다
