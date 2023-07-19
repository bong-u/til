---
title: "Spring 개념 - JDBC, DBCP, JdbcTemplate"
date: 2023-07-19
---

### JDBC
> 자바 프로그램을 DB와 연결해주는 API

### JDBC 드라이버
> DBMS와 통신을 담당하는 자바 클래스
- JDBC 드라이버는 4가지 종류가 있다 (Type 1~4)
- Mysql은 Type 4를 지원한다
- 예제 - Connection을 직접 연결
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

### DBCP (DataBase Connection Pool)
  ![DBCP](/static/image/spring_dbcp.png)
- 서버가 물리적으로 데이터베이스 서버에 Connection을 맺는 것은 자원을 너무 많이 사용한다
- 따라서, DBCP를 이용해서 미리 Connection을 Pool에 담아두고, 요청이 올때마다 Connection을 제공한다
  
### DataSource
- DataSource는 Spring에서 DBCP 역할을 하는 인터페이스이다
- 예제 - DataSource 사용
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

### HikariCP
- DBCP의 일종, JDBC DataSource의 구현체
- spring-boot-starter-jdbc에 포함되어있다
- Spring Boot 2.0부터 Tomcat JDBC 대신에 Hikari를 사용한다
- 타 CP라이브러리보다 빠르다
- Hikari 설정
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

### JdbcTemplate
- 위 예제와 같은 방법으로 개발을 하다보면 중복되는 코드가 엄청 많아진다
- 반복되는 코드를 줄이기 위해 JdbcTemplate를 사용할 수 있다
- 사용법
    - queryForObject : 단일 결과 행을 처리하기 위해 사용
    - query : 다수 결과 행을 처리하기 위해 사용
    - update : 추가, 수정, 삭제를 위해 사용
- 사용하기 위해서는 DataSource를 주입받아야 한다
    ```java
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
    ```


### RowMapper
- 기존에 사용하던 ResultSet은 resultSet.next()로 순회하면서 객체의 setter를 호출하였다
- JdbcTemplate을 사용하기 위해서는 RowMapper<T>를 사용하여야 한다
    ```java
    RowMapper<Customer> customerRowMapper = (resultSet, i) -> {
        var customerName = resultSet.getString("name");
        var email = resultSet.getString("email");
        return new Customer(customerName, email)
    }
    ```
- 예제 - JdbcTemplate, queryForObject, RowMapper 사용
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

### NamedParameterJdbcTemplate
- 기존의 jdbcTemplate에서는 query에 ?를 사용하여 인자를 치환하였다
- 가독성을 위해서, 순서를 헷갈리지 않기 위해서 NamedParameterJdbcTemplate을 사용한다
- NamedParameterJdbcTemplate에서는 ":변수명"을 이용하여 처리한다
- 예제 - NamedParameterJdbcTemplate 사용
    ```java
    var update = jdbcTemplate.update("UPDATE customers SET name=:name, email=:email, last_login_at=:lastLoginAt WHERE customer_id = UUID_TO_BIN(:customerId)",
        new HashMap<>() {{
            put("customerId", customer.getCustomerId().toString().getBytes());
            put("name", customer.getName());
            put("email", customer.getEmail());
            put("lastLoginAt", customer.getLastLoginAt() != null ? Timestamp.valueOf(customer.getLastLoginAt()) : null);
            put("createdAt", Timestamp.valueOf(customer.getCreatedAt()));
        }});
    ```
