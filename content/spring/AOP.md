---
title: "Spring 개념 - AOP (Aspect Oriented Programming)"
date: 2023-01-09
tags: ["Java", "Spring"]
---

### AOP (Aspect Oriented Programming)

- 여러 객체에 공통으로 적용할 수 있는 기능을 분리해서 재사용성을 높여주는 프로그래밍 기법
- 기본 개념 : 핵심 기능에 공통 기능을 삽입
- 구현하는 3가지 방법
  1. 컴파일 시점에 코드에 공통 기능을 삽입하는 방법
  2. 클래스 로딩 시점에 바이트 코드에 공통 기능을 삽입하는 방법
  3. 런타임에 프록시 객체를 생성해서 공통 기능을 삽입하는 방법

### AOP 주요 용어

#### Target
> 부가 기능을 부여할 대상
#### Advice
> 부가기능을 담고 있는 모듈
#### Join Point
> Advice를 적용 가능한 지점
#### Pointcut
> Joinpoint의 부분 집합으로서 실제 Advice가 적용되는 Joinpoint를 나타낸다
#### Aspect
> Advice + Pointcut  
> 여러 객체에 공통으로 적용되는 기능
#### Weaving
> Join Point에 Advice를 적용하는 과정

### Advice
- Advice의 종류
	- @Before : 조인 포인트 실행 이전에 실행
	- @After : 조인 포인트 실행 이후에 무조건 실행
	- @AfterReturning : 조인 포인트가 정상 실행 후 실행
	- @AfterThrowing : 메서드가 예외를 던지는 경우 실행
	- @Around : 위 4가지 Annotation을 포함, 반환값 조작가능, 예외 조작 가능

- 예시 - @Around 사용
	```java
	@Around("execution(public * org.academy..*Service.*(..))")
	
	public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
		log.info("Before method called. {}", joinPoint.getSignature().toString());
		var result = joinPoint.proceed();
		log.info("After method called with result => {}", result);

		return result;
	}
    ```

### Pointcut
- 앞의 코드에서 @Around 안에 포인트컷을 지정해서 사용하는 것을 확인할 수 있다
- 보통 Pointcut끼리 모아놓고 Around와 분리해서 사용한다고 한다

- 예시 - pointcut
	```java
	// PointCut 정의
	@Pointcut("execution(public * org.academy..*Service.*(..))")
	public void servicePublicMethodPointcut() {...}
	// Advice에 적용
	@Around("org.academy.springorder.aop.CommonPointcut.servicePublicMethodPointcut()")
	public ... {...}
    ```


### 프록시 생성 방식
```java
@EnableAspectJAutoProxy(proxyTargetClass=true)
```

```java
// Before
Calculator cal = ctx.getBean("calculator", Calculator.class);
// After
RecCalculator cal = ctx.getBean("calculator", RecCalculator.class);
```

- proxyTargetClass 속성을 지정하여 인터페이스가 아닌 자바 클래스를 상속받아 프록시를 생성할 수 있다

### Advice 적용 순서
```java
@Aspect
@Order(2)
public class CacheAspect {...}
```

- @Order annotation을 이용하여 적용순서를 지정할 수 있다

### @Around의 Pointcut 설정
```java
@Around("execution(public * chap07 ..*(..))")
public Object execute(...) {...}
```

- @Pointcut publicTarget() 메소드를 사용하지 않을 수 있다

### @Pointcut 재사용
```java
@Around("ExeTimeAspect.publicTarget()")
public Object execute(...) {...}
```
