---
title: "Spring @RestController 정리"
date: 2023-07-26
---

### @RestController
- @Controller와 @ResponseBody를 합친 Annotation이다
- @Controller는 ViewName을 반환해서 DispatcherServlet이 **ViewResolver**을 사용한다
- @RestController는 객체를 반환해서 **HttpMessageConverter**가 객체를 Json으로 변환한다

### @Controller와의 코드 비교
- @Controller
```java
@GetMapping("")
public @ResponseBody List<Voucher> getVouchers() {
    return voucherRepository.list();
}
```
- @RestController
```java
@GetMapping("")
public List<Voucher> getVouchers() {
    return voucherRepository.list();
}
```

### @RestControllerAdvice
- @ControllerAdvice와 같이 @Controller에서 발생한 예외를 전역적으로 처리하는 Annotation이다
- @ControllerAdvice와 @RestControllerAdvice의 차이는 @Controller와 @RestController의 차이와 같다

### 예제 - @RestControllerAdvice 구현
- 필자는 Controller에서 발생한 IllegalArgumentException을 400 Bad Request로 처리하였다
```java
@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).body(e.getMessage());
    }
}
```
