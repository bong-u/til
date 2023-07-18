---
title: "프로그래머스 - 광물 캐기 (L2)"
date: 2023-07-10
---

```python
def solution(picks, minerals):
    bundles = []
    tmp = [0, 0, 0]
    DATA = [[1, 1, 1], [5, 1, 1], [25, 5, 1]]
    answer = 0

    for i in range(len(minerals)):
        if minerals[i] == "diamond":
            for j in range(3):
                tmp[j] += DATA[j][0]
        elif minerals[i] == "iron":
            for j in range(3):
                tmp[j] += DATA[j][1]
        elif minerals[i] == "stone":
            for j in range(3):
                tmp[j] += DATA[j][2]

        if (i+1) % 5 == 0 or i == len(minerals)-1:
            bundles.append(tmp)
            tmp = [0, 0, 0]
    bundles = bundles[:sum(picks)]
    bundles.sort(key= lambda x: -x[2])

    for i in bundles:
        for j in range(3):
            if picks[j] != 0:
                answer += i[j]
                picks[j] -= 1
                break

    return answer
```

### 문제

- 3가지 종류의 곡괭이 개수와, 광물의 배열이 주어진다
- 광물을 캐는데 필요한 최소한의 피로도를 구하라
- 피로도 (순서대로 다이아몬드, 철, 돌을 캐는데 필요한 피로도이다)
  > 다이아곡괭이 (1, 1, 1), 철곡괭이 (5, 1, 1), 돌곡괭이 (25, 5, 1)
- 규칙
  1. 사용할 수 있는 곡괭이중 아무거나 하나를 선택해 광물을 캔다
  2. 한 번 사용하기 시작한 곡괭이는 사용할 수 없을 때까지 사용한다
  3. 광물은 주어진 순서대로만 캘 수 있다
  4. 광산에 있는 모든 광물을 캐거나, 더 사용할 곡괭이가 없을 때까지 광물을 캔다.
- TC
  - input
    > [1, 3, 2] ["diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"]
  - ouput
    > 12

### 해결방법

- 그리디로 푸는 문제이다
- 5개로 묶어서 곡괭이별 필요한 피로도를 계산하고, 피로도가 많이드는 순서대로 정렬하였다 (다이아 우선)
- 추가로 고려해야할 사항
  > 만약, 곡괭이 개수가 3개라면 15개의 광물만 캘 수 있으므로 뒤의 광물은 버린다.
