---
title: "HackerRank - The Minion Game"
date: 2023-09-15
---

```python
def minion_game(string):
    stuart = 0
    kevin = 0
    
    for i in range(len(string)):
        for j in range(i+1, len(string)+1):
            if string[i] in ['A', 'E', 'I', 'O', 'U']:
                kevin += 1
            else:
                stuart += 1
    
    if stuart > kevin:
        print ('Stuart', stuart)
    elif stuart < kevin:
        print ('Kevin', kevin)
    else:
        print ('Draw')
```

### 문제

- Kevin과 Stuart가 The Minion 게임을 한다
- 게임의 규칙은 다음과 같다
  - 문자열 S가 주어질때, 서로 부분 문자열을 만든다
  - 이때, Kevin은 모음으로, Stuart는 자음으로 시작하는 문자열을 만든다
  - 하나 만들때마다 점수를 +1 얻고 점수가 높은 사람이 이긴다
- "{게임에서 이긴 사람이름} {이긴 사람의 점수}"를 출력하라
- 동점이면 "Draw"를 출력하라
- TC
  - input
    > BANANA
  - ouput
    > Stuart 12

### 해결방법
- 이중 for문을 이용해 문자열 S의 모든 substring을 찾는다
- 해당 substring이 자음으로 시작하면 stuart에, 모음으로 시작하면 kevin에 점수를 +1한다
- 두 점수를 비교해 문제에서 주어진 형식에 맞춰 출력을 한다
