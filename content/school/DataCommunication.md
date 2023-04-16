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

### 패킷

- HTTP - TCP - IP - Ethernet

### 아날로그 신호 - 사인 함수

$$ y(t) = A sin(2\pi ft + \varphi)$$

- A = 크기(amplitude)
- f = 주파수(frequency)
- $\varphi$ = 위상(phase)

### 아날로그 신호 - 용어

- 주기(Period) : 신호가 반복되는 시간
- 주파수 (Frequency) : 시간당 반복되는 신호 개수
- 대역폭 (Bandwidth) : 아날로그 -> 주파수 범위 (Hz), 디지털 -> 비트 전송률(bps)

## Analog -> Digital

### PCM (Pulse-code modulation, 펄스 부호 변조)

- 아날로그 신호의 디지털 표현, 디지털 비디오의 표준

* 과정 : Sampling(표본화), Qunatization(양자화), Encoding(부호화)

## Digital -> Analog

### ASK (Amplitude Shift Keying)

- 디지털 데이터를 신호 크기로 전송

### FSK (Frequency Shift Keying)

- 디지털 데이터를 주파수로 전송

### PSK (Phase Shift Keying)

- 디지털 데이터를 위상으로 전송

### QAM (Quadrature Amplitude Modulation)

- 디지털 데이터를 크기와 각도로 전송

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
iptables -t

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
