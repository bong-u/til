---
title: "Spring - Maven"
date: 2023-07-04
---

### Maven coordinates
- groupId : 회사나 단체명 ex) org.springframework, org.prgms
- artifactId : 프로젝트 명 ex) spring-context, order-api
- version : 프로젝트 버전 ex) 5.2.15-RELEASE, 1.0-SNAPSHOT

### Build lifecycle
- validate, compile, test, package, verify, install, deploy

### Trnsitive Dependencies
```bash
A
├── B
│   └─ C
└── D
```
- C는 A의 transitive 의존성

### Dependency Scope (\<scope>)
- compile(default) : 컴파일, 테스트, 실행에 라이브러리가 필요할때
- provided : JDK 또는 컨테이너가 해당 라이브러리를 제공할때 (JSP, servlet)
- runtime : 실행과 테스트에만 사용될때 (JDBC driver)
- test : 테스트 컴파일 및 실행에만 필요할때 (easymock, junit)
- system: provided와 비슷하지만, 사용자가 jar파일의 위치를 지정

### example
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>org.prgms</groupId>
  <artifactId>academy-maven</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>jar</packaging>

  <name>academy-maven</name>
  <url>http://maven.apache.org</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```