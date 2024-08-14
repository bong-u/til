---
title: "[모각코24하계] 06 : 결과"
date: 2024-08-14
---

### 배경
- 테커 부트캠프 최종발표 전날이다.
- gpt 프롬프트 부분 수정을 main 브랜치에 반영하고, EC2 서버에 배포했다.

### 문제
- 배포한 서버에서 websocket 연결이 404 에러를 반환한다. (내일이 최종 발표인데,,,)
- 다른 http 요청은 정상적으로 처리되지만 웹소켓만 처리되지 않는 것을 확인했다.
- nginx의 log
```c
{IP주소} - - [02/Aug/2024:10:59:04 +0000] "GET /ws/chatrooms/294?user_id=296 HTTP/1.1" 404 22 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15"
{IP주소} - - [02/Aug/2024:10:59:05 +0000] "GET /ws/chatrooms/294?user_id=296 HTTP/1.1" 404 22 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15"
```

### 사고흐름
1. nginx 설정 문제인가? X
   - nginx 설정은 변경되지 않았다.
2. 배포환경의 문제인가? X
   - 로컬에서 실행한 서버에서도 동일한 문제가 발생하였다.
3. 이번 배포에서 변경된 소스코드가 문제인가? X
   - 육안으로 확인했을 때는, 변경된 부분이 웹소켓과 관련이 없다.
   - 로컬에서 이전 버전으로 reset 후 시도 해보았지만 문제가 해결되지 않았다.
4. Docker image 문제인가? X
   - 백엔드 서버는 python:slim 이미지를 사용하고 있으며, 해당 이미지가 변경되어서 문제가 발생할 가능성이 있다고 생각했다.
   - 로컬에서 docker image를 사용하지 않고 실행해보았지만 문제가 해결되지 않았다.
   - 이때, 로그에서 **warning 메시지**를 확인했다.
    ```
    WARNING:  No supported WebSocket library detected. Please use "pip install 'uvicorn[standard]'", or install 'websockets' or 'wsproto' manually.
    ```

### 원인
- 모종의 이유로, 이전에 개발/배포할때에는 존재했던 웹소켓 관련 라이브러리가 사라진 것이다.
- 오류를 해결하고 조사해본 결과 fastapi 레포지토리에 6시간 전 merge된 PR을 확인할 수 있었다. (https://github.com/fastapi/fastapi/pull/11935)
- 해당 PR에서는 `pip install fastapi[standard]` 를 통해 표준 종속 라이브러리를 설치하는 기능이 추가되었다.
- 이로 인해, `uvicorn[standard]` 라이브러리를 설치하지 않았을 때, 웹소켓 관련 라이브러리가 설치되지 않아 발생한 문제였다.


### 해결
- requirements.txt에 `websockets`를 추가해서 문제를 해결할 수 있었다.

### 배운 점
- 중요한 프로젝트를 할 때 requirements.txt에 항상 각 라이브러리에 버전을 명시해야겠다는 생각이 들었다.
- 이번에도 버전을 명시했다면, 라이브러리가 업데이트 되더라도 문제가 발생하지 않았을 것이다.
- 또한, 로그를 잘 확인하고, warning 메시지를 놓치지 않도록 주의해야겠다.
