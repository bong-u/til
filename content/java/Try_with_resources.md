---
title: "Try with resources로 간결하게 반납하기"
date: 2023-07-13
tags: ["Java"]
---


### 기존 코드 - try-catch-finally 사용
```java
Connection connection = null;
Statement statement = null;
ResultSet resultSet = null;

try {
    connection = DriverManager.getConnection(/* SECRET */);
    statement = connection.createStatement();

    resultSet = statement.executeQuery("select * from customers");

    while (resultSet.next()) {
        var name = resultSet.getString("name");
        var customerId = UUID.nameUUIDFromBytes(resultSet.getBytes("customer_id"));
        logger.info("Customer id:{}, name: {}", customerId, name);
    }
} catch (SQLException e) {
    logger.error("Error while connecting to DB", e);
    throw e;
}
finally {
    try {
        if (connection != null) connection.close();
        if (statement != null) statement.close();
        if (resultSet != null) resultSet.close();
    } catch (SQLException e) {
        logger.error("Error while closing connection", e);
    }
}
```


### 개선 코드 - try with resource 사용
```java
try (
    var connection = DriverManager.getConnection(/* SECRET */);
    var statement = connection.createStatement();
    var resultSet = statement.executeQuery("select * from customers");
) {
    while (resultSet.next()) {
        var name = resultSet.getString("name");
        var customerId = UUID.nameUUIDFromBytes(resultSet.getBytes("customer_id"));
        logger.info("Customer id:{}, name: {}", customerId, name);
    }
} catch  (SQLException e) {
    logger.error("Error while connecting to DB", e);
    throw e;
}
```
- 위 코드는 JDBC를 이용해 DB와 연결해서 데이터를 가져오는 코드이다.
- 기존 코드보다 훨씬 간결해진 것을 확인할 수 있다.

### Try with resources
- 사용법
    ```java
    try (/* 자원 생성 */) {
        /* 자원 사용 */
    } catch (...) {
        ...
    }
    /* 자원 자동 반납 */
    ```
- 조건
    > try with resources문에서 사용되는 자원은 반드시 **AutoCloseble interface**를 구현해야한다.
