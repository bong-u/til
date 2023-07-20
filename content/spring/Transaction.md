---
title: "Spring 개념 - Transaction (트랜잭션)"
date: 2023-07-20
---

### 상황
- 소비자가 판매자의 물건을 구매하는 함수를 구현 중이라고 하자
- 물건을 샀을때, 물건의 가격만큼 판매자의 돈은 증가시키고, 소비자의 돈은 감소시켜야한다
- 판매자의 돈은 증가시켰는데, 소비자의 돈을 감소시키는 중 오류가 났다
- 오류가 난 경우, 판매자의 돈을 증가시키기 이전으로 **Rollback** 해야 한다
- 위의 두가지 연산은 하나의 **Transaction**으로 묶여서 한번에 처리되어야 한다

### Transaction 관리의 종류
1. Programmatic transaction management (프로그래밍적 트랜잭션 관리)
    - Transaction 관련 코드를 직접 작성
    - 예제 - TransactionManager 사용
        ```java
        // Bean 등록
        @Bean
        public PlatformTransactionManager platformTransactionManager(DataSource dataSource) {
            return new DataSourceTransactionManager(dataSource);
        }
        // 사용할 때
        // 새로운 트랜잭션을 시작한다
        var transaction = transactionManager.getTransaction(new DefaultTransactionDefinition());
        try {
            /* Business Logic */
            
            // Commit하여 db에 반영한다
            transactionManager.commit(transaction);
        } catch (DataAccessException e) {
            logger.error("Got error", e);
            // 예외 발생시 이전 상태로 Rollback 한다
            transactionManager.rollback(transaction);
        }
        ```

2. Declarative transaction management (선언적 트랜잭션 관리)
    - Transactino 관련 로직을 Business logic과 완전히 분리
    - 예제 - @Transactional 사용
    ```java
    // configuration 클래스에 붙여준다
    @EnableTransactionManagement

    // 트랜잭션을 적용하고 싶은 메소드에 붙여준다
    @Transactional
    public void createCustomers(List<Customer> customers) {
        customers.forEach(customerRepository::insert);
    }
    ```
### Transaction Propagation (트랜잭션 전파)
- 추후 기술


### Transaction Isolation Level (트랜잭션 격리 수준)
- 추후 기술
