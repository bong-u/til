---
title: "Spring 개념 - JDBC, DBCP, JdbcTemplate"
date: 2023-07-10
---

### JDBC
> 자바 프로그램을 DB와 연결해주는 API

### JDBC 드라이버
> DBMS와 통신을 담당하는 자바 클래스
- JDBC 드라이버는 4가지 종류가 있다 (Type 1~4)
- Mysql은 Type 4를 지원한다

### 예제 - Connection을 직접 연결
```java
public List<UUID> findAllIds() {
    List<UUID> uuids = new ArrayList<>();
    try (
            var connection = DriverManager.getConnection(url, username, password);
            var statement = connection.createStatement();
            var resultSet = statement.executeQuery(SELECT_ALL_SQL);
    ) {
        while (resultSet.next()) {
            var customerName = resultSet.getString("name");
            var customerId = toUUID(resultSet.getBytes("customer_id"));
            var createdAt = resultSet.getTimestamp("created_at").toLocalDateTime();
            uuids.add(customerId);
        }
    } catch (SQLException e) {
        logger.error("Error while connecting to DB", e);
    }
    return uuids;
}
```

### DataSource
- 이후에 기술


### DBCP (DataBase Connection Pool)
  ![DBCP](/static/image/spring_dbcp.png)
- 서버가 물리적으로 데이터베이스 서버에 Connection을 맺는 것은 자원을 너무 많이 사용한다
- 따라서, DBCP를 이용해서 미리 Connection을 Pool에 담아두고, 요청이 올때마다 Connection을 제공한다

### HikariCP
- DBCP의 일종, JDBC DataSource의 구현체
- spring-boot-starter-jdbc에 포함되어있다
- Spring Boot 2.0부터 Tomcat JDBC 대신에 Hikari를 사용한다
- 타 CP라이브러리보다 빠르다


### Hikari 설정
```java
@Bean
public DataSource dataSource() {
    return DataSourceBuilder.create()
    .url(url)
    .username(username)
    .password(password)
    .type(HikariDataSource.class)
    .build();
}
```

### 예제 - Hikari 사용
```java
@Override
public Optional<Customer> findById(UUID customerId) {
    List<Customer> allCustomers = new ArrayList<>();
    try (
        var connection = dataSource.getConnection();
        var statement = connection.prepareStatement("select * from customers where customer_id = UUID_TO_BIN(?)")
    ) {
        statement.setBytes(1, customerId.toString().getBytes());
        try (var resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                mapToCustomer(allCustomers, resultSet);
            }
        }
    } catch (SQLException e) {
        logger.error("Got eror while closing connection", e);
        throw new RuntimeException(e);
    }
    return allCustomers.stream().findFirst();
}
```

### JdbcTemplate
- 위 예제와 같은 방법으로 개발을 하다보면 중복되는 코드가 엄청 많아진다
- 반복되는 코드를 줄이기 위해 JdbcTemplate를 사용할 수 있다.

- DataSource 주입
    ```java
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
    ```

- 예제 - JdbcTemplate 사용
    ```java
    @Override
    public Optional<Customer> findById(UUID customerId) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject("select * from customers where customer_id = UUID_TO_BIN(?)", customerRowMapper, customerId.toString()));
        } catch (EmptyResultDataAccessException e) {
            logger.error("Got empty result", e);
            return Optional.empty();
        }
    }
    ```