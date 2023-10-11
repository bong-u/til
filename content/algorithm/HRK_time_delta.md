---
title: "HackerRank - Time Delta"
date: 2023-10-06
---

```python
from datetime import datetime

def time_delta(t1, t2):

    DATE_FORMAT = '%a %d %b %Y %H:%M:%S %z'

    start = datetime.strptime(t1, DATE_FORMAT)
    end = datetime.strptime(t2, DATE_FORMAT)

    return str(int(abs(start-end).total_seconds()))
```

### [문제](https://www.hackerrank.com/challenges/python-time-delta/problem)

- 정수 T가 주어지고, "Sun 10 May 2015 13:54:36 -0700"과 같은 형식의 두 시간이 T개 주어진다
- 두 시간의 차이를 초 단위로 출력한다
- 이때, 마지막 +0530, -0700과 같은 숫자는 UTC와의 차이를 나타낸다
- TC
  - input
    > 2  
    > Sun 10 May 2015 13:54:36 -0700  
    > Sun 10 May 2015 13:54:36 -0000  
    > Sat 02 May 2015 19:54:36 +0530  
    > Fri 01 May 2015 13:54:36 -0000
  - ouput
    > 25200
    > 88200

### 해결방법
- datetime 모듈의 strptime() 메서드를 이용해 문자열을 datetime 객체로 변환한다
- total_seconds 함수를 이용해 두 시간의 차이를 초 단위로 구한다
