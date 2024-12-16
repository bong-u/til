---
title: "Python의 동작 원리"
date: 2024-12-16
tags: ["python", "cs"]
---

## 파이썬의 구현체 

### CPython
> 파이썬의 표준 구현체이자 인터프리터

#### 역할
1. 파이썬 코드를 바이트 코드로 변환
2. 바이트 코드를 실행

#### 파이썬 바이트 코드
- `.pyc` 파일에 저장
- 플랫폼에 독립적
- 파이썬 가상 머신(PVM)에서 실행
- 예시
	```
	  4           0 LOAD_GLOBAL              0 (print)
				  2 LOAD_CONST               1 ('hello world')
				  4 CALL_FUNCTION            1
				  6 POP_TOP

	  5           8 LOAD_CONST               2 (True)
				 10 RETURN_VALUE
	```

### Jython
> 파이썬 코드를 자바 바이트 코드로 변환, JVM에서 실행

- 장점 : 자바 라이브러리 호출, 자바 클래스 사용 가능, GIL 없음
- 단점 : 파이썬 3.x 지원하지 않음, CPython 대비 속도가 느림

### PyPy
> 파이썬 코드를 JIT 컴파일하여 실행
- RPython(Restricted Python)으로 작성된 파이썬 인터프리터

#### 접근 방식
1. RPython(엄격한 파이썬)을 만들어 인터프리터를 작성
2. RPython의 효과적인 컴파일을 위해 다른 언어로 툴체인을 제작
3. Python 구현을 RPython 문법으로 작성
4. 3에서 만든 구현을 1, 2를 통해 얻은 인터프리터로 컴파일
5. 4에서 만든 후보들의 성능을 측정하고, 개선
6. 5의 산출물을 출시, 다시 반복

#### 장단점
- 장점 : CPython 대비 빠른 속도, 다양한 플랫폼 지원
- 단점 : 특정 라이브러리 호환성 문제가 존재, 메모리 사용량이 큼

