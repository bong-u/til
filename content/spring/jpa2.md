---
title: "Spring - JPA : 프록시 객체, 영속성 전이, 고아 객체"
date: 2023-08-07
tags: ["Java", "Spring"]
---

### 프록시 객체

- 프록시는 JPA의 실제 엔티티를 필요할 때만 꺼내쓰도록하는 가짜 객체이다
- em.find 대신 em.getReference를 사용하면 프록시 객체를 얻을 수 있다
- JPA에서는 프록시 객체를 사용하여 지연 로딩을 지원한다
  - FetchType.EAGER (즉시 로딩)
    ```java
    Order order = em.find(Order.class, orderId);
    Member member = order.getMember(); // 지금 member는 실제 객체이다
    String name = member.getName(); // 1차 캐시에서 조회한다
    ```
  - FetchType.LAZY (지연 로딩)
    ```java
    Order order = em.find(Order.class, orderId);
    Member member = order.getMember(); // 지금 member는 프록시 객체이다
    String name = member.getName(); // db에서 조회한다 (프록시 -> 실제 객체)
    ```

### 영속성 전이

> 특정 Entity가 영속될때 연관된 Entity도 함께 영속화하는 것

- CascadeType종류
  - **ALL** : 모든 Cascade를 적용한다
  - **PERSIST** : 저장될 때 적용
  - **REMOVE** : 삭제될 때 적용
  - MERGE : 병합될 때 적용
  - REFRESH : REFRESH될 때 적용
  - DETACH : DETACH될 때 적용

### 고아 객체

> 부모 엔티티와 연관관계가 끊어진 자식 Entity

- orphanRemoval 속성을 지정해서 자동 삭제할 수 있다

- orphanRemoval과 CascadeType.REMOVE와 차이점
  - CascadeType.REMOVE는 부모가 삭제되면 자식도 함께 삭제
  - orphanRemoval은 부모와 관계만 끊기면 자식을 삭제
  - orphanRemoval은 CascadeType.REMOVE를 포함한다
