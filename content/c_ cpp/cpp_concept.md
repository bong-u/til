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

### 속성 (Attribute)
> 컴파일할때 특정 메시지를 생성하거나 컴파일러가 특정 동작을 수행할 수 있도록 함


#### [[noreturn]] (~c++11)
> 함수가 정상적으로 호출자에게 제어권을 반환하지 않음을 나타냄

- [[noreturn]]으로 선언된 함수가 정상적인 반환을 시도하는 경우 undefined behavior 발생

```cpp
[[noreturn]] void error() {
    throw "error";
}
int32_t main() {
    error();
    return 0; // dead code로 최적화될 수 있음
}
```

#### [[maybe_unused]] (~C++17)
> 사용하지 않는 변수, 함수, 매개변수, 타입에 대한 경고를 컴파일러가 무시하도록 명시

```cpp
[[maybe_unused]] int a = 10;
```

#### [[nodiscard]] (~C++17)

> 함수의 반환값을 무시하는 경우 컴파일러가 경고하도록 명시

- 반대로 (void) 형태로 캐스팅하여 경고를 억제할 수 있음

```cpp
[[nodiscard]] int add(int a, int b) {
    return a + b;
}
```


### if constexpr (~C++17)

> compile time에 조건문을 처리할 수 있도록 함

- 조건이 거짓인 경우 해당 블록은 컴파일되지 않음
- 템플릿과 비슷한 기능을 수행
- 템플릿은 compile time에 모든 코드를 생성하지만 if constexpr는 조건에 따라 코드를 생성

```cpp
template <typename T>
void print(T value) {
    if constexpr (std::is_same_v<T, int>) {
        std::cout << "int: " << value << std::endl;
    } else if constexpr (std::is_same_v<T, double>) {
        std::cout << "double: " << value << std::endl;
    } else {
        std::cout << "unknown type" << std::endl;
    }
}
```
### Lambda (~C++11)

> 익명 함수를 정의하는 표현식

- 간단한 함수를 선언할 때 사용

```cpp
auto add = [](int a, int b) {
    return a + b;
};
```

#### Transient/Non-transient lambda
- Transient lambda
> 즉시 호출되고 소멸되는 람다 함수
```cpp
    int x = 10;
    auto result = [](int x) {
        return x * 2;
    }(); // 즉시 호출
```

- Non-transient lambda
> 메모리에 저장되어 여러 번 호출할 수 있는 람다 함수
```cpp
std::function<int32_t()> add = [](int a) {
    return a + 10;
};

int32_t result = add(10);
```


### Closure (~C++11)

> lambda expression에서 외부 변수에 대한 참조를 캡처하는 방식


```cpp
int a = 10;
auto add = [&a](int b) {
    return a + b;
};
```

#### Capture
> lamda 함수에서 외부 변수를 함수 내부로 가져오는 것

- lambda 함수가 정의된 시점의 외부 변수를 사용할 수 있도록 함


- parameter 방식과의 비교
```cpp
// parameter 방식
void addAndPrint(int a, int b) {
    std::cout << a + b << std::endl;
}

int main() {
    int x = 10;
    int y = 20;
    addAndPrint(x, y);  // 매번 호출할 때 값을 전달해야 함
}
```
```cpp
// capture 방식
int x = 10;
int y = 20;

auto addAndPrint = [&x, &y]() {  // 외부 변수 x와 y를 참조로 캡처
    std::cout << x + y << std::endl;
};

addAndPrint();  // 매개변수 없이도 외부 변수에 접근 가능
```

#### Capture List
- `[&]` : 모든  외부 변수를 참조로 캡처
- `[=]` : 모든 외부 변수를 값으로 캡처
- `[a]` : 변수 a를 값으로 캡처
- `[&a]` : 변수 a를 참조로 캡처


### Escape Sequence
> 문자열 리터럴에서 특정 문자를 표현하기 위해 사용하는 문자열

| Escape Sequence | Description |
| :-------------: | :---------: |
|      `\'`       | 작은 따옴표 |
|      `\"`       |  큰 따옴표  |
|      `\?`       |   물음표    |
|      `\\`       |  역슬래시   |
|      `\a`       |   벨 소리   |
|      `\b`       | 백스페이스  |
|      `\f`       |   폼 피드   |
|      `\n`       |    개행     |
|      `\r`       | 캐리지 리턴 |
|      `\t`       |   수평 탭   |
|      `\v`       |   수직 탭   |
|      `\0`       |   널 문자   |
|     `\nnn`      |    8진수    |
|     `\xnn`      |   16진수    |


### Encoding
> C++에서는 문자 리터럴에 접두사를 붙여 인코딩을 지정할 수 있음

|     Encoding     | Prefix |    Example     |
| :--------------: | :----: | :------------: |
|   Literal Wide   |  `L`   |     `L'A'`     |
|  Literal UTF-8   |  `u8`  |    `u8'A'`     |
|  Literal UTF-16  |  `u`   |     `u'A'`     |
|  Literal UTF-32  |  `U`   |     `U'A'`     |
|      ASCII       |  none  |    `'\x41'`    |
|      UTF-8       |  none  |  `'\xC3\xA9'`  |
| Unicode (UTF-16) |  none  |   `'\u0041'`   |
| Unicode (UTF-32) |  none  | `'\U00000041'` |


