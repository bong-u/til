---
title: "쿠버네티스 및 MSA 특강 3일차 : 모니터링 시스템 구축 실습 (ELK), kubernetes"
date: 2023-02-22
tags: ["Kubernetes", "ELK"]
---

## 모니터링 시스템 구축 실습 (ELK)

### ELK란

> ELK는 **E**lasticsearch, **L**ogstash 및 **K**ibana : 오픈 소스 프로젝트 세 개의 머리글

- Elasticserach는 검색 및 분석 엔진
- Logstash는 여러 소스에서 동시에 데이터를 수집하여 변환한 후 Elasticsearch 같은 "stash"로 전송하는 서버 사이드 데이터 처리 파이프라인
- Kibana는 사용자가 Elasticsearch에서 차트와 그래프를 이용해 데이터를 시각화

### Kibana

> Elasticsearch에 있는 데이터를 시각화할 수 있도록 하는 웹 브라우저 기반의 시각화 플랫폼

- Elasticsearch에 있는 인덱스의 패턴을 찾아서, 데이터를 확인하거나, 시각화할 수 있도록 한다

### Logstash

> 서버 데이터를 수집, 변환, 전송하는 데이터 처리 파이프라인으로, Jruby(JVM 기반 Ruby)로 개발되었다

- 데이터 처리 과정은 input, filter, out의 세 단계로 구성된다
-

### Docker Compose

### Docker Compose alias 설정

```bash
alias dco="docker-compose"
...
```

### Docker-Compose 파일

- docker-compose.yml
- version:'3.2' // docker-compose file format / 각 버전 별로 제공 api가 다르다
- services: // container 서비스 그룹
- ports: // 포트 지정 Host Port : Container Port
- depends_on: // 서비스간 의존관계 설정

### ELK 실습

- docker-compose 컨테이너 생성 및 실행

```
docker-compose up
```

- docker-compose 컨테이너 정지 및 삭제

```
docker-compose down
```

- docker-compose 컨테이너 목록 조회

```
docker-compose ps
```

- docker-compose 컨테이너 로그 조회

```
docker-compose logs
```

- ElasticSearch 확인

```
open http://localhost:9200/_cat/indices
```

- Kibana 확인

```
http://localhost:5601/app/kibana
```

- container 접속

```
docker-compose exec logstash sh
```

### 참고 : PoC (Proof of Concept)

> 새로운 프로젝트가 실제로 실현 가능성이 있는가, 효과와 효용, 기술적인 관점에서부터 검증을 하는 과정

## Kubernetes 이해하기

### Kubernetes가 필요한 이유

- 대부분의 어플리케이션 : 하나의 프로세스 또는 몇개의 서버에 분산된 프로세스로 실행되는 거대한 모놀리스

  - 이러한 시스템은 릴리즈 주기가 느리고 업데이트가 자주 일어나지 않음
  - 개발자는 전체 릴리즈 주기가 끝날때 마다 전체 시스템을 패키징하고 운영팀은 이를 배포하고 모니터링한다
  - 운영팀은 하드웨어 장애가 발생하면 이를 사용 가능한 서버로 직접 마이그레이션 한다

- 거대한 모놀리스 레거시 애플리케이션은 점점 MSA로 더 작은 구성 요소로 세분화

  - 마이크로 서비스는 서로 분리돼 있기 때문에 개별적으로 개발, 배포, 업데이트, 확장 가능
  - 배포 가능한 구성요소가 많아지고 데이터센터 규모가 커지면서 전체 시스템을 구성, 관리, 유지하기는 쉽지 않은 일
  - 리소스 활용을 높이고 하드웨어 비용을 낮추고 각 구성요소를 배치할 위치를 파악하기에 너무 어려움
  - 수동으로 불가능
  - 이런 구성요소를 자동으로 스케쥴링하고 구성, 관리, 장애처리를 포함하는 자동화가 필요

- => **쿠버네티스가 필요한 이유**

### 마이크로서비스 배포 단점

- 각 구성 요소가 많아지면 배포 조합의 수 뿐만 아니라 구성 요소간의 상호 종속성 수가 훨씬 많아지므로 배포 관련 결정이 어렵다
- 여러 프로세스와 시스템에 분산돼 있기 때문에 실행 호출을 디버깅하고 추적하기 어렵다

### Kubernetes 개념

- 구글은 Borg라는 시스템을 개발해 애플리케이션 개발자와 시스템 관리자가 수천 개 어플리케이션과 서비스를 관리하는데 도움을 준다
- 구글 10년간 경험을 바탕으로 2014년에 kubernetes 프로젝트를 오픈소스화 한다
- 별명은 k8s이다

### 컨테이너를 쓰는 이유

- 경량, 이식성 및 플랫폼 독립성, 최신형 개발 및 아키텍처 지원, 활용도 향

### Kubernetes 아키텍처

- 마스터 노드 : 전체 쿠버네티스 시스템을 제어하고 관리하는 쿠버네티스 컨트롤 플레인을 실행
- 워커 노드 : 실제 배포되는 컨테이너 애플리케이션을 실행

### kubernetes 실습 1

```
minikube start
kubectl run ntest --image=develo0100/node --port 8080
curl localhost:8080
```

### kubernetes pod 소개

- 쿠버네티스는 개별 컨테이너들을 직접 다루지 않고, 함께 배치된 다수의 컨테이너라는 개념을 사용한다
-

### kubernetes 백그라운드 동작

1. 도커 데몬이 실행 중인 다른 워커 노드에서 컨테이너 이미지로 접근하려면 도커허브에 이미지가 올려져있어야 한다
2. kubectl 명령어를 실행하면 쿠버네티스 API 서버로

### kubernetes 워크로드 용어

- Daemon set
- Deployment
- Job
- Pod
- Replica set
- Replication controller
