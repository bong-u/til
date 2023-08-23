---
title: "프로그래머스 - 2개 이하로 다른 비트 (L2)"
date: 2023-08-23
---

```python
def solution(numbers):
    answer = []
    for number in numbers:
        num = list(str(bin(number)).split('b')[1])

        # 첫번째 자릿수가 0인 경우
        if num[-1] == '0':
            num[-1] = '1'
            answer.append(int('0b'+''.join(num), 2))
            continue
        
        # 첫번째 자릿수가 1인 경우
        num = ['0']+num
        # 두번째 자리부터 순회
        for i in range(len(num)-2, -1, -1):
            # 가장 오른쪽의 0을 찾았을 때
            if num[i] == '0':
                # 0을 오른쪽으로, 1을 왼쪽으로 옮긴다
                num[i], num[i+1] = num[i+1], num[i]
                answer.append(int('0b'+''.join(num), 2))
                break

    return answer
```

### 문제

- 양의 정수 x에 대해서 "x보다 크고 x와 비트가 1~2개 다른 수들 중에서 제일 작은 수"를 구하라
- TC
  - input
    > [2, 7]
  - ouput
    > [3, 11]

### 해결방법

- 2가지 경우로 풀었다, 
1. 첫번째 자릿수가 0인 경우 -> 첫번째 자릿수 1로 바꾼다
2. 첫번째 자릿수가 1인 경우 -> 가장 오른쪽의 0을 오른쪽으로 한 칸 옮긴다
