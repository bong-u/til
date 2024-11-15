---
title: "C언어 개념 정리"
date: 2024-09-08
tags: ["C"]
---

> 본 내용은 2023 MISRA-C 가이드라인을 공부하면서 개념을 정리한 것이다. 

### dead code <-> unreachable code
- dead code : 코드에서 실행되지만 그 결과가 다른 계산에 사용될 수 없는 섹션
- unreachable code : 제어 흐름 경로가 없기 때문에 실행할 수 없는 프로그램 소스 코드의 일부

### tag
- struct, union, enum 뒤에 붙는 이름
 
### escape sequence
- 백슬래시(\)와 특정문자를 결합하여 표현하기 어려운 기능, 문자를 표시해준다.
- 종류 (대표적인 것만 몇개 뽑았다)
	- \n : 개행
	- \t : 수평 탭
	- \o(8진수 숫자) : 8진수
	- \x(16진수 숫자) : 16진수

### 연결
> 다른 범위에 속하는 변수들을 서로 연결하는 것

- 무연결 : 다른 블록과 연결을 가지지 않음
	- 지역 변수
- 내부 연결 : 해당 파일 내부에서만 사용 가능
	- static 전역변수
- 외부 연결 : 다른 소스 파일에서도 사용 가능
	- non static 전역변수, extern 지정자 사용


### namespace (c언어 O, c++ X)
> C언어는 아래 4가지의 이름공간을 가진다.
- label
- tag (struct, union, enum)
- member 명 (struct, union, enum)
- 나머지 (함수, 변수, typedef 타입 이름, 얼거형의 값)

### translation unit (번역 단위)
> 대부분의 경우 c 파일

### 구조체 비트필드
- 기존 구조체의 멤버는 각 자료형 크기만큼 공간을 차지

> 비트필드를 사용해 구조체 멤버를 비트 단위로 크기를 지정해서 저장할 수 있다.

- 예시 코드
```c
struct Flags {
	unsigned int a : 1;
	unsigned int b : 3;
	unsigned int c : 7;
}
```

- 메모리 구조

  - 
    | <------- 7비트 -------> | <--- 3비트 ---> | <- 1비트 -> |
    | :---------------------: | :-------------: | :---------: |
    |            c            |        b        |      a      |


### inline 함수
> inline 함수는 호출 부분을 함수 전체 코드로 치환하여 컴파일된다.

- 최신의 컴파일러는 최적화 과정에서 inline이 없더라도 인라이닝 처리를 하기도 한다.
- 매크로와의 차이점
	- 매크로는 전처리기(preprocessor)가 치환
	- inline 함수는 컴파일러가 일반 함수처럼 문법, 타입 검사를 수행

- 예시 코드
```c
#include <stdio.h>

inline void hello_world() {
	printf("Hello World");
}

int main(void) {
	hello_world();
	return 0;
}
```

- 장점
	- 함수 호출로 생기는 오버헤드가 줄어든다.
	- 매크로 함수 대비 디버깅이 용이하다 (중단점 사용 가능)
	- 매크로 함수 대비 가독성이 좋다
- 단점
	- 바이너리 증가
	- 브랜치 예측률 감소
	- instruction 캐시 적중률 감소

- 간단한 함수에 활용하는 것이 유리하다


### restrict

> restrict를 붙인 포인터가 가리키는 객체는 다른 포인터가 가리키지 않는다.

- 예시 코드
```c
void increase(int* restrict a, int* restrict b, int* restrict x) {
	*a += *x;
	*b += *x;
}
```

- 특정 메모리 영역에 접근할 수 있는 포인터가 하나임을 보장
- 최적화를 위해 사용

### _Atomic

> 멀티쓰레딩에서 Race Condition을 방지해준다.

- lock을 걸고 푸는데서 생기는 오버헤드로 인해 연산이 비교적 느림
- Visual Studio 2022 version 17.5 Preview 2 버전보다 이전의 Visual Studio는 해당 기능을 미지원

- 예시 코드
```c
#include <stdatomic.h>

_Atomic int var = 0;
```
