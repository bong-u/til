---
title: "Spring - JPA : 개념, 영속성 컨텍스트, 연관 관계 매핑"
date: 2023-08-04
tags: ["Java", "Spring"]
---

## JPA (Java Persistence API)

- JAVA진영의 ORM 기술 표준, interface 모음
- Hibernate, EclipseLink, DataNucleus 등의 구현체가 존재

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

## 연관관계 매핑

- 테이블은 외래키로 연관 관계를 맺는다
- 객체는 **참조**를 통해 연관 관계를 맺는다

### 1. 참조의 방향

> 단방향, 양방향

- 테이블은 항상 양방향이다

### 2. 연관 관계 주인

- 객체가 양방향 연관 관계를 맺을 때, 연관 관계의 주인을 정해야 한다
- 주인만 외래 키를 관리(등록, 수정) 할 수 있다, 주인이 아닌 쪽은 읽기만 가능
- mappedBy를 통해 주인이 아닌 엔티티에서 주인을 지정한다

### 3. 다중성

> ManyToOne, OneToMany, OneToOne, ManyToMany

- JoinColumn(name="", referencedColumnName="")
  - 외래 키를 매핑할 때 사용
  - name: 매핑할 외래 키 이름
  - referencedColumnName: 외래 키가 참조하는 대상 테이블의 컬럼명

#### 예제 - 연관관계 편의 메소드

- 양방향 연관관계에서 한쪽에만 설정하면 양쪽 다 설정해주는 메소드를 만들 수 있다
- 양방향 연관관계와 그 편의메소드를 정의한 코드이다
- Member.java

  ```java
  @OneToMany(mappedBy = "member")
  private List<Order> orders = new ArrayList<>();

  public void addOrder(Order order) {
  	this.orders.add(order);
  	order.setMember(this);
  }
  ```

- Order.java

  ```java
  @ManyToOne
  @JoinColumn(name="member_id", referencedColumnName = "id")
  private Member member;

  public void setMember(Member member) {
  	if (this.member != null) {
  		this.member.getOrders().remove(this);
  	}
  	this.member = member;
  	member.getOrders().add(this);
  }
  ```
