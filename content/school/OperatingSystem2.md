---
title: "운영체제 - 기말범위"
date: 2023-05-29
---

# 06-File-Management

## Directory

### File Directory

- Directory도 일종의 파일이다
- 해당 파일 FCB의 식별자만 저장한다

### inode (index node)

- Unix에서는 FCB와 inode가 같다
- 모든 파일, 폴더가 Unique한 값을 가진다. (root는 2로 고정)

## File Systems

### 파티션의 구조

- boot block, super block, FCB list, data blocks

### Partition Control block (Super block)

- blocks 개수, free data blocks 개수, free data blocks list 저장
- inode table, free inode 개수, free inode list 저장

### File Control Block (FCB)

- UNIX에서 128byte의 크기를 가진다
- 파일 이름, 파일 크기, uid, gid, 파일 주소 등등 저장

## Management of Data Blocks

### Contiguous Allocation

- 각각의 파일을 연속적으로 저장
- Direct Access
- File grow problem 존재
- **External fragmentation**, Internal fragmentation 발생

### Chained Allocation

- Direct acess
- File grow problem X
- External fragmentation X
- Poor data safety (앞 블록에 문제가 생기면 뒤 블록도 사용 불가능)

### Indexed Allocation (현대에 사용)

- Direct access
- File grow problem X
- External fragmentation X
- Medium level data safety (index block만 괜찮으면 된다)
- Index block이 추가로 필요하다

### Free-Space Management

- Counting
  - N-M...
  - N번부터 M개의 블록이 비어있다.
- Linked List
  - 비어있는 블록들을 연결리스트로 관리한다.
- Grouping
  - 비어있는 블록들을 그룹으로 관리한다.
- Bit Vector
  - 모든 블록들을 비트로 관리한다. (0이면 사용 중, 1이면 비어있음)
  - 단점 : 용량을 많이 차지한다.

## File System Example (UNIX)

### Addresses of Data Blocks

- Index 블록 하나는 4096 byte
- 4096 / 4 = 1024개의 블록 주소를 저장할 수 있다.
- 10개의 data blocks는 inode내(direct block field)에 저장한다

### Data Block Addressing

- direct block 10개 : 40KB (10 X 4 X 2^10 bytes)
- single indirect block 1개 : 4MB (4KB X 2^10 = 2^22 bytes)
- double indirect block 1개 : 4GB (4KB X 2^10 X 2^10 = 2^32 bytes)
- triple indirect block 1개 : 4TB

## File System Example (Linux)

### Virtual File System 적용

### Linux Inode

- Inode의 크기 : 128 bytes (ext2, ext3), 256 bytes (ext4)
- Direct block **12개**, Indirect block 3개

# 07-IO-Management-Disk-Scheduling

## Kernel Modules for IO Management

### Kernel I/O Management

1. Device Scheduling
2. Error handling
3. Buffering (copy semantics를 유지)
4. Caching : 빠른 속도를 위해 사용
5. Spooling : 보조 기억 장치에 임시로 저장 (여러 사람이 공유하기 때문)

## Interrupt handling

### Interrupt

- 주변 장치 -> OS : 비동기적 이벤트의 발생을 알림
- IDT (Interrupt Descriptor Table = IVT) : 인터럽트 번호와 ISR의 주소를 저장
- ISR (Interrupt Service Routine) : 인터럽트 발생 시 실행되는 함수
- Interrupt 처리 과정
  1. Mode change
  2. IDT에서 ISR의 주소를 찾아서 실행
  3. ISR에서 급한 일 부터 처리, 필요하면 미룬다
  4. Scheduler가 할 일을 결정

### Trap

- OS에게 동기적 이벤트의 발생을 알림
- 예) div_by_zero, seg_fault, protection_fault, page_fault
- Kernel은 Interrupt와 같은 방식으로 처리

### System Call

- Process -> OS : 동기적 이벤트의 발생을 알림
- System call 처리
  1. Using system call table ex) int $0x80
  2. sysenter 명령

## I/O Control : Polling

