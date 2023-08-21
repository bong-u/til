---
title: "프로그래머스 - 모음사전 (L2)"
date: 2023-08-21
---

```python
def solution(word):
    answer = 0
    char = ['A', 'E', 'I', 'O', 'U']
    cnt = 0

    def traverse(cur):
        nonlocal char, cnt, word
        if cur == word:
            return cnt

        if len(cur) < 5:
            for ch in char:
                cnt += 1
                if traverse(cur+ch) != None:
                    return cnt
    return traverse('')
```

### 문제
- 사전에 A,E,I,O,U만 사용하여 만들 수 있는 길이 5이하의 모든 단어가 수록되어있다
- 단어 하나 word가 주어질때 사전에서 몇번째 단어인지 구하라
- TC
  - input
    > 'I'
  - ouput
    > 1563

### 해결방법
- DFS로 풀었다
- 그냥 반복문으로 풀걸 그랬다는 생각이 든다
