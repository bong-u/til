---
title: "JS: Arguments object"
date: 2023-04-05
---

### 상황
* 나의 기술 블로그와 Google Analytics를 연결하기 위해 tag를 삽입하는 작업 중 이었다.
* 구글에서 제공하는 태그 소스 중 일부이다.

```js
function gtag(){ dataLayer.push(arguments); }
```
* 나는 function 키워드를 사용한게 마음에 들지 않아. 아래와 같이 화살표 함수로 바꾸어 작업하였다.

```js
  const gtag = (...args) => { dataLayer.push(args); }
```

* 하지만 내 코드는 정상적으로 동작하지 않았고 구글의 코드 그대로 적용해야만 google analytics가 동작하였다.
* 이유는 두 방식의 차이점에 있었는데, 어떤 점이 다른건지 알아보게 되었다.

### Arguments object 
* Arguments 객체는 함수에 전달되는 유사 Array 형태이다.
* 함수 parameter에 어떻게 명시되어있건 상관없이 동작한다.
```js
function func1(a, b, c) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}
```
* arguments 객체는 3가지로 구성된다.
1. 함수에 넘겨진 인자 (index는 0부터 시작한다)
2. length : 인자의 개수
3. callee : 현재 실행 중인 함수의 참조값

### Arrow function에서는?
* arrow function에서는 arguments 객체를 사용할 수 없다.
* 대신 ...args와 같은 문법으로 아래와 같이 사용할 수 있다.
* 여기서는 Arguments 객체가 아닌 진짜 Array로 가져온다.
```js
const func2 = (...args) => {
  console.log(args[0]);
}
```

### 정리
* Google analytics가 정상적으로 동작하기 위해서는 dataLayer에 Arguments object가 push 되었어야 하는데,
* 내가 임의로 바꾸어서 Array가 push 되었다. 따라서 코드가 정상적으로 동작하지 않았다는 것을 알 수 있었다.
