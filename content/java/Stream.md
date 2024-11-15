---
title: "Stream, Optional"
date: 2023-07-03
tags: ["Java"]
---

## Lambda
### 표현식
1. 매개변수 화살표(->) 함수몸체로 이용하여 사용할 수 있습니다.
2. 함수 몸체가 단일 실행문이면 괄호{}를 생략할 수 있습니다.
3. 함수 몸체가 return문으로만 구성되어 있으면 괄호{}을 생략할 수 있습니다.
```java
(int x) -> x+1;
(int x, int y) -> x+y;
(Thread lamT) -> { lamT.start(); }
```

## Stream

### 특징
- 원본 데이터를 변경하지 않습니다.
- 요청되었을때만 데이터를 처리한다.
- parallelStream()을 이용하여 병렬처리가 가능하다.

### 예제1
```java
List<String> highCaloriesFoodName = foodList.stream()
        .filter(food -> {
            System.out.println("filter : " + food.getName());
            // 400이상 칼로리인 음식만 필터링한다
            return food.getCalories() > 400;
        })
        .map(food -> {
            System.out.println("map : " + food.getName());
            // 음식 이름만 가져온다
            return food.getName();
        })
        .limit(3)
        .collect(Collectors.toList());

System.out.println(highCaloriesFoodName);
```

### 예제2
```java
List<Integer> redHeavyAppleUid = appleList.parallelStream()     // 병렬 처리
        .filter(apple -> apple.getColor().equals("RED"))        // 빨간색 사과 필터링
        .sorted(Comparator.comparing(Apple::getWeight))         // 무게 순서대로 정렬
        .map(Apple::getUidNum).collect(Collectors.toList());    // 사과 고유번호 출력
```

## Optional
### 특징
- Optional<T>는 null이 올 수 있는 값을 감싸는 Wrapper 클래스이다.

### 예제1
```java
List<String> nameList = Optional.ofNullable(getNames())
    .orElseGet(() -> new ArrayList<>());
```

### 예제2
```java
String result = user.map(UserVO::getAddress) // 주소 가져오기
    .map(Address::getPostCode) // 우편번호 가져오기
    .orElse("우편번호 없음"); // 없으면 "우편번호 없음" 출력
```

