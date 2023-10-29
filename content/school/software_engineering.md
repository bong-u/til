---
title: "소프트웨어공학"
date: 2023-10-24
---


## 1장 소프트웨어 공학 개요

### 소프트웨어의 종류
- 주문형, 패키지형, 임베디드 시스템
- 실시간 소프트웨어, 자료처리 소프트웨어


### 소프트웨어 공학의 정의
- IEEE : 소프트웨어의 개발, 운용, 유지보수 및 파기에 대한 체계적인 접근
- W.Humphrey : 질 좋은 소프트웨어를 경제적으로 생산하기 위하여 공학, 과학, 수학적 원리에 의하여 소프트웨어를 개발해야한다

### 소프트웨어 품질 (효-용-신-유-재-)
- 효율성(efficiency)
- 사용**용**이성(usability)
- 신뢰성(reliability)
- 유지보수성(maintainability)
- 재사용성(reusability)

### 소프트웨어 프로젝트 작업
1. 요구분석과 명세화
  - 도메인 분석, 문제 정의, 요구 추출, 요구 분석, 요구 명세화
2. 설계 : 가용한 기술로 어떻게 구현되어야하는지 기술
  - 시스템 엔지니어링, 소프트웨어 아키텍쳐
  - UI 설계, DB 설계
3. 모델링 : 도메인이나 소프트웨어의 표현을 만들어 나가는 과정
  - 유스케이스 모델링
  - 정적 모델링, 동적 모델링, 행위 모델링
4. 프로그래밍
5. 품질보증
  - 리뷰, 인스펙션, 테스트
6. 배포
7. 프로세스 관리

## 2장 소프트웨어 프로세스

### 폭포수 모델 (Waterfall Model)
![waterfall_model](/static/image/waterfall_model.png)
- 각 단계가 다음 시작 전에 끝나야 함 -> 느림
- 프로토타입과 재사용의 기회가 줄어듦

### 프로토타입 모델 (Prototyping Model)
![prototyping_model](/static/image/prototyping_model.png)
- 인간-기계 상호작용 프로토타입
- 프로토타입을 만든다 - 프로토타입을 평가한다

### 점증적 모델 (Incremental Model)
![incremental_model](/static/image/incremental_model.png)
- 점증적 방법: 기능별로 릴리즈
- 반복적 방법: 릴리즈 할때마다 기능의 완성도를 높인다
- 기능이 부족하더라도 빨리 릴리즈 가능

### 나선형 모델 (Spiral Model)
![spiral_model](/static/image/spiral_model.png)
- 진화 단계
  1. 계획 수립
  2. 위험 분석
  3. 개발
  4. 평가
- 반복적인 개발 및 테스트 -> 강인성 향상
- 관리, 위험 분석이 중요

### 진화적 모델 (Evolutionary Model)
![evolutionary_model](/static/image/evolutionary_model.png)
- 초기에 요구사항을 파악하기 힘들고 구현이 어려운 경우, 요구사항 분석을 한 번이상 반복
- UP (Unified Process)
  - 도입 단계 : 프로젝트의 범위를 설정, 목표를 명확히
  - 정련 단계 : 요구를 찾아내어 설계를 완성
  - 구축 단계 : 제조 단계, 요구의 테스트 마무리
  - 전환 단계 : 릴리즈

### 애자일 프로세스 (Agile Process)
![agile_process](/static/image/agile_process.png)
- 특징
  - 짧은 릴리즈와 반복
  - 점증적 설계
  - 사용자 참여
  - 문서 최소화
  - 비공식적 커뮤니케이션
  - 요구와 환경의 변화를 가정

#### 익스트림 프로그래밍 (eXtreme Pragramming)
- 애자일 방법론 중 하나
1. Planning : 요구사항을 작은 요소로 분할
2. Analysis
3. Design
4. Execution : Coding, Testing
5. Wrapping : small release, process improvement
6. Closure : launch

#### 스크럼 (Scrum)
![scrum](/static/image/scrum.png)
- 조직적으로 애자일 방법론을 적용

- 구성 요소
  - 백로그 (Backlog) : 할 일 목록
  - 스프린트 (Sprint) : Iteration을 의미, 1~4주의 기간
  - 스크럼 회의 : 매일 15분간 진도 확인 회의
  - 리뷰 : 스프린트 종료 후 구현된 산출물을 리뷰
  - 스프린트 회고 : 방법론 자체에 대한 리뷰 수행

### 프로세스 모델 선정
- 일반적인 구축 : 폭포수 모델
- 대규모 재구축 : 점증적 모델, 나선형 모델
- 임베디드 시스템 : 점증적 모델
- 프로젝트 타당성 검토 : 프로토타입 모델, 나선형 모델
- 연구형 개발 : 프로토타입 모델, 나선형 모델
- 소규모 : 애자일 프로세스