### I/O Control

- Polling : 주기적으로 I/O 장치의 상태를 확인
- Interrupt-driven I/O : I/O 장치가 인터럽트 발생
- DMA(Direct Memory Access) : CPU의 개입 없이 메모리와 주변장치 사이의 데이터 전송

### Polling

- Busy-wait cycle
  - Host가 busy bit를 반복적으로 확인
  - Host가 write bit 설정, data-out register에 데이터 저장
  - Host가 command-ready bit 설정
  - Controller가 command-ready bit 설정을 확인하면 busy bit 설정
  - Controller가 control register (write command)를 읽고, data-out register의 데이터를 읽는다
  - I/O가 끝나면 controller가 command-ready bit, busy bit 해제

* 특징
  - I/O가 빨리 끝나면 효율적, 늦게 끝나면 비효율적

## I/O Control : Interrupt I/O, DMA

### Interrupt-Driven I/O

![Interrupt driven I/O](/static/image/os_interrupt_driven_io.png)

- 1~3은 Polling과 동일
- 4 : Process management를 통해 Context switch
- 8 : IO가 끝나면 Interrupt ReQuest(IRQ)를 cpu에게 보낸다

* 장점 : 주어진 시간안에 많은 프로세스 수용 가능, I/O가 느릴수록 효율적
* 단점 : I/O가 빠르면 비효율적 (잦은 Context Switch, mode change)

### DMA (Direct Memory Access)

- 기존 방식은 무조건 processor를 거쳐가야한다
- DMA 모듈이 I/O와 Memory 사이 역할 수행, 끝나면 Interrupt 발생
- 장점 : CPU가 다른 작업 가능, 빠르다

## Disk Scheduling

### Disk Structure

- Sector, Track, Cylinder
- Disk는 logical block의 배열이다

### Timing of a Disk I/O Transfer

- Seek time : 성능에 큰 영향을 미친다
- Rotational delay
- Transfer time

### Disk Scheduling Policies

- FIFO
  - 요청 순서대로 처리
- SSTF (Shortest Seek Time First)
  - 현재 위치에서 가장 가까운 요청을 처리
  - starvation 문제 발생 (예를 들어 작은 숫자만 나오면?)
- SCAN (Elevator Algorithm)
  - 한 방향으로 훑으면서 처리
- 성능 비교
  - SSTF > SCAN > FIFO

### Disk Cache

- Main memory에 몇몇 섹터의 복사본을 저장
- Replacement Policy
  1. LRU (Least Recently Used)
  - 가장 오랫동안 사용하지 않은 섹터를 교체
  1. LFU (Least Frequently Used)
  - 가장 적게 사용된 섹터를 교체

## RAID

### RAID

> Redundant Array of Inexpensive Disks : 저렴한 여러 개의 디스크 묶음

### RAID 0 (non-redundant)

- 데이터를 여러 디스크에 분산 저장
- 장점 : 용량이 4배
- 단점 : 하나의 디스크가 고장나면 모든 데이터 손실

### RAID 1 (mirrored)

- RAID 0을 복제
- 장점 : 신뢰성이 높다
- 단점 : 디스크가 2배로 들어간다

### RAID 3 (bit-interleaved parity)

- 한 디스크에 parity bit를 저장 (같은 위치의 bit들의 parity)
- 장점 : 하나의 디스크 복원 가능
- 단점 : 어떤 디스크가 고장났는지 알 수 없다, 5개를 동시에 읽어서 느림

### RAID 4 (block-level parity)

- 한 디스크에 parity bit를 저장 (같은 위치의 **block**들의 parity)
- 장점 : 블록 단위 -> 병렬적으로 IO 가능 (RAID 3보다 빠름)
- 단점 : 어떤 디스크가 고장났는지 알 수 없다

### RAID 5 (block-level distributed parity)

- RAID 4와 동일하나 parity bit를 여러 디스크에 분산 저장

### RAID 6 (dual redundancy)

- RAID 5와 동일하나 parity bit를 2개 저장 (1개는 odd, 1개는 even)
- 장점 : RAID5 보다 높은 신뢰성

