---
title: "프로그래머스 - 양궁대회 (L2)"
date: 2023-08-10
tags: ["Python", "Programmers"]
---

```python
def solution(n, info):
    # 각각 몇 번 맞춰야 점수를 얻는지 저장하였다
    goal_list = [i+1 for i in info]

    cases = []

    def dfs(score, cnt, case):
        # 몇 번째 점수인지 나타낸다 (0:10점, 1:9점, ...)
        length = len(case)
        if length == 11:
            # 화살 개수가 남았다면 0점에 채워준다
            if cnt != n:
                case[-1] += n-cnt
            cases.append((score, case))
            return
        # 현재 단계에서 몇 점 맞아야 점수를 따는지를 나타낸다
        goal = goal_list[length]

        # 점수를 따는 경우
        if cnt + goal <= n:
            # 딴 점수를 더해준다
            dfs(score+(10-length), cnt+goal, case+[goal])
        # 상대가 점수를 따는 경우
        if goal != 1:
            # 상대가 딴 점수를 빼준다
            dfs(score-(10-length), cnt, case+[0])
        # 아무도 못 맞추는 경우
        else:
            dfs(score, cnt, case+[0])
            
    dfs(0, 0, [])
    # 점수가 같다면, 낮은 점수를 더 많이 맞춘 경우를 반환하기 위해 역순으로 정렬하였다
    cases.sort(key= lambda x: (x[0], x[1][::-1]))

    if cases[-1][0] > 0:
        return cases[-1][1]
    # 가장 우선순위가 높은 case의 점수가 음수인 경우, 무조건 지는 경우로 간주한다    
    return [-1]
```

### 문제

- 1대1로 양궁 경기를 한다, 점수는 10점~0점까지 있다
- 상대보다 같은 점수를 많이 맞춰야 점수를 얻는다.
- 예를 들어, 상대가 10점을 3번 맞췄다고하자, 이때 10점을 4번 맞추면 10점을 얻을 수 있고, 2번 맞추면 상대가 10점을 얻는다
- 화살의 개수 n, 상대 선수가 맞힌 과녁 점수의 개수를 10점부터 0까지 담은 정수배열 info가 주어진다
- 가장 큰 점수 차이로 이기기 위해 어떤 점수를 몇 번 맞혀야 하는지 정수 배열로 구하라
- 만약 무조건 지는 경우 -1을 반환하라
- 만약 점수 차이가 같다면, 가장 낮은 점수를 더 많이 맞힌 경우를 return 하라
- TC
  - input
    > 5, [2,1,1,1,0,0,0,0,0,0,0]
  - ouput
    > [0,2,2,0,1,0,0,0,0,0,0]

### 해결방법
- DFS를 이용하여 모든 경우의 수를 구하여 해결하였다
- 자세한 설명은 주석으로 대체하였다
