---
title: "프로그래머스 - 주차 요금 계산(L2)"
date: 2023-08-11
---

```python
import math

def diff(start, end):
    sh, sm = map(int, start.split(':'))
    eh, em = map(int, end.split(':'))
    
    return (eh*60+em) - (sh*60+sm)

def calc(time, baseTime, baseFee, unitTime, unitFee):
    if time < baseTime:
        return baseFee
    time -= baseTime
    return baseFee + math.ceil(time/unitTime)*unitFee
    
def solution(fees, records):
    cars = {}
    for i in records:
        time, car_num, _ = i.split(' ')
        # 새로 입차 한 경우
        if not car_num in cars:
            cars[car_num] = [0, time]
        else:
            # 출차 후 다시 입차한 경우
            if cars[car_num][1] == '':
                cars[car_num][1] = time
            # 출차한 경우
            else:
                cars[car_num][0] += diff(cars[car_num][1], time)
                cars[car_num][1] = ''
    
    # 아직 출차하지 않은 차량들에 대해 23:59에 출차한 것으로 간주
    for num in cars:
        if cars[num][1] != '':
            cars[num][0] += diff(cars[num][1], '23:59')
            cars[num][1] = ''
    
    # 요금 계산
    for num in cars:
        cars[num] = calc(cars[num][0], fees[0], fees[1], fees[2], fees[3])
    
    # 차량 번호 순으로 정렬
    sorted_keys = sorted(cars.keys())
    # 요금만 추출해서 반환
    return [cars[key] for key in sorted_keys]
```

### 문제

- 기본 시간, 기본 요금, 단위 시간, 단위 요금
- 차량의 입출차 기록 (시각(HH:MM), 차량번호(XXXX), 내역(입차/출차))
- 위 정보가 주어질때, 각 차량별 주차 요금을 계산해서 차량번호 순으로 정렬하여 반환하라
- 입차만 하고 출차하지 않은 차량은, 23:59에 출차한 것으로 간주한다
- TC
  - input
    > fees: [180, 5000, 10, 600]  
    > records: ["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]
  - ouput
    > [14600, 34400, 5000]

### 해결방법
- cars라는 dictionary에 차량번호를 key로, [주차시간, 입차시간]을 value로 저장한다
- 마지막에 한번에 요금을 계산한다
