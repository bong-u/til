---
title: "Issue - MockMvc int타입 param이 null로 들어오는 문제"
date: 2023-08-17
---

### 문제상황
- MockMvc를 이용하여 Controller를 테스트하고 있었다
- createUser 메소드는 인자로 UserResponse(DTO) 객체를 받는다
- UserResponse 내 int타입의 age변수의 값이 null로 들어오는 문제가 있었다

- UserController.java
    ```java
    @PostMapping("/user")
    public ResponseEntity<SuccessResponse<UserResponse>> createUser(UserRequest user) {
        return SuccessResponse.get(201, userService.createUser(user));
    }
    ```

- UserControllerTest.java
    ```java
    @Test
    void createUserTest() throws Exception {
        // Given
        User user = User.builder()
                .id(1)
                .name("hong")
                // age의 값은 분명히 20
                .age(20)
                .hobby("swimming")
                .build();
        UserRequest userReq = new UserRequest(
            user.getName(),
            user.getAge(),
            user.getHobby());

        // When // Then
        mockMvc.perform(
                post("/user")
                    .contentType(MediaType.APPLICATION_JSON)
                    // userReq객체가 json string으로 정상적으로 변환된 것을 확인
                    .content(objectMapper.writeValueAsString(userReq)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.content.name").value(user.getName()))
            .andExpect(jsonPath("$.content.age").value(user.getAge()))
            .andExpect(jsonPath("$.content.hobby").value(user.getHobby()))
            .andExpect(jsonPath("$.serverDatetime").exists())
            .andDo(print());
    }
    ```
- Debug log
    ```text
    ...(생략)
    createUser(com.academy.board.dto.UserRequest):
    [Field error in object 'userRequest' on field 'age': rejected value [null];
    ...(생략)
    ```

- UserRequest.java (DTO)
    ```java
    @Getter
    @AllArgsConstructor
    public class UserRequest {
        private String name;
        private int age;
        private String hobby;

        public User toEntity() {
            return User.builder()
                    .name(name)
                    .age(age)
                    .hobby(hobby)
                    .build();
        }
    }
    ```

### 해결방법
- UserRequest 클래스의 age의 타입을 int에서 Integer로 바꾸니까 해결되었다
- int는 변수의 타입으로, null을 허용하지 않고, Integer는 Wrapper class로, null을 허용한다는 특징은 이해를 하겠다
- 하지만 createUser가 호출되는 과정에서 age에 왜 null 값이 들어가는지는 아직 이해를 하지 못했다