### 프로세스 활동
- Software speicification
  - Feasibility study(타당성 조사)
  - Requirements elicitation and analysis(요구사항 도출 및 분석)
  - Requirements specification(요구사항 명세)
  - Requirements validation(요구사항 검증)

- Software deisgn and implementation
  - Architectureal design
  - Interface design
  - Component design
  - Data structure design
  - Algorithm design

- Software validation
  - Vertification and validation (V&V) : 시스템이 요구사항을 충족한다는 것을 보여주기 위한 활동
    - Component or unit testing
    - System testing
    - Acceptance testing
- Software evolution
  - 변화하는 비즈니스 환경에 따라 요구사항이 변화함에 따라 소프트웨어 진화하고 변화해야 한다

## 프로젝트 관리

### 프로젝트 관리 활동
- 제안서 작성
- 프로젝트 계획 및 스케줄링
- 프로젝트 비용 계획
- 프로젝트 모니터링 및 검토
- 인력 선발 및 평가
- 보고서 작성 및 프레젠테이션

### 프로젝트 개발 노력 추정
- 프로젝트 요소
  - 문제의 복잡도, 시스템의 크기, 시스템 신뢰도
- 자원 요소
  - 인적 자원, H/W 자원, S/W 자원
- 생산성 요소
  - 개발자 능력, 개발 방법론

#### 기능 점수 모델 (UFP: Unadjusted Function Point) 산정
- 5가지 소프트웨어 구성 요소별 기능 점수 가중치 부여
  - 외부 입력, 외부 출력, 외부 질의
  - 내부 논리 파일, 외부 인터페이스 파일

#### 기능 점수 모델 (VAF: Value Adjustment Factor) 산정
- 14가지 기술적 분야에 대한 복잡도를 고려하여 0~5 점수 부여

#### 기능 점수 모델 (AFP: Adjusted Function Point) 산정
- AFP = UFP * VAF

#### 객체 점수 모델
- Cc(Class Complexity): 클래스의 개수 추정
- Wi: 사용자 입력의 종류 분류, 가중치 부여
- 최종 클래스 개수(TCc) = Cc(Wi+1)
- Effort = TCc X MD(클래스 1개 개발하는데 소요되는 생산성 추정 값)

### 프로젝트 일정 관리
- Action: 프로젝트에서의 활동
- Milestones(이정표): 프로젝트에서의 중요한 시점
- Deliverables(납품물)

#### PERT/CPM 차트
![pert_cpm_chart](/static/image/pert_cpm_chart.png)
- 임계 경로
  > Pert Chart에서 소요 기간이 가장 긴 경로  
  > -> 프로젝트 완료까지 필요한 최소 시간

#### 간트(Gantt) 차트
![gantt_chart](/static/image/gantt_chart.png)
- 가로축: 시간
- 세로축: 작업
- 마일스톤: 마름모 표시
- 파란색 막대: 여유시간

#### 애자일 일정 계획
- 스토리카드 단위의 일정 계획

### 프로젝트 인적 자원 관리
#### 계층형 팀
- 초보자와 경험자를 분리
- 장점 : 소프트웨어가 크고 구조가 계층적으로 잘 나누어진 경우에 적합
- 단점 : 기술 인력이 관리, 의사 전달 경로가 김
#### Egoless 팀
- 민주주의 방식, 구성원이 동등한 책임과 권환
- 장점 : 의사 교류 활발, 복잡한 장기 프로젝트에 적합
- 단점 : 책임이 불명확, 느린 의사결정, 대규모 프로젝트에 부적합
#### 책임 프로그래머 팀의 구성
- 작은 팀으로 구성, 책임 프로그래머가 통제
- 책임 프로그래머, 프로그램 사서, 보조 프로그래머, 프로그래머로 구성
- 장점 : 의사 결정이 빠름, 소규모 프로젝트에 적합
- 단점 : 한 사람의 능력과 경험이 프로젝트의 성패 좌우

### 프로젝트 위험 관리
- 위험 종류
  - 프로젝트 위험, 제품 위험, 비즈니스 위험
- 위험 관리 프로젝트
  1. 위험 식별
  2. 위험 분석
  3. 위험 대처 계획 수립
  4. 위험 모니터링

### 위험 대처 계획 수립
- 회피 전략: 위험이 발생할 확률을 줄임
- 최소화 전략: 위험의 영향을 줄임
- 비상 계획: 위험이 발생할 경우 대처 방법

