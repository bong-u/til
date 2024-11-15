---
title: "[모각코24동계] 05 : 결과"
date: 2024-01-30
tags: ["SQL"]
---

### 임시 테이블

#### 지역 임시 테이블 (Local Temporary Table)

- 현재 connection에서만 사용 가능하다
- 해당 connection이 종료되면 테이블이 자동으로 삭제된다
- 테이블 이름 앞에 `#`를 붙여 사용한다

#### 전역 임시 테이블 (Global Temporary Table)

- 다른 connection에서도 사용 가능하다
- 마지막 connection이 종료되면 테이블이 사라진다
- 테이블 이름 앞에 `##`를 붙여 사용한다

#### 생성하는 방법 1 - CREATE 사용

```sql
CREATE TABLE #temp (
  id INT,
  name VARCHAR(20)
)
```

#### 생성하는 방법 2 - SELECT INTO 사용

```sql
SELECT *
INTO #temp
FROM table
```

- 특징
  - 인덱스, 제약 조건 등은 복사되지 않는다
  - SELECT할때 `ORDER BY`를 사용해도 정렬된 순서대로 저장되지 않는다

### LOCK

#### 배타적 잠금 (Exclusive Lock, X)

> 하나의 특정 트랜잭션만 해당 리소스에 접근할 수 있다

- 데이터 변경(`INSERT`, `UPDATE`, `DELETE`)을 시도할때 자동으로 배타적 잠금이 걸린다

#### 공유 잠금 (Shared Lock, S)

> 여러 개의 S Lock에 대해서는 읽기를 허용하나, X Lock에 대해서 배타적이다

- 데이터 조회(`SELECT`)를 시도할때 자동으로 공유 잠금이 걸린다
- SELECT를 시도할 때 공유잠금(S)이 걸린다
- `WITH (NOLOCK)`을 사용하면 공유 잠금을 걸지 않는다

#### 업데이트 잠금 (Update Lock, U)

> Deadlock을 방지하기 위해 X Lock을 걸기 전 사용한다

- `WITH (UPDLOCK)`을 사용하면 업데이트 잠금을 걸 수 있다

#### INTENT 잠금 (Intent Lock, I)

#### Schema 잠금 (Schema Lock, Sch)
