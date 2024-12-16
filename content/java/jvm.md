---
title: "JVM(Java Virtual Machine)"
date: 2024-12-13
tags: ['Java', 'CS']
---

> 자바 바이트 코드를 실행할 수 있는 가상 머신

## JVM의 구조
![JVM 구조](/static/image/jvm_structure.png)

### 클래스 로더 (Class Loader)
1. 로딩 (Loading) : .class 파일을 읽어들여 메모리에 적재
2. 링크 (Linking) : 적재된 클래스의 참조를 확인하고 준비
3. 초기화 (Initialization) : static 블록과 static 변수 초기화

### 실행 엔진 (Execution Engine)
- 클래스 로더가 메모리에 적재된 바이트 코드를 실행하는 역할

#### 인터프리터 (Interpreter)
- 바이트 코드를 명령어 단위로 읽어서 실행
#### JIT 컴파일러 (Just-In-Time Compiler)
- Runtime 시점에 바이트 코드 전체를 컴파일하여 기계어로 변경 후 실행 -> 성능 향상
#### GC (Garbage Collector)
- 더 이상 사용하지 않는 메모리를 해제하는 역할


### 런타임 데이터 영역 (Runtime Data Area)

![Runtime Data Area 구조](/static/image/jvm_rda_structure.png)

#### PC(Program Counter)
- 스레드가 실행되는 부분의 주소를 가리키는 포인터

#### JVM 스택 (JVM Stack)
- 메소드 호출 시마다 프레임을 추가하고, 메소드가 종료되면 해당 프레임을 제거
- 각 프레임은 로컬 변수, 연산 스택, 메소드 수행이 끝나면 종료되는 정보를 저장

#### Native 메소드 스택
- JNI(Java Native Interface)를 통해 호출되는 C/C++/Assembly와 같은 네이티브 코드를 위한 스택

#### 힙 (Heap)
- new 키워드로 생성된 객체와 배열을 저장하는 공간

#### 메소드 영역 (Method Area)
- 클래스 정보, 상수, 정적 변수 등을 저장하는 공간
- 모든 쓰레드가 공유하는 공간 -> 멀티쓰레딩 시 동기화 처리 필요

