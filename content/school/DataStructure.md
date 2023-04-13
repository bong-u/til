---
title: "자료구조"
date: 2023-03-02
---

# 제 1장 : 자료구조를 배우기 위한 준비 (230302)

### 배열

- 배열(Array): 동일한 타입의 원소들이 **연속적인 메모리 공간**에 할당되어 있는 기초적인 자료구조

### 추상데이터 타입

- 추상데이터타입(**ADT**:Abstract Data Type) : 데이터와 그 데이터에 대한 추상적인 연산들로써 구성
- ADT =~ 자바의 interface, 자료구조 =~ 자바의 class
- 자료구조는 추상데이터타입을 구체적으로 구현한 것

## 1-2 수행시간의 분석

- 알고리즘의 성능: 수행시간을 나타내는 **시간복잡도(Time Complexity)**와 알고리즘이 수행되는 동안 사용되는 메모리 공간의 크기를 나타내는 **공간복잡도(Space Complexity)**에 기반하여 분석

* 시간 복잡도

  - 시간복잡도는 알고리즘(연산)이 실행되는 동안에 사용된 기본적인 연산 횟수를 입력 크기의 함수로 나타낸다.
  - 기본 연산(Elementary Operation)이란 데이터 간 크기 비교, 데이터 읽기 및 갱신, 숫자 계산 등과 같은 단순한 연산을 의미

* 4가지 종류의 분석

  - 최악경우 분석(Worst-case Analysis) : 상한선의 의미
  - 평균경우 분석(Average-case Analysis)
  - 최선경우 분석(Best-case Analysis) : 가장 빠른 수행시간
  - 상각분석(Amortized Analysis) : 총 연산횟수를 합하고 연산 횟수로 나누어 수행시간을 분석

## 1-3 수행시간의 점근표기법

- O (Big-Oh)-표기법
- Ω (Big-Omega)-표기법
- Θ (Theta)-표기법

### O (Big-Oh) 표기법

- 모든 N ≥ N0에 대해서 f(N) ≤ cg(N)이 성립하는 양의 상수 c와N0가 존재하면, f(N) = O(g(N))이다. 모든 N ≥ N0에 대해서 f(N) ≤ cg(N)이 성립하는 양의 상수 c와 N0가 존재하면, f(N) = O(g(N))

* f(N) = O(g(N))은 N0 보다 큰 모든 N 대해서 f(N)이 양의 상수를 곱한 g(N)에 미치지 못한다는 뜻
* g(N)은 f(N)의 **상한(Upper Bound)** 이라고 한다

### Ω (Big-Omega) 표기법

- 모든 N ≥ N0에 대해서 f(N) ≥ cg(N)이 성립하는 양의 상수 c와 N0가 존재하면, f(N) = Ω(g(N))
- f(N) = Ω(g(N))은 양의 상수를 곱한 g(N)이 f(N)에 미치지 못한다는 뜻
- g(N)을 f(N)의 **하한(Lower Bound)** 이라고 한다

### Θ (Theta) 표기법

- 모든 N ≥ N0에 대해서 c1g(N) ≥ f(N) ≥ c2g(N)이 성립하는 양의 상수 c1, c2, N0가 존재하면, f(N) = Θ(g(N))
- Θ-표기는 수행시간의 O-표기와 Ω-표기가 동일한 경우에 사용

### 자주 사용되는 함수의 O-표기와 이름

- O(1), O(logN), O(N), O(NlogN), O(N2), O(N3), O(2N)

## 1-5 순환 (Recursion)

### 순환으로 구현된 메소드의 구성요소

- 기본(Base) case : 스스로를 더 이상 호출하지 않는 부분
- 순환 case : 스스로를 호출하는 부분

### 꼬리 순환 (Tail Recursion)

- 메소드의 마지막 부분에서 순환 (호출 후 되돌아 왔을때 수행할 연산이 없는 경우)
- 꼬리 순환은 반복문으로 변환하는 것이 효율적이다

```java
public class TailRecursion {
  public static int factorial(int n, int fact) {
    if (n==1)
      return fact;
    return factorial( ,);
  }
}
```

# 제 2장 : 리스트

### 리스트

- 일련의 동일한 타입의 항목들이 나열된 것

### 배열

