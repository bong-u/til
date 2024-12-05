---
title: "Github Readme Stats - private 레포지토리도 포함하기"
date: 2024-12-05
tags: ["Open Source", "Vercel"]
---

### 배경

- github에서 자신이 어떤 언어를 주로 쓰는지 통계를 주는 Readme를 본 기억이 나서 나도 만들어보고 싶었다.
- [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)를 참고하여 README.md에 추가하였다.
- 그러나 preview를 해보았을 때, typescript가 절반으로 나오는 것이다.
- 말이 안되는 수치라서 알아보니, public 레포지토리만 포함되어 그런 것이었다.
- private 레포지토리도 통계에 포함하기 위한 방법을 설명하겠다.

### 방법

- maintainer가 배포해놓은 서비스는 나의 private 레포지토리에 접근할 수 없다.
- **private repository도 포함한 통계를 보기 위해서는 직접 배포해야 한다**고 한다.
- 익숙한 Github Pages로 배포하려고 했으나, 동적으로 처리하는 부분이 있어서 Vercel로 배포하였다.

#### 1. Github Token 발급 받기
- Github에서 PAT(Personal Access Token)을 발급 받는다.
- scope는 `repo`와 `read:user`가 포함되어야 한다.

#### 2. Vercel로 배포하기
1. 나는 먼저 anuraghara라는 분이 만들어놓은 origin 레포지토리를 fork하였다.
2. Vercel로 로그인한 후, Github 계정과 연동하여 fork한 레포지토리를 선택한다.
3. 환경변수에 `PAT_1`이라는 이름으로 발급받은 PAT을 등록한다.
4. 배포한다.

#### 3. README.md에 추가하기
- 서비스에서 제공하는 기능이 여러가지가 있지만, 필자는 "Top Languages Card"만 추가할 것이다.
- url은 '{Vercel에서 배포한 URL}/api/top-langs?username={Github ID}'이다.
- 이 url을 아래와 같은 형태로 README.md에 추가하면 된다.
    ```markdown
    [![Top Langs](https://{Vercel에서 배포한 URL}/api/top-langs?username={Github ID})]
    ```

### 결과

![Top Langs](/static/image/gh_readme_stats.png)
- private 레포지토리도 포함하여 통계를 볼 수 있게 되었다.
