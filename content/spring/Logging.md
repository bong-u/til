---
title: "Logging"
date: 2023-07-06
---

### Java Logging Framework
* java.util.logging
* Apache Commons logging
* Log4J
* **Logback**
* **SLF4J**

### SLF4J (Simple Loggin Facade for Java)
- Loggin Framework들을 추상화시켜 놓은 것
- Facade Pattern을 이용한 Logging framework

### Log Level
> trace - debug - info - warn - error

### Logger

#### Logger 만들기
```java
private static final Logger logger = LoggerFactory.getLogger(OrderTester.class);
```
- Logger 이름은 보통 FQCN (상위 패키지 + 클래스)으로 사용한다

#### Logger 사용
```java
logger.info("version -> {}", logger.getName());
```

### logback

#### logback 설정파일 우선순위
> logback-test.yml -> logback.groovy -> logback.xml -> 기본 설정

#### logback.xml - 기본 설정
```xml
<configuration>
<property name="LOG_PATTERN" value="%d{HH:mm:ss.SSS} [%thread] %-5level %logger{10} - %msg%n" />

<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
        <pattern>${LOG_PATTERN}</pattern>
    </encoder>
</appender>
    <root level="debug">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```
- FileAppender를 사용하여 파일에 저장 가능
- RollingFileappender를 사용하여 일자별로 파일에 저장 가능
- 이외에도 다양한 설정 가능

#### Conversion
- 로깅 포맷을 바꾸는 방법이다
- json으로 형식을 바꾼다던가, 콘솔에서 로그에 색을 입힐수 있다.

- Color Converter 사용 예제
    1. logback.xml 설정
        ```xml
        <!-- logback.xml -->
            <conversionRule
                    conversionWord="clr"
                    converterClass="org.springframework.boot.logging.logback.ColorConverter" />
            {...}
            <pattern>%clr(%d{HH:mm:ss.SSS}){cyan} [%thread] %clr(%-5level)</pattern>
        ```
    2. Ansi문자 출력 설정
        ```java
        // MainClass.java
        AnsiOutput.setEnabled(AnsiOutput.Enabled.ALWAYS);
        ```