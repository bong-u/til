---
title: "Python의 GIL"
date: 2024-12-13
tags: ['Python', 'CS']
---

## GIL(Global Interpreter Lock)
> 하나의 쓰레드만 파이썬 바이트코드를 실행할 수 있도록 하는 것

- 파이썬의 표준 구현인 **CPython**에서만 존재

### 장점
1. **Reference Counting** 기반 메모리 관리의 Race condition 방지
2. 데이터 무결성 보장 : 멀티쓰레드 환경에서 파이썬 객체나 메모리 관련 작업이 안전하게 수행되도록 보장
3. 파이썬 Interpreter의 구현을 단순화 : 복잡한 락 메커니즘이 필요없음
4. C 확장 모듈이 Thread-Safe 하지 않더라도 안전하게 사용할 수 있도록 보장
5. 플랫폼 독립성 유지 : CPU 아키텍처별 동기화 메커니즘에 의존하지 않음

### 단점
1. 멀티코어 CPU 활용 제한: 단일 코어만 사용되므로 병렬 처리의 이점을 얻을 수 없음
2. 멀티쓰레딩 성능 저하 : 쓰레드 간 context switching이 빈번하게 발생
3. 공정성 문제 : 특정 쓰레드가 GIL을 장시간 점유하면 starvation 문제가 발생할 수 있음

### Reference Counting
> 객체가 몇 번 참조되는지를 세어서 0이 되면 메모리를 해제하는 방식

- 파이썬이 사용하는 메모리 관리 방식
- 장점 : 메모리 해제가 즉시 이루어짐
- 단점 : Reference Counting이 복잡한 객체 사이의 순환 참조를 해결하지 못함

### IO Bound Task vs CPU Bound Task
- IO Bound Task : 파일 읽기/쓰기, 네트워크 통신 등의 작업
- CPU Bound Task : 계산량이 많은 작업

- GIL이 주는 영향
	- IO Bound Task : I/O작업을 수행하는 동안 GIL이 해제되어 다른 쓰레드가 실행될 수 있음 -> 영향이 적음
	- CPU Bound Task : GIL이 해제되지 않아 다른 쓰레드가 실행될 수 없음 -> 손해가 발생

### 대안
- `multiprocessing` 모듈 사용
- C 확장 모듈 사용
- Jython, IronPython 등의 GIL이 없는 파이썬 구현 사용

