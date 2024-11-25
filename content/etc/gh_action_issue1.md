---
title: "Issue - Gihub action 오류 - yaml multiline"
date: 2024-11-25
tags: ["Github Action"]
---

### 문제상황
- TIL 블로그 자동 배포 github action이 잘 작동하다가 실패한다.
- 에러 로그에는 python 라이브러리가 설치되지 않았다는 내용이 적혀있었다.

#### 문제의 yaml 코드
```yaml
- name: Install dependencies
  run: python -m pip install --upgrade pip
	  pip install -r requirements.txt
```

### 해결방법
- [fix: github action error - "Could not find a version"](https://github.com/bong-u/cnu-notice/commit/a8936824048914565bb67c646468c07ff65c3f0f)
- 하단의 `pip install` 명령어가 실행되지 않아 오류가 발생하는것으로 판단하였다.
- literal 방식으로 pipe(|)를 사용하여 두번째 줄의 명령어가 실행되도록 수정하였다.

```yaml
- name: Install dependencies
  run: |
    python -m pip install --upgrade pip
    pip install -r requirements.txt
- name: Run python script
```

### 회고
- github action에서 yaml파일을 파싱하는 로직이 바뀐것에 대한 패치 노트는 찾지못하였다.
- 모호한 문법으로 yaml을 작성하여 발생한 문제였다.
- 이후에는 yaml 문법을 더욱 꼼꼼히 확인하고 사용해야겠다.

