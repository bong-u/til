---
title: "Fastapi, RabbitMQ, Celery 연동"
date: 2024-07-11
tags: ["Python", "Fastapi", "Rabbitmq", "Celery"]
---

### 배경
- 테커 부트캠프에서 팀프로젝트를 진행 중이다.
- 웹소켓을 통해 클라이언트로부터 받은 데이터를 gpt를 통해 처리하고, 결과를 다시 클라이언트로 보내는 서비스를 구현하고 있다.
- 여러 사용자의 요청을 원활하게 처리하기 위해 분산 비동기 시스템을 구축하려고 한다.

### 목표
- Fastapi, RabbitMQ, Celery를 각자 docker 컨테이너로 구동시키고 연동한다.

### docker-compose.yml
```yaml
version: '3'

services:
  rabbitmq:
    image: rabbitmq:3
    ports:
      - "5672:5672" # RabbitMQ의 AMQP 포트
      - "15672:15672" # RabbitMQ 관리 인터페이스 포트
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    expose:
      - "5672"
      - "15672"

  celery_worker:
    build:
      context: .
      dockerfile: Dockerfile.worker
    command: celery -A utils.celery_worker worker --loglevel=info
    working_dir: /app
    volumes:
      - ./app/utils:/app/utils
    environment:
      - CELERY_BROKER_URL=amqp://guest:guest@rabbitmq:5672//
    depends_on:
      - rabbitmq

  celery_beat:
    image: celery:4
    command: celery -A celery_beat beat --loglevel=info
    working_dir: /app
    environment:
      - CELERY_BROKER_URL=amqp://guest:guest@rabbitmq:5672//
    volumes:
      - ./app/utils:/app
    depends_on:
      - rabbitmq
  
  web:
    image: python:slim
    working_dir: /app
    # interactive mode
    stdin_open: true
    # tty mode
    tty: true
    environment:
      - CELERY_BROKER_URL=amqp://guest:guest@rabbitmq:5672//
    volumes:
      - ./app:/app
    ports:
      - "8000:8000"
    depends_on:
      - rabbitmq
      - celery_worker
      - celery_beat

volumes:
  rabbitmq_data:
```
- Celery worker에만 Dockerfile.worker를 이미지로 사용한 이유
    1. worker에 추가적으로 python 라이브러리를 설치해야함
    2. Celery 공식 도커 이미지가 deprecated 되었음.
- Fastapi는 시간 관계상 따로 이미지를 만들지 않고 python:slim 이미지를 사용했다.

### Dockerfile.worker
```dockerfile
FROM python:slim

# 필요한 패키지 설치
# ffmpeg가 필요해서 추가하였다
RUN apt-get update && \
apt-get install -y --no-install-recommends gcc libpq-dev ffmpeg && \
rm -rf /var/lib/apt/lists/*

# 필요한 파이썬 패키지 설치
COPY requirements_celery_worker.txt ./
RUN pip install --no-cache-dir -r requirements_celery_worker.txt
```

### celery_worker.py
```python
import os
from celery import Celery

broker_url = os.getenv('CELERY_BROKER_URL')
app = Celery('worker', broker=broker_url, backend="rpc://")

@app.task
def add(x, y):
    return x + y
```
- broker_url은 RabbitMQ의 AMQP 주소를 의미한다.
- backend는 결과를 받기 위한 백엔드로 RabbitMQ를 사용한다.

### Celery worker 사용 방법
```python
from celery_worker import add

# task를 비동기로 실행
result = add.delay(4, 4)

# apply_async는 delay와 동일한 기능 수행
# delay와 달리 추가로 여러 옵션을 설정 가능
result = add.apply_async((4, 4))

# 결과를 받기 위해 get()을 사용, 블로킹 호출
result.get()

# 작업이 완료되었는지 확업
result.ready()

# 작업이 실패했는지 확인
result.successful()
# or
result.failed()

# 작업의 상태 확인 (PENDING, STARTED, SUCCESS, FAILURE)
result.state()
```
