---
title: "데이터통신"
date: 2023-03-26
---

## 메시지(패킷, 프레임), 계층

### OSI 7 Model

1. Physical
2. Data Link
3. Network
4. Transport
5. Session
6. Presentation
7. Application

### TCP/IP 계층

| 계층 | 이름        | 메시지 형태               | 내용            |
| ---- | ----------- | ------------------------- | --------------- |
| 1    | Phisical    | Bits                      | Bits            |
| 2    | Data Link   | Ethernet Frame            | Ethernet 주소   |
| 3    | Network     | IP packet, Datagram       | IP 주소         |
| 4    | Transport   | TCP Segment, UDP Datagram | Port 번호       |
| 5    | Application | HTTP 메시지, Email 메시지 | URL, Email 주소 |

### Protocol Suite

- HTTP - TCP - IP - ARP

### 아날로그 신호 - 사인 함수

$$ y(t) = A sin(2\pi ft + \varphi) $$

- A = 크기(amplitude)
- f = 주파수(frequency)
- $\varphi$ = 위상(phase)

### 아날로그 신호 - 용어

- 주기(Period) : 신호가 반복되는 시간
- 주파수 (Frequency) : 시간당 반복되는 신호 개수
- 대역폭 (Bandwidth) : 아날로그 -> 주파수 범위 (Hz), 디지털 -> 비트 전송률(bps)

* 관련 함수
  ```python
  # start에서 end까지 step 증가
  numpy.arange(start, stop, step)
  # start에서 end까지 step개로 나눔
  numpy.linspace(start, stop, step)
  ```

## Analog -> Digital

### PCM (Pulse-code modulation, 펄스 부호 변조)

> 아날로그 신호의 디지털 표현, 디지털 비디오의 표준

- 과정 : Sampling(표본화), Quantization(양자화), Encoding(부호화)

### Nyquist sampling theorem

> 신호에 포함된 가장 높은 진동수의 2배에 해당하는 빈도로 일정하게 샘플링하면 원래의 신호로 복원할 수 있다.

### Nyquist bit rate - 무잡음 채널

$$ Bit Rate = 2 \times bandwidth \times log_2(L)$$

- bandwidth : 대역폭
- L : 신호 레벨
- Bit rate : 초당비트수

### 섀넌 용량 (Shannon Capacity) - 잡음채널

$$ Capacity = bandwidth \times log_2(1+SNR) $$

- SNR은 신호에 대한 잡음 비율
- Capacity : 채널 용량 (bps)
- SNR이 데시벨(dB)로 주어지는 경우
  $$ SNR = 10^{\frac{SNR(dB)}{10}} $$

## Digital -> Analog

### ASK (Amplitude Shift Keying)

- 디지털 데이터를 신호 크기로 전송

### FSK (Frequency Shift Keying)

- 디지털 데이터를 주파수로 전송

### PSK (Phase Shift Keying)

- 디지털 데이터를 위상으로 전송

### QAM (Quadrature Amplitude Modulation)

- 디지털 데이터를 크기와 각도로 전송

### Fourier Transfer

- 시간이나 공간에 대한 함수를 주파수 성분으로 분해하는 변환

### Reed-Solomon(RS) Code

- n = k(원래 데이터) + n-k(오류 정정 코드)
- (n-k)/2 = t, t개 이하 symbol 오류 정정 가능

## Line coding

### Unipolar NRZ (Non return to Zero)

- 0 or 1

### Polar NRZ-L

- -1 or 1

### Polar NRZ-I

- -1 or 1, 1이 나오면 transition

### RZ (Return to Zero)

- 0 or 5

### Manchester

- 신호 변화 -> 신호의 동기화

### Differential Manchester

- Manchester 반대

## Cable

### 전송 매체 (Transmission media)

- Guided(wired)
  - Twisted-pair cable
  - Coaxial cable
  - Fiber-optic cable
- Unguided(wireless)
  - Radio wave
  - Microwave
  - Infrared

### Ethernet cable (이더넷 케이블)

- Twisted-pair cable의 한 종류
- 심선을 꼬아놓는 이유 : 노이즈 방지
- 이더넷 전송 프로토콜의 매체 접근 방식 = _CSMA/CD_
- 전화선, 이더넷에 활용

### Coaxial Cable (동축 케이블)

- TV, 이더넷에 활용
- 내부의 단일 구리선, 외부 도체로 구성
- 고주파의 신호를 멀리 보낼 수 있다

