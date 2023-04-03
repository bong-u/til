---
title: "KAKAO 김가연 선배님 - Spring Boot Framework"
date: 2023-04-03
---

### REST API

- **RE**prensentational **S**tate **T**ransfer
- 웹의 장점을 최대한 활용할 수 있는 아키텍처

### Layered Architecture

- Presentation Layer
  - 비즈니스 로직과 UI를 분리
  - @Controller가 붙은 클래스가 이에 해당
- Service Layer
  - 비즈니스 로직 구현
  - @Service가 붙은 클래스가 이에 해당
- Data Access Layer
  - 데이터를 조회, 등록, 수정, 삭제
  - @Repository가 붙은 클래스가 이에 해당

### IoC

- Inversion of Control : 제어의 역전
- 모든 객체에 대한 제어권이 바뀌었음을 의미
- 객체의 주인이 개발자가 아닌 Spring application

### DI

- Constructor Injection

  - @RequiredArgsConstructor : 생성자 자동 생성

- Method Injection

  - @Autowired : 지양할 것

- Setter Injection
  - @Setter

### Was

- Web Application Server
- 웹 컨테이너 혹은 서블릿 컨테이너라고도 불림
- 하나의 프로세스 속 요청 별로 thread를 생성하여 요청을 처리
- Tomcat, JBoss 등

### Dispatcher Servlet

- Servlet Container에서 HTTP 프로토콜을 통해 들어오는 요청을 프레젠테이션 계층의 제일 앞에 둬서 중앙집중식으로 처리해주는 프론트 컨트롤러
