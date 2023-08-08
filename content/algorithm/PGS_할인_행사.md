---
title: "프로그래머스 - 할인 행사 (L2)"
date: 2023-08-08
---

```python
from collections import deque

def solution(want, number, discount):
    want_dict = dict()
    answer = 0
    
    for i in range(len(want)):
        want_dict[want[i]] = number[i]
    
    for i in discount[:10]:
        if i in want_dict:
            want_dict[i] -= 1
    
    for i in range(0, len(discount)-9):
        if all(map(lambda x: x <= 0, want_dict.values())):
        	answer += 1
        
        if discount[i] in want_dict:
        	want_dict[discount[i]] += 1
        if i+10 < len(discount) and discount[i+10] in want_dict:
            want_dict[discount[i+10]] -= 1
    
    return answer
```

### 문제

- XYZ마트에서는 회원에 가입하면 10일동안 할인혜택을 받는다  
- 할인하는 제품은 하루에 하나씩만 구매할 수 있다
- 정현이가 원하는 제품 리스트, 원하는 제품의 수량 리스트, 마트에서 할인하는 제품 리스트가 주어진다
- 정현이가 원하는 제품을 모두 할인 받을 수 있는 회원 등록 날짜의 수를 구하라
- TC
  - input
    > want: ["banana", "apple", "rice", "pork", "pot"]  
    > number: [3, 2, 2, 2, 1]  
    > discount: ["chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana", "pork", "rice", "pot", "banana", "apple", "banana"]
  - ouput
    > 5

### 해결방법

- 원하는 제품을 dict로 만든다 (key: 제품이름, value: 수량)
- 원하는 제품 - 첫날에 가입했을 때 할인하는 제품을 계산한다
- 반복문을 순회하면서 할인하는 제품을 빼고, 할인하는 제품을 더한다 (제품이 더 필요하면 양수, 덜 필요하면 음수)
- 0보다 큰 수가 있으면 answer에 1을 더한다
