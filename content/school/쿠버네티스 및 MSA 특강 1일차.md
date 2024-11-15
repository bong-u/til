---
title: "쿠버네티스 및 MSA 특강 1일차 : 클라우드 컴퓨팅 개념 및 역사"
date: 2023-02-20
tags: ["Kubernetes"]
---
## 클라우드 제대로 이해하기

### 클라우드란
> 개인이 가진 단말기를 통해서는 주로 입/출력 작업만 이루어지고, 정보분석 및 처리, 저장, 관리 유통 등의 작업은 클라우드라고 불리는 제3의 공간에서 이루어지는 컴퓨팅 시스템 형태

### 클라우드 컴퓨팅이 필요한 이유
1. 비용절감
2. 속도향상
3. 확장성
4. 생산성

### 클라우드 컴퓨팅 서비스모델
* Infrastructure as a Service (IaaS) : IT리소스에 대한 유연성과 관리 제어 기능을 제공
  * GCE, AWS, Azure
* Platform as a Service (Paas) : 빌드 및 배포를 위한 환경이 사용자에게 제공
  * Openshift, Github, docker, kubernetes
* Software as a a Service (Saas) : 완전한 제품 제공
  * GShift
* 비교
  > On-site < Iaas < Paas < Saas

### 웹호스팅 vs 서버호스팅 vs 클라우드 차이점
* 웹호스팅 : 호스팅 업체의 서버 중 일부만 임대하여 사용
  * 홈페이지 운영
* 서버호스팅 : 호스팅 업체의 물리 서버를 단독으로 임대/구매하여 사용
  * ERP, 인트라넷 등 운영
* 클라우드
  * 단기 이벤트 등 유동적인 서비스 운영

### On-premise란
> 자체적으로 보유한 전산실에 직접 설치해 운영하는 방식

## Private, Public, Hybrid Cloud 비교
### Private cloud
  * 인프라가 조직 전용인 클라우드 컴퓨팅 모델
  * 해당 사용자 또는 그룹의 방화벽으로 보호된다
### Public cloud
  * 최종 사용자가 소유하지 않은 IT인프라에서 생성되는 클라우드 환경
  * Alibaba Cloud, AWS, GCP, IBM Cloud, Microsft Azure 등이 있다
### Hybrid cloud
  * 단일 IT환경 처럼 보이지만 실제로는 여러 환경이 연결된 형태

## 업체별 클라우드 시장
* GCP, Azure, AWS

## 클라우드 관련 직군
* 클라우드 엔지니어
* 클라우드 시스템 엔지니어
* 클라우드 인프라 보안 담당자
* 데브옵스
* 클라우드 백엔드 개발자
