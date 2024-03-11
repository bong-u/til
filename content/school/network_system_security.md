---
title: "네트워크 및 웹 보안"
date: 2024-03-11
---

### CSRF (Cross Site Request Forgery)

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
