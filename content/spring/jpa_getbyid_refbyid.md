---
title: "Spring - JPA : getReferenceById vs findById"
date: 2023-08-11
tags: ["Java", "Spring"]
---

### 배경
- Service layer에서 createPost 메소드를 구현하는 중 이었다
- Post entity는 User entity와 ManyToOne 관계이다
- User entity를 가져오는 방식에 따라 두가지 방식의 구현이 가능했다
- 두 방식의 장단점을 파악해보았다

### getReferenceById 사용
```java
public Post createPost(PostDTO.Request postDTO, int userId) {
    // 프록시 객체를 가져온다
    User user = userRepository.getReferenceById(userId);

    Post post = Post.builder()
            .title(postDTO.getTitle())
            .content(postDTO.getContent())
            .created_at(LocalDateTime.now().truncatedTo(ChronoUnit.MILLIS))
            .author(user)
            .build();

    try {
        return postRepository.save(post);
    } catch (DataIntegrityViolationException e) {
        throw new EntityNotFoundException("해당 유저가 없습니다.");
    }
}
```
- 장점 : 쿼리 한번으로 Post entity를 생성할 수 있다
- 단점 : insert 쿼리 실행 중 발생한 예외를 잡기 때문에 안정적이지 않다

### findById 사용
```java
public Post createPost(PostDTO.Request postDTO, int userId) {
    // 실제 객체를 가져온다
    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty())
        throw new EntityNotFoundException("해당 유저가 없습니다.");

    Post post = Post.builder()
            .title(postDTO.getTitle())
            .content(postDTO.getContent())
            .created_at(LocalDateTime.now().truncatedTo(ChronoUnit.MILLIS))
            .author(user.get())
            .build();

    return postRepository.save(post);
}
```
- 장점: insert 쿼리 실행 전에 미리 예외를 처리하기 때문에 안정적이다
- 단점: 쿼리 두번으로 인한 성능 저하가 발생한다

### 결론
- 쿼리를 두 번 날리더라도 findById 메소드를 사용하는 것이 안정적이라서 유지보수하기 좋을 것 같다
