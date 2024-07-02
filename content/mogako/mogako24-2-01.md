---
title: "[모각코24하계] 01 : 결과"
date: 2024-07-02
---

## django에서 swagger 문서화 구현하기
### 개요
> 장고 프레임워크를 사용하여 기본적인 CRUD 기능과, REST API를 구현하는 방법을 알아보자.

- 프로젝트 구조

```bash
.
├── db.sqlite3
├── djtest (메인 앱)
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── views.py
│   └── wsgi.py
├── manage.py
├── paste (생성한 앱)
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
└── requirements.txt
```

- 자주 사용하는 Django 명령자

```bash
# 새로운 Django 프로젝트를 생성
python manage.py startproject
# 새로운 Django 앱을 생성
python manage.py startapp
# 데이터베이스에 적용할 마이그레이션 파일을 생성
python manage.py makemigrations
# 마이그레이션 파일을 실제 데이터베이스에 적용
python manage.py migrate
# 관리자(superuser) 계정을 생성
python manage.py createsuperuser
# 프로젝트의 테스트 케이스를 실행
python manage.py test
# 테스트용 서버를 특정 설정으로 실행
python manage.py testserver
```

### CRUD 구현

#### Paste 모델 정의
```python
from django.db import models

class Paste(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    # auto_now_add : 객체가 처음 생성될 때만 현재 날짜와 시간을 자동으로 설정
    created_at = models.DateTimeField(auto_now_add=True)
    # auto_now : 객체가 저장될 때마다 현재 날짜와 시간을 자동으로 설정
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return self.title
```

#### Serializer 정의

```python
from rest_framework import serializers
from .models import Paste

class PasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paste
        fields = '__all__'
        # 직접 지정하는 방법
        # fields = ['title', 'content']
```

#### View 구현

- PasteView
    ```python
    class PasteView(APIView):
        def get(self, _):
            pastes = Paste.objects.all()
            serializer = PasteSerializer(pastes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        def post(self, request):
            serializer = PasteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    ```

- PasteDetailView
    ```python
    class PasteDetailView(APIView):
        def get(self, _, pk):
            try:
                paste = Paste.objects.get(pk=pk)
                serializer = PasteSerializer(paste)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Paste.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        def put(self, request, pk):
            try:
                paste = Paste.objects.get(pk=pk)
            except Paste.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            if paste.user != request.user:
                return Response(status=status.HTTP_403_FORBIDDEN)

            serializer = PasteSerializer(paste, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        def delete(self, request, pk):
            try:
                paste = Paste.objects.get(pk=pk)
            except Paste.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            paste.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    ```

#### urls.py
```python
from django.urls import path
from paste.views import *

urlpatterns = [
    path('', PasteView.as_view(), name='paste_list_create'),
    path('<int:pk>', PasteDetailView.as_view(), name='paste_get_update_delete'),
]
```

## Swagger 적용

#### PasteView

- PasteView
    ```python
    class PasteView(APIView):
        @swagger_auto_schema(
            operation_description="Get list of pastes",
            operation_summary="Get list of pastes",
            responses={200: PasteSerializer(many=True)},
        )
        def get(self, _):
            ...

        @swagger_auto_schema(
            operation_description="Create a new paste",
            operation_summary="Create a new paste",
            request_body=PasteSerializer,
            responses={201: PasteSerializer, 400: "Bad Request"},
        )
        def post(self, request):
            ...
    ```

- PasteDetailView
    ```python
    class PasteDetailView(APIView):
        @swagger_auto_schema(
            operation_description="Get a paste by ID",
            operation_summary="Get a paste by ID",
            responses={200: PasteSerializer, 404: "Not Found"},
        )
        def get(self, _, pk):
            ...

        @swagger_auto_schema(
            operation_description="Update a paste by ID",
            operation_summary="Update a paste by ID",
            request_body=PasteSerializer,
            responses={
                200: PasteSerializer,
                400: "Bad Request",
                403: "Forbidden",
                404: "Not Found",
            },
        )
        def put(self, request, pk):
            ...

        @swagger_auto_schema(
            operation_description="Delete a paste by ID",
            operation_summary="Delete a paste by ID",
            responses={204: "No Content", 404: "Not Found"},
        )
        def delete(self, request, pk):
            ...
    ```

### swagger 적용 결과

![swagger](/static/image/django_crud.png)

## django에서 JWT 인증 구현하기

> 장고에서는 `djangorestframework-simplejwt` 패키지를 사용하여 JWT 인증을 구현할 수 있다.

#### requirements
```bash
pip install djangorestframework-simplejwt
```

#### settings.py
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

#### urls.py
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

#### views.py

```python
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.utils import swagger_auto_schema


class PasteView(APIView):

    def get(self, request):
        ...

    def post(self, request):
        ...

   def get_permissions(self):
        # SAFE_METHODS : GET, HEAD, OPTIONS
        if self.request.method in permissions.SAFE_METHODS:
            self.permission_classes = [permissions.AllowAny]
        else:
            self.authentication_classes = [JWTAuthentication]
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()


class PasteDetailView(APIView):

    def get(self, request, pk):
        ...

    def put(self, request, pk):
        ...

    def delete(self, request, pk):
        ...

    def get_permissions(self):
        # SAFE_METHODS : GET, HEAD, OPTIONS
        if self.request.method in permissions.SAFE_METHODS:
            self.permission_classes = [permissions.AllowAny]
        else:
            self.authentication_classes = [JWTAuthentication]
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

```

#### 결과
- `TokenObtainPairView`를 통해 access token과 refresh token을 발급받을 수 있다.
- `TokenRefreshView`를 통해 refresh token을 사용하여 access token을 갱신할 수 있다.
- access token과 refresh token은 settings.py에서 설정한 유효 기간에 따라 만료된다.

### Blacklist 적용

#### settings.py
```python
INSTALLED_APPS = [
    ...
    'rest_framework_simplejwt.token_blacklist',
]
```

```python
SIMPLE_JWT = {
    ...
    # 블랙리스트에 토큰을 추가할 때 사용할 모델을 설정
    'BLACKLIST_AFTER_ROTATION': True,
}
```

#### 결과
- `TokenRefreshView`를 통해 토큰이 재발급될 때, 이전 refresh token을 블랙리스트에 추가한다.