---
title: "컴파일러개론"
date: 2023-09-01
---

## 개요

### 컴퓨터와 인간이 소통하는 방법

#### 어셈블리어

- 어셈블리어의 번역기는 어셈블러(Assembler)라고 한다
- cpu칩셋이 바뀔때마다 어셈블리어가 바뀐다

#### 고급언어

- 고급언어의 번역기는 컴파일러(Compiler)라고 한다

#### 컴파일러의 정확한 정의

> 어떤 언어로 쓰여진 프로그램을 같은 역할의 다른 언어로 바꿔주는 프로그램

- 1952년 그레이스 호퍼(Grace Hopper)가 UNIVAC용 프로그래밍언어 A-0 컴파일러를 제작

#### 컴파일러 vs 인터프리터

### 프로그램 처리과정

![program_process](/static/image/program_process.png)

### 컴파일러의 처리 과정

![compile_process](/static/image/compile_process.png)

- Lexical analysis (어휘 분석)
  - token을 생성하는일, token은 어휘의 최소 단위
- Syntax analysis (구문 분석)
  - token을 읽어서 오류를 검색, 구문 구조를 만든다 (주로 트리형태)
- Semantic analysis (의미 분석)
  - type checking
- Intermediate code generation (중간 코드 생성)
  - 중간 코드로 변환
- Code optimization (코드 최적화)
  - 중간 코드를 더 효율적으로 변환
- Code generation (코드 생성)
  - 목적 코드 생성

## Lexical analysis (어휘 분석)

- token : 문법적으로 의미있는 최소 단위

### FSA (Finite State Automata, 유한 상태 오토마타)

![fsa_integer](/static/image/fsa_integer.png)

- token을 인식하는 방법
- 시작 상태 한 개와 끝 상태 여러 개를 가짐

### DFA (Deterministic Finite Automata)

![dfa_example](/static/image/dfa_example.png)

- FSA의 한 종류
- 각 상태에서 뻗어나가는 edge가 하나씩만 존재
- ε가 붙은 edge 없음

### 분석한 토큰을 표현하는 방법

> Lexeme = <토큰번호, 토큰 값>

- 예시
  - if X < Y ...
  - (29, 0) (1, X) (18, 0) (1, Y) ...
  - 식별자의 토큰번호는 1번, 상수는 2번 등으로 고정

## Syntax analysis (구문 분석)

- token을 읽어서 오류를 검색, parse tree를 만든다

### CFG (Context Free Grammer)

- 구문을 표현하는 방법
- G = (N, T, P, S)
  - N = nonterminal symbol
    - 알파벳 대문자로 표현
  - T = terminal symbol (token)
    - 알파벳 소문자+숫자, 연산자, 구분자, 키워드 등
  - P = production rule
    - 예) S -> T+T, T -> '0'|'1'|'2'
  - S = start symbol
- L(G) : 이 문법으로 생성되는 언어

### 여러가지 CFG 표현법

- BNF (Backus-Naur Form)
- EBNF (Extended BNF)

### 유도 (derivation)

- 생성 규칙를 적용하여 문장을 생성하는 과정
- 유도를 하는 과정에서 하나씩 골라서 바꿈
- 유도 트리 : 유도 경로를 추상화 시켜 표현한 것
- 좌측 유도(leftmost derivation)
  - 가장 왼쪽에 있는 nonterminal을 먼저 대치
- 우측 유도(rightmost derivation)
  - 가장 오른쪽에 있는 nonterminal을 먼저 대치

### 모호성 (ambiguity)

- 문법 G에 의해 생성되는 어떤 문장이 두개 이상의 유도트리를 갖는다면 문법 G는 모호하다고 한다
- 모호하지 않은 문법은 좌측 유도와 우측 유도가 같다
- 모호성 해결
  1. **연산자 우선순위 도입**
  2. **결합 법칙 도입**
  - Left Recursion은 좌측 결합에 사용
    - ex) A -> A+a | a
  - Right Recursion은 우측 결합에 사용
    - ex) A -> a+A | a

### 구문 분석의 2가지 방식

- top-down, bottom-up

## Top-down parsing

### Top-down 방식

