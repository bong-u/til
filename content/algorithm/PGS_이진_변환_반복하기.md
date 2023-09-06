---
title: "프로그래머스 - 이진 변환 반복하기 (L2)"
date: 2023-09-06
---

```python
def solution(s):
    answer = []
    cnt = 0
    zero_cnt = 0
    
    while len(s) != 1:
        zero = s.count('0')
        s = str(bin(len(s)-zero)).split('b')[1]
        cnt += 1
        zero_cnt += zero
        
    return [cnt, zero_cnt]
```

### 문제

- 이진변환을 다음과 같이 정의한다
  ###### 1. x의 모든 0을 제거한다
  ###### 2. x의 길이를 c라고 하면, x를 'c를 2진법으로 표현한 문자열'로 바꾼다
- s가 '1'이 될때까지 이진변환을 가했을 때,
- [이진변환의 횟수, 제거된 모든 0의 개수]를 반환하라
- TC
  - input
    > s : "110010101001"
  - ouput
    > [3, 8]

### 해결방법
- 이진변환을 반복하면서 0의 개수를 세어주었다
- bin함수를 사용하여 2진수로 바꾸면 생기는 '0b'를 제거해주었다
