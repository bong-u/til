---
title: "프론트엔드(react) 면접 준비"
date: 2024-05-27
draft: true
---

#### React의 특징
- Component 기반
- Virtual DOM
- JSX
- 단방향 데이터 흐름
- 생명주기 메소드
- Hooks

#### DOM
> HTML element를 tree형태로 표현한 것

#### Virtual DOM
> DOM을 직접 조작하지 않고, 가상의 DOM을 만들어서 조작한 후, 실제 DOM과 비교하여 변경된 부분만 업데이트하는 방식
- Diffing : 이전 Virtual DOM과 현재 Virtual DOM을 비교
- Reconciliation : 변경된 부분만 실제 DOM에 반영
- Batch Update : 여러 개의 변경사항을 한번에 업데이트

#### React Component
- Class Component
    - 생명주기 메소드를 포함
    - 상속을 통해 Component를 생성
    - mutable state를 가질 수 있음
- Functional Component
    - immutable하다
    - stateless
    - Hooks를 사용

#### LifeCycle Method
- Mounting
    - constructor : 컴포넌트 생성자
    - static getDerivedStateFromProps : props로 state를 설정
    - render : 컴포넌트 렌더링
    - componentDidMount : 컴포넌트가 마운트된 직후
- Updating
    - static getDerivedStateFromProps : props로 state를 설정
    - shouldComponentUpdate : 컴포넌트 업데이트 여부 결정
    - render : 컴포넌트 렌더링
    - getSnapshotBeforeUpdate : 컴포넌트 업데이트 직전
    - componentDidUpdate : 컴포넌트 업데이트 직후
- Unmounting
    - componentWillUnmount : 컴포넌트가 언마운트되기 직전

### React Hooks
> 함수형 컴포넌트에서 state와 생명주기 메소드를 사용할 수 있게 해주는 기능

#### 기본 Hooks
- useState
    > state를 사용
- useEffect
    > componentDidMount, componentDidUpdate, componentWillUnmount를 대체
- useContext
    > prop 대신 전역 context를 사용 (props drilling 방지)

#### 추가 Hooks
- useReducer
    > 복잡한 정적 로직, 다음 state가 이전 state에 의존적인 경우 사용 (useState 대체)
- useRef
    > 렌더링 없이 변경되는 값을 저장
- useMemo : 메모이제이션
    > 마지막 렌더링 이후 값이 변경되지 않으면 이전 값을 반환
- useCallback : 콜백 함수를 사용
    > 마지막 렌더링 이후 함수가 변경되지 않으면 이전 함수를 반환



