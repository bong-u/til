---
title: "컴퓨터네트워크"
date: 2023-10-16
---

## HTTP

### HTTP Method

| Method  | request payload | response payload | idempotent |
| ------- | :-------------: | :--------------: | :--------: |
| GET     |    Optional     |        O         |     O      |
| HEAD    |    Optional     |        O         |     O      |
| POST    |       Yes       |        O         |     X      |
| PUT     |       Yes       |        O         |     O      |
| DELETE  |    Optional     |        O         |     O      |
| CONNECT |    Optional     |        O         |     X      |
| OPTIONS |    Optional     |        O         |     O      |
| TRACE   |    Optional     |        O         |     O      |
| PATCH   |       Yes       |        O         |     X      |

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
- 서버 푸시 : 서버가 리소스를 예측하여 전송
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

- 컨텐츠를 전세계 여러 지역에 미리 배포

## Internet protocol

- _traceroute_ : 패킷 경로 추적
- _netstat -rn_, _route -n_ : 라우터 정보 확인
- P2P
- 버클리소켓 : 버클리 대학교에서 개발한 UNIX Socker API

## IP

### IP Address

#### IPv4

- 32bit

### IPv6

- 128bit (64bit : network prefix, 64bit : host network identifier)
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
- 포트번호 : **53**

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

- DNS 정보를 json형식으로 만들어 HTTPS 전송

### DNS over TLS

- DNS 정보를 TLS로 암호화하여 전송
- SNI (Server Name Indication) : 도메인 정보
- TLS에서는 SNI를 암호화하지 않음
- 포트번호: **853**

## P2P

### 두 방식의 비교

- 1개의 서버 N개의 file
- $u_s$: 서버 업로드 대역폭
- $d_i$: i번째 peer의 다운로드 대역폭

### Client-Server 방식

- 배포 시간
  $$ d\_{cs} = max(\frac{NF}{u_s},\ \frac{F}{min(d_i)}) $$

### P2P 방식

- 서버에 업로드하는 시간
  $$ d*{p2p} = max(\frac{F}{u_s},\ \frac{F}{min(d*{i})},\ \frac{NF}{u_s+\sum{u_i}}) $$

### BitTorrent

- 파일을 256KB chunks로 분할

### Distributed Hash Table (DHT)

- 분산 P2P DB
- key: hash(content), value: IP address
- 인접한 이웃에게 키를 할당
- Circular DHT
  - 각 피어는 인접 노드만 알고있음

### Skype

- 사용자 간 P2P통신

## FTP, SMTP

### 메일관련 프로토콜

- SMTP: 이메일 서버 전송 프로토콜
- POP3, IMAP, HTTP: 이메일 서버 접근 프로토콜

### telnet

- 포트번호: **23**

## 신뢰성 있는 전송계층

### TCP

- segment
  - ![tcp_segment](/static/image/tcp_segment.png)
- 신뢰성: 오류 탐지/복구, 순서 전송, 중복 제거
- 흐름제어: 수신자의 상태에 따른 전송량 조절
- 혼잡제어: 네트워크+수신자의 혼잡상태에 따른 전송량 조절
- 연결관리

### UDP

- segment
  - ![udp_segment](/static/image/udp_segment.png)
- 연결을 만들지 않는다, 빠르다, 단순한다
- checksum : 오류 검출 가능

### 공통

- 지연시간, 대역폭은 보장이 되지 않는다

### Stop-and-Wait ARQ

- 송신자 윈도우 크기: 0 or 1
- 수신자 윈도우 크기 : 1
- 성능
  $$d_{trans}=\frac{L}{R}$$
  $$U_{sender}=\frac{d_{trans}}{RTT+d_{trans}}$$

### Go-Back-N ARQ

- 송신자 윈도우 크기 : $2^m - 1$
- 수신자 윈도우 크기 : 1

### Selective Repeat ARQ

