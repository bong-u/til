---
title: "RAG 이론 정리 + OpenSearch"
date: 2024-07-05
---

## RAG (Retrieval-Augmented Generation)

> RAG는 검색과 생성을 결합한 모델로, 검색을 통해 얻은 정보를 바탕으로 생성을 수행하는 모델

- LLM의 문제점
    - 할루시네이션: 생성 모델이 훈련 데이터에 없는 내용을 생성하는 현상
    - 최신의 응답을 기대하는 상황에서 오래되었거나 일반적인 정보를 생성하는 문제
    - 신뢰할 수 없는 출처로부터 정보를 생성하는 문제

- RAG는 위에서 서술한 LLM 문제의 일부를 해결하기 위해 사용할 수 있는 수단이다.


## OpenSearch

> OpenSearch는 오픈소스 검색 및 분석 엔진으로, 엘라스틱서치의 포크 버전

- 벡터 데이터베이스 : 벡터 데이터를 저장하고 쿼리할 수 있는 데이터베이스

- 주요 기능
    - 분산 검색 및 분석
    - 보안
    - 시각화와 대시보드 지원

- index와 document
    - index : 데이터베이스
    - document : 데이터베이스에 저장되는 데이터

### 분석
- 분석기 Analyzer (Character Filter + Tokenizer + Token Filter)
    > 텍스트를 토큰화하고 필터링하는 과정을 수행
- 분석 과정
    1. Character Filter
        > 특정 문자를 제거하거나 변경하는 등의 작업을 수행
    2. Tokenizer
        > 기본적으로 공백을 기준으로 텍스트를 분리
    3. Token Filter
        > 토큰을 추가하거나 제거하는 등의 작업을 수행

### OpenSearch에서 지원하는 요소
1. Tokenizer
    - Standard Tokenizer : 공백을 기준으로 텍스트를 분리, 문장 부호 삭제
    - Letter Tokenizer : 문자를 기준으로 텍스트를 분리
    - Whitespace Tokenizer : 공백을 기준으로 텍스트를 분리
    - Ngram Tokenizer : 부분 문자열로 텍스트를 분리
2. Token Filter
    - Standard Token Filter : 아무것도 하지 않음
    - Lowercase Token Filter : 텍스트를 소문자로 변환
    - Synonym Token Filter : 동의어 처리
3. Analyzer
    - Standard Analyzer : Standard Tokenizer + Standard Token Filter
    - Simple Analyzer : Letter Tokenizer + Lowercase Token Filter
    - Whitespace Analyzer : Whitespace Tokenizer + Lowercase Token Filter

### OpenSearch 접근을 위한 cURL 명령어
- 인덱스 조회
    ```bash
    curl -X GET -u {username}:{password} \
    "http://localhost:9200/_cat/indices"
    ```
- 특정 인덱스 조회
    ```bash
    curl -X GET -u {username}:{password} \
    "http://localhost:9200/{index_name}"
    ```
- 전체 검색 결과 조회
    ```bash
    curl -X GET -u {username}:{password} \
    "http://localhost:9200/{index_name}/_search"
    ```
- 특정 검색어로 검색한 결과 조회
    ```bash
    curl -X GET -u {username}:{password} \
    "http://localhost:9200/{index_name}/_search" \
    -H "Content-Type: application/json" \
    -d '{"query": {"match": {"field": "value"}}}'
    ```
- 인덱스 삭제
    ```bash
    curl -X DELETE -u {username}:{password} \
    "http://localhost:9200/{index_name}"
    ```

