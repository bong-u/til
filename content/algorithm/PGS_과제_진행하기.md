---
title: "과제 진행하기 (L2)"
date: 2023-07-07
---

### 내 답안
```python
def solution(plans):
    q = []
    answer = []
    for plan in plans:
        h, m = map(int, plan[1].split(':'))
        plan[1] = h*60 + m
        plan[2] = int(plan[2])
    plans.sort(key = lambda x: x[1])
    
    for plan in plans:
        if q:
            free_time = plan[1] - q[-1][1]
        while q:
            q[-1][2] -= free_time
            free_time = -1 * q[-1][2]
            
            print (free_time, q[-1][2])
            if free_time < 0:
                break
            
            if q[-1][2] <= 0:
                answer.append(q.pop()[0])

        q.append(plan)
    while q:
        answer.append(q.pop()[0])
        
    return answer   
```

### 다른 사람 답안
```python
def solution(plans):
    plans = sorted(map(lambda x: [x[0], int(x[1][:2]) * 60 + int(x[1][3:]), int(x[2])], plans), key=lambda x: -x[1])
    q = []
    
    while plans:
        cur = plans.pop()
        
        for idx, item in enumerate(q):
            if item[0] > cur[1]:
                q[idx][0] += cur[2]
        
        q.append([cur[1]+cur[2], cur[0]])
        
    q.sort()
    return list(map(lambda x: x[1], q))
```


### 문제
* 과제 정보 리스트가 주어진다. (과제 : [이름, 시작시간, 걸리는 시간])
* 진행 중인 과제와 상관없이 과제 시작 시간이 되면 무조건 시작한다
* 진행 중인 과제를 끝냈을때 이전에 멈춰두었던 과제를 순차적으로 진행한다
* TC
    * input
        > [["korean", "11:40", "30"], ["english", "12:10", "20"], ["math", "12:30", "40"]]
    * ouput
        > ["korean", "english", "math"]

### 해결방법 (다른 사람 답안 기준)
* 과제 시간 전처리 후 시작시간 기준 내림차순으로 정렬한다
* 가장 먼저 시작하는 과제부터 pop한다
* 큐에 저장하는데, 비어있으면 시작시간+걸리는 시간 (끝나는 시간)을 바로 저장한다
* 큐에 원소가 있으면 큐를 순회하면서 현재 pop한 과제보다 늦게 끝나는 과제에 진행시간을 더해준다
* 위 반복문을 다 돌면 [끝나는 시간, 과제 이름]의 형태로 과제들이 저장되어있을 것이다
* 끝나는 시간 기준으로 정렬해서 과제 이름만 뽑아낸다