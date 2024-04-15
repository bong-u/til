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
> 재귀함수의 호출이 함수의 마지막 행위일 때, 스택을 사용하지 않고 반복문으로 최적화

## Syntax and Semantics

### Compilation
> 프로그래밍 언어로 작성된 프로그램을 다른 언어로 번역하는 행위

- 적합한 프로젝트
    - 큰 규모의 소프트웨어 프로젝트 : 검증을 통해 오류를 사전에 탐지
    - 고성능 소프트웨어 : 최적화를 통한 성능 향상
    - 저수준 소프트웨어 : 기계어로 변환
- 단점
    - 학습 곡선이 높다
    - Compilation 과정이 비싸고 복잡

### Interpretation
> 프로그래밍 언어로 작성된 프로그램을 해석하여 실행하는 행위

- 적합한 프로젝트
    - 높은 언어의 자유도를 활용한 소프트웨어 prototyping : 검증 절차의 부재로 인한 다양한 동적 특성 존재
    - 쉽고 직관적인 구조로 프로그래밍 교육 : 구문 구조가 단순
    - 실행환경에 영향을 받지 않는 cross-platform 소프트웨어 : platform 별로 구현된 interpreter를 통해 실행

- 단점
    - 성능 이슈가 존재
    - 검증 절차의 부재로 인한 결함 탐지 및 수정의 어려움

### Syntax (구문 구조)
> 프로그래밍 언어의 "형태"

- 구문 구조의 종류
    - Concrete syntax : 프로그래밍 언어의 구문을 텍스트로 표현
    - Abstract syntax : Concrete syntax를 트리 구조로 표현

### Semantics (의미)
> 프로그래밍 언어 구문의 "실행동작"

### Unspecified Behaviors
> 특정조건에서 구문의 정의하지 않은 동작

### Undefined Behaviors
> 특정조건에서 구문의 정의되지 않은 동작

## Programming Language Syntax and Parsing

- 언어 : L(G)

### The Chomsky Hierarchy
1. Regular Language : Finite-State Automation
2. Context-Free Language : Pushdown Automation
3. Context-Sensitive Language : Linear-Bounded Automation
4. Recursively Enumerable Language : Turing Machine

### AST (Abstract Syntax Tree)
> 프로그램 구조를 요약한 트리

### CFG (Context-Free Grammar)
> 문맥을 고려하지 않고 항상 동일한 문자열을 표현하는 문법

- G = ($\sum$, N, P, S)
    - $\sum$ : terminal의 유한집합
    - N : non-terminal 유한집합
    - P : production의 집합 
    - S : 시작 nonterminal

### BNF (Backus-Naur Form)
> CFG의 표현 방법

- 예시
```text
S ::= aAc
A ::= aA
| b
| 𝜖
```

### Derivation
> 문법의 규칙을 적용하여 문자열을 생성하는 과정
- Leftmost derivation
- Rightmost derivation

### Parse
> Derivation의 역과정  
> Source code --lexing--> Token --parsing--> AST

## AE (Arithmetic Expression) Language
#### Semantics of AE
- `e⇓n` : e는 n으로 계산됨

#### Inference rule (추론 규칙)
> 전제로부터 결론을 이끌어내는 규칙
$$\frac{H_1 H_2 H_3 ... H_n}{P}$$

- $H_1, H_2, H_3, ..., H_n$ : 전제
- P : 결론
- 전제가 모두 참이면 결론도 참

- Big-step : 프로그램의 계산이 하나의 큰 단계에 의해 수행
- Small-step : 프로그램의 계산이 한 스텝 계산들의 연속에 의해 수행
- Operational : 프로그램의 계산을 가상 기계의 동작(계산)에 기반하여 기술
- Proof tree : Inference rule을 이용하여 결론을 증명하는 과정을 나타내는 tree형태의 자료구조