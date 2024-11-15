---
title: "Git - Submodule"
date: 2024-06-25
tags: ["Git"]
---


## Git Submodule
> 레포지토리 하위에 다른 저장소를 관리하기 위한 도구

### 용어
- 슈퍼 프로젝트 : 상위 레포지토리
- 서브 모듈 : 하위 레포지토리

### 명령어
- `super-repository`의 “dirA” 라는 디렉토리에 `sub-repository`를 등록하는 경우
  ```bash
  $ git submodule add https://github.com/bong-u/sub-repository.git dirA
  ```
    
- `sub-repository`의 변경상황을 반영해야하는 경우
  ```bash
  # 1번째 방법 : sub-repository내에서 pull 해야한다
  $ cd dirA
  $ git pull
  # 2번째 방법
  $ git submodule update --remote
  ```
    
- 서브모듈을 포함한 프로젝트 클론하기
  ```bash
  $ git clone --recurse-submodules http://github.com/bong-u/super-repository.git
  ```
    
- `super-repository` 와 `sub-repository` 를 한번에 push 하기
  ```bash
  # 서브모듈의 변경사항이 push되지 않았으면 fail
  $ git push --recurse-submodules=check
  # 서브모듈의 변경사항을 알아서 푸시
  $ git push --recurse-submoduels=on-demand
  ```
    
- `sub-repository` 상태 확인
  ```bash
  $ git submodule status
  ```
    
- 서브모듈 삭제하기
  ```bash
  $ git rm -f [서브모듈 경로]
  ```
