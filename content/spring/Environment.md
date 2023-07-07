---
title: "Environment"
date: 2023-07-07
---

### 환경변수를 설정 방법

1. XXX.properties 파일을 작성한다
- 파일 위치 : reousrces/XXX.properties
- 파일 내용 예시 : key = value 형태
  ```
  app.name = spring
  ```

2. Configuration에 설정한다
  ```java
  @Configuration
  @PropertySource("application.properties")
  public class AppConfiguration {...}
  ```

### 환경변수를 가져오는 방법

#### ApplicationContext 활용하는 방법
```java
var environment = applicationContext.getEnvironment();
var property = environment.getProperty("app.name")
```

#### @Value Annotation 활용
```java
@Value("${app.name}")
private String name;
```

#### 별도의 클래스 정의
- 클래스 정의
  ```java
  @Component
  @PropertySource("version.properties")
  public class VersionProvider {
    private final String version;

    public VersionProvider(@Value("${version:v0.0.0}") String version) {
      this.version = version;
    }

    public  String getVersion() {
      return version;
    }
  }
  ```
- 사용
  ```java
  private final VersionProvider versionProvider;
  versionProvider.getVersion();
  ```

