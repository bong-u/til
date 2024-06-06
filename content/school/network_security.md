---
title: "네트워크 보안"
date: 2024-06-05
---

## 네트워크 보안 개요

### 네트워크 보안의 요구사항
- 기밀성(Confidentiality)
    > 정보를 권한이 없는 개인에게 노출되지 않도록 함
- 무결성(Integrity)
    > 정보와 프로그램은 인가된 방식으로만 변경되도록 함
- 가용성(Availability)
    > 정보 자산에 대해 적절한 시간에 접근 가능하도록 함

### 보안 공격의 종류
1. 소극적 공격(Passive Attack)
    - 정보를 도청하거나 감시하는 공격
    - 방어방법 : 암호화
2. 적극적 공격(Active Attack)
    - 정보를 변조하거나 삭제하는 공격
    - 방어방법 : 메시지 인증

### 보안 서비스
1. 인증(Authentication)
    > 사용자의 신원을 확인하는 과정
    - 대등 개체 인증, 데이터-근원지 인증
2. 접근 제어(Access Control)
    > 자원을 불법적으로 사용하지 못하도록 방지하는 것
3. 데이터 기밀성(Data Confidentiality)
    > 데이터의 불법적 노출을 막는 것
    - 연결기밀성, 비연결 기밀성, 선별된-필드 기밀성, 트래픽-흐름 기밀성
4. 데이터 무결성(Data Integrity)
    > 수신된 데이터가 송신된 데이터와 일치하는지 확인하는 것
    - 연결형 데이터 무결성, 비연결형 데이터 무결성
    - 복구 가능한 데이터 무결성, 복구 불가능한 데이터 무결성
    - 선별된-필드 연결 무결성, 비연결 무결성, 선별된-필드 비연결 무결성
5. 부인 봉쇄 (Non-repudiation)
    > 통신의 한 주체가 통신에 참여했던 사실을 부인하는 것을 방지
6. 가용성 서비스 (Availability Service)
    > 서비스를 사용할 수 있는 상태를 유지하는 것


### 보안 메커니즘
#### 특정 보안 메커니즘
> 특정 프로토콜 계층에서 구현되는 메커니즘
- 인증
- 암호화
- 디지털 서명
- 접근 제어
- 데이터 무결성
- 인증 교환
- 트래픽 패딩
- 경로 제어
- 공증

#### 일반 보안 메커니즘
> 계층과 서비스에 독립적인 메커니즘
- 신뢰받는 기능
- 보안 레이블
- 사건 탐지
- 보안 감사 추적
- 보안 복구

## 암호 기술의 이해

### 전통적인 암호 기술
#### 암호를 사용하는 목적
- 비밀성 유지 (Confidentiality)
- 무결성 유지 (Data Integrity)
- 사용자 또는 자료의 출처 인증 (Authentication)
- 부인 방지 (Non-repudiation)

#### 암호 해독
> 해독자는 암호 시스템을 알고 있지만, 키만 모름
- Cipher Text Only Attack : 암호문 단독 공격
- Know Plain Text Attack : 알려진 평문 공격
- Chosen Plain Text Attack : 선택적 평문 공격

#### 공개키 암호화 비밀키 암호의 비교
| 구분 | 공개키 암호 | 비밀키 암호 |
|---|---|---|
| 키의 관계 | 암호화 키 != 복호화 키 | 암호화 키 = 복호화 키 |
| 키의 개수 | 2n | n(n-1)/2 |
| 1인당 필요한 비밀키 | 1 | n-1 |
| 속도 | 비효율적 | 효율적 |


#### 대칭키(비밀키) 암호
- 종류
    - 블록 암호 : 블록 단위로 암호화
        > DES, IDEA, AES
    - 스트림 암호 : 비트 단위로 암호화
        > RC4, A5/1
    - 한국에서 사용하는 알고리즘
        > NEAT, SEED, NES, ARIA

#### 공개키(비대칭키) 암호
- 종류
    - 소인수 분해 기반 : RSA
    - 이산 대수 기반 : ElGamal
    - 타원 곡선 기반
- 키 생성
    - 서로소인 두 소수 p, q를 선택
    - n = p * q
    - φ(n) = (p-1)(q-1)
    - gcd(e, φ(n)) = 1을 만족하는 e 선택
    - d * e mod φ(n) = 1을 만족하는 d 선택
    - 공개키 : {e, n}, 비밀키 : {d, n}
- 암호화
    > C = M^e mod n
- 복호화
    > M = C^d mod n
