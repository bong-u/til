---
title: "Record"
date: 2023-07-05
tags: ["Java"]
---

### 레코드란
- 불변(immutable) 데이터 객체를 쉽게 생성할 수 있도록 하는 새로운 유형의 클래스
- JDK16부터 지원

### 예제
- Record 적용 전

    ```java
    public class Person {
        private final String name;
        private final int age;
        
        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        public String getName() {
            return name;
        }
        
        public int getAge() {
            return age;
        }
    }
    ```

- Record 적용 후
    ```java
    public record Person(String name, int age) {}
    ```

### Record에서 지원하는 것
- **Constructor**, **Getter**, equals(), hashcode(), toString()

### Record의 제약 사항
- 다른 클래스를 상속 받을 수 없다, 구현(implements)는 가능
- static field만 선언 가능하다 (instance field 불가능)
- 각 field는 private final로 정의된다

### Record에서 할 수 있는 것
- 컴팩트 생성자 : 매개변수가 없는 생성자, validate 사용시 적합
    ```java
    public record Person(String name, int age) {
        public Person {
            Objects.requireNonNull(name);
            Objects.requireNonNull(age);
        }
    }
    ```
