---
title: "프로그래머스 - 택배상자 (L2)"
date: 2023-08-04
tags: ["Python", "Programmers"]
---

```python
def solution(order):
    answer = 0
    length = len(order)
    stackA = [i for i in range(length, 0, -1)]
    stackB = []
    
    for i in order:
        while True:
            if stackA and stackA[-1] == i:
                stackA.pop()
                break
            if stackB and stackB[-1] == i:
                stackB.pop()
                break

            if stackB and stackB[-1] > i:
                return answer
            
            stackB.append(stackA.pop())
        answer += 1
        
    return answer
```

### 문제

- 원하는 상자 순서를 나타내는 정수배열 order가 주어진다
- 컨베이어 벨트에 [N... 3, 2, 1]와 같이 박스가 놓여있다
- 박스는 1번 상자부터 순차적으로 뺄 수 있다
- 뺀 상자를 잠깐 보조 컨베이어 벨트에 보관할 수 있다
- 보조 컨베이어 벨트는 스택과 같이 FILO가 적용된다
- 순서대로 상자를 싣지 못하면, 그만둔다
- 박스를 order에 맞게 몇 개까지 실을 수 있는지 구하라
- TC
  - input
    > [4, 3, 1, 2, 5]
  - ouput
    > 2

### 해결방법
- 직관적으로 stackA, stackB를 선언하였다
- stackA가 주 컨베이어 벨트, stackB가 보조 컨베이어 벨트 역할을 한다
- order를 순회하면서 순서에 맞는 상자가 나올 때 까지, 보조 컨베이어 벨트로 보내기를 반복한다
- 보조 컨베이어 벨트의 top이 꺼내야 할 요소보다 큰 경우,
- 꺼낼 상자가 보조 컨베이어 뒤쪽에 있다는 의미이므로 반복문을 빠져나온다
