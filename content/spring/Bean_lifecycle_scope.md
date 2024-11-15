---
title: "Spring 개념 - Bean Lifecycle & Scope"
date: 2023-01-07
tags: ["Java", "Spring"]
---

### Bean 객체의 Lifecycle

- Bean 객체가 생성 또는 소멸될때 특정 코드를 실행하게 할 수 있다.

1. @PostConstruct, @PreDestroy Annotation 사용

   ```java
   // Bean 객체 생성될 때 실행
   @PostConstruct
   public void postConstruct() {...}

   // Bean 객체 소멸될 때 실행
   @PreDestroy
   public void preDestroy() {...}
   ```

2. InitializingBean, DisposableBean 구현

   ```java
   public class Client implements InitializingBean, DisposableBean {
       // Bean 객체 생성될 때 실행
       @Override
       public void afterPropertiesSet() throws Exception {...}

       // Bean 객체 소멸될 때 실행
       @Override
       public void destroy() throws Exception {...}
   }
   ```

3. @Bean Annotation에서 설정

   ```java
   @Bean(initMethod = "init", destroyMethod="close")
   public class Client2{
       // Bean 객체 생성될 때 실행
       public void init() {...}
       // Bean 객체 소멸될 때 실행
       public void close() {...}
   }
   ```

### Bean 객체의 Scope

- 기본적으로 Bean 객체는 Singleton scope를 갖는다
- 하지만 임의로 Prototype scope를 갖게 할 수 있다.
  ```java
  @Configuration
  public class AppCtx {
      @Bean
      @Scope("prototype")
      public Client client() {}
  }
  ```
