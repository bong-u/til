---
title: "Java - 이중 중괄호와 Anti-Pattern"
date: 2023-07-19
---

### 기존 코드
```java
Map<String, Object> map = new HashMap<>();
map.put("customerId", customer.getCustomerId().toString().getBytes());
map.put("name", customer.getName());
map.put("email", customer.getEmail());
map.put("createdAt", Timestamp.valueOf(customer.getCreatedAt()));
return map;
```

### Double Brace Initialization 적용 후
```java
return new HashMap<>() {{
    put("customerId", customer.getCustomerId().toString().getBytes());
    put("name", customer.getName());
    put("email", customer.getEmail());
    put("createdAt", Timestamp.valueOf(customer.getCreatedAt()));
}};
```

### 효과
- 장점
  - 코드가 가독성이 좋아진다
- 단점
  - 추가로 익명 클래스를 사용한다 -> 메모리 추가 사용
  - 인스터스 및 개체에 대한 숨겨진 참조를  가진다 -> Memory Leak 유발 가능
  - -> 안티패턴으로 간주된다

    #### 안티패턴 (Anti-pattern)
    > 실제 많이 사용되는 패턴이지만 비효율적이거나 비생산적이기 때문에 지양되는 패턴

### 결론
> 득보다 실이 많다, 사용하지 말자
