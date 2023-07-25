---
title: "Spring 개념 - POJO, DAO, DTO, VO, Entity"
date: 2023-07-25
---

### Spring의 여러 객체들
- 여기저기서 들어봤지만 개념이 머리에 정리되지 않아 기술한다

### POJO (Plain Old Java Object)
> 특정 기술에 종속되지 않는 순수한 자바 객체
- 기본 생성자를 가진다
- 아무것도 상속받거나, 구현하지 않아야 한다
- getter랑 setter만 존재 해야한다
```java
public class Person {
    private String name;
    private int age;

    public Person() {
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

```

### DAO (Data Access Object)
> DB에 접근하는 객체
- CRUD로직을 담당하는 객체이다

### DTO (Data Transfer Object)
> 계층 간 데이터 교환을 위한 객체
- 로직을 갖지 않는 순수한 데이터 객체이다
- getter, setter이외의 로직이 필요없다

### VO (Value Object)
> 값 자체를 표현하는 객체
- Read-Only를 보장한다
- 모든 필드의 값이 동일한 두 객체는 같다

### Entity
> DB의 Column을 필드로 가지는 객체
