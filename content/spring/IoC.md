---
title: "Spring 개념 - IoC (Inversion of Control)"
date: 2023-07-06
tags: ["Java", "Spring"]
---

### IoC (Inversion of Control)

- 제어의 역전
- 메소드나 객체의 호출 작업이, 개발자가 아니라, 외부에서 결정되는 것
- 객체 간 결합도를 줄이고 유연한 코드를 작성하게 한다

### IoC Container

- IoC가 일어나는 곳, IoC를 수행하는 대상

### IoC 클래스 예제

```java
    public class OrderContext {
        public OrderRepository orderRepository() {
            return new OrderRepository();
        }

        public OrderService orderService() {
            return new OrderService(voucherService(), orderRepository());
        }
    }
```

- 위 예제에서 OrderContext 클래스가 IoC 컨테이너 역할을 하고 있다

### BeanFactory

- Spring container의 최상위 interface
- Bean을 생성하고 의존관계를 설정하는 기능을 담당하는 가장 기본적인 IoC 컨테이너
- Lazy-loading 방식 사용 : Bean을 사용할때 loading -> 경량 컨테이너

### ApplicationContext

- BeanFactroy의 구현체
- Eager-loading 방식 : Runtime에 Bean을 loading <-> Lazy-loading

### AnnotationConfigApplicationContext

- ApplicationContext의 구현체
- Annotation 기반으로 설정하는 방식 <-> XML방식