### RAID 01, RAID 10

- RAID 0과 RAID 1을 합친 것
- RAID 01 < RAID 10

# Memory Management

## Memory Management

### Memory Management Requirements

- Memory Allocation : 프로세스별로 메모리 할당
- Memory Protection : 각 프로세스가 허용된 영역만 접근 가능
- Relocation : 흩어진 작은 공간을 합치기
- Sharing : 부모 자식 프로세스 간 shared memory

### Memory Partitioning

- Fixed Partitioning : 같은 크기의 공간으로 나눠서 할당

  - 장점 : 간단하다
  - 단점 : 내부 단편화 발생

- Dynamic Partitioning : 프로세스 크기에 맞게 할당

  - 장점 : 내부 단편화 발생 X
  - 단점 : 외부 단편화 발생 (compaction을 통해 해결 가능 but, overhead가 크다)

- Dynamic Partition Placement Algorithm
  - First-fit : 처음으로 맞는 공간에 넣는다
    - 장점 : 빠르다
    - 단점 : 메모리 효율이 좋지 않다
  - Best-fit : 끝까지 조사해서 가장 비슷한 곳에 할당
    - 장점 : 느리다
    - 단점 : 메모리 효율이 좋다

### Buddy System

- Allocation
  - 2^k 크기의 공간을 할당
- Deallocation
  - Buddy 한 쌍이 모두 free인 경우, 합친다 (탐색 Overhead를 줄이기 위해)
- 장점 : 외부 단편화가 거의 없다
- 단점 : 내부 단편화 발생

## Virtual Address Space

### Type of Memory Addresses

- Physical address : 실제 메모리 주소
- Logical address : 프로세스가 보는 주소
- Virtual address : Virtaul memory의 Logical address
- Relative address (주소 계산 방식) : 상대적인 주소

### Virtual Address Space

- 크기 : 4GB (32bit 컴퓨터) : 0x00000000 ~ 0xFFFFFFFF
- kernel - stack - heap - bss - data - code

## Address Binding

### Address binding

- instruction과 데이터의 Physical address를 알아내는 것
- 3가지 상황에 일어날 수 있다 (Compile time, Load time, Execution time)

### Compile time binding

- Compile할때, base address를 알려줌으로써 미리 physical address를 넣어놓는다
- Logical address = Physical address
- 문제점 : Relocation 불가 (base address가 바뀌면 다시 compile 해야함)

### Load time binding

- Load할때, physical address를 계산
- Logical address = Physical address
- 문제점 : Relocation 불가

### Execution time binding

- 실행할 때, physical address를 계산
- Logical address != Physical address

### Relocation

- 일어나는 이유 : Swapping, Compaction

### Hardware for Execution Time Binding

- Base register : 시작 주소
- Bounds register (limit register) : 끝 주소
- Adder가 Base Register + releative address 계산
- Comparato가 Bounds Register와 비교
- 영역 밖인 경우 Segementation Fault(Trap) 발생

## Paging

### Paging

- 프로세스를 같은 크기의 페이지로 나눈다
- page size = frame size = disk block size = 4KB
- Internal fragmentation 발생 (무시 가능)

### **Page Table**

![page table](/static/image/os_page_table.png)

- PCB에 저장 되어서 관리
- Virtual Memory 사용 시 N과 frame number가 섞여서 존재

### Page number and offset

- Logical address = Page number + offset
- Page size 16 Bytes (128bit), 8 bit address인 경우
- 필요한 주소 개수 = 128 / 8 = 16개
- offset = 4bit (2 ^ 4 = 16)
- page number = 8 - 4 = 4bit (남는 거)

### Address translation in Paging

- Logical address -> Physical address
- offset은 그대로, page 번호만 frame 번호로 바꾼다

### Segmentation

- 프로세스를 다른 크기의 논리적 단위인 세그먼트로 나눈다
- Dynamic partitioning과 유사

* 논리적으로 비슷한 것들을 묶는다.
