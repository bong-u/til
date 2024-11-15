---
title: "Method reference (메소드 참조)"
date: 2023-07-28
tags: ["Java"]
---

### 메소드 참조
- 메소드 참조는 Java 8부터 도입되었다
- lambda와 같이 사용하면 간결한 코드를 만들 수 있다

### 정적 메소드 참조의 문법
```java
// lambda 식
(str) -> String.toString(str);
// 정적 메소드 참조
String::toString
```

### 인스턴스 메소드 참조의 문법
```java
Person person;
// lambda 식
(age) -> person.setAge();
// 인스턴스 메소드 참조
person::setAge
```

### 활용
```java
// lambda식
getItems.forEach(item -> System.out.println(item));
// 메소드 참조
getItems.forEach(System.out::println);
```