### Fiber-optic cable (광 케이블)

- 모드 구분
  - Single mode, Multi mode > Step index, Graded index

* Single mode : 빠르고, 멀리 보낼 수 있다.
* Multi mode : 여러 경로로 전달, 가격이 싸고 취급이 용이하다

### 무선 통신 기술

- 전파 : CDMA, LTE, 5G, Bluetooth, Wifi, Zigbee(직비, 저가 저전력 네트워크의 표준)
- 빛 : Li-fi
- 소리 : Pied-Piper

## 다중화 기술

### Multiplexing

- 선 1개에 여러가지 신호를 전송하는 기술
- 송신자 -> 신호 -> MUX -> 1 link, n channels -> DEMUX -> 수신자
- 종류
  - FDM, WDM, TDM

### FDM (주파수분할다중화: Frequency-division multiplexing)

- 아날로그 기술

* 여러 개의 신호를 각각의 반송 주파수에 실어보내는(변조) 기술

### TDM(시간분할다중화)

- 디지털 기술
- 시간을 전송 단말기에 나누어 주는것

* 전송 단위

  - input slot의 duration
  - output slot의 duration
  - output bit rate
  - output frame rate = 초당 프레임 수
  - frame duration = 1 / frame rate

* 활용 : T1, T3...

### T1 다중화

- 1.544 Mbps로 음성 24채널 (전화회선)을 하나로 묶는 다중화 전송

## Switching

### 회선 교환망 (Circuit-switched Network)

- 회선의 설정, 데이터의 이동, 회선의 단절 3가지로 이루어진다
- 공간 분할 방식, 시분할 방식 존재
- 회선이 단절되기 전까지는 독점이기 때문에 안정적이다
- 지연시간이 짧다

### 패킷 교환망 (Packet-switched Network)

- 고정된 경로가 미리 설정되지 않는다

* 데이터그램 방식, 가상 회선 방식 존재
* 효율적(회선 다중화)이고 신뢰도가 높다(우회 가능)
* 대기지연시간(큐잉) : 교환기(라우터)에서 메모리에 저장된 후 목적지 주소 검색

* 통신에서 4가지 지연시간 : 전파시간, 전송시간, 큐잉시간, 처리시간

### 패킷 교환기 (라우터)

- web 또는 ssh로 접속 가능

* 패킷 교환의 특징
  1. 다중화: 패킷을 여러 경로로 경유
  2. 채널 : 가상 회선 혹은 데이터그램 교환 채널을 사용
  3. 경로 선택 : 패킷마다 최적의 경로 설정
  4. 순서 제어 : 패킷의 순서를 정한다 (순서가 다를 수 있기 때문)
  5. 트래픽 제어 : 전송 속도 및 흐름을 제어
  6. 에러 제어 : 에러를 탐지하고 재전송

### 관련 명령어

```bash
# 라우팅 테이블, 연결된 포트번호 확인
netstat -rn
# 활성화된 네트워크 인터페이스의 세부사항 표시
ifconfig
# NAT테이블에서 vn이라는 이름의 체인에 대한 규칙 조회
iptables -t nat -L -vn

# Router view 서비스를 제공하는 호스트에 접속
telnet route-views.routeviews.org
# 현재 장비에서 사용가능 한 모든 인터페이스의 요약 정보 출력
show interface summary
# BGP 프로토콜을 사용하는 장비의 요약 정보 출력
show ip bgp summary
# 외국 라우터에서 충남대까지 가능한 길
show ip bgp 168.188.0.0/16
```

- NAT (Network Address Translation : 네트워크 주소 변환)
  > IP 패킷에있는 출발지 및 목적지의 IP주소와 TCP/UDP 포트 숫자 등을 바꿔 재기록하면서 네트워크 트래픽을 주고 받게하는 기술

* BGP (Border Gateway Protocol)
  > 서로 다른 조직의 네트워크를 연결할 때 사용하는 라우팅 프로토콜

## 통신 속도

### 처리율 (Throughput)

> A -> B로 전송하는 단위 시간당 디지털 전송률

```bash
# 서버 networks.cnu.ac.kr:8080 으로 시험 패킷을 전송
iperf3 -c networks.cnu.ac.kr -p 8080
```

- 각종 전송 비트 전송률 계산 (강의 자료 참고)

### 통신 지연 시간