- DH (Diffie Hellman) 키 공유
    - q(소수), α(q의 원시근, α<q)
    - 임의 수 $X_A < q$를 만족하는 $X_A$를 선택
    - 공개할 $Y_A = \alpha^{X_A} mod\ q$
    - 상대방이 생성하는 비밀키 K = $Y_A^{X_B} mod\ q$

### 암호 기술의 활용
#### 디지털 서명
- 특성
    > 위조 불가, 변경 불가, 서명자 인증, 재사용 불가, 부인 방지
- 서명자의 비밀키로 암호화
- 서명자의 공개키로 복호화

#### 단방향 해시 함수를 이용한 메시지 인증
- 해시 함수의 요건
    - 단방향성 : H(x) = h일때, x를 찾는 것이 불가능해야한다
    - 약한 충돌 저항성 : H(x)=H(y)를 만족하는 y(=x)를 찾는 것이 불가능해야한다
    - 강한 충돌 저항성 : H(x)=H(y)를 만족하는 (x, y)를 찾는 것이 불가능해야한다

#### 공개키 기반 구조
- 인증서
    > 공개키와 사용자 정보를 포함한 전자 문서
    - 표준 : X.509 v3
- PKI (Public Key Infrastructure)
    > 공개키를 관리하고 인증하는 구조
    - CA (Certificate Authority) : 인증서 발급
    - RA (Registration Authority) : 사용자 등록

### 동형암호와 양자암호 기술
#### 동형암호
> 암호화된 상태에서 연산을 수행한 결과를 복호화하면 원문과 같은 결과를 얻는 암호화 기법
- 부분 동형 암호 : 덧셈과 곱셈 중에서 하나의 연산만 지원
- 준동형 암호 : 연산의 횟수에 제한이 존재
- 완전 동형 암호 : 임의의 계산을 수행 가능
- 활용
    - 암호화된 상태로 연산을 하기 때문에 보안성이 높음

#### 양자 내성 암호 (PQC: Post Quantum Cryptography)
> 양자 컴퓨터에 의한 공격으로부터 안전한 공개키 암호

- QKD(Quantum Key Distribution) : 양자 통신을 위해 비밀키를 분배/관리하는 기술
- QRNG(Quantum Random Number Generator) : 양자 난수 생성기

## 사용자 인증

### 사용자 인증 원리
- 인증 절차
    1. 신원 확인 단계
    2. 입증 단계
- NIST의 전자 인증 모델
- 인증 수단
    - 알고 있는 것을 통한 인증 : 비밀번호
    - 소유물을 통한 인증 : OTP 기기, 인증서
    - 생체 조직을 통한 인증 : 지문, 망막
    - 행동을 통한 인증 : 목소리 패턴, 필적
- 보존 등급 영향 프로파일
    - 보증레벨 : 신뢰서 정도에 따라 4가지 등급으로 분류

### 비밀번호 기반 인증
- 공격 유형
    - 오프라인 사전 공격
    - 특정 계정 공격
    - 잘 알려진 패스워드 공격, 대입 공격
    - 단일 사용자에 대한 패스워드 추측
    - 단말기 강탈
    - 사용자 실수 이용
    - 다중 비밀 번호 사용
    - 컴퓨터 모니터링 : 통신 패킷 분석
-  해시화된 비밀번호 사용
    - Salt의 역할
        > 비밀번호가 같아도 다른 해시값을 가지도록 함
- 패스워드 크랙킹
    - 사전 공격
    - 레인보우 테이블 공격 : 모든 솔트에 대한 해시 값을 계산해 놓은 테이블을 이용
- 패스워드 선택 기법
    - 사용자 교육
    - 컴퓨터 발생 패스워드
    - 패스워드 검사의 활성화 : 자체 패스워드 크래커 실행
    - 사전 패스워드 검사 : 패스워드 안정성 검사

### 토큰 기반 인증
#### 종류
- 메모리 카드 
- 스마트 카드 : 임베디드 마이크로프로세서 포함

### 생체 인증
- 기술 정확도 : 확률 밀도 함수로 표현하면 정규 분포를 따름
- FAR (False Acceptance Rate) : 거짓 수락률
- FRR (False Rejection Rate) : 거짓 거부율
- EER (Equal Error Rate) : FAR과 FRR이 같은 지점

### 원격 사용자 인증
- 멀티 팩터 인증 : 두 요소 이상을 사용한 인증
- 멀티 채널 인증 : 다양한 채널을 통해 인증

#### 인증 프로토콜
- 패스워드 프로토콜
    1. 호스트가 난수를 생성, 사용자에게 전송
    2. 사용자는 패스워드와 난수를 조합하여 해시값을 생성, 전송
- 토큰 프로토콜
    1. 호스트가 난수를 생성, 사용자에게 전송
    2. 사용자는 토큰을 사용하여 난수를 암호화, 전송
