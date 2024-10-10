---
title: "C++ 개념 정리"
date: 2024-10-10
---

> 본 내용은 2023 MISRA-CPP 가이드라인을 공부하면서 개념을 정리한 것이다. 

### 템플릿 (Template)

> 템플릿은 함수나 클래스를 정의할 때, 타입을 일반화하여 코드를 작성하는 방법

#### 함수 템플릿
```cpp
template <typename T>
T add(T a, T b) {
    return a + b;
}
```

#### 클래스 템플릿
```cpp
template <typename T>
class Point {
public:
    T x, y;
    Point(T x, T y) : x(x), y(y) {}
};
```

### 템플릿 특수화 (Template Specialization)

> 템플릿을 특정 타입에 대해 구체화하는 것

#### 함수 템플릿 명시적 특수화
```cpp
template <typename T>
T add(T a, T b) {
    return a + b;
}

// int 타입에 대한 특수화
template <>
int add(int a, int b) {
    return a + b;
}
```

#### 함수 템플릿 부분 특수화
```cpp
template <typename T>
T add(T a, T b) {
    return a + b;
}

// 포인터 타입에 대한 부분 특수화
template <typename T>
T add(T* a, T* b) {
    return *a + *b;
}
```