- 좌측 유도와 같은 순선의 생성 규칙 적용
- backtracking : 유도된 문자열과 입력 문자열이 같지 않으면 다른 생성규칙 적용

### Bottom-up 방식

- 우측 유도의 역순의 생성 규칙 적용

### LL 파싱

- 왼쪽->오른쪽으로 읽어서 좌파스 생성
- backtracking X, 빠르다
- **결정적으로** 파싱

### 사용된 정의

1. ε-생성규칙

   - Nonterminal A가 ε를 유도할 수 있으면 A를 nullable하다고 부른다

2. lhs, rhs
   - A->XXX에서 lhs는 A, rhs는 XXX
3. ⊕ (Ring Sum)
   - A에 ε가 있으면, A⊕B = (A에서 ε빼고 A 합집합 B)
   - A에 ε가 없으면, A⊕B = A

#### First

- nonterminal A로 부터 유도되어 첫번째로 나타날 수 있는 terminal의 집합
- X->Y1Y2Y3일때,
  > FIRST(X) = FIRST(X) U FIRST(Y1) ⊕ FIRST(Y2) ⊕ FIRST(Y3)

#### Follow

- A 다음에 나오는 terminal의 집합
- A->αBβ, β != ε 일때,
  > FOLLOW(B) = FOLLOW(B) U (FIRST(β)-{ε})
- A->αB 또는 A->αBβ, FIRST(β)에 ε가 속할 때,
  > FOLLOW(B) = FOLLOW(B) U FOLLOW(A)

### LL조건

- FIRST(α)와 FIRST(β)가 겹치면 안된다
- FIRST(α)에 ε가 있으면, FOLLOW(α)와 FIRST(β)가 겹치면 안된다
- LL 조건을 만족하는 문법 = LL 파싱 되는 문법

### LL(1) 문법

- 임의의 문법에 대하여 LL 조건을 만족하는 CFG
- 1 : LOOKAHEAD가 1개라는 의미
- 다음과 같은 경우 LL(1)문법이 되지 않는다
  1. 모호한 문법
  - 우선순위 주기, 결합법칙 반영으로 해결
  2. left-factoring이 되는 경우
  - 공통 앞부분을 새로운 nonterminal로 만들어 해결
  3. left-recursive한 경우
  - 직접 recursion : A -> Aε 인경우
  - 간접 recursion : A -> B, B -> A 인경우

### LOOKAHEAD

- 어떤 규칙이 적용되었을때 맨 처음 나올 수 있는 terminal 집합
- A->X1X2X3일때,
  > LOOKAHEAD(A) = FIRST(X1) ⊕ FIRST(X2) ... ⊕ FOLLOW(A)

### Strong LL(1)

- **LL(1)과 항상 동일** (1이 아닐때는 다름)
- LOOKAHEAD(A->α)와 LOOKAHEAD(A->β)가 겹치지 않는 문법

### LL(1) 파서 구현 방법

#### Recursive descent parser

- 장점 : 직관적 쉽다
- 단점 : 생성 규칙이 바뀌면 구문 분석기를 고쳐야 한다

#### Predictive parser

- PDA(PushDown Automata)에 기반
- 생성 규칙이 바뀌면 파싱 테이블만 수정

- 파싱테이블 예시 (?에는 규칙번호가 들어간다)
  | | a | b |
  |---|---|---|
  | S | ? | ? |
  | A | ? | ? |
- 파싱테이블에 두개 이상의 생성 규칙이 들어가는 경우 -> NOT LL(1)
- Stack의 예시
  ![topdown_stack](/static/image/topdown_stack.png)

## Bottom-up parsing

- left-recursive 문법도 파싱 가능

#### LL(k)

- 좌측유도 기반
- k개의 symbol을 lookahead
- Top-down parsing, recursive descent parsing, predictive parsing, LL parser
- 파스트리를 pre-roder로 순회 및 생성

#### LR(k)

- 우측유도 기반
- k개의 symbol을 lookahead
- Bottom-up parsing, shift-reduce parsing, LR parser
- 파스트리를 post-order로 순회 및 생성

#### Reduce

