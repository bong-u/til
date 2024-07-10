---
title: "[오픈소스] thefuck - pip uninstall 규칙 추가"
date: 2023-11-09
---

### [PR #1414 : Correct "pip delete|remove" -> "pip uninstall"](https://github.com/nvbn/thefuck/pull/1414)

### 배경

- `pip uninstall <package>`는 파이썬 패키지를 삭제하는 명령어이다.
- 헷갈려서 remove, delete로 오타를 친 경험이 있다.
- thefuck에서 지원하지 않는 것을 확인하고 기여하기로 했다.

### 과정

- 기존의 로직 : 오타가 났을 때, pip 명령에서 “maybe you meant” 하면서 추천해주는 명령어가 있다면 추천, 하지만 remove와 delete는 그 대상이 아님
- 잘못된 명령어가 ‘delete’ 또는 ‘remove’인 경우 suggest에 uninstall을 대입하도록 수정
  ```python
  if broken_cmd == 'delete' or broken_cmd == 'remove':
          suggest = 'uninstall'
  ```
- 테스트 코드 수정
  ```python
  # 의도한대로 명령어를 잘 바꿔주는지 테스트
  @pytest.mark.parametrize('script, synonym, new_cmd', [
    ('pip delete thefuck', 'delete', 'pip uninstall thefuck'),
    ('pip remove thefuck', 'remove', 'pip uninstall thefuck')
  ])
  def test_get_new_command_without_recommended(script, new_cmd, pip_unknown_cmd_without_recommend):
    assert get_new_command(Command(script, pip_unknown_cmd_without_recommend)) == new_cmd
  ```