- 송신자 윈도우 크기 : $2^{m - 1}$
- 수신자 윈도우 크기 : $2^{m - 1}$

## TCP

### TCP 개요

- 연결 지향적
- 신뢰성 있는 전송
- pipelining : 병렬 전송
- Full duplex data : 동일 연결에서 양방향 데이터 전송
- flow control
- byte단위 의 stream 전송

### TCP Segment

### Timeout 설정

- 적당한 tcp timeout 값 설정 필요
- RTT보다 길어야함
- 너무 짧으면 불필요한 재전송, 너무 길면 세그먼트 손실

### RTT 측정

$$EstimatedRTT = (1-\alpha)EstimatedRTT + \alpha SampleRTT$$

- 보통 $\alpha$ : 0.125
- 오차 범위 계산
  $$ DevRTT = (1-\beta)DevRTT + \beta |SampleRTT - EstimatedRTT| $$
- Timeout Interval 도출
  $$ TimeoutInterval = EstimatedRTT + 4\*DevRTT $$

### TCP 신뢰성 있는 전송

- cumulative acks
- pipelined segments
- timeout -> 재전송
- duplicate acks -> 재전송

### TCP Flow control control 동작원리

- RcvWindow : 송신자 최대 전송크기
- RcvWindow만큼 buffer 내 spare room으로 한다

### TCP 연결 관리 (3-way handshake)

- 연결 종료 시나리오
  1. client->server : FIN
  2. server->client : ACK + FIN
  3. client->server : ACK

## Socket Programming

### 소켓

- 응용 프로세스와 전송 계층 사이의 API

### 여러개의 클라이언트와 통신

#### Multiprocess

- context switch 비용 발생, IPC 통신

#### Multithread

- context switch 비용 발생

#### Select

- 여러 Socket I/O 동시 처리
- 비효율적이다

#### Async

- 빠르다
- 복잡한 코드, 어려운 디버깅

### WebSocket

- 실시간 양방향 통신 가능

### Socket.io

- Node.js 기반의 WebSocket 구현체 라이브러리

## Data Link 계층

### 링크 계층의 역할

- 데이터 프레임의 주고 받기
- 링크제어, 다중접근, 흐름제어, 에러제어

### MAC 주소

- 디바이스 고유의 식별자, 48bit

### CIDR

- 사용하는 이유
  - Class(A, B, C) 단위 할당에 따른 비효율적인 주소 관리
  - BGP 라우팅 테이블 개수 최소화

#### 예시 (172.16.150.115/22)

- 주소 개수 : $2^{32-22}-2$ = 1024 - 2 = 1022
  - 첫번째와 마지막 주소는 특수목적 IP라서 사용 불가
- 네트워크 주소 : 172.16.148.0/22
- 주소 공간 : 172.16.148.0 ~ 172.16.151.255
- 브로드캐스트 주소 : 172.16.151.255

## Network 계층 - IP

### Network 계층의 역할

- IP 패킷 송수신, IP 패킷 전달, IP 경로 찾기

### Fragmentation

- MTU(Maximum Transfer Unit) : 링크 계층 프레임 크기 제한
  - Ethernet : 1500B
- MTU 보다 큰 IP 패킷을 파편화, 목적지에서 재조립

### TTL

- 라우팅 루프 방지, 0이 되면 폐기
- traceroute : TTL을 이용한 도구

### IP Options

### IPv4

- IPv4 datagram format
  ![ipv4_datagram](/static/image/ipv4_datagram.png)

#### IP Options

- Record route, MTU probe/reply, timestamp
- IHL(Header Length): IP 헤더 길이
- IP Options 필드의 최대길이는
  - 최대 IP헤더길이 60B - IHL필드 최소값 20B = 40B
- IP Record Route Option: IP 주소 기록하는 옵션

### Subnets

- 서브넷 (Subnets)
  > 라우터를 거치지 않고 도착할 수 있는 인터페이스의 집합

### DHCP

- 클라이언트의 IP 주소를 자동으로 할당, 관리하는 프로토콜