- S=>αβω이고 A->β이면 β를 A로 대치하는 것 : S=>αAω
- 시작 symbol이 나올 때까지 reduce 한다

#### Handle

- S=>αβω이고 A->β이면 β를 αβω의 handle이라고 한다
- 두 개 이상의 handle이 존재할때 -> 모호하다

### Shift와 Reduce로 Parsing 하기

#### Stack의 예시

![bottomup_stack](/static/image/bottomup_stack.png)

#### Issue

1. Shift와 Reduce 중 어느 것을 할까?
2. Stack의 top에서 얼마만큼을 handle로 볼 것인가?

- 해결방법: LR Parsing Table

### YACC

- LALR 파서 생성기
- foo.y --(yacc)--> y.tab.c --(gcc)--> a.out
- \*.y 파일 구조
  ```java
  <선언부>
  ...
  %%
  ...
  exp : exp '+' term;
  factor : ident;
  ...
  %%
  <여러 함수>
  ```
- 모호한 문법으로 LR Conflict 발생 시 선언부에서 우선순위 지정하여 해결

#### LR Parsing Table

- Action table : Action + Parser 상태
- Goto table : Parser 상태

### LR(0) 파싱 테이블 만들기

#### LR(0) 아이템

- rhs에 점('.') symbol을 가진 생성 규칙
- ex) A->α.β, A->.

#### closure

