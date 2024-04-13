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
  > 쿠키를 전송할 때, `SameSite`라는 쿠키를 전송, same-site인지 cross-site인지 확인하여, 설정값에 따라 쿠키를 전송하지 않음
  - 설정 값
    - Strict (cross-site는 항상 쿠키 전송하지 않음)
    - Lax (cross-site는 GET 요청시에만 쿠키 전송하지 않음)
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

## SQL Injection

> SQL 쿼리를 조작하여, DB에 대한 공격을 수행하는 기법

### 예시
- EID에 "EID5002'#"을 삽입 -> PASSWORD 검증을 우증
```sql
SELECT NAME, SALERY, SSN
FROM EMPLOYE입
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

### SQL Error
> 의도적으로 SQL Error를 발생시키는 공격 기법

```sql
CAST((SELECT example_column FROM example_table) as int)
--> ERROR: invalid input syntax for type integer: "Example data"
IF (SELECT COUNT(USERNAME) FROM USERS WHERE USERNAME='ADMINISTRATOR' AND SUBSTRING(PASSWORD, 1, 1) > 'M') = 1 WAITFOR DELAY '0:0:{DELAY}'--
--> Time Delay 발생
```

## ShellShock Attack
> bash 쉘의 취약점을 이용하여, 공격하는 기법

### Set-UID Programs
> Set-UID root 권한을 가진 프로그램이 system함수를 호출할 때, 공격하는 기법
- RUID : Real User ID
- EUID : Effective User ID
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
  - 방어를 위한 방법 : Acess Control Gadgets

