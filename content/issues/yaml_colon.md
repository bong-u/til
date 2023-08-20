---
title: "Issue - yaml 문자열 속 colon(콜론)"
date: 2023-08-20
---

### 문제상황
- TIL 블로그 자동 배포 github action 코드에 yaml 파일에 내용을 추가하는 부분이 있다
- 추가하는 문자열에 콜론이 포함되어 있어서 action에서 에러를 띄웠다

- 문제의 코드
    ```yaml
    - name: Add google analytics id
        run: echo -e "\nparams:\n    googleAnalytics : \"$GA_TRACKING_ID\"" >> config.yaml
    ```
- 에러 메시지
  ![error](/static/image/error_ghaction_yaml.png)

### 해결방법
- 우여곡절 끝에 위와 같이 2줄로 나누어서 해결했다
```yaml
 - name: Add google analytics id
    run: |
        echo -e "\nparams:" >> config.yaml
        echo -e "  googleAnalytics:\"$GA_TRACKING_ID\"" >> config.yaml
```
