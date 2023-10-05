---
title: "HackerRank - Merge the Tools"
date: 2023-10-04
---

```python
def merge_the_tools(string, k):
  for i in range(0, len(string), k):
    temp = []
    for j in range(i, i+k):
      if not string[j] in temp:
        temp.append(string[j])
    print (''.join(temp))
```

### 문제

- 문자열 S와 정수 k가 주어졌을 때, S를 k 길이의 부분 문자열로 나누고, 각 부분 문자열에서 중복되는 문자를 제거한 뒤 출력한다
- TC
  - input
    > s = 'AABCAAADA', k = 3
  - ouput
    > AB  
    > CA  
    > AD

### 해결방법
- 각 부분문자열을 변수 i를 이용해 k만큼씩 증가시키며 순회한다
- 부분문자열에서 한 문자씩 j를 이용해 순회한다
- 부분문자열을 순회할 때마다 리스트 temp를 초기화하고, temp에 문자가 없으면 추가한다
- 부분문자열 순회가 끝나면 temp를 출력한다
