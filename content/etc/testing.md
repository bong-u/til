---
title: "정적테스트와 동적테스트"
date: 2024-09-08
---


### 실행 여부에 따른 테스트의 분류
- 정적 테스트
- 동적 테스트

### 내부 구조를 고려하는지 여부에 따른 테스트의 분류
- 블랙박스 테스트
- 화이트박스 테스트


### 목적과 범위에 따른 테스트의 분류

- 수행 순서에 따라 작성해보았다.

#### 1. 단위 테스트 (Unit Test)
> 가장 작은 단위 수준(모듈, 함수, 클래스)의 테스트

#### 2. 통합 테스트 (Integration Test)
> 모듈을 통합하는 과정에서, 각 모듈 간의 인터페이스와 관련된 결함이 있는지 테스트

- Top-down : 상위 모듈부터 하위 모듈로 통합하며 테스트
- Bottom-up : 하위 모듈부터 상위 모듈로 통합하며 테스트
- Big-bang : 모든 모듈을 한번에 통합하여 테스트
- Threads : 중요 모듈을 먼저 구현하고 통합한 뒤, 보조적인 모듈을 구현 후 통합하는 방식


#### 3. 시스템 테스트 (System Test)
> 전체 시스템이 요구사항을 만족하는지 테스트 (HW+SW)

- 주요 관점
    - 기능 테스트
    - 비기능 테스트 : 성능, 안정성, 보안, 사용성 등 기타 비기능적인 측면을 평가
    - E2E 테스트
    - 회귀 테스트
    - 호환성 테스트 : 다양한 환경에서 올바르게 작동하는지 테스트

#### 4. 인수 테스트 (Acceptance Test)
> 사용자 관점에서 요구사항을 만족하는지 테스트


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



### 회귀 테스트 (Regression Test)

> 회귀 테스트는 소프트웨어의 새로운 버전에서 기존 기능이 손상되지 않았는지 확인하는 테스트

- 회귀 버그(Regression Bug) : 이전에 존재하지 않던 버그가 기능 수정이나, 새로운 기능 추가로 인해 새로운 버전에서 발생하는 버그
- 회귀 테스트는  반복적인 작업이 많아 자동화 도구를 사용하여 테스트하는 것이 효율적
- 단위 테스트와 

#### 회귀 테스트의 종류
- Retest all 기법 : 기존의 모든 테스트 케이스를 다시 실행하여 전체 시스템을 검증하는 방법
- Selective retest 기법 : 변경된 부분에 대해서만 선택적으로 테스트를 수행하는 방법
- Prirority 기법 : 시스템의 핵심 기능을 중심으로 우선순위를 정하여 테스트하는 방법


### FIRST 원칙

> 단위 테스트의 5원칙

- Fast : 테스트는 빨라야 한다.
- Independent : 테스트는 서로 독립적이어야 한다.
- Repeatable : 테스트는 어떤 환경에서도 반복 가능해야 한다.
- Self-validating : 테스트는 성공 또는 실패여야 한다. (bool 값)
- Timely : 테스트는 적시에 작성해야 한다. (실제 코드를 구현하기 전에 작성)

