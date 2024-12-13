---
title: "DDD(Domain Driven Design)"
date: 2024-12-13
tags: ["Spring", "Software-Engineering"]
---

> 도메인 패턴을 중심으로 설계하는 방법론

### IOC
> 객체의 제어권을 개발자가 아닌 프레임워크 또는 외부 컨테이너에게 넘기는 것

#### 목적
- 객체 간 결합도를 감소 -> 유연성, 재사용성 증가

#### 구현하는 기법
- DI(Dependency Injection)
	- Constructor Injection
	- Setter Injection
	- Field Injection
- DL(Dependency Lookup)
	- Service Locator
	- Event-based callback

### DI(Dependency Injection)
> 객체 간의 의존 관계를 객체 자신이 아닌 외부에서 주입하는 것

- 장점
	- 객체 간 결합도 감소
	- 테스트 용이성 증가
	- 객체의 책임이 명확하고 단순함
- 단점
	- 초기 설정, 구현이 복잡함
	- 객체 생성 시점에 의존 객체가 없으면 에러 발생

### DL(Dependency Lookup)
> 객체 간의 의존 관계를 객체 자신이 아닌 외부에서 찾아오는 것

- 장점
	- 객체 간 결합도 감소 (DI보다 덜 감소)
	- 객체 생성 시점에 의존 객체가 없어도 에러 발생하지 않음
	- 구현이 간단함
- 단점
	- 객체의 책임이 불명확해짐
	- 테스트 용이성 감소
	- 객체 간의 의존 관계 파악이 어려움
