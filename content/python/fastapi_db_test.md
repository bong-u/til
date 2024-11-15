---
title: "Fastapi - 통합테스트 In-Memory DB에서 테이블이 없다는 문제"
date: 2024-07-22
tags: ['Python', 'Fastapi', 'Testing']
---

### 상황
- 테커 부트캠프에서 팀프로젝트를 진행 중이다.
- 단위테스트 코드는 작성이 완료되었고, 통합테스트 코드를 작성 중이다.
- sqlite in-memory db를 사용해서 테스트 중인데, 테이블이 없다는 에러가 발생했다.
- 테스트 전에 테이블을 생성하는 코드가 실행됨에도 불구하고, 에러가 발생한다.
- 인메모리가 아닌 파일로 저장하는 방법을 사용하면 에러가 발생하지 않는 것을 보고 문제의 원인을 파악할 수 있었다.

### 코드
```python
from database import Base, engine
from fastapi.testclient import TestClient

from main import app
from models import *

# 테이블을 생성하는 코드이다
Base.metadata.create_all(bind=engine)

client = TestClient(app)


class TestUserApi:

    def test_create_user(self):
        test_nickname = "test_nickname"
        # 아래 요청을 처리하는 코드에서 오류가 발생한다
        response = client.post(
            "/api/users",
            json={"nickname": test_nickname},
        )
        assert response.status_code == 200
        assert response.json()["nickname"] == test_nickname

```

### 원인
- 테이블을 생성할때 만들어지는 세션과 TestClient가 요청을 처리할 때 사용하는 세션이 다르다.

### 해결 방법
- TestClient내에 get_db() 함수를 임의로 주입한다
- 데이터베이스를 연결할때, 단일 세션을 사용하도록 한다.

```python
from database import Base, engine, get_db
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from main import app
from models import *

Base.metadata.create_all(bind=engine)

client = TestClient(app)

# 테스트에서 사용할 세션을 생성한다
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base.metadata.create_all(bind=engine)

# get_db() 함수를 재정의한다
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

# get_db() 함수를 재정의한 함수를 주입한다
app.dependency_overrides[get_db] = override_get_db


class TestUserApi:

    def test_create_user(self):
        test_nickname = "test_nickname"
        response = client.post(
            "/api/users",
            json={"nickname": test_nickname},
        )
        assert response.status_code == 201
        assert response.json()["nickname"] == test_nickname
```

```python
engine = create_engine(    
    os.getenv("DATABASE_URL"),
    # sqlite를 사용할 때, 여러 스레드에서 연결이 가능하도록 설정한다
    connect_args={"check_same_thread": False},
    # 단일 세션을 사용하도록 설정한다
    poolclass=StaticPool,
)
```
