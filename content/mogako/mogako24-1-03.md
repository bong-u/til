---
title: "[모각코24동계] 03 : 결과"
date: 2024-01-17
tags: ["SQL"]
---

### Sub Query

#### 단일 행 서브 쿼리

- 서브쿼리 결과 : 단일 행
- 결과 : 단일 행

```sql
SELECT USER_ID, USER_NAME, USER_AGE
FROM USERS
WHERE TEAM_ID = (
	SELECT TEAM_ID
	FROM USERS
	WHERE USER_NAME='BONG'
);
```

#### 다중 행 서브 쿼리

- 서브쿼리 결과 : 다중 행
- 결과 : 단일행
- 다중 행 비교 연산자와 함께 사용 (IN, ALL, ANY, SOME)

```sql
SELECT TEAM_ID, TEAM_NAME, TEAM_LOGO_URL
FROM TEAM
WHERE TEAM_ID IN (
	SELECT TEAM_ID
	FROM USERS
	WHERE USER_NAME='BONG'
)
```

#### 다중 컬럼 서브 쿼리

- 서브쿼리의 결과: 다중 행
- 결과 : 다중 행

```sql
SELECT TEAM_ID, USER_NAME
FROM USERS
WHERE (TEAM_ID, HEIGHT)
IN (
	SELECT TEAM_ID, MIN(HEIGHT)
	FROM USERS
	GROUP BY TEAM_ID
)
ORDER BY TEAM_ID, USER_NAME
```

#### 연관 서브 쿼리

```sql
SELECT B.TEAM_NAME, A.USER_NAME, A.HEIGHT
FROM USERS A, TEAM B
WHERE A.HEIGHT < (
	SELECT AVG(X.HEIGHT)
	FROM USERS
	WHERE X.TEAM_ID = A.TEAM_ID
	GROUP BY X.TEAM_ID
)
ORDER BY USER_NAME
```

#### 다른 위치에서 사용하는 서브 쿼리

```sql
SELECT A.USER_NAME AS 유저이름, A.HEIGHT AS 키
ROUND ((
	SELECT AVG (X.HEIGHT)
	FROM USERS X WHERE X.TEAM_ID = A.TEAM_ID), 3)
	AS 팀평균키 FROM USERS A)
```
