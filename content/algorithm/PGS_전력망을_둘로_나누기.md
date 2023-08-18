---
title: "프로그래머스 - 전력망을 둘로 나누기 (L2)"
date: 2023-08-18
---

```python
def solution(n, wires):
    tower = [[] for _ in range(n)]
    answer = 100
    for wire in wires:
        wire[0] -= 1
        wire[1] -= 1
        tower[wire[0]].append(wire[1])
        tower[wire[1]].append(wire[0])
    
    def traverse(visited, start):
        visited[start] = True
        for i in tower[start]:
            if not visited[i]:
                traverse(visited, i)
    for wire in wires:
        tower[wire[0]].remove(wire[1])
        tower[wire[1]].remove(wire[0])

        visited = [False]*n
        a = 0
        traverse(visited, wire[0])
        for i in range(n):
            if visited[i]:
                a += 1

        visited = [False]*n
        b = 0
        traverse(visited, wire[1])
        for i in range(n):
            if visited[i]:
                b += 1
        answer = min(answer, abs(a-b))
        tower[wire[0]].append(wire[1])
        tower[wire[1]].append(wire[0])
    return answer
```

### 문제

- n개의 송전탑이 전선을 통해 트리 형태로 연결되어 있다
- 전선 중 하나를 끊어서 전력망 네트워크를 2개로 분할하여 두 전력망이 갖게되는 송전탑의 개수를 최대한 비슷하게 맞추고자 한다
- 송전탑의 개수 n, 전선 정보를 담은 2차원 배열 wires가 주어진다
- 두 전력망이 가지는 송전탑의 개수 차이의 최솟값을 구하라
- TC
  - input
    > n:9, wires:[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]
  - ouput
    > 3

### 해결방법
- 전선을 한개씩 끊어보면서 끊어진 두 위치를 시작으로 dfs탐색을 하여 visited 배열을 만들었다
- visited 배열을 이용하여 두 전력망이 가지는 송전탑의 개수 차이를 구하였다
