---
title: "프로그래밍언어개론"
date: 2024-04-14
---

## Ocaml

### Functional Programming
> 함수형 프로그래밍은 함수를 값처럼 다루는 프로그래밍 패러다임
- 특징
    1. Immutable
    > 변수의 값이 변하지 않는다
    2. First-class function
    3. Higher-order function
    4. Referential transparency
    > 동일한 인자에 대해 항상 동일한 결과를 반환한다
    5. Lazy evaluation (지연 계산)
    > 필요할 때만 계산을 수행

### Primitive Types
- unit
- int
- float
    - `int_of_float` : float->int
    - `float_of_int` : int->float
- bool : true/false
    - x = y : x equals y (structural equality)
    - x <> y : x not equals y (structural equality)
    - x == y : x equals y (physical equality)
    - x != y : x not equals y (physical equality)
- char
- string
    - `^` : string concatenation
    - `.[n]` : n-th character
    - `.length` : length of string
    - `.sub n m` : substring from n to m

### Statement와 Expression
- Statement
    > 프로그램의 상태전이(메모리 상태를 변경하는 행위)를 수행하는 언어의 구성 요소
- Expression
    > 실행 시 값으로 계산외는 언어의 구성요소

- Statement는 값을 반환하지 않는다
- Expression은 값을 반환한다
- 순수 함수형 언어는 Expression만을 가지고 있다

### Tuple
```ocaml
let x = (1, 2, 3)
```

### Function

- first-class object (1급 객체)
> 1. 할당의 대상이 될 수 있다
> 2. 함수의 인자로 사용할 수 있다
> 3. 함수의 반화값으로 사용할 수 있다
> 3. 비교연산을 적용할 수 있다

- Higher Order Function (고차함수)
> 함수를 인자로 받거나 함수를 반환하는 함수

- 재귀함수인 경우 `rec` 키워드를 사용해야 한다

### Conditional branch
```ocaml
if [expression1] then [expression2] else [expression3]
```

### Pattern Matching

- binding occurrence
- Ocaml 컴파일러는 expression의 타입을 기반으로 패턴매칭의 완전성을 검사

### Lists
- `::` : 리스트 앞에 원소를 삽입
- `@` : 리스트를 연결

### Type definition
> Disjoint union : 구분되는 식별자를 사용하여 여러 타입을 묶은 타입

- Varient records라고도 부름
`type [type_name] = [constructor] (of [type])? (| [name] (of [type])?)*`
```ocaml
type number =
    | Int of int
    | Float of float
```

### Tail Call Optimization