- 정적 생체 프로토콜
    1. 호스트는 난수와 암호화를 위한 식별자를 전송
    2. 사용자는 이를 사용하여 생체 정보를 암호화, 전송
- 동적 생체 프로토콜
    1. 호스트가 사용자에게 랜덤 시퀀스나 난수를 전송
    2. 사용자는 이를 말하거나, 글자를 쓰는 등의 동작을 수행, 암호화 후 전송

## 접근 제어

### 접근 제어 원리

#### 접근제어 철학
- 접근통제 영역
    - 관리적 통제
    - 기술적 통제
    - 물리적 통제
- 접근 제어 원칙
    - 알 필요성 원칙
    - 최소 권한 원칙
    - 최대 권한 원칙
    - 직무 분리 원칙

#### 접근 제어 기본 요소
- 주제 : 객체에 접근 가능한 존재 : owner, group, other
- 객체 : 접근이 제어되는 자원 : 파일 또는 레코드
- 접근 권한 : 주체가 객체에 접근할 수 있는 방법 : 읽기, 쓰기, 실행 등

#### 접근 제어 요구 사항
- 닫힌 정책 : 화이트리스트 관리
- 열린 정책 : 블랙리스트 관리

#### 접근 제어 정책
- 임의 접근 제어 (DAC)
- 강제적 접근 제어 (MAC)
- 역할 기반 접근 제어 (RBAC)
- 속성 기반 접근 제어 (ABAC)

### 임의 접근 제어 (DAC, 자율적 접근 제어율)
> 한 개체가 자신의 의지대로 다른 개체에게 권한을 부여하는 방식

#### 접근 제어 목록 (access control list)
    > 개체별로 접근 권한을 명시하는 방식

#### 인가 테이블

#### 확장된 접근 제어 매트릭스

#### UNIX 파일 접근 제어
- Set-UID : 실행할 때, euid를 소유자의 id로 설정됨
    - ex) -rwsr-xr-x : 4755 
- Set-GID : 실행할 때, egid를 소유그룹의 id로 설정됨
    - ex) -rwxr-sr-x : 2755
- 패스워드 파일 : /etc/shadow : ---------- : 000

### 역할 기반 접근 제어
> 사용자의 역할에 따라 접근 권한을 부여하는 방식

#### 역할 계층 - RBAC1
> 역할 구조는 기관 내 역할의 계층 구조를 나타내는 수단
#### 제약(전제조건)의 의미와 종류 - RBAC2
- 제약의 종류
    - 상호 배타적인 역할 : 직무와 능력을 분리
    - cardinality : 역할에 관한 최대숫자를 설정
    - 전제 조건 : 특정 역할이 다른 명시된 역할에 할당 되었다면, 사용자는 그 역할에만 할당될 수 있다

### 속성 기반 접근 제어
> 자원과 주체의 성질의 특성에 대한 조건을 표현하여 접근 권한을 정의하는 방식

#### 속성
> 주체, 객체 환경 조건, 권한에 의해 미리 정의되고 할당된 요구 동작의 특정 측면을 정의하는 성질
- 유형
    - 주체 속성 : 사용자, 응용 프로그램, 프로세스, 디바이스
    - 객체 속성 : 디바이스, 파일, 프로그램, 네트워크 등
    - 환경 속성 : 날짜, 시간, 네트워크 보안 레벨 등

#### ABAC의 논리 구조
- ACL 접근 체인
- ABAC 신뢰 체인

#### 정책
> 조직 내에서 주체의 권한과 환경 조건에서 자원 혹은 객체들이 보호되는 것에 기반한 허가된 행위를 관리하는 규칙과 관계의 집합

### 강제적 접근 제어 (MAC)
> 객체에 포함된 정보의 비밀성과 이러한 비밀성의 접근 정보에 대하여 주체가 갖는 권한에 근거하여 객체에 대한 접근을 제한하는 방법

#### 기밀성에 따른 접근 권한 제어
- No read up (단순 보안 속성)
    > 보안 수준이 낮은 주체는 보안 수준이 높은 객체를 읽을 수 없음
- No write down (*(스타) 보안 특성)
    > 보안 수준이 높은 주체는 보안 수준이 낮은 객체에 기록할 수 없음
#### 무결성에 따른 접근 권한 제어
- No read up (단순 무결성 특성)
    > 보안 수준이 높은 주체는 보안 수준이 낮은 객체를 읽을 수 없음
- No write down (*(스타) 무결성 특성)
    > 보안 수준이 낮은 주체는 보안 수준이 높은 객체에 기록할 수 없음

### 신원, 신용장, 접근 관리 (ICAM)