---
title: "C언어 개념 정리"
date: 2024-09-08
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