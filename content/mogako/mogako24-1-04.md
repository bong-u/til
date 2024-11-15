---
title: "[모각코24동계] 04 : 결과"
date: 2024-01-23
tags: ["SQL"]
---

### Recursive Query

```sql
WITH RECURSIVE CTE AS (
    SELECT 0 AS A
    UNION ALL
    SELECT A+1 AS NUM
    FROM CTE
    WHERE A < 10 # 0 부터 10까지 포함
)
```

- 결과 (CTE테이블)
  | A | NUM |
  | --- | ---- |
  | 0 | NULL |
  | … | … |
  | 10 | NULL |

### 성능 비교

- LIMIT 1 VS 서브쿼리
  ```sql
  SELECT PRODUCT_ID, PRODUCT_NAME, PRODUCT_CD, CATEGORY, PRICE
  FROM FOOD_PRODUCT
  ORDER BY PRICE DESC
  LIMIT 1;
  ```
  ```sql
  SELECT *
  FROM FOOD_PRODUCT
  WHERE PRICE IN (
      SELECT MAX(PRICE) FROM FOOD_PRODUCT
  );
  ```
  - LIMIT 1을 사용하는 쿼리는 모든 COLUMN의 데이터를 가져오고,
  - 서브쿼리는 PRICE의 최대값만 가져와서 구하기 때문에, 테이블이 클수록 서브쿼리가 더 빠르다.

### 배운 것

#### GROUP BY 기준이 2개 이상인 경우

- 예를 들어 GROUP BY 학년, 학기 인 경우
- 2가지 조건 모두 적용하여 2023-1학기, 2023-2학기, 2024-1학기와 같이 묶인다
- COLUMN의 순서를 이용하는 방법

```sql
ORDER BY 1, 2, 3
GROUP BY 1, 2, 3
```

- 위 명령어에서 사용된 숫자는 SELECT 명령어에서 각각 1번째, 2번째, 3번째 컬럼을 의미한다.

- 이렇게도 사용할 수 있으나, 가독성이 좋지 않으므로, 지양하자.

#### A BETWEEN B AND C의 의미

> A ≤ B ≤ C이하라는 의미를 가진다

#### CASE와 MAX

```sql
MAX (CASE
        WHEN '2022-10-16' BETWEEN START_DATE AND END_DATE THEN '대여중'
        ELSE '대여 가능'
      END) AVAILABILITY
```

- 위 쿼리가 GROUP BY랑 같이 사용되는 경우
- 해당 GROUP 내 ‘대여중’과 ‘대여 가능’이 같이 있을 때,
- 가나다 순으로 우선한 ‘대여중’이 우선으로 표기된다
