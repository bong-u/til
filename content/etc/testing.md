---
title: "정적테스트와 동적테스트"
date: 2024-09-08
---

### 정적 테스트
> SW를 실행하지 않고 테스팅하는 기법

#### 리뷰
> 여러 전문가들이 모여 코드를 포함한 SW 개발 및 산출물을 검토하고 테스팅하여 결함을 검출하는 방법

- Inspection
	- 전문적인 inspection team이 정형화된 방식으로 defect를 찾는 리뷰 기법
	- Planning -> Overview -> Preparation -> Meeting(Inspection) -> Rework -> Follow-up
- Peer Review (Technical Review)
	- 개발팀이 주도하여 직접 모여 수행하는 리뷰 기법
	- PL 또는 TL이 주도하여 리뷰 대상을 선정, 개발자에게 리뷰 요청
- Walkthrough
	- Peer Review와 유사하나 문서 작성자가 주도하는 가벼운 만남 형태

#### 정적 분석 (무기체계SW 개발 및 관리 매뉴얼 기준)
- 코딩 규칙
	- MISRA-C
	- MISRA-C++
	- C# Coding conventions
	- Code conventions for the Java Programming Language

- CWE(Common Weakness Enumeration) 점검
	> 일반적인 SW와 HW의 보안 약점을 나열한 공식적인 리스트
	- CWE-658 : C언어
	- CWE-659 : C++
	- CWE-660 : Java

- Code Metric 점검
	- Cyclomatic Complexity : 제어 흐름 그래프의 복잡도
	- Number of call levels : 조건문 중첩의 깊이
	- Number of function parameters
	- Number of calling function : 함수가 몇 번 호출되는가
	- Number of called functions : 함수를 몇 번 호출하는가
	- Number of Executable code lines


### 동적 테스트

- 명세 기반 테스트 (블랙박스 기법)
	- 동등 분할
	- 경계값 분석
	- 결정 테이블 테스트
	- 상태 전이 테스트
	- 분류 트리 기법
	- 조합 테스트
	- 시나리오 테스트
	- ...

- 구조 기반 테스트 (화이트박스 기법)
	- Statement Coverage
	- Decision Coverage (Branch Coverage)
	- Condition Coverage
	- MC/DC Coverage
	- Path Coverage

#### Fuzzing 테스트
> 유효한, 예상치 않은 값들을 무작위로 대입하는 테스트 기법

- 변형 기반 Fuzzing (Dumb Fuzzing)
	> 입력 샘플을 Fuzzing 도구에 제공, Fuzzing 도구가 이를 변형시켜가면서 테스트
	- 장점
		- 쉽고 빠르게 구현이 가능
		- 입력 구조에 대한 분석을 하지 않아도 됨
	- 단점
		- 미리 정의된 구조가 필요하거나 체크섬이 포함되어 있는 경우 유효한 입력을 생성하는데 어려움이 존재

- 생성 기반 Fuzzing (Smart Fuzzing)
	> 대상 시스템에 입력시킬 데이터를 Fuzzing 도구가 생성
	- 장점
		- 더 높은 Coverage로 이어지는 테스트케이스를 생성
	- 단점
		- 입력 모델에 대한 이해도가 선행되어야 함
		- 구현 난이도가 높음
