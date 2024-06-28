---
title: "Django - JWT 인증"
date: 2024-06-28
---

> JWT(Json Web Token)는 웹 표준으로, JSON 객체를 사용하여 정보를 안전하게 전달하는 방식이다.

## JWT 인증 구현하기

### requirements
```bash
pip install djangorestframework-simplejwt
```

### settings.py
```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'rest_framework_simplejwt',
]
```
```python
REST_FRAMEWORK = {
    # 기본 인증 클래스를 설정
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # 기본 스키마 클래스를 설정, CoreAPI를 사용하여 자동으로 API 문서화를 생성
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    # 기본 권한 클래스를 설정, AllowAny를 사용하여 모든 요청을 허용
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
}
```

```python
from datetime import timedelta

SIMPLE_JWT = {
    # 액세스 토큰의 유효 기간을 설정
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    # 리프레시 토큰의 유효 기간을 설정
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    # 리프레시 토큰이 갱신될 때마다 새로운 리프레시 토큰을 발급할지 여부를 설정
    'ROTATE_REFRESH_TOKENS': False,
    # 리프레시 토큰이 갱신된 후 이전 토큰을 블랙리스트에 추가할지 여부를 설정
    'BLACKLIST_AFTER_ROTATION': True,

    # JWT 토큰의 암호화 알고리즘을 설정
    'ALGORITHM': 'HS256',
    # JWT 토큰을 서명할 때 사용할 키를 설정
    'SIGNING_KEY': SECRET_KEY,
    # 토큰 검증에 사용할 공개 키를 설정
    'VERIFYING_KEY': None,
    # 토큰의 대상자(aud) 클레임을 설정
    'AUDIENCE': None,
    # 토큰의 발급자(iss) 클레임을 설정
    'ISSUER': None,

    # 인증 헤더 타입을 설정
    'AUTH_HEADER_TYPES': ('Bearer',),
    # 인증 헤더의 이름을 설정
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    # 사용자 모델에서 사용자 ID 필드를 설정
    'USER_ID_FIELD': 'id',
    # JWT 토큰에서 사용자 ID를 저장할 클레임을 설정
    'USER_ID_CLAIM': 'user_id',

    # 인증에 사용할 토큰 클래스들을 설정
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    # 토큰의 유형을 저장할 클레임을 설정
    'TOKEN_TYPE_CLAIM': 'token_type',
}
```

### urls.py
```python
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication

urlpatterns = [
    # JWT 토큰을 발급하는 뷰
   path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # JWT 토큰을 갱신하는 뷰
   path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
```

### views.py

```python
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.utils import swagger_auto_schema


class PasteView(APIView):

    def get(self, request):
        ...

    def post(self, request):
        ...

    # POST 요청에 대해서만 JWT 인증을 사용하도록 설정
    def get_permissions(self):
        if self.request.method == "POST":
            self.authentication_classes = [JWTAuthentication]
            self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()


class PasteDetailView(APIView):

    def get(self, request, pk):
        ...

    def put(self, request, pk):
        ...

    def delete(self, request, pk):
        ...

    # PUT, DELETE 요청에 대해서만 JWT 인증을 사용하도록 설정 
    def get_permissions(self):
        if self.request.method == "PUT" or self.request.method == "DELETE":
            self.authentication_classes = [JWTAuthentication]
            self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()
```