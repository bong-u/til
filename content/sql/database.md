---
title: "Database"
date: 2023-07-04
---

## RDBMS


### 대표적인 관계형 데이터 베이스
- Production Database (ex: MySQL, PostgreSQL, Oracle...)
    - OLTP (OnLine Transaction Processing)
    - 빠른 속도에 집중
- Data Warehouse (ex: Redshift, Snowflake, BigQuery, Hive ...)
    - OLAP (OnLine Analytical Processing)
    - 처리 데이터 크기에 집중
    - 보통 Production DB를 복사해서 Data Warehouse에 저장

## SQL

### SQL 종류
- DML (데이터 조작어) : SELECT, INSERT, UPDATE, DELETE
- DDL (데이터 정의어) : CREATE, ALTER, DROP, RENAME, TRUNCATE
- DCL (데이터 제어어) : GRANT, REVOKE
- TCL (트랜잭션 제어어) : COMMIT, ROLLBACK, SAVEPOINT