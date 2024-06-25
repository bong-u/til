---
title: "Django crud 기초"
date: 2024-06-26
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

### PasteView - get 구현

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Paste
from .serializers import PasteSerializer

class PasteView(APIView):
    # 모든 사용자에게 접근을 허용
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        pastes = Paste.objects.all()
        serializer = PasteSerializer(pastes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
```

### urls.py

```python
from django.urls import path
from .views import PasteView

urlpatterns = [
    path('', PasteView.as_view())
]
```