- 동일한 타입의 원소들이 연속적인 메모리 공간에 할당되어 각 항목이 하나의 원소에 저장되는 기본적인 자료구조
- 접근 : O(1), 삽입/삭제 : O(n)

### 배열로 리스트 구현 (ArrList)

- peek, insert, resize, delete

### 단순 연결 리스트(Singly Linked List)

- print, search, insertFront, insertAfter

* 자기참조변수
  ```java
  public class Node <E> {
    private Node<E> next; // 자기 참조 변수
    ...
  }
  ```
* 수행시간
  - search : O(n)
  - insert, delete : O(1), p가 안주어지면 O(n)

### 이중 연결 리스트 (Doubly Linked List)

- head, tail, item
- insertBefore, insertAfter, delete,

* 수행시간
  - 삽입/삭제 연산 : O(1)
  - 탐색 연산 : O(n)

### 원형 연결 리스트(Circular Linked List)

- 수행시간
  - 삽입/삭제 연산 : O(1)
  - 탐색 연산 : O(n)

# 제 3장 : 스택과 큐

## 스택

- 배열로 구현 / LinkedList로 구현
- 후위 표기 <-> 중위 표기
- 수행시간
  - push, pop : O(1)
  - 배열 크기의 확대/축소 : O(n)
  - 단순 연결 리스트의 pop, push : O(1)

## 제 4장 : 트리

### 용어

- root, parent, child
- leaf, sibling, ancesto리(조상), descendant(후손)
- subtree(노드 자신과 후손으로 구성된 트리)
- degree(차수 : 자식 수)
- level (깊이와 동일, 0 또는 1부터 시작)
- height (트리의 최대 level)
- key (탐색에 사용되는 노드에 저장된 정보)

### 왼쪽 자식-오른쪽 형제 (Left Child-Right Sibling) 표현

- 노드의 왼쪽 자식과 오른쪽 형제를 가리키는 2개의 레퍼런스만 사용

### 이진 트리 (Binary Tree)

- 각 노드의 자식 수가 2 이하인 트리

* 특별한 형태의 이진트리

  ![speical binary tree](/static/image/ds_speical_binary_tree.png)

  - 포화 이진 트리(Perfect Binary Tree)
    - 각 내부 노드가 2개의 자식을 가지고 모든 이파리가 같은 층에 있는 트리
  - 완전 이진 트리(Complete Binary Tree)
    - 마지막 레벨을 제외한 각 레벨이 노드들로 꽉 차있고, 마지막 레벨에는 노드들이 왼쪽부터 빠짐없이 채워진 트리

* 이진 트리의 속성

  - 레벨 k에 있는 최대 노드 수 = $2^{k-1}$
  - 높이가 h인 포화 이진 트리에 있는 노드 수 = $2^{h}-1$
  - n개의 노드를 가진 완전 이진 트리의 높이 = $log_{2}(n+1)$
  - 높이가 h인 완전 이진트리에 존재할 수 있는 노드 수 n

* 배열에 저장된 이진 트리

  - 트리

    ```bash
    A
    ├── B
    │   ├-─ D
    │   │   ├── H
    │   │   └── I
    │   └-─ E
    │       ├── J
    │       └── K
    └── C
        ├── F
        └── G

    ```

- 위 트리를 배열에 저장하면 (인덱스 1부터 시작)

  ```
  A = [A, B, C, D, E, F, G, H, I, J, K]
  ```

  - a[i]의 부모는 **a[i/2]**, 단 i>1
  - a[i]의 왼쪽 자식은 **a[2i]**, 단 2i <= n
  - a[i]의 오른쪽 자식은 **a[2i+1]**, 단 2i+1 <= n

- 편향(skewed) 이진 트리
  - 메모리 낭비가 심하다

### 이진 트리의 순회

preorder ; root - left - right
inorder : left - root - right
postorder : left - right - root
levelorder : left -> right (from top level)

### 수행 시간

- O(n) 시간이 소요

### 집합의 표현

- 배열
  | index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
  | - | - | - | - | - | - | - | - | - | - | - |
  | value | 4 | 2 | 7 | 7 | 4 | 4 | 2 | 7 | 7 | 4 |

* 집합 1

```bash
7
├── 2
│   ├-─ 1
│   └-─ 6
├── 8
└── 3
```

- 집합2

```bash
4
├── 0
├── 5
└── 9
```

- 수행 시간
  - union : O(N)
  - find : O(N)
