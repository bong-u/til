---
title: "Spring - Bean Validation : Annotation으로 Validation하기"
date: 2023-08-01
---

### Bean Validation
- Annotation을 달아서 Validation을 수행할 수 있다.
- 주로 jakarta.validation과 hibernate.validator 두 패키지를 사용한다.
- Dependency Diagram 구조
  > spring-boot-starter-validation -> hibernate-validator -> jakarta.validation-api

### jakarta.validation에서 지원하는 annotation
| Annotation | Description                                            |
|------------|--------------------------------------------------------|
| @NotNull   | null이 아닌가 ("", " " => 통과)           |
| @NotEmpty  | null이 아니고, size가 0인가 (" " => 통과)  |
| @NotBlank  | null이 아니고, trim한 결과가 empty인가     |
| @Size      | 문자열, 배열의 길이가 해당 범위에 있는가     |
| @Min       | 숫자가 해당 범위에 있는가                  |
| @Max       | 숫자가 해당 범위에 있는가                  |
| @Email     | 이메일 형식에 맞는가                      |
| @Pattern   | Regex(정규식)에 맞는가                    |
| @Past      | 과거의 날짜인가                           |
| @Future    | 미래의 날짜인가                           |
| @Digits    | 정수, 소수 자릿수가 해당 범위에 있는가       |
| @DecimalMin, @DecimalMax | 자릿수가 해당 범위에 있는가 (소수 이하 자릿수 포함)  |
| @Positive, @PositiveOrZero, @Negative, @NegativeOrZero |


### hibernate.validator에서 지원하는 annotation
| Annotation | Description                              |
|------------|------------------------------------------|
| @Range  | 숫자가 해당 범위에 있는가 (소수 이하 자릿수 포함) |
| @Length | 문자열, 배열의 길이가 해당 범위에 있는가         |
| @URL    | URL 형식에 맞는가                             |

- 언급한 Annotation말고 다른 Annotation도 있다.

### Rest Controller에서 사용
- Controller
    ```java
    public ResponseEntity<Customer> postCustomer(@RequestBody @Valid CustomerDTO customerDTO) {...}
    ```
    - **@Valid** Annotation을 붙여서 CustomerDTO 객체에 대한 Validation을 수행한다
    - @Valid Annotation을 붙이는 것을 깜빡하지 말자

- 예외 처리
    - 위 코드의 Validation에서 실패하면, MethodArgumentNotValidException이 발생한다
    - 해당 예외는 필드별 모든 에러를 담고 있다
    - 그대로 반환하면 엄청 길기 때문에, 보통 아래 코드와 같이 필요한 정보만 추출해서 반환한다
        ```java
        processValidationErrors(MethodArgumentNotValidException e) {
            List<String> errors = e.getBindingResult().getFieldErrors().stream()
                                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                                    .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        ```

### 수동 Validation
- Controller에서 Validation을 수행하지 못하는 경우, 수동으로 Validation을 수행할 수 있다
- 이때, Validator 객체를 주입받아서 사용한다
    ```java
    import jakarta.validation.Validator;
    ...
    @Autowired
    private Validator validator;
    ...
    var violations = validator.validate(voucher);
    if (!violations.isEmpty())
        throw new IllegalArgumentException(violations.stream().findFirst().get().getMessage());
    ```
- 코드에서는 voucher 객체에 대한 Validation을 수행하고, 발생한 에러가 있다면 IllegalArgumentException을 발생시킨다