- d(nodal) : nodal delay (전체 노드 지연)
  > d(nodal) = d(proc) + d(queue) + d(trans) + d(prop)
- d(proc) : nodal processing delay (노드 처리 지연)
  - 패킷 헤더를 조사하고 그 패킷을 어디로 보낼지 결정하는 시간
- d(queue) : queueing delay (큐잉 지연)
  - 패킷이 큐에서 링크로 전송되기를 기다리는 시간
- d(trans) : transmission delay (전송 지연)
  - 패킷의 모든 비트를 링크로 밀어내는 데 필요한 시간
- d(prop) : propagation delay (전달 지연/전파 지연)
  - 비트가 라우터 A 상에서의 링크에서 라우터 B까지의 전파에 필요한 시간

* 테스트 명령어

  ```bash
  ping www.google.com
  traceroute www.eurecom.fr
  ```

### Decibel, dB

- 신호 세기의 측정 단위
  $$ L_b = 10log {B \over A} |dB| $$
- 두 신호(A, B) 값에 대한 상대적 크기 차이

### 전력, 무선신호

### 신호를 방해하는 요소

- 약화 (attenuation)
- 왜곡 (distortion)
- 잡음 (noise) (SNR:Signal-to-noise ratio : 신호 대 잡음 비율)

* 지터
  > 지연값이 다양하게 달라지는 것 (들쭉날쭉)

## 데이터 링크 계층

- 데이터 링크 계층
  - 물리 계층을 이용하여 전송
  - 장비 : 브리지, L2 switch(ethernet address)
  - 서브 계층 2개
    - 논리적 링크 제어
    - 매체 접근 제어
- Mac Address
  - Network interface card(NIC) identifier
  - 대부분 고정, 일부는 가변
  - 48비트 6바이트 (MAC-48)
- IP Address
  - IPv4 : 32bit (4bytes)
  - IPv6 : 128bit (16bytes)
  - Class
    | 구분 | 시작(2진수) | 시작 (10진수) | 구성 | host 범위 |
    | --- | ---------- | ------------ | --- | --------- |
    | A | 0 | 1~126 | network 7, host 24 | $2^7-1$ |
    | B | 10 | 128.0~191.255 | network 14, host 16 | $2^{14}$ |
    | C | 110 | 192.0.0~223.255.255 | network 21, host 8 | $2^ {22}$ |
    - 예) 192.168.1.132, subnet mask = 255.255.255.192
      - 해당 주소
        > 192.168.1.128 (132 & 192)
      - 네트워크 주소와, 브로드캐스트 제외한 호스트 개수
        > $2^6-2 = 62개$
  - CIDR (Classless Inter-Domain Routing)
    - 예) 143.7.65.203/24
      - 주소 공간
        > 앞에서 24비트 빼고 사용 가능 : 143.7.65.0 ~ 143.7.65.255
      - 서브넷 마스크
        > 앞 24자리가 1이다 : 255.255.255.0
      - 브로드캐스트주소
        > 주소공간의 마지막 주소 : 143.7.65.255

## ARP, PPP

### ARP (Address Resolution Protocol)

- IP 주소 (브로드캐스트 주소) -> MAC 주소 변환해주는 L2 프로토콜
- Reverse ARP : MAC 주소 -> IP 주소
- Gratuitous ARP : 자신의 IP 주소를 알리기 위해 사용

- ARP 테이블
  - IP 주소, MAC 주소, TTL(Time To Live)
  - TTL : ARP 테이블에 있는 주소의 유효기간
  - ARP 테이블에 없는 경우, ARP Request를 보낸다

* Proxy ARP : 다른 네트워크의 호스트의 IP 주소를 알려주는 라우터 (주로 공유기)
* ARP Spoofing : ARP 테이블을 위조하여 공격하는 기법

### PPP (Point-to-Point Protocol)

- 컴퓨터/라우터 간 직접 연결하는 경우 필요한 L2 프로토콜
- PPP 기능 : 인증, 전송, 암호화, 데이터 압축
- 세부 프로토콜 : LCP, NCP

- NCP (Network Control Protocol)
  - IP, IPX, AppleTalk 등의 프로토콜을 위한 프로토콜
  - PPP 프레임의 프로토콜 필드에 사용됨

### PPTP (Point-to-Point Tunneling Protocol)

- PPP를 이용한 VPN (Virtual Private Network) 구현 프로토콜
- Tunneling packets : 패킷 안에 패킷을 넣어서 전송하는 방법
- 공유기의 기능 중 하나

