---
title: "Django - crud 기초"
date: 2024-06-26
"tags": ["Django"]
---

### 개요
> 장고 프레임워크를 사용하여 기본적인 CRUD 기능과, REST API를 구현하는 방법을 알아보자.

### 프로젝트 구조

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

### 자주 쓰는 명령어

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
## CRUD 구현

### Paste Model 정의

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

### Paste Serializer 정의

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

### View 구현

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


### urls.py

```python
from django.urls import path
from paste.views import *

urlpatterns = [
    path('', PasteView.as_view(), name='paste_list_create'),
    path('<int:pk>', PasteDetailView.as_view(), name='paste_get_update_delete'),
]
```

## Swagger 적용

### PasteView

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

## swagger 적용 결과

![swagger](/static/image/django_crud.png)
