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

- HTTP - TCP - IP - Ethernet

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

- 아날로그 신호의 디지털 표현, 디지털 비디오의 표준

* 과정 : Sampling(표본화), Qunatization(양자화), Encoding(부호화)

### 무잡음 채널 - Nyquist 정리

$$ Bit Rate = 2 \times bandwidth \times log_2(L)$$

- bandwidth : 대역폭
- L : 신호 레벨
- Bit rate : 초당비트수

### 잡음 채널 - 섀넌 용량 (Shannon Capacity)

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
* 시간이나 공간에 대한 함수를 주파수 성분으로 분해하는 변환

## Line coding

### Unipolar NRZ (Non return to Zero)
  * 0 or 1
### Polar NRZ-L
  * -1 or 1
### Polar NRZ-I
  * -1 or 1, 1이 나오면 transition
### RZ (Return to Zero)
  * 0 or 5
### Manchester
  * 신호 변화 -> 신호의 동기화
### Differential Manchester
  * Manchester 반대

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
  - 패킷 헤더 또는 경로 테이블 찾는 시간
- d(queue) : queueing delay (대기 지연)
  - 컴퓨터 또는 라우터에서 처리되기 까지 기다리는 시간
- d(trans) : transmission delay (전송 지연)
  - 1개의 비트를 컴퓨터에서 링크로 전송되는 시간
- d(prop) : propagation delay (전달 지연/전파 지연)
  - 컴퓨터(링크)-컴퓨터(링크) 사이 거리에 따른 시간

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
    | A |  0 | 1~126 | network 7, host 24 | $2^7-1$ |
    | B | 10 | 128.0~191.255 | network 14, host 16 | $2^{14}$ |
    | C | 110 | 192.0.0~223.255.255 | network 21, host 8 | $2^ {22}$ | 
    * 예) 192.168.1.132, subnet mask = 255.255.255.192
      * 해당 주소
        > 192.168.1.128 (132 & 192)
      * 네트워크 주소와, 브로드캐스트 제외한 호스트 개수
        > $2^6-2 = 62개$ 
  - CIDR (Classless Inter-Domain Routing)
    - 예) 143.7.65.203/24
      - 주소 공간
        > 앞에서 24비트 빼고 사용 가능 : 143.7.65.0 ~ 143.7.65.255
      - 서브넷 마스크
        > 앞 24자리가 1이다 : 255.255.255.0
      - 브로드캐스트주소
        > 주소공간의 마지막 주소 : 143.7.65.255