---
title: "운영체제 - 중간범위"
date: 2023-03-06
tags: ["CS", "C"]
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
  - kernel 내에 필요한 기능
    > Address space management, Interprocess communication, 기본적인 프로세스 scheduling 기능
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

- **User Context : code, data, user stack**
- **System Context : kernel stack, PCB**

### Virtual Address Space

> 프로세스가 실행되면 서 접근(access, reference) 가능한 주소들의 범위

- 32bit address computer : $2^{32}$ = 4G 번지, 3G~4G번지에는 커널이 들어간다
- 보조기억장치의 VAS는 프로세스 개수만큼 존재

- 구성

  ```
  | kernel
  | stack (local var)
  | bss  (만들때 초기화 안 한 global var)

  | data (만들때 초기화 한 global var)
  | code
  ```

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

1. Message Passing : kernel내 mailbox를 통해 메시지를 주고받는 방법
   - user mode -> kernel mode -> user mode
   - 구현이 쉽다, 느리다
2. Shared Memory
   - VAD에 shared memory법 주소를 갖고있다
   - 빠르다, 구현이 어렵다

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

## Mutual Exclusion and Synchronization

### Key terms in Concurrency

- Race condition : 순서에 따라 결과가 달라질 때
- Mutual exclusion : 한 프로세스가 공유된 data를 access할때, 다른 프로세스가 건드리면 안된다는 성질
- Critical section : 공유된 resource를 access하는 부분의 코드

* Starvation : Process에게 자원이 배정되지 않는 경우
* Deadlock : Starvation for infinite duration

### Producer/Consumer : Finite Buffer

- producer

  ```c
  item v;


  while (1) {
    while (counter == BUFFER_SIZE) ; // busy waiting
    /* produce item v */
    b[in] = v;
    in = (in + 1) % BUFFER_SIZE;
    counter++;
  }
  ```

- consumer

  ```c
  item w;
  while (1) {
    while (counter == 0) ; // busy waiting
    w = b[out];
    out = (out + 1) % BUFFER_SIZE;
    counter--;
    /* consume item w */
  }
  ```

- => Race condition 발생 가능

### Race Condition in a Uniprocessor

- counter++, counter--와 같은 구문은 assembly로 바뀌면 1개이상의 instruction이다.
- 중간에 interrupt가 발생하면 race condition이 생길 수 있으므로 atomic하게 실행되어야한다.

### Race Condition in one Process

- Multithreading에서도 race condition이 발생할 수 있다.

### Prevent Race Condition (**SW solution**)

- 조건

1. Mutual Exclusion : critical section에 하나가 접근 중이면 다른 하나는 접근 불가
2. Progress : 아무도 없으면 접근 가능
3. Bounded Waiting : 기다리는 데 한계 존재 (P1 -> P3 -> P1 -> P3 .., P2는?)

- 방법 1

  - P0
    ```c
    do {
      while (turn != 0) ;
      /* critical section */
      turn = 1;
      /* remainder section */
    } while (true);
    ```
  - P1
    ```c
    do {
      while (turn != 1) ;
      /* critical section */
      turn = 0;
      /* remainder section */
    } while (true);
    ```
  - P0에서 turn = 1을 실행하기 전에 interrupt가 발생하면, P1도 접근 불가
  - -> progress 성질 만족 X

