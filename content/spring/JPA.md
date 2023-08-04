---
title: "Spring 개념 - JPA (Java Persistence API)"
date: 2023-08-04
---

### EntityManager
- Entity : RDB의 Table과 매핑되는 객체
- EntityManagerFactory
	- Entity를 관리하는 EntityManager를 생산하는 공장
	- Thread safe: O
- EntityManager
	- Entity의 CRUD등 모든 일을 처리
	- Thread safe: X

## 영속성 컨텍스트
- Entity를 영구 저장하는 환경
- EntityManager는 Entity를 영속성 컨텍스트에 보관하고 관리한다
- 영속성 컨텍스트에서 관리되는 Entity는 식별자값을 가져야 한다 (ID)
	- -> key-value로 Entity를 관리하기 때문
- flush: 영속성 컨텍스트에 변경 내용들을 DB에 동기화하는 작업
- 영속성 컨텍스트의 이점
	- 1차 캐시
	- 동일성 보장
	- 트랜잭션을 지원하는 쓰기 지연
	- 변경 감지
	- 지연 로딩

### Entity의 Life cycle
![image](/static/image/entity_life_cycle.png)
- 비영속 (New / Transient): 영속성 컨텍스트와 전혀 관계가 없는 상태
- 영속 (Managed): 영속성 컨텍스트에 저장된 상태
- 준영속 (Detached): 영속성 컨텍스트에 저장되었다가 분리된 상태
- 삭제 (Removed): 삭제된 상태

### 저장
```java
EntityManager em = emf.createEntityManager(); // Entity manger 생성
EntityTransaction transaction = em.getTransaction(); // Transaction 획득
transaction.begin();

Customer customer = new Customer(); // 비영속 상태
customer.setId(1L);
customer.setFirstName("John");
customer.setLastName("Doe");

em.persist(customer); // 영속화

transaction.commit(); // Transaction commit
```

### 조회
```java
// Customer(1L) 만들어서 commit
...
Customer entity = em.find(Customer.class, 1L); // 1차 캐시에서 조회, query 실행 X
em.clear(); // 영속성 컨텍스트를 초기화
Customer entity = em.find(Customer.class, 1L); // DB에서 조회, query 실행 O
```

### 수정
```java
// Customer(1L) 만들어서 commit
...
Customer entity = em.find(Customer.class, 1L);
entity.setFirstName("guppy");
entity.setLastName("hong");

transaction.commit(); // update!
```
#### 변경감지 (dirty checking)
- JPA는 Entity를 영속화할 때의 최초 상태를 스냅샷으로 저장해둔다
- flush 시점에 스냅샷과 비교해서 변경된 Entity에 대해 update query를 수행한다

### 삭제
```java
// Customer(1L) 만들어서 commit
...
Customer entity = em.find(Customer.class, 1L);
em.remove(entity);

transaction.commit(); // delete!
```

## Entity Mapping

### 단일 엔티티매핑

- @Entity : 기본 생성자 필수
- @Table : name으로 매핑할 테이블 이름 지정
- @Id
	- GenerationType - AUTO, IDENTITY, SEQUENCE, TABLE
- @Column
	- name, length, unique, columnDefinition...
	- insertable=updatable, nullable
- @Enumerated
	- EnumType - ORDINAL, STRING
