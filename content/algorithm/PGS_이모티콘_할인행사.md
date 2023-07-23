---
title: "프로그래머스 - 이모티콘 할인행사 (L2)"
date: 2023-07-23
---

```python
result = []

def dfs(size, percent, users, emoticons):
    global result

    if len(percent) == size:
        temp = [0] * len(users)
        for i in range(size):
            for j in range(len(users)):
                if percent[i]*100 >= users[j][0]:
                    temp[j] += emoticons[i]*(1-percent[i])
        serviceNum = 0
        income = 0
        for i in range(len(users)):
            if temp[i] >= users[i][1]:
                serviceNum += 1
            else:
                income += temp[i]
        result.append ((serviceNum, income))
        return

    for i in [0.1, 0.2, 0.3, 0.4]:
        dfs(size, percent+[i], users, emoticons)


def solution(users, emoticons):
    dfs(len(emoticons), [], users, emoticons)
    result.sort(reverse=True)
    return list(result[0])
```

### 문제

- 카카오톡 사용자 n명의 구매 기준을 담은 2차원 정수 배열 users, 이모티콘 m개의 정가를 담은 1차원 정수 배열 emoticons가 주어진다
- 각 사용자는 일정 비율 이상 할인하는 이모티콘을 구매한다
- 각 사용자는 구매한 이모티콘 가격의 합이 일정 기준을 넘으면 이모티콘 구매를 모두 취소하고 이모티콘 플러스 서비스에 가입한다
- 할인율은 10%, 20%, 30%, 40% 중 하나이다
- 이모티콘 플러스 서비스에 가입자를 늘리는 것을 최우선으로 하며, 이모티콘 판매액을 늘리는 것을 두번째 목표로 했을 때의 이모티콘 플러스 서비스 가입자 수와 이모티콘 매출액을 1차원 정수 배열에 담아 반환하라

- TC
  - input
    > users: [[40, 10000], [25, 10000]], emoticons: [7000, 9000]
  - ouput
    > [1, 5400]

### 해결방법

- dfs를 이용해서 모든 경우의 수를 완전 탐색하여 해결하였다
- 할인율의 경우의 수가 4가지 밖에 없어서 가능했던 일이다