## NAT, 공유기

### 공유기 (Network Address Translator)

- IP 주소 변환 : public IP <-> private IP
- NAT가 사용하는 사설 IP 주소
  | RFC1918 name | CIDR | Host size | Mask bits | Classful description |
  | ------------ | ---- | --------- | --------- | -------------------- |
  | 24-bit block | 10.0.0.0/8 | 24 bits | 8 bits | single class A network |
  | 20-bit block | 172.16.0.0/12 | 20 bits | 12 bits | 16 contiguous class B networks |
  | 16-bit block | 192.168.0.0/16 | 16 bits | 16 bits | 256 contiguous class C networks |

- 주소번역

  - IP주소, Port번호 둘다 변한다

- NAT의 사용 : IP 공유기, 테더링, Docker, VirtualBox, 이동통신망, Cloud

### 공유기 = 프로토콜의 집합

- DNS Server (L7)
- IP Router + NAT + DHCP (L3)
- Bridge, Ethernet Switch, Ethernet, Wifi (L2)
- Modem (L1)

## 비트오류 탐지 및 수정

### 용어

- 데이터 워드 : 원래 데이터 k bits
- 코드워드 : 데이터 워드 + r bits의 오류탐지 코드
- 비신뢰성 채널 (오류가 발생 가능) 이라고 가정
- 해밍 거리 (Hamming distance) : 두 코드워드의 비트가 다른 개수
- 최소 해밍 거리 : 코드워드 간의 최소 해밍 거리

### 코드워드 비트 에러 탐지

- s개의 오류를 탐지할 수 있다.
  $$ d\_{min} = s + 1$$
- t개의 오류를 수정할 수 있다.
  $$ d\_{min} = 2t + 1$$

### 오류를 탐지하는 방법

#### Parity bit

- Even or Odd, 오류 탐지 능력

#### CRC (Cyclic Redundancy Check)

- 데이터 워드를 x로 나눈 나머지를 코드워드에 추가

#### Checksum

- 데이터 워드의 모든 비트를 더한 값의 보수를 코드워드에 추가
- 쓰이는 곳 : IP헤더, UDP 헤더, TCP헤더

### 오류를 탐지 빛 복구하는 방법

#### FEC

### Reed Solomon Code

- (n-k)/2 = t개 이하 symbol 오류 정정 가능 (k는 데이터워드 길이, n은 코드 워드 길이)

## 오류제어 : 재전송

### Stop-and-Wait ARQ

- 전송 후, ACK를 받아야 다음 패킷을 전송

### Go-Back-N ARQ

- N개의 패킷을 전송하고, ACK를 받으면 다음 N개를 전송
- 패킷 1,2,3,4,5 중 3이 분실되면 4,5에 대한 ACK도 2
- -> 순서가 틀리면 뒤의 것은 다 버린다 -> 비효율적
- 문제가 생기는 경우 : ACK가 모두 분실되는 경우

### Selective Repeat ARQ

- 패킷 1,2,3,4,5 중 3이 분실되면 4,5에 대한 ACK는 각각 4, 5
- -> 순서가 틀려도 뒤의 것은 버퍼에 저장
- 문제가 생기는 경우 : ACK가 모두 분실되는 경우

### 윈도우 크기

| ARQ | 송신자 윈도우 크기 | 수신자    |
| --- | ------------------ | --------- |
| SW  | 0 or 1             | 1         |
| GN  | $2^m-1$            | 1         |
| SR  | $2^{m-1}$          | $2^{m-1}$ |

### RTT (Round Trip Time)

$$ U\_{sender} = {L/R \over RTT+L/R} $$

## 이더넷과 랜

### 이더넷

- 최소크기 : 64bytes
- 비트 전파 속도 : 2.8$\mu$s
- 전송 지연시간 : 64byte / 10Mbps = 51.2$\mu$s
- 최대 거리 : 2*10^8m/s * 51.2/2 = 5.12km
- 2500m 이내의 충돌을 감지하기위해서 64byte로 설계 (2배 버퍼)

### Mac주소

- 6byte (48bit)

### 표준 이더넷 MAC

- IEEE 802.3 (CSMA/CD)
- 1-persistent : 신호 감지 프로토콜
- 전파지연 = 전송거리 / 전파속도
- 전송지연 = 패킷크기 / 대역폭
- a = 전파지연 / 전송지연
- Efficiency = 1 / (1 + 6.4 \* a)

