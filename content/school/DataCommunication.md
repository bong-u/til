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