* 방법 2 (Peterson's Algorithm)
  - P0
    ```c
    do {
      flag[0] = true;
      turn = 1;
      while (flag [1] && turn == 1) ;
      /* critical section */
      flag[0] = false;
      /* remainder section */
    } while (true);
    ```
  * P1
    ```c
    do {
      flag[1] = true;
      turn = 0;
      while (flag [0] && turn == 0) ;
      /* critical section */
      flag[1] = false;
      /* remainder section */
    } while (true);
    ```
  * 모든 조건 만족
  * 프로세스 2개일때만 적용 가여
* 방법 3 (Bakery Algorithm)

  ```c
  do {
    // number를 부여받는 과정은 atomic 하지 않다
    choosing[i] = true
    // 가장 큰 번호 + 1을 부여
    number[i] = max(number[0], number[1], ..., number[n-1])+1;
    choosing[i] = false;

    for (j=0; j<n; j++) {
      // 다른 프로세스가 choosing 중인지 체크
      while (choosing[i]);

      // 자신이 번호를 받았는지, 발급 받은 번호가 1순위인지 체크
      while ((number[i] != 0) && (number[j], j) < (number[i], i)) ;
    }

    /* critical section */

    number[i] = 0

    /* remainder section */
    } while (true);
  ```

  - 모든 조건을 만족
  - Overhead가 너무 크다

### Test and Set Instruction (**HW solution**)

- testset function
  ```c
  boolean testset (i) {
    if (i == 0) {
      // 들어가시오
      i = 1;
      return true;
    }
    else {
      // 들어가지 마시오
      return false;
    }
  }
  ```

* example
  ```c
  const int n = /* number of processes */;
  int bolt;
  void P(int i) {
    while (true) {
      while (! testset(bolt));
      /* critical section */
      bolt = 0;
      /* remainder section*/
    }
  }
  void main() {
    bolt = 0;
    parbegin (P(1), P(2), ... , P(n))
  }
  ```

### Semaphore (**HW solution**)

- 기본 요소

  ```c
  struct semaphore {
    int count;
    queueType queue;
  }

  void semWait (semaphore s) {
    s.count --;
    if (s.count < 0) {
      // place this process in s.queue;
      // block this process
    }
  }

  void semSignal (semaphore s) {
    s.count++;
    if (s.count <= 0) {
      // remove a process P from s.queue;
      // place process P on ready_list
    }
  }
  ```

1. basic example

- ```c
  const int n = /* number of processes */
  semaphore s = 1;
  void P (int i) {
    while (true) {
      semWait(s);
      /* critical section */
      semSignal(s);
      /* remainder section */
    }
  }
  void main() {
    parbegin (P(1), P(2), ... , P(n));
  }
  ```

2. producer/consumer example

   - producer
     ```c
     semaphore count = 0;
     semaphore empty = BUFFER_SIZE;
     semaphore mut_ex = 1;
     void producer() {
        while (true) {
            produce();
            semWait(empty);
            semWait(mut_ex);
            append(); // put the produced item into buffer
            semSignal(mut_ex);
            semSignal(counter);
        }
     }
     ```

   * consumer

     ```c
     void consumer() {
         while (true) {
             semWait(counter):
             semWait(mut_ex);
             take();
             semSignal(mut_ex);
             semSignal(empty);
             consume();
         }
     }
     void main() {
        parbegin (producer1, producer2, ... , consumer);
     }
     ```

3. reader/writer example

   - writer process

     ```c
         void writer() {
             while(true) {
                 semWait(wsem);
                 WRITEUNIT();
                 semSignal(wsem);
             }
         }
     ```

   - reader process

     ```c
         void reader() {
             while (true) {
                 semWait(rsem); // 다른 reader 접근 불가
                 readcount++;
                 if (readcount == 1) // 첫번째 들어가는 reader
                     semWait(wsem) // writer 접근 불능
                 semSignal(rsem); // 다른 reader 접근 가능

                 READUNIT();

                 semWait(rsem); // 다른 reader 접근 불가
                 readcount--;
                 if (readcount == 0) // 마지막 나오는 reader
                     semSignal(wsem); // writer 접근 가능
                 semSignal(rsem); // 다른 reader 접근 가능
             }
         }
     ```

- binary semaphore
  - semaphore의 값이 0과 1로 제한
  - 값이 1로 바뀌었을 때,모든 프로세스가 ready state로 변환

* Lock

  - binary semaphore를 이용해 구현된 동기화 방식

## Deadlock

### Deadlock이란

- Starvation : 어떤 자원을 다른 프로세스가 이미 점유하고 있어서 실행할 수 없는 상황
- Deadlock : 2개 이상의 process들이 서로 starvation인 상태

### Deadlock의 조건을 하나씩 깨보자

1. Mutual exclusion : OS의 필수 기능
2. Hold and wait : 시작부터 모든 자원을 받도록 구현 -> 비효율적
3. No Preemption : 자원을 서로 뺏어감 -> 비효율적
4. Circular Wait : 자원을 먼저 받아야 하는 경우 존재

### 해결방법

- 최선의 방법 : deadlock이 발생했을 때, 한 개씩 죽여보기

## File Management

### FCB

- File Control block, 보조기억장치에 저장
- 구성
  > file name, file size, uid, gid, file operation, creation time, last modified, last access time, address of file data...

### Device file

- 블록형 파일 (단위 : 4096byte)
- file size 대신 major number, minor number 존재
- Device I/O가 발생하면 해당 Device File과 I/O 하듯이 작동
