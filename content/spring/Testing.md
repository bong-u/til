---
title: "Spring 개념 - Testing"
date: 2023-01-07
---

## Unit Test (단위 테스트)
> 가장 작은 단위 (클래스 또는 메소드)를 고립시켜서 테스트하는 방식

### 관련 용어
#### SUT (Sytem Under Test)
> 테스트하고자하는 주요 대상이 되는 Unit

#### DOC (Depended On Component)
> SUT가 의존하는 객체

#### Test double 
> DOC를 대신해 줄 수 있는 객체
- Test double의 종류 : Mock, Stub

#### Mock
- 행위 검증 (객체가 특정 동작을 수행하는지 검증) 사용
- test framework : Mockito, JMock, EasyMock

#### Stub
- 상태 검증 (객체의 상태를 확인하여 검정) 사용

## Integration Test (통합 테스트)
> 여러 개의 Unit을 통합해서 테스트하는 방식

## JUnit
- 매 단위 테스트마다 테스트 클래스가 생성 -> 독립적인 테스트 가능
- Annotation 제공 -> 테스트 life cycle 관리
- assert 메소드 제공 -> 테스트 결과 판별

### JUnit5
> = JUnit Platform + JUnit Jupiter + JUnit Vintage
- JUnit Platform : JVM 기반 테스팅 프레임워크를 실행시키기 위한 기반 모듈
- JUnit Jupiter : JUnit5를 위한 Test Engine API 제공
- JUnit Vintage : JUnit3, JUnit4를 위한 Test Engine API 제공

### org.junit.jupiter.api.Assertions.*
- assertEquals
    ```java
    assertEquals(0, 1+1);
    ```
- assertThrows, assertAll

### org.hamcrest.MatcherAssert.*
- assertThat
    ```java
    // assertEquals 보다 가독성이 좋다
    assertThat(1+1, equalTo(2));
    ```

### org.hamcrest.Matchers.*
- equalTo, is, not
- anyOf, everyItem
- hasSize, containsInAnyOrder, hasItem (collection에 대해 강력하게 지원한다)


