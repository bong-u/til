---
title: "Spring - ResponseEntity 정리"
date: 2023-07-27
---

### ResponseEntity
- Spring에서 HttpEntity라는 클래스를 지원한다
- HttpEntity를 상속받는 두 클래스가 RequestEntity와 ResponseEntity이다
- RequestEntity는 http요청을 보낼때 사용하고
- ResponseEntity는 http응답을 할때 사용한다

### 정의
- body, header, status를 인자로 넘길 수 있다
```java
public class ResponseEntity<T> extends HttpEntity<T> {
    public ResponseEntity(HttpStatusCode status) {...}

    public ResponseEntity(@Nullable T body, HttpStatusCode status) {...}

    public ResponseEntity(MultiValueMap<String, String> headers, HttpStatusCode status) {...}

    public ResponseEntity(@Nullable T body, @Nullable MultiValueMap<String, String> headers, HttpStatusCode status) {...}

    public ResponseEntity(@Nullable T body, @Nullable MultiValueMap<String, String> headers, int rawStatus) {...}
}
```

### 예제 - ResponseEntity
- 생성자를 이용하거나 builder 패턴을 활용해서 생성할 수 있다
```java
return new ResponseEntity<>(object, HttpStatus.valueOf(200));
/* 또는 */
return ResponseEntity.status(HttpStatus.valueOf(200)).body(object);
```
