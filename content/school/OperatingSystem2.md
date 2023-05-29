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

<!-- - Polling : 주기적으로 I/O 장치의 상태를 확인
- Interrupt-driven I/O : I/O 장치가 인터럽트 발생
- DMA(Direct Memory Access) : CPU의 개입 없이 메모리와 주변장치 사이의 데이터 전송 -->
