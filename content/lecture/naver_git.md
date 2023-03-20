---
title: "네이버 정다현 git특강"
date: 2023-03-20
---

## 버전 관리 시스템

### 중앙집중식 버전 관리(CVCS)

- Centralized Version Control System
- CVCS의 종류 : SVN, Perforce, CVS

- 문제
  - 중앙 서버의 부하가 큼
  - 오프라인에서는 사용이 불가능

### 분산 버전 관리 시스템 (DVCS)

- Decentralized Version Control System
- DVCS의 종류 : **Git**, Mercurial, Bazaar

## Git

### command

- gst : git status

* git log --oneline : commit을 한줄로 출력
* git log --all --graph : 그래프로 출력

### merge의 3가지 종류

- merge : 모든 commit들이 merge commit과 함께 merge
- squash and merge : 모든 commit들을 하나의 새로운 commit으로 요약하여 merge
- rebase and merge : 분기가 발생한 기준이 되는 base를 변경
