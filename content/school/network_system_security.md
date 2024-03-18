---
title: "네트워크 및 웹 보안"
date: 2024-03-11
---

## CSRF (Cross Site Request Forgery)

> 다른 사이트에서 요청을 위조하여 공격하는 기법

#### 배경

- 특정 사용자가 로그인된 상태라면, 사용자를 확인하기 위해 브라우저에서 쿠키와 함께 요청을 전송
- cross-site에서도 쿠키와 함께 요청을 보냈을때, 서버가 same-site인지 cross-site인지 확인이 불가한 경우 **CSRF 공격 가능**

#### 예상 시나리오

- 피해자가 현재 로그인된 상태로 Malicious Site에 접속
- Malicious site에서 피해자 의지와 상관없이 쿠키와 함께 요청을 전송
- GET 예시 코드
  ```html
  <img src="http://bank.com/transfer?to=attacker&amount=1000" />
  ```
- POST 예시 코드
  ```html
  <form action="http://bank.com/transfer" method="post">
    <input type="hidden" name="to" value="attacker" />
    <input type="hidden" name="amount" value="1000" />
  </form>
  <script>
    document.forms[0].submit();
  </script>
  ```

#### 방어

- Referer Header
  > 요청을 보낸 페이지의 주소를 나타내는 HTTP header를 확인하여, 요청을 보낸 페이지가 같은 사이트인지 확인
  - 한계
    - 해당 field를 이용해서 접속 기록을 확인 가능 -> 개인정보 보호 문제
- Same-Site Cookies
  > 쿠키를 전송할 때, same-site인지 cross-site인지 확인하여, cross-site인 경우 쿠키를 전송하지 않음
  - 설정 값
    - Strict (cross-site는 항상 쿠키 전송하지 않음)
    - Lax (cross-site에서 멱등성을 가지는 요청에 대해서만 쿠키를 전송?)
- Secret Token
  > 특정 origin의 첫 요청때, 특정한 토큰을 생성, 이후 요청시 해당 토큰을 함께 전송하여, 요청이 같은 Origin에서 온 것인지 확인
- Clickjacking
  > 사용자가 의도하지 않은 클릭을 유도하여, CSRF 공격을 수행하는 기법
  - 방어
    - X-Frame-Options Header (값 : DENY, SAMEORIGIN, ALLOW-FROM uri)
      > 해당 페이지를 iframe으로 렌더링하는 것을 방지

## XSS(Cross Site Scripting) Attack

### Non-persistent (Reflected) XSS Attack
> 사용자의 입력값을 그대로 출력하여, 공격자가 스크립트를 삽입하여 공격하는 기법

- 예시
  1. query string을 실행하는 페이지가 존재 (innerHTML)
  2. 피해자가 해당 링크를 실행 => http://www.example.com/search?input=<script>alert(“attack”);</script>
  3. 피해자의 브라우저에서 alert가 실행됨

### Persistent (Stored) XSS Attack
> 사용자의 입력값을 DB에 저장하여, 공격자가 스크립트를 삽입하여 공격하는 기법

- 예시
  1. 게시판에 글을 작성하는 페이지가 존재
  2. 피해자가 해당 페이지에 스크립트를 삽입하여 글을 작성
  3. 다른 사용자가 해당 글을 읽을 때, 스크립트가 실행됨

### XSS로 발생 가능한 피해
- Web defacing(웹페이지 변조)
- Spoofing requests(사용자의 요청 변조)
- Stealing information(정보 탈취)

### Self-Propagation XSS Worm
> XSS 공격을 통해, 자동으로 공격을 전파하는 기법

### 방어
- 입력값 필터링 : 사용자의 입력값을 필터링하여, 스크립트를 실행하지 않도록 한다
- Encoding : 사용자의 입력값을 출력할 때, HTML Encoding하여, 스크립트를 실행하지 않도록 한다
- Content Security Policy (CSP) : 웹페이지에서 실행 가능한 리소스를 제한하여, XSS 공격을 방어한다
  - 예시 (script 파일)
  ```html
  Content-Security-Policy: script-src 'self' example.com
  ```
  - 예시 (inline script)
  ```html
  Content-Security-Policy: script-src 'nonce-2726c7f26c'
  // allowed script
  <script nonce=2726c7f26c> ... </script>
  // not allowed script
  <script nonce=42eh44jhad> ... </script>
  ```
