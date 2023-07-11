---
title: "Git 특강 - 네이버 정다현 선배님"
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

### 특정 commit으로 롤백하는 방법

- reset : commit 이력을 남기지 않고 되돌리기
- revert : commit 이력을 남기고 되돌린다
- 현업에서는 revert를 주로 사용

### reset

```
git reset HEAD~
```

- 옵션
  - --soft : HEAD 위치 변경, 파일 변화 없음, commit 직전의 상황
  - --mixed (default) : add하기 전으로 되돌려 준다, unstaged로 되돌려준다
  - --hard : 변경 내용이 모두 사라짐
  - --merge : merge 후에 되돌리기 위해서 사용

### revert

```
git revert HEAD
```

### cherry-pick

```
git cherry pick <commit id>
```

- 다른 브랜치의 특정 commit 만을 가져 올 때 사용

## Markdown

- 글자 하이라이트
  ```
  *글자 기울이기*
  **굵은 글씨**
  ~~취소 선~~
  ```

* 수평선
  ```
  ---
  ```
