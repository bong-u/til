---
title: "[모각코24하계] 04 : 결과"
date: 2024-07-18
---

### 배경
- 테커 부트캠프에서 팀프로젝트를 진행 중이다.
- 현재 비즈니스 로직을 수행하는 함수를 대상으로 Unit Test가 필요하다.
- Unit Test 코드를 작성하고, Github Actions를 이용하여 자동으로 테스트가 수행되도록 설정하고자 한다.

### run-pytest.yml
```yaml
name: Run pytest

# main 또는 dev 브랜치에 pull request가 발생하면 실행
on:
  pull_request:
    branches:
      - main
      - dev

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.12'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Run tests
        run: pytest .
```

### 결과
```
Run pytest .
============================= test session starts ==============================
platform linux -- Python 3.12.4, pytest-8.2.2, pluggy-1.5.0
rootdir: /home/runner/work/Backend/Backend
plugins: anyio-4.4.0
collected 13 items

app/tests/test_crud_chatroom.py ...                                      [ 23%]
app/tests/test_crud_mentor.py ...                                        [ 46%]
app/tests/test_crud_prescription.py ...                                  [ 69%]
app/tests/test_crud_user.py ....                                         [100%]

============================== 13 passed in 0.58s ==============================
```
- 생각보다 간단하게 구현할 수 있었다.
- 테스트 커버리지 100% 찍고, CD까지 구현하면 더할 나위 없을 것 같다.
