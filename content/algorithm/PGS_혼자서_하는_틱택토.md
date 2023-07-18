---
title: "프로그래머스 - 혼자서 하는 틱택토 (L2)"
date: 2023-07-13
---

```python
V = [[(-1, 0), (1, 0)], [(0, -1), (0, 1)], [(-1, -1), (1, 1)], [(-1, 1), (1, -1)]]
P = [[(1, 0), (1, 1), (1, 2)], [(0, 1), (1, 1), (2, 1)], [(1, 1)], [(1, 1)]]

def solution(board):
    answer = -1
    o_line = 0
    x_line = 0

    for i, p_list in enumerate(P):
        for p in p_list:
            if board[p[0]][p[1]] != '.' and board[p[0]][p[1]]== board[p[0]+V[i][0][0]][p[1]+V[i][0][1]] == board[p[0]+V[i][1][0]][p[1]+V[i][1][1]]:
                if board[p[0]][p[1]] == 'O':
                    o_line += 1
                elif board[p[0]][p[1]] == 'X':
                    x_line += 1

    o_cnt = 0
    x_cnt = 0


    for i in ''.join(board):
        if i == 'O':
            o_cnt += 1
        elif i == 'X':
            x_cnt += 1

    if not (0 <= o_cnt - x_cnt <= 1):
        return 0
    if o_line == 1:
        if o_cnt - x_cnt != 1:
            return 0
    if x_line == 1:
        if o_cnt != x_cnt:
            return 0
    if o_line != 0 and o_line == x_line:
        return 0

    return 1
```

### 문제

- 틱택토 3X3 보드판이 주어진다. ('O', 'X', '.')
- 규칙을 지켜서 나올수 있는 보드인지 여부를 출력하여라
- TC
  - input
    > ["O.X", ".O.", "..X"]
  - ouput
    > 1

### 해결방법

- O의 줄 수, X의 줄 수, O의 개수, X의 개수를 구했다
- 특히, 누가 이겼는지에 따라서 조건을 따져야한다
  - 예) O가 이긴 경우 -> O의 개수 = X의 개수 + 1
