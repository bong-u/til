---
title: "Profile"
date: 2023-07-10
---

### Profile
- 프로그램을 개발, 테스트, 배포 환경으로 나눠서 실행해야할때가 있다
- 환경 설정을 위해 spring boot에서는 profile을 사용할 수 있다.

### 환경 변수
#### application.yml
```yml
spring.config.activate.on-profile: dev
env:
    version: "v1.0.0 dev"
---
spring.config.activate.on-profile: local
env:
    version: "v1.0.0 local"
---
```
- yml 파일에서는 ---를 이용해 파일 분할이 가능하다
- spring.config.active.on-profile을 설정해서 특정 프로필에 적용하고 싶은 환경변수를 설정 할 수 있다.

#### application-\<profile>.properties
- .properties파일에서는 여러 파일로 분할하여 설정한다
- 예를 들어 "dev"프로파일에서 적용될 파일은 "application-dev.properties"이다.

### @Profile
- 프로파일마다 Bean객체를 다르게 등록할 수 있다.
- 아래의 코드에서는 test 환경에서만 TestBean을 등록한다
```java
@Component
@Profile("test")
public class TestBean { ... }
```