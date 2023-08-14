---
title: "프로그래머스 - 피로도 (L2)"
date: 2023-08-14
---

```python
def solution(k, dungeons):
    result = 0
    length = len(dungeons)
    def dfs(cur, visited, cnt):
        nonlocal result
        visit = False
        for i in range(length):
            if not visited[i] and cur >= dungeons[i][0]:
                visit = True
                visited[i] = True
                dfs(cur-dungeons[i][1], visited, cnt+1)
                visited[i] = False
        
        if not visit:
            result = max(result, cnt)
    
    dfs(k, [False]*length, 0)

    return result
```

### 문제

- 유저의 현재 피로도 k, 던전별 ["최소 필요 피로도", "소모 피로도"]를 담은 2차원 배열 dungeons가 주어진다
- 던전을 탐험하기 위해서는 유저의 현재 남은 피로도가 최소 필요 피로도 이상이어야 한다
- 던전을 클리어하면 "소모 피로도"만큼 피로도가 소모된다
- 던전을 탐험할 수 있는 최대 던전 수를 구하라
- TC
  - input
    > k:80, dungeons:[[80,20],[50,40],[30,10]]
  - ouput
    > 3

### 해결방법
- visited에 방문한 던전을 체크하면서 DFS 탐색하였다

### 배운 점
- nonlocal 키워드를 알게 되었다
