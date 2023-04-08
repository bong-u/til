---
title: "운영체제"
date: 2023-03-06
---

## 운영체제 개요

### 운영체제의 역할

- Program execution
- Access to computer resources (I/O device, Data...)
- Error detection and response
- Accounting (ex: task manager)

### 운영체제의 발전

- Serial Processing : No OS, No Job scheduling

- Simple batch system

  - OS가 job을 할당
  - Controlled by monitor

- Uni-programming

  - 다 실행될때까지 기다림
  - bad utilization

- Multiprogramming

  - The processor can switch to the other job
  - better utilization, needs more memory

- Time sharing

  - proceess에게 정해진 time slice (time quantum)가 주어진다.
  - better utilization, bad throughput

- Symmetric multiprocessing (SMP)
  - 여러 processors가 main memory, I/O 장치들을 공유
  - 여러 processors가 동일한 function 수행 가능

### 운영체제의 구성 요소

- Distributed Systems (분산시스템)
  - 여러 컴퓨터를 연결해 사용
  - 빠른 속도, 높은 데이터 가용성

* Command-Interpreter System
  - user가 직접 OS에게 일을 시킨다

### OS Architecture

- Monolithic kernel
  - 모든 OS의 기능을 하나의 kernel이 가지고 있는다
  - 하나 수정하면 전체를 컴파일 해야 한다
- Microkernel kernel
  - kernel 내에 필요한 기능만 남기고 외부로 이동
  - kernel간 통신속도가 느리다

## Process

### Process란

- 컴퓨터에서 실행 중인 객체
- register 중 PC가 context를 가리킨다
- Context는 data와 code로 구성

### Trace of Processes

- A -> time out -> B -> I/O request -> A
- 사이사이에 dispatcher가 processor에 process를 교체한다

### Process state model

![process_states](/static/image/os_process_states.png)

- Process suspension의 이유
  - Swapping : memory 공간 확보를 위해
  - Timing : 주기적으로 실행되는 프로그램
  - Interactive user request : user의 요청
  - Parent process request : parent process의 요청

### Process Control block

- 구성요소 : Identifier, State, Priority, PC, Memory pointers, Address of memory context, I/O state info, Accounting info
- Process 1개 당 PCB 1개

### Process Context

- User Context : code, data, user stack
- System Context : kernel stack, PCB

### Process Creation

- Process가 생성되는 경우

  1. OS가 만드는 경우
  2. 실행 중인 process가 자식을 만드는 경우
  3. User command

- fork()
  1. 자식 프로세스의 memory infotable이 부모의 context를 가리키게 한다
  2. memory내에서 부모의 data, stack을 복제한다
  3. 자식이 가리키는 것을 복제된 context로 바꾼다
  - COW(Copy on write) : 복사를 늦춤으로서 메모리 절약

### Process switch

- Mode change : Memory 내에서 user mode <-> system mode
- Context change : 다른 process로 switch

* Context change를 하는 경우

  - Process의 소멸 : Running -> Release
  - Process의 block (I/O request, file open, page fault) : Running -> Blocked
  - Expiration of time slice : Running -> Ready
  - I/O interrupt : Blocked -> Ready

* Steps of context switch
  1. Save context(pc, other register) of processor
  2. Update the PCB
  3. Move PCB to appropriate queue
  4. Select another process to execute
  5. Update the PCB
  6. Update memory-management data structures
  7. Restore context of the selected process

### Process Termination

- Process가 삭제되는 경우
  1. Normal ompletion
  2. Parent request
  3. Protection error : 비정상적인 접근을 할때 OS가 강제 종료
  4. Arithmetic Error, Invalid instruction...

* terminated 상태 : Computer resource는 뺏겼지만, PCB는 남아있는 상태
* 해당 프로세서의 부모 프로세스가 wait syscall을 호출하면 완전히 삭제
* 지워지는 부모 밑에 자식이 남아있다면 자식들을 init 프로세스의 양자로 보낸다

### Inter-Process Communication (IPC)

1. Message Passing
   - user mode -> kernel mode -> user mode
2. Shared Memory
   - VAD에 shared memory의 주소를 갖고있다

- Message / Signal

## Threads

### Process와 Thread의 차이

### Thread란

- A unit of execution of in a process
- has an execution state
- 구성 요소

  - Stack
  - Memory for registers context : thread control block

- multithread

  ![multi_thread](/static/image/os_multithread.png)

### Thread의 장점

1. Process 만드는거 보다 Thread 만드는게 빠르다
2. Process 없애는거 보다 Thread 없애는게 빠르다
3. Process끼리 통신하는거보다 Thread끼리 통신이 더 빠르다 (data 공유)

### User-Level Threads

- mode change가 필요없다
- user가 control 할 수 있다
- 하나가 block되면 나머지도 block (kernel 입장에서 1개의 thread)

### Kernel-Level Threads

- kernel에 종속적이다
- kernel이 개별적으로 관리할 수 있다
