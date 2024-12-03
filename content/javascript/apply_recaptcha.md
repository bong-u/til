---
title: "Express&React 프로젝트에 Recaptcha v3 적용하기"
date: 2024-12-03
tags: ["Typescript", "Security"]
---

### 상황
- 사이드 프로젝트 "알록"을 개발하던 중, 사용자가 악의적인 목적으로 반복적으로 요청을 보내는 것을 어떻게 막을까 고민하게 되었다.
- 조사를 통해 Google에서 제공되는 Recaptcha를 사용하면 손쉽게 방지할 수 있다는 것을 알게 되었다.
- 공격자의 입장에서 생각했을 때, 지금 프로젝트에서 가장 취약한 부분은 회원가입이라고 생각했다.
- 회원가입은 회원이 아닌 자가, 아이디와 비밀번호 규칙만 만족한다면 반복적으로 요청을 보낼 수 있고, 이는 DB에 바로 저장되기 때문이다.
- 따라서 **회원가입 부분에 Recaptcha를 적용**하기로 결정했다.

### Recaptcha란?
> Recaptcha는 구글에서 제공하는 무료 보안 서비스로, 사용자가 로봇이 아님을 증명하는 방법 중 하나이다.

- 지원 종료된 v1을 제외하면 v2, v3 두 가지 버전이 있다.
- v2는 사용자가 '나는 로봇이 아닙니다'를 클릭하는 방식으로 인증이 완료된다.
- v3는 **사용자와 상호작용 없이 자동으로 인증이 완료**된다.
- 필자는 사용자의 경험과 이를 테스트할 나의 고생을 덜기 위해 v3를 사용하기로 했다.

### v3의 작동 방식
- 사용자의 마우스 클릭, 키보드 입력, 스크롤, 요청 패턴 등을 분석하여 점수를 매긴다.
- 점수는 0.0 ~ 1.0 사이의 값으로, 0.0은 로봇, 1.0은 사람을 의미한다.
- 개발자는 Recaptcha가 평가한 점수를 기반으로 요청을 받아들일지 말지 결정할 수 있다.

### 예상 시나리오
1. 사용자가 회원가입 페이지에 접속한다.
2. 브라우저단에서 Recaptcha 키를 Recaptcha 토큰을 받아온다.
3. 사용자가 회원가입 요청을 보낼 때, Recaptcha 토큰을 함께 전달한다.
4. 서버에서 Recaptcha 토큰을 검증하고, 점수가 0.5보다 낮으면 요청을 거부한다.

## 적용

### 사전 설정
- [https://www.google.com/recaptcha/](https://www.google.com/recaptcha/)에 접속하여 도메인을 등록하고 키를 받는다.
- 자세한 과정은 다른 블로그에도 잘 설명되어 있어서 생략한다.

### Server (Express)

#### user-service.ts
```ts
// 서비스 레이어에 추가한 Recaptcha 검증 함수
static async verifyRecaptcha(token: string): Promise<void> {
    // Recaptcha 검증
    const response = await fetch(
        // 키는 Recaptcha 사이트에서 받은 것이며, 환경 변수로 관리
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        {
            method: "POST",
        }
    );
    // 결과를 JSON으로 파싱
    const verificationReuslt = await response.json();

    // 점수가 0.5보다 낮으면 예외를 던짐
    if (verificationReuslt.score <= 0.5) {
        throw new RecaptchaScoreTooLowError();
    }

    // 성공 여부가 false이면 예외를 던짐 (토큰이 유효하지 않은 경우)
    if (!verificationReuslt.success) {
        throw new RecaptchaTokenInvalidError();
    }
}
```

#### user-router.ts
```ts
// 컨트롤러 부분에서 부분에서 Recaptcha 검증 함수를 호출, 발생시킨 예외를 처리
try {
    await UserService.verifyRecaptcha(recaptchaToken);
    await UserService.createUser(username, password);
    res.status(201).send("User created successfully");
} catch (err: any) {
    // Recaptcha 점수가 낮은 경우 -> 403 Forbidden
    if (err instanceof RecaptchaScoreTooLowError) {
        res.status(403).send(err.message);
    // Recaptcha 토큰이 유효하지 않은 경우 -> 400 Bad Request
    } else if (err instanceof RecaptchaTokenInvalidError) {
        res.status(400).send(err.message);
    } else if (err instanceof UserAlreadyExistsError) {
        res.status(409).send(err.message);
    } else {
        console.error(err);
        res.status(500).send(err.message);
    }
}
```

### Client (React)

#### App.tsx
```tsx
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

return (
    // 최상위 컴포넌트에 GoogleReCaptchaProvider를 사용하여 Recaptcha 키를 전달
    <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
    >
        <Router>
            {/* ... */}
        </Router>
    </GoogleReCaptchaProvider>
);
```

#### SignupPage.tsx
```tsx
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const SignupPage: React.FC = () => {
    // useGoogleReCaptcha 훅을 사용하여 Recaptcha 토큰을 받아옴
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleSignup = async () => {
        // Recaptcha 토큰을 받아오기도 전에 사용자가 회원가입을 시도하는 경우
		if (!executeRecaptcha) {
			console.log("Execute recaptcha not yet available");
			return;
		}
        // Recaptcha 토큰을 받아옴 (signup은 action을 구분하기 위한 문자열)
		const recaptchaToken = await executeRecaptcha("signup");

		if (password !== confirmPassword) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}

		try {
			const response = await api.post<SignupResponse>("/users/signup", {
				username,
				password,
                // 서버로 Recaptcha 토큰을 전달
				recaptchaToken,
			});
        } catch() {
            // ...
        }
    };
};
```

## 결과

![recaptcha_result](/static/image/recaptcha_result.png)
- 관리자 콘솔을 통해 Recaptcha를 통해 검증된 요청을 확인할 수 있다.