- 점('.')뒤에 non-terminal이 오면 재귀적으로 추가
- S' -> S, S -> (L)|id, L -> S | L,S
  - closure({[S'->.S]}) = {[S'->.S], [S->.(L)], [S->.id]}

#### goto

- goto(I, X)이면 점을 X뒤로 옮기고 closure를 취한다
- X가 없으면 넣지 않는다
- I={[G->E=E], [E->E.+T]} 일때,
  - goto(I, +) = closure({E->E+.T}) : 점을 +뒤로 옮김

#### C0

- 생성규칙 S'->S에서부터 차례로 closure와 goto를 적용하여 얻은 모든 타당한 LR(0)의 아이템 집합들

- Item의 종류
  - [A->X.Y] : X!=ε일때 kernel item
  - [A->.X] : closure item
  - [A->X.] : reduce item

### SLR 파싱 테이블 만들기

- reduce Item이 [X->α.]일때, FOLLOW(X)의 모든 terminal에만 reduce action을 넣는다
- 나머지는 LR(0)과 똑같다
- LR(0)보다 conflict가 적어, 더 정교하다고 할 수 있다.

### LALR Parsing

- 정교한 순서
  > LR(0) < SLR < LALR(1) < LR(1)
- 파서 상태의 개수
  > SLR = LALR << LR(1)

## SDD, AST

### SDD (Syntax Directed Definition)

- SDD : semnatic action을 정의하는 추상적인 명세서
- Semnatic Actions : 규칙에 대한 Action

### AST (Abstract Syntax Tree)

- 파스트리에서 불필요한 정보를 제거한 형태
- AST를 만드는 방법
  - 파싱단계에서 만들기 : LL, LR
  - 파스트리를 순회하면서 만들기 : SDD 사용 (Yacc etc.)
- evaluation : 노드를 방문하면서 작업하는 행위
- On-the-fly evaluation
  - S-attributed SDD: synthesized attribute만 가지고 있는 SDD
  - L-attributed SDD: synthesized attribute만 가지는 경우 + 값이 왼쪽에서 오른쪽으로 흘러 계산이 이루어지는 경우

## IR (Intermediate Representation)

### IR이란?

- Tree나 Instruction list 형태
- instruction(node)가 적어야 최적화/번역에 좋음

### High Level IR

- High와 Low는 상대적인 개념
- High level IR: 여기서는 AST의 변형만 생각
- 종류 : AST, TCOL

### Low Level IR

- 단순한 instruction으로 구성
- 가상기계(주로 RISC)를 emulate

#### N-tuple 표기법 (3-address code)

> a = b OP c

- 일반적으로 기계어가 가지는 피연산자 개수 <= 3
- quadruple : (연산자, 피연산자1, 피연산자2, 결과)

#### Stack machine code

- Java byte code, U-code : AST로부터 생성이 용이

#### Tree 표현

- 기계어 생성 용이

### IR 예시

#### GCC - GIMPLE (3-address code)

- GCC의 중간코드 : GENERIC -> **GIMPLE** -> RTL

```c
D.1954 = x*10 // D.1954는 임시변수
gimple_assign <mult_exprt, D.1954, x, 10>
```

#### LLVM - bit (3-address code)

- LLVM IR : 언어와 머신에 독립적

```llvm
@var = global i32 14 ; 전역변수 var에 14 대입
define i32 @main() nounwind { ; i32(int) 반환형
  entry:
    %a = alloca i32, align 4 ; 지역변수 a 선언, int 할당
    %1 = load i32 * @var ; %1 임시변수에 var값 대입
    ret i32 %1 ; 임시변수 값 반환
}
```

#### JVM - byte code (stack machine code)

- 가상 기계 코드 (Bytecode, MSIL)
  - 가상 기계에서 동작하도록 함
  - 이식성, 호환성이 목적 : java bytecode는 machine 호환성, c# msil은 language 호환성

```java
public Employee(String strName, int num)
{name = strName; idNumber = num; storeData(strName, num);}
Method Employee(java.lang.String, int)

0 aload_0 ; 0번째 로컬변수(this)를 스택에 push
1 invokespecial #3 <Method java.lang.Object()> ; 함수 호출
---
4 aload_0
5 aload_1 ; strName을 스택에 push
6 putfield #5 <Field java.lang.String name> ; name에 strName 대입
---
9 aload_0
10 iload_2 ; num을 스택에 push
11 putfield #7 <Field int idNumber> ; idNumber에 num 대입
---
14 aload_0
15 aload_1 ; strName을 스택에 push
16 iload_2 ; num을 스택에 push
17 invokespecial #9 <Method void storeData(java.lang.String, int)> ; 함수 호출
20 return
```

- line number : 명령이 시작하는 바이트 주소
- aload : 객체를 push, iload : 정수를 push
- 원래는 aload가 명령, 자주 쓰는 명령 aload 0을 묶어서 bind -> aload_0

#### CIL (Common Intermediate Language) (stack machine code)

- C#, VB.NET, J# 등에서 사용
- MSIL은 옛날 이름

```nasm
.assembly Hello {} ; .assembly: 어셈블리 선언
.assembly extern mscorlib {}
.method static void Main() {
  .entrypoint
  .maxstack 1
  ldstr "Hello, world!" ; stack에 저장
  call void [mscorlib]System.Console::WriteLine(string)
  ret
}
```

#### GCC RTL(Register Transfer Language) (Tree구조 코드)

- Lisp _S-expression_ 사용

```text
(set (reg:SI 140)
     (plus:SI (reg:SI 138)
              (reg:SI 139)))
```

- => reg140 = reg138+reg139

## IR generation

### 3-address Translation 규칙

- Binary operations: `t = [[el OP e2]]`
- Unary operations: `t = [[OP el]]`
- Array access: `t = [[ v[e] ]]`
- Structure access: `t = [[ v.f ]]`
- Short-circuit OR: `t = [[ el SC-OR e2]]`
- Statement sequence: `[[s1; s2; ...; sN]]`
- Variable assignment: `[[ v = e ]]`
- Array assignment: `[[ v[e1] = e2 ]]`
- If: `[[ if(e) then s ]]`, `[[ if(e) then s1 else s2]]`
- While: `[[ while (e) s ]]`
- Switch: `[[ switch (e) case v1:s1, ..., case vN:sN ]]`
- Function Call: `[[ call f(e1, e2, ..., eN) ]]`
- Fucntion Return: `[[ return e ]]`

### Statement Expression

- Statement도 expression 처럼 값을 가지도록 확장
- `t = [[ S ]]`를 추가하여 결과값을 저장하자

### Nested Expressions

- `t = [[ (a - b) * (c + d) ]]`
- `t = [[ if c then if d then a = b ]]`
- 가장 큰 덩어리부터 바꾼다

### Storage Management

#### 2가지 Storage

- Register : 빠른 접근, 간접 접근 불가
- Memory : 상대적으로 느린 접근, 간접 접근 가능

#### 2가지 접근 방식

#### All memory approach

- 모든 변수를 memory에 저장, 가능한것만 register

#### Standard approach

- Global, Statics, Local(composite)는 memory에 저장
- Local(scalar)는 memory 또는 virtual register에 저장

#### Memory의 4대 영역

- Code space : 명령어를 저장 read-only일때 빠름
- Static data : 프로그램과 lifetime을 함께하는 데이터
- Stack : Local 변수들
- Heap : 동적으로 할당되는 데이터

#### File Format

- Windows : PE (Portable Executable)
- Unix : ELF (Executable and Linkable Format)

#### 변수 바인딩

- environment : <변수, storage location> 정보
  - state: <변수, 값> 정보
- 어떤 변수 N이 storage location S에 지정되면 바인딩 된다고 한다

#### Static Allocation

- 프로그램 수행하는 동안 변하지 않는 location으로 바인딩

#### Heap Allocation

- 연속적인 global 영역의 일부를 OS로부터 받은 것
- 프로그램 수행 중 요청과 반환

### Stack Management

- Run-time stack : 한 함수 call마다 하나씩두는 frames
- Activation record : 함수 수행을 위한 execution env(local var, parameter, return address, etc.)
- Top frame : 현재 수행중인 함수의 frame

### Stack pointers

- SP : Frame top
- FP : Frame base
- 두 개를 쓰는 이유
  - 가까운 거 기준으로 offset 계산 -> small offset 유지
  - 수행 중 top frame의 위치를 알 수 없음

## Semantic Analysis - Symbol Tables

### Scope

- Identifier: 식별자
- Lexical Scope: 특정 범위
- 식별자의 Scope: 그 식별자의 선언이 참조되는 lexical scope

### Symbol Table

| Name | Kind | Type            | Attribute |
| ---- | ---- | --------------- | --------- |
| foo  | func | int, int -> int | extern    |
| m    | arg  | int             |           |
| tmp  | var  | char            | const     |

- 하나의 lexical마다 하나의 symbol table
- symbol table은 계층적이다
- 현재 scope에 없으면 상위 scope로 올라가면서 찾는다

### Symbol Table Implementation

- AST가 만들어져야 가능
- Local Table은 hash table 사용
- Global Table은 N-array tree 구조 사용
- 코드를 순차대로 읽으면서 만듬 (scope 스택을 사용)

### Type Checking

- Type Expressions
  - Array types: T[], T[10]
  - Structure types : {id1: T1, id2: T2 ...}
  - Pointer types: T\*
  - Function types: T1 X T2 X ... X Tn -> T_return

### Type Judgement

- A ├ E : T
  > A 상황에서 E는 T타입을 만족한다
- A ├ if(E) S1 else S2 : T
  > 위 조건은 모든 E, S1, S2, A, T에 대한 가정이 성립할 때 결론 T가 성립한다
- Proof Tree (타입 유도 트리)
  - 역삼각형 모양
  - 만족하는 proof tree가 있다 -> 타입 오류가 없다
- 그 외 Semantic Analyses
  - break, continue, goto 문이 올바른 위치에 있는 지 등

## 컴파일러 후반부 (빠르고, 실제 돌아가는 코드로 바꾸기)

### Instruction Selection

### Tree 기반 Intermediate Representation

- MEM(e) : 주소 e로 시작하는 메모리 한 word의 내용
- TEMP(t) : 레지스터 t
- SEQ(s1, s2): 문장 s1 수행 후 s2 수행
- ESEQ(s, e): 문장 s 수행 후 (결과 없음) e가 추가 수행
- BINOP(o, e1, e2) : 연산자 o, 피연산자 e1, e2, 결과 저장된 주소 반환
- const(i): 정수 상수 i

### Register Allocation

- 최적화 하기 위해 최대한 자주 사용되는 것을 Register에 저장
- Interference
  > 서로 다른 두 definition이 live range 에서 공통 operation을 가지고있는 경우
- Interference Graph : 서로 interfere 하면 연결하는 그래프
- Graph coloring : 연결된 노드는 다른 색으로 칠하기
