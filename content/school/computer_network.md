---
title: "컴퓨터네트워크"
date: 2023-10-16
---

## HTTP

### HTTP Method
| Method | request payload | response payload | idempotent |
| --- | :-: | :-: | :-: |
| GET | Optional | O | O |
| HEAD | Optional | O | O |
| POST | Yes | O | X |
| PUT | Yes | O | O |
| DELETE | Optional | O | O |
| CONNECT | Optional | O | X |
| OPTIONS | Optional | O | O |
| TRACE | Optional | O | O |
| PATCH | Yes | O | X |

### HTTP Protocol Version
#### HTTP/1.0
- 연결방식 : non-persestent HTTP
- TCP 연결 한번에 최대 하나의 객체
- 각 객체당 2개의 RTT가 필요
#### HTTP/1.1
- 연결방식 : persistent HTTP
  - 이전 TCP 연결을 재사용 -> 왕복지연시간 감소 (Connection: Keep-Alive)
- Pipelining으로 병렬 요청과 응답 (예: HTML+CSS)
- 1개의 TCP에서 객체가 순차적으로 전송 -> Head-of-line(HoL) 현상 발생
- 여러 개의 TCP 연결을 허용 - 브라우저에서 도메인당 연결 수 제한
  - 도메인 샤딩(Domain Sharding) : 연결 제한을 피하기 위해 도메인 서버를 여러 개 두기 (HTTP/2에서는 X)
#### HTTP/2
- 바이너리 프레임: 우선순위, 흐름제어, 서버 푸시
- 우선순위 지정 : 콘텐츠가 로드되는 순서
- 멀티플렉싱 : TCP연결 1개로 여러 데이터 전송
- 서버 푸시 : 
- 헤더 압축, 헤더와 데이터 분리
#### HTTP/3
- QUIC 프로토콜, UDP 기반

### 기타

#### HTTP Cookie
- 웹사이트 방문 시 기록
#### Third-party Cookie
- 광고에 사용
#### HTTP Cache
- 최초 요청은 원래 서버에서 처리, 이후 요청은 Proxy(Cache) 서버에서 처리
### CDN (Content Delivery Network)