### Cast Operator

> C++에서는 다양한 형변환 연산자를 제공

#### static_cast
> 논리적으로 형변환이 가능한 경우에 사용

- 기본 타입 간의 변환, 포인터/참조 간의 명시적 변환에 사용
- 컴파일 시점에 검증 -> 논리적으로 맞지 않은 경우 컴파일 에러 발생

```cpp
int a = 10;
double b = static_cast<double>(a);
```

#### dynamic_cast
> 상속 관계에서의 형변환을 위해 사용

- 런타임 시점에 안전한 형변환을 보장
- 반드시 가상 함수가 있는 클래스에서만 사용 가능
- 다운캐스팅 시, 형변환이 불가능한 경우 nullptr을 반환

```cpp
class Base {
public:
    virtual void print() {}
};
class Derived : public Base {
public:
    void print() override {}
};

Base* base = new Derived();
Derived* derived = dynamic_cast<Derived*>(base); // 안전한 다운캐스팅
```

#### const_cast
> 포인터 또는 참조형의 const 속성을 제거하기 위해 사용

- 상수형 -> 비상수형으로 변환
- 불변 데이터를 수정하는 데 사용하면 undefined behavior 발생

```cpp
const int a = 10;
int* b = const_cast<int*>(&a);
```

#### reinterpret_cast
> 포인터 형변환이나 비논리적 형변환을 위해 사용

- 메모리 레이아웃을 기반으로 포인터를 변환
- undefined behavior를 발생시킬 수 있음
- 완전히 다른 타입으로 변환이 가능하지만, 안정성을 보장하지 않음

```cpp
int a = 10;
int* b = reinterpret_cast<int*>(&a);
```

### constexpr (~C++11)

> 컴파일 시간에 평가되는 표현식을 생성하기 위해 사용

#### 변수 
- compile time 상수에만 사용 가능

```cpp
constexpr int num1 = 10;

int a = 20;
constexpr int num2 = a; // error: 변수 a는 runtime에 결정되므로 사용 불가
```

#### 함수
- 함수가 compile time에 실행되도록 보장
- 인자 값이 compile time 상수인 경우 -> constexpr 함수로 동작
- 인자 값이 compile time 상수가 아닌 경우 -> constexpr 함수로 동작
- body에서 불가능한 구문
    - goto
    - try-catch
    - 초기화 수행이 없는 변수 선언
    - 리터럴 타입이 아닌 변수 선언
    - static 변수 선언
    - tls(thread local storage) 변수 선언
    - 등...

```cpp
constexpr int fibonacci(const int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
fibonacci(10); // compile time에 다 계산되어서 55로 대체됨
```

### lvalue, rvalue 참조

#### lvalue
> 객체를 가리키는 메모리 위치를 나타내는 표현식

- lvalue 참조
```cpp
int b = 10;
int& a = b;     // a는 b의 참조자 (lvalue 참조)
a = 20;
```

- 멤버 함수에서의 사용 예시
```cpp
class MyClass {
public:
    void show() & {
        std::cout << "lvalue function called (object is lvalue)" << std::endl;
    }
};

MyClass obj;
obj.show(); // lvalue 객체에서 호출
```

#### rvalue
> 메모리에 위치에 할당된 값을 나타내는 표현식

- 주소가 없거나, 임시로 할당된 값
- 주로 표현식이나 함수의 반환값이다.
- move semnatics를 사용하여 자원을 효율적으로 이동시키는데 사용한다.

- rvalue 참조 (~C++11)
```cpp
int&& a = 10;

void show() && {
    std::cout << "rvalue function called (object is rvalue)" << std::endl;
}
```

- 멤버 함수에서의 사용 예시
```cpp
class MyClass {
public:
    void show() && { // rvalue에서만 호출 가능
        std::cout << "rvalue function called (object is rvalue)" << std::endl;
    }
};

MyClass().show(); // rvalue 객체에서 호출
```



### 가상함수
> 상속 관계에서 동적 바인딩을 위해 사용

#### virtual 지정자
- 가상 함수 : 오버라이딩이 선택적임
- 순수 가상 함수 : 오버라이딩이 필수임

```cpp
class Base {
public:
    // 가상함수
    virtual void show() {
        std::cout << "Base::show()" << std::endl;
    }

    // 순수 가상함수
    virtual void print() = 0;
};
```

#### override 지정자
> 오버라이딩을 명시적으로 표시

```cpp
class Derived : public Base {
public:
    void show() override {
        std::cout << "Derived::show()" << std::endl;
    }
};
```

#### final 지정자
> 상속을 방지하는 키워드

- 클래스에 사용 : 상속을 방지
- 함수에 사용 : 오버라이딩을 방지

```cpp
// 상속을 방지
class Car final { ... };

// 상속과 같이 쓰이는 경우
class Derived final : public Base { ... };

class Base {
public:
    // 오버라이딩을 방지
    void show() final { ... }
};
```
