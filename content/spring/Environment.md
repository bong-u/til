---
title: "Environment"
date: 2023-07-07
---

## application.properties

### 환경변수 설정

1. application.properties 파일을 작성한다
- 파일 위치 : reousrces/application.properties
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

### 환경변수 가져오기

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

## application.yaml

### 장점
- 계층적인 구조이기 때문에 반복되는 부분이 적고, 직관적이다

### 환경변수 설정
1. application.yml 작성
    ```yml
    env:
      version: "v1.0.0"
    ```
### 환경변수 가져오기
- AppConfiguration.java
  ```java
  @Component
  @ConfigurationProperties(prefix="env")
  public class AppConfiguration {
      private String version;

      public String getVersion() {
          return version;
      }

      public void setVersion(String version) {
          this.version = version;
      }
  }
  ```
- main
  ```java
  var appConfiguration = applicationContext.getBean(AppConfiguration.class);
  System.out.println(appConfiguration.getVersion());
  ```