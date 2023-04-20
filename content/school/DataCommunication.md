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

$$ y(t) = A sin(2\pi ft + \varphi) $$

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
