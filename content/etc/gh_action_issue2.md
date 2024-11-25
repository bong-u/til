---
title: "Issue - Gihub action 오류 - venv 적용"
date: 2024-11-25
tags: ["Github Action"]
---

### 문제상황
- TIL 블로그 자동 배포 github action이 잘 작동하다가 실패한다.
#### 에러로그
```bash
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
	python3-xyz, where xyz is the package you are trying to
	install.

	If you wish to install a non-Debian-packaged Python package,
	create a virtual environment using python3 -m venv path/to/venv.
	Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make
	sure you have python3-full installed.

	If you wish to install a non-Debian packaged Python application,
	it may be easiest to use pipx install xyz, which will manage a
	virtual environment for you. Make sure you have pipx installed.

	See /usr/share/doc/python3.11/README.venv for more information.
```

### 해결방법
- [fix: gh-action error "The environment is externally managed"](https://github.com/bong-u/cnu-notice/commit/46eab9faae2e9652c3b4ee83e2008d15f65ef18e)
- 로그에 명시된대로 venv를 사용하여 해결하였다.

