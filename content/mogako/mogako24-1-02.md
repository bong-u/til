---
title: "[모각코24동계] 02 : 결과"
date: 2024-01-09
tags: ["SQL"]
---

## SQL 기초 공부

### DDL (Data Definition Language)

- CREATE
- ALTER
- DROP
- RENAME
- TRUNCATE

### DML (Data Manipulation Language)

- SELECT
- INSERT
- UPDATE
- DELETE

### DCL (Data Control Language)

- GRANT
- REVOKE

### TCL (Transaction Control Language)

- COMMIT
- ROLLBACK
- SAVEPOINT

### SELECT

#### GROUP BY

> 특정 Column기준으로 그룹화

그룹화 하지 않은 Column은 집계함수(SUM, COUNT)를 통해서만 조회해야한다

```sql
SELECT name, COUNT(name), SUM(quantity) FROM 테이블 GROUP BY name;
```

#### HAVING

> GROUP BY 절에서 조건을 주기 위해 사용

```sql
SELECT name, COUNT(name) FROM 테이블 GROUP BY name HAVING COUNT(name) = 1;
```

#### LIKE

> 문자열의 패턴을 검색하는데 사용

```sql
SELECT * FROM 테이블 WHERE 칼럼 LIKE 'PATTERN';
```

- 패턴 : %(모든 문자), \_(한 글자)

#### LIKE + CONCAT

> 검색 용도로 많이 사용

```sql
# 키워드가 포함된 문자열 검색
SELECT * FROM 테이블 WHERE 칼럼 LIKE CONCAT('%', 키워드, '%');
```

### JOIN

- INNER JOIN : 두 테이블에서 공통된 부분만 join
- OUTER JOIN
  - LEFT JOIN : 왼쪽 테이블을 기준으로 오른쪽 테이블을 배치
  - RIGHT JOIN : 오른쪽 테이블을 기준으로 왼쪽 테이블을 배치
- CROSS JOIN

#### ON

> JOIN을 하기 전 필터링을 한다

#### WHERE

> JOIN을 한 후 필터링을 한다
