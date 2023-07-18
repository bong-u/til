---
title: "프로그래머스 - 호텔 대실 (L2)"
date: 2023-07-16
---

```python
import heapq

def time_calc(time):
    time_split = time.split(':')
    return int(time_split[0])*60 + int(time_split[1])

def solution(book_time):
    time = []
    q = []
    for start, end in book_time:
        time.append((time_calc(start), time_calc(end)))
    time.sort(key=lambda x: x[0])
    print (time)
    for start, end in time:
        if q:
            top = heapq.heappop(q)
            if top > start:
                heapq.heappush(q, top)
            heapq.heappush(q, end+10)
        else:
            heapq.heappush(q, end+10)
    return len(q)
```

### 문제

- 호텔의 예약시간이 담긴 2차원 배열이 주어진다 ex) [["12:00", "12:30"], ["15:00", "16:00"]]
- 퇴실 시간 10분 이후에 다음 손님이 입실 할 수 있다
- 최소 객실의 개수를 구하여라
- TC
  - input
    > [["15:00", "17:00"], ["16:40", "18:20"], ["14:20", "15:20"], ["14:10", "19:20"], ["18:20", "21:20"]]
  - ouput
    > 3

### 해결방법

- 최소 힙에 퇴실시간 + 10분 을 넣는다
- 다음 손님의 입실시간과 비교해서 퇴실시간이 더 빠르면 퇴실시간을 빼고 다시 넣는다
- 힙에 남아있는 퇴실시간의 개수가 객실의 개수이다
