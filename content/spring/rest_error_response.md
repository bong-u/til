---
title: "Spring - RESTful API에서 내맘대로 에러 응답하기"
date: 2023-07-31
tags: ["Java", "Spring"]
---

### 1. 클래스 정의
```java
@Getter
@RequiredArgsConstructor
public class ExceptionResponse {
    private final LocalDateTime timestamp = LocalDateTime.now(); // 2023-08-01T00:00:57.5995502
    private final int status; // 400
    private final String error; // MethodArumentNotValidException
    private final String message; // 이메일 형식이 아닙니다
    private final String path; // /api/customer
}
```
- 내가 원하는 방식대로 클래스를 정의한다, 주석에는 해당 필드의 예시를 적어놓았다

### 2. ResponseEntity 만드는 함수 정의
```java
private ResponseEntity<ExceptionResponse> handleException(HttpStatus status, Exception e, HttpServletRequest request) {
    ExceptionResponse response = new ExceptionResponse(
            status.value(), e.getClass().getSimpleName(), e.getMessage(), request.getRequestURI());
    return new ResponseEntity<>(response, status);
}
```
- 예외 처리할 때마다 ExceptionResponse 객체를 만들면 반복되는 코드가 많이 생겨 함수로 만들었다
- 예외가 발생한 상황에 따라서 HttpStatus를 다르게 지정할 수 있도록 함수의 인자로 받았다

### 3. 예외 처리
```java
@ExceptionHandler(NoSuchElementException.class)
public ResponseEntity<ExceptionResponse> handleNoSuchElementException(NoSuchElementException e, HttpServletRequest request) {
    return handleException(HttpStatus.NOT_FOUND, e, request);
}
```
- 본 함수는 @RestControllerAdvice가 붙은 클래스에 정의되었다
- 직접 정의한 함수를 호출해서 ResponseEntity를 만들어 반환한다

### 정리
- 위의 예시는 NoSuchElementException이 발생했을 때, HTTP 상태코드는 404, body는 내가 정의한대로 응답하는 코드이다
- REST Api에서 일관성있고 간결한 응답을 보내기 위해 한번 정리해보았다