### 현대 이더넷

- 스위치, 이더넷 : 충돌X, CSMA/CD -> CSMA/CA
- 가상 랜
- 에러제어 : GE : FEC, 10GE : ITU G.975 Reed Solomon Code, 재전송X

### Virtual LAN (VLAN)

- 물리적으로 떨어진 LAN을 같은 LAN으로 구성하는 기술
- VirtualBox, Docker에서 활용

### LAN에서의 루프 문제

- 이더넷은 TTL필드가 없음 -> 루프 발생시 트래픽이 폭주
- Spanning Tree Protocol (STP) 사용

## MAC - CSMA/CD

### 매체접근제어 기술

- 여러 송신자 - 여러 수신자에서 공유 매체를 사용할 때, 충돌을 방지하기 위한 기술

### Aloha

- 그냥 보낸다 -> 충돌이 발생하면 재전송
- Slotter aloha : 슬롯을 나눠서 보낸다
- 이후에 이더넷으로 발전하는데 기여
- G = 프레임 1개 전송하는데 걸리는 시간 (ms)
- S = $G \times e^{-2G}$

### CSMA/CD (Carrier Sense Multiple Access with Collision Detection)

1. 전송 프레임 준비
2. 매체 사용이 가능할때까지 대기 (carrier sensing)
3. 전송 시작 (multiple access)
4. 충돌이 일어났다면 충돌 탐지 절차로 이동 (collision detection)5. 재전송 카운터를 초기화하고 프레임 전송 종료

- 충돌 발생 시
  1. 잼 신호를 모두에게 전달되도록 최소 패킷 전송 시간까지 계속 전송
  2. 재전송 카운터를 증가시킨다
  3. 임의의 시간 동안 대기 (backoff) (충돌할때마다 2배씩 증가)

### 현대의 Ethernet

- 스위치(신호가 지나는 길을 나눈다) 환경 : 충돌X
- Full Duplex
- CSMA/CD 사용 X

### Carrier Sensing

- Nonpersistent : 매체가 사용중이면, 임의의 시간 후 다시 센싱, 사용중이지 않으면 바로 전송
- Persistent : 센싱을 지속적으로, 놀고있어도 바로 전송하지 않는다
  - p-persistent : p확률로 보내기 (1-persistent : 바로 보내기)

## CSMA/CA

### CSMA/CD -> 무선에서는 적용하기 어렵다

- 동시 송수신은 많은 에너지를 소모
- Hidden station problem 발생 가능 (무선에서만 발생)
- 신호 감쇄 -> 충돌 감지가 어려움

### CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)

- Idle 상태에서 IFS(Inter Frame Space)만큼 대기
- IFS 기다린 뒤에도 idle 상태라면 Contention Window 내 slot time만큼 대기
- RTS/CTS 도입 (현재 메시지를 보내도 되는지 확인) -> Hidden station problem 해결
- NAV (Network Allocation Vector)
  > 매체를 얼마나 사용할지를 알려주는 값
- Exposed Station Problem
  > 다른 노드 쌍의 전송으로 인해 전송을 하지 못하는 상황

## Wifi

### Wifi

> IEEE 802.11 표준에 근거한 Wireless LAN

- AlohaNet -> Ethernet -> Wifi
- 구성방법

  1. AP (Access Point) 이용
  2. Ad-hoc (Peer-to-Peer) 방식

- 인증 방식 : WPA, WPA2, EAP
- MAC 기술 : CSMA/CA, RTS/CTS, NAV
- 프레임 : IEEE 802.11

### IEEE 802.11 프레임

| _FC_ | D   | Addr1 | Addr2 | Addr3 | SC  | Addr4 | Frame body | CRC |
| ---- | --- | ----- | ----- | ----- | --- | ----- | ---------- | --- |

- FC (Frame Control)
  | Protocol version | Type | Subtype | To DS | From DS | More frag | Retry | Pwr mgt | More Data | WEP | Rsvd |
  | ---------------- | ---- | ------- | ----- | ------- | --------- | ----- | ------- | --------- | --- | ---- |

- Subtype : 1011 (RTS), 1100 (CTS), 1101 (ACK)
- AP가 개입되는 환경 등 여러 상황을 고려 -> 주소 필드가 4개

### Wifi 응용 기술

- MIMO (Multiple Input Multiple Output) : 안테나 개수 증가 -> 성능 증가