### Ipv6

- Ipv6 datagram format
  ![ipv6_datagram](/static/image/ipv6_datagram.png)
- IPv4와 비교
  - no checksum
  - no fragmentation / reassembly
  - no options

#### Ipv4 -> Ipv6 변환

- tunneling : IPv6 패킷을 IPv4 패킷에 캡슐화

### MiddleBox

- 출발지와 목적지 사이에서 ip router의 기능을 제외한 기능을 수행하는 중간 상자
- NAT, Firewalls, Load balancers, Caches

## Network 계층 - Routing

- Routing: 길 찾기 기능
  - Routing table : Trie 자료구조 사용
  - 방식 : Longest prefix matching
- Forwarding: 패킷 전달 기능
  - Forwarding table : 가장 긴 공통 prefix를 찾아서 패킷 전달

### Switching fabrics

> 라우터 내부에서 패킷을 전달하는 방식

- 3가지 종류 : Memory, Bus, Crossbar
- 입력 포트에서의 문제
  - 입력 포트의 속도 > 스위치 속도 -> 큐잉 지연 발생
  - Head-of-line(HoL) blocking : 큐잉 지연으로 인해 다른 패킷들도 지연되는 현상
- **출력 포트에서의 문제**
  - 스위치 속도 > 출력 포트의 속도 -> 패킷 손실 발생
  - 해결방법
    1. 이미 대기 중인 패킷을 폐기
    2. 새로 도착한 패킷을 폐기
  - scheduling policy : FIFO, Round Robin 등등

## Transport 계층 - 혼잡 제어

### 혼잡제어 개요

- Congestion : 네트워크의 처리량 < 데이터 전송량
- 혼잡 탐지 : 재전송 타이머, 중복 ACK -> 패킷 손실
- cwnd : congestion window size
- Van Jacobson이 큰 영향을 미침
- MSS(Maximum Segment Size): 세그먼트의 최대 크기 (데이터만 포함)
- MTU(Maximum Transfer Unit): 최대 전송 크기

### 혼잡 제어 방법

#### AIMD

- Additive Increase Multiplicative Decrease
- 매 RTT마다 cwnd 1MSS 씩 증가
- 패킷 손실 감지 : cwnd 절반으로 감소

#### Slow Start

- 초기 cwnd: 1 or 10 MSS
- 매 RTT마다 cwnd 2배로 증가
- 패킷 손실시
  - window size = 1

### 혼잡 제어 정책

#### TCP Tahoe

- 처음에는 Slow Start, 이후에는 AIMD
- 3 duplicate ACKs 또는 timeout 발생 시
  - 임계점 = window size/2
  - window size = 1

#### TCP Reno

- Tahoe와 비슷하다
- timeout 발생시
  - 임계점은 그대로
  - window size = 1
- 3 duplicate Acks인 경우
  - 임계점 = window size/2
  - window size = window size/2

### TCP CUBIC

- K: window size가 Wmax인 시점
- K 근처에서 느리게 증가
- K 멀리에서 빠르게 증가

### TCP BBR

- BBR: Bottleneck Bandwidth and RTT

## NAT 공유기

- IP 주소 변환 public IP <-> private IP
- 주소 뿐만 아니라 포트도 바뀐다

- 공유기 addr-port mapping table의 생성과 삭제
  - 내부->외부
    - 생성 : TCP/UDP 최초 패킷 송신 후
    - 삭제 : 타이머/TCP 연결 종료 메시지 수신 후
  - 외부->내부
    - 생성 : 내부에서 트래픽 생성 또는 수동
    - 삭제 : 타이머/TCP 연결 종료 메시지 수신 후 또는 수동
