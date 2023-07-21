---
title: "Spring 개념 - Servlet (서블릿)"
date: 2023-07-21
---

### Servlet 개념 
> 클라이언트의 요청을 처리하고, 그 결과를 반환하는 자바 웹 프로그래밍 기술
- 웹페이지를 동적으로 생성하는 역할을 수행한다

### Servlet Conainer의 역할
- Servlet의 생명주기를 관리한다
- 웹서버와의 통신지원
- 멀티쓰레드 지원, 관리
- 선언적인 보안 관리

### 예제 - Servlet 구현
```java
public class TestServlet extends HttpServlet {
    private static final Logger logger = LoggerFactory.getLogger(TestServlet.class);

    @Override
    public void init() throws ServletException {}
}
```
- doGet, doPost 등의 메소드를 구현해서 http 요청을 처리할 수 있다

### Servlet Context 등록
#### web.xml 작성
- web.xml
    > web application의 설정을 위한 deployment descriptor (배포 지정자)
- 가장 기본적인 방법이다
- src/webapp/WEB-INF/web.xml에 위치한다
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
            http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">
    <servlet>
        <servlet-name>myServlet</servlet-name>
        <servlet-class>org.academy.abc.servlet.MyServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>myServlet</servlet-name>
        <url-pattern>/*</url-pattern>
    </servlet-mapping>
</web-app>
```

#### @WebServet 사용
- Servlet을 선언하면서 사용한다
```java
@WebServlet(value="/*", loadOnStartup = 1)
public class TestServlet extends HttpServlet {...}
```

### WebApplicationInitializer 구현
```java
public class OrderWebApplicationInitializer implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        var servletRegistration = servletContext.addServlet("test", new TestServlet());
        servletRegistration.addMapping("/*");
        servletRegistration.setLoadOnStartup(1);
    }
}
```