## 요구사항 개발 및 정의

### 요구사항 분석과정
- 도메인 분석 -> 요구사항 추출 -> 분석 및 명세화 -> 검토

### 도메인 분석
> 소프트웨어 엔지니어가 문제를 더 잘 이해하기 위하여 도메인에 대하여 알아가는 과정
- 도메인: 소프트웨어를 사용할 것으로 예상되는 고객이 일하는 분야의 비즈니스나 기술
- 도매인 분석의 이점
  - 빠른 개발, 더 좋은 시스템 구축 가능, 확장 예견

### 문제 정의와 범위 설정
- 문제 정의서
  - 문제 정의 범위
  - 시스템에 포함되어야 할 기능 결정

### 요구사항 추출
- 요구사항 추출 방법
  - 관찰, 인터뷰, 브레인스토밍, 프로토타이핑, 유스케이스 분석

#### 관찰
- 사용자를 관찰, 시간이 많이 소요된다
#### 인터뷰
- 문제에 대해 최소한의 허용 가능한 솔루션이 무엇인지 질문
- 다이어그램 작성을 요구
### 브레인스토밍
- 관련자 모두가 참여
- JAD(Joint Application Development)
  - 최종 사용자와 개발자가 시스템 개발 논의
### 프로토타이핑
- paper prototype: 가장 단순한 형태
- mock-up of the UI : 가장 흔한 형태

### 요구사항 문서 구성
- 환경 및 시스템 모델
- 기능적 요구사항
- 비기능적 요구사항 : 성능, 효율 등

## 유스케이스 모델링
### 유스케이스
> 시스템이 actor에게 관찰 가능한 가치의 결과를 생산하기 위해 수행하는 일련의 행동 및 그 변형들의 집합
- 유스케이스는 완전한 기능을 명세한다
- 시나리오 : 특정한 목표를 달성하기 위해 수행되는 일련의 행동이나 집합

### 유스케이스 다이어그램
- 시스템, 액터, 유스케이스를 포함
- 시스템 : 개발될 시스템의 경계
- 액터 : 시스템과 상호작용할 때 외부 에이전트가 수행하는 역할
- 유스케이스
  - 항상 액터에 의해 개시됨
  - 액터에게 가치를 제공
  - 완전한 설명이어야 함

### 유스케이스 간의 관계
- 포함 관계
  - 다수의 유스케이스가 공통된 행동을 수행하는 경우, 포함시킬 수 있다.
- 확장 관계
  - 한 유스케이스의 확장 지점에 액션을 추가하여 다른 유스케이스로 확장

### 유스케이스 검증
- 검증: 구현을 테스트
- 확인: 사용자의 요구를 충족시키는가?
- 워크쓰루: 액터와 시스템의 역할극
  
### 유스케이스 실현
- 유스케이스는 collaboration으로 실현

## 클래스 모델링
### UML
- Unified Modeling Language
- 객체지향 소프트웨어를 모델링하기 위한 표준 그래픽 언어
- 클래스
  - 사각형으로 표현
  - 이름, 속성, 오퍼레이션 표시
- 속성
- 오퍼레이션
  - getter(), setter()
  - operation signature의 표현
    ```text
    + digit(n:int)
    ```
- 가시성
  - public(+), private(-), protected(#)
- 연관관계
  - 관계이름: 동사, 동사구
  - 다중성: 관계 사이에 개입하는 인스턴스 개수
    - 0..1: 선택적 관계
    - 1..*: 1개 또는 그 이상
    - 3..5: 3개에서 5개까지
    - One-to-one
    - Many-to-many
    - One-to-many
  - 역할 이름: 역할, 링크 양 옆에 표시
  - 방향성 : 연관관계는 기본적으로 양방향성, 단방향으로 제한 가능
- 전체/부분 관계 (Aggregation)
  - 전체 객체가 부분 객체를 포함
  - 흰색 다이아몬드로 표시
  - Composition 관계
    - aggregation이 강한 관계
    - 전체가 소멸되면 부품도 소멸됨
    - 검은 다이아몬드로 표시
  - 일반화 관계 (Generalization)
    - 일반화: 두 가지 이상의 클래스의 공통 요소를 일반화
    - 상세화(specialization): 수퍼클래스를 서브클래스로 구체화
  - 추상클래스
    - (abstract)로 표시
    - 추상 오퍼레이션: 구현이 없는 오퍼레이션
  - 인터페이스
    - <\<interface\>>로 표시
  - Notes = 주석
  
  ### OCL (Object Constraint Language)
  - 소프트웨어의 모듈의 제약사항을 정형적으로 나타내도록 설계된 명세 영어