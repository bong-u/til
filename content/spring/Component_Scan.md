---
title: "Component Scan"
date: 2023-01-07
---

### 개념

- Component Scan은 스프링이 직접 클래스를 검색해서 빈으로 등록해주는 기능이다
- xml 또는 annotation을 통해 사용 가능하다

### @ComponentScan

1. basePacakges : 패키지 이름을 통해 스캔할 범위를 지정한다
    ```java
    @ComponentScan(basePackages="org.academy.order")
    @ComponentScan(basePackages={"org.academy.order", "org.academy.voucher"})
    ```

2. basePackageClasses : 해당 클래스가 들어있는 패키지를 범위로 지정한다
    ```java
    @ComponentScan(basePackageClasses="Order.class")
    @ComponentScan(basePackages={"Order.class", "Voucher.class"})
    ```

### 예제
- AppCtx.java
    ```java
    @Configuration
    @ComponentScan(basePackages = {"spring"})
    public class AppCtx {...}
    ```

- MemberInfoPrinter.java
    ```java
    @Component("infoPrinter")
    public class MemberInfoPrinter {...}
    ```

- 효과
    ```java
    // before
    MemberInfoPrinter infoPrinter = ctx.getBean("infoPrinter", MemberInfoPrinter.class);
    // after
    MemberInfoPrinter infoPrinter = ctx.getBean(MemberInfoPrinter.class);
    ```
