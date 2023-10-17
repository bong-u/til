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
#### CDN (Content Delivery Network)


## Internet protocol
- *traceroute* : 패킷 경로 추적
- *netstat -rn*, *route -n* : 라우터 정보 확인
- P2P
- 버클리소켓 : 버클리 대학교에서 개발한 UNIX Socker API


## IP
### IP Address
#### IPv4
- 32bit
### IPv6
- 128bit
- Network identifier + Interface identifier
- 종류 : unicast, anycast, link-local, multicast
- ::1/128 : loopback address

## Internet 성능

### 인터넷 성능 지표

#### 속도(대역폭, 비트전송률)
- 단위 : BPS
- 측정 도구 : iperf
- 링크의 대역폭

#### 지연시간
- 단위 : sec
- 측정 방법 : 단방향 지연시간, RTT
- 측정도구 : ping, traceroute
- 종류
  - 전송 지연 : 1bit 전송에 걸리는 시간
  - 전파 지연
  - 큐잉 지연 : 컴퓨터 / 라우터에서 처리되기까지 기다리는 시간
  - 처리 지연 : 패킷 헤더 또는 경로 테이블 찾는 시간

#### 손실률
- 단위 : %
- 측정 방법 : 실패한 패킷 수 / 전송한 패킷 수
- 측정 도구 : ping

### 성능을 향상을 위한 방법
#### HAR(HTTP ARchive format) 파일 분석
- 브라우저 <-> 사이트 간의 통신 내역을 JSON형태로 저장한 파일

#### Bookmarklet
- 현재 웹사이트 분석해주는 브라우저 add-on

#### 브라우저 최적화
- css, js, html 우선순위 부여
- 예측해서 미리하기 (자원 가져오기, DNS, TCP 연결, Web page Rendering)

## DNS (Domain Name System)
- Domain 이름 -> IP 주소로 변환
- dig 명령어를 통해 dns 정보 확인 가능

### Slammer Worm
- DNS 서버 공격

### DNS 동작 방식
- UDP(<= 512B),TCP(> 512B)
- PORT : 53 

### DNS Query Type
- A : IPv4 주소
- AAAA : IPv6 주소
- CNAME : 별칭

### TLD (Top Level Domain)
- 맨뒤에 붙는 도메인 (.com, .net, .org 등등)
### Authoritative DNS Server
- DNS 정보와 해당 IP 주소를 가지고 있는 서버

### DNS Caching

### DDNS (Dynamic DNS)
- IP주소가 갱신되면 DNS 정보 갱신 (가정의 공유기)

### DNS 공격
- DNS Sppofing, DNS cache poisoning, Phising

### DNSSEC (DNS Security Extensions)
- 데이터 위조-변조 공격 방지 표준기술
- 공개키 암호화방식의 전자서명 도입

### DoH (DNS over HTTPS)
- DNS 정보를 json형식으로 만들어 HTTP 전송

### DNS over TLS
- DNS 정보를 TLS로 암호화하여 전송
- SNI (Server Name Indication) : 도메인 정보
- TLS에서는 SNI를 암호화하지 않음