- 포트 포워딩 : 공유기 내부의 서버에 접근하기 위한 포트(TCP) 개방 기능
- 공유기 정보 확인하는 명령어 : `netstat -rn`, `ifconfig`, `iptables -t nat -L -vn`
- 공유기의 계층
  - L7(응용계층) : DNS 서버
  - L3(네트워크 계층) : IP Router + 주소 번역기 + DHCP
  - L2(데이터 링크 계층) : Bridge, 이더넷 스위치, Wifi
  - L1(물리 계층)

## IP Routing

### Routing Protocols

- link state : 네트워크 상태 정보를 모든 라우터에 전달
  - dijkstra 알고리즘 사용
  - 시간복잡도(n개의 node) : $O(n^2)$
  - oscillation : 라우팅 테이블이 수렴하지 않는 현상
- distance vector : 인접한 라우터에게만 정보 전달
  - bellman-ford 알고리즘 사용
  - link cost가 바뀌면 local dv를 다시 계산, 바뀐 dv를 인접 node에 전달
  - count-to-infinity 문제 : 라우팅 루프 현상

### Inter-AS routing protocol

- 라우터 수가 많아져도 작동 가능하게 하기 위해 사용
- intra-AS routing protocols : RIP, EIGRP, OSPF

#### RIP (Routing Information Protocol)

- DV algorithm 사용
- 루프 탐지를 위한 방법 : poison reverse
- 이제는 잘 사용하지 않음

### EIGRP (Enhanced Interior Gateway Routing Protocol)

- DV 기반
- cisco

#### OSPF (Open Shortest Path First)

- Hierarchical routing : local area, backbone 두 개의 레벨로 구성

### Inter-AS routing BGP

- BGP (Border Gateway Protocol): 인터넷 상의 AS간 라우팅 프로토콜
- eBGP : 인접한 AS간 라우팅 정보 교환
- iBGP : AS 내부 라우터들에게 라우팅 정보 전달
- BGP session : BGP routers는 TCP로 연결됨
- BGP path: prefix + attributes
  - prefix: IP 주소
  - AS-PATH: AS 리스트
  - NEXT-HOP: 다음 AS로 향하는 라우터 주소
- BGP messages
  - OPEN : TCP 연결 설정
  - **UPDATE** : 새 경로를 공시 (또는 이전 연결 철회)
  - KEEPALIVE : UPDATES 없이 연결 유지
  - NOTIFICATION : 오류 보고

## Transport 계층 - 보안

### TLS(Transport Layer Security)

- 표준
  - SSL 3.0 -> IETF TLS 1.0
  - TLS 1.2 -> TLS 1.3
- HTTPS = TCP + TLS + HTTP
- Network Security의 구성요소
  - Confidentiality (기밀성)
  - Authentication (인증)
  - Message Integrity (무결성)
  - Access & Availability (가용성)
- 암호화 모음 (Cipher Suite)
  - 키 교환 알고리즘: Diffie-Hellman
  - 인증: RSA (공개키)
  - 암호화: AES (대칭키)
  - 무결성: SHA256 (해시)

### TLS Handshake 프로토콜의 과정

1. Client Hello : 버전, 사용가능한 암호화 종류
2. Server Hello : 암호화 종류
3. **Certificate** : 인증서
4. Server Hello Done
5. Client Key Exchange : Pre-Master Secret 생성 후 전송
6. Change Cipher Spec : 암호화 종류 선택
7. Change Cipher Spec Finished : 암호화 종류 선택 완료

### SSL/TLS 인증서

- 서비스 정보 : 발급한 CA, 도메인 등
- CA(Certificate Authority) : 인증서 발급 기관

### TLS 1.2와 TLS 1.3의 비교

## IP 계층 - 보안

### IP Sec

- IP 패킷에서 encryption, authentication, integrity
- 2가지 모드
  - transport mode: 1개의 datagram payload만 암호화
  - tunnel mode: 전체 datagram이 encrypted, authenticated
- 프로토콜
  - AH(Authentication Header): 인증, 무결성 보장
  - ESP(Encapsulating Security Payload): 인증, 무결성, **기밀성** 보장
- SAs(Security Associations)
  -
