---
title: "[모각코24하계] 02 : 결과"
date: 2024-07-11
---

## RAG (Retrieval-Augmented Generation) 이론 정리

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

## OpenSearch를 활용한 Rag 실습

### 배경
- 테커 부트캠프에서 팀프로젝트를 진행 중이다.
- 우리 팀의 주제는 특정 인물에게 상담을 받는 것 같은 대화를 할 수 있는 챗봇을 만드는 것이다.
- 이를 위해 특정 인물이 했던 말을 모아 데이터셋으로 만들고 이를 RAG 모델에 적용시키려고 한다.

### 순서
1. 일론 머스크가 TED에서 한 인터뷰를 텍스트로 가져온다.
2. OpenSearch 도커 컨테이너를 실행한다.
2. 텍스트 데이터를 임베딩해서 OpenSearch에 저장한다.
3. RAG 모델이 OpenSearch를 쿼리하여 대답을 생성한다.

### 1. 일론 머스크 인터뷰 텍스트 가져오기
- 유튜브에서 "스크립트 보기"를 통해 인터뷰 자막을 가져온다.
    ```text
    22:03
    EM: 이 큰 트럭을 몰면서 말도 안되는 움직임을 보였죠.
    CA: 아주 멋지네요. 자, 그럼 정말 굉장한 사진에서
    22:09
    조금은 덜 굉장한 사진을 보죠. "위기의 주부들"인가에서 나오는 귀여운 집 사진인데요.
    22:15
    이게 갑자기 왜 나온거죠?
    ...
    ```

- 일론 머스크가 한 말만 손수 정리한다.
    ```text
    네. 제 스스로도 그 질문을 자주 하는 편입니다.
    저희는 LA의 지하에 구멍을 내려고 하는데요. 이는 교통 체증을 완화시키기 위한
    3차원 네트워크의 터널이 될 수도 있는 시발점을 만들기 위함입니다.
    교통 체증은 오늘날 우리의 영혼을 탈탈 터는 문제 중의 하나입니다.
    세계 모든 사람들에게 영향을 끼치고 있죠. 인생에서 너무도 많은 부분을 가져갑니다.
    ...
    ```

### 2. OpenSearch 도커 컨테이너 실행
```bash
docker create -it -p 9200:9200 -p 9600:9600 -e OPENSEARCH_INITIAL_ADMIN_PASSWORD={password} -e "discovery.type=single-node" -v opensearch_vol:/usr/share/opensearch/data --name opensearch opensearchproject/opensearch
```
- 설명
    - -p 9200:9200 : OpenSearch HTTP 포트
    - -p 9600:9600 : OpenSearch 모니터링 포트
    - -e OPENSEARCH_INITIAL_ADMIN_PASSWORD={password} : 초기 비밀번호 설정
    - -e "discovery.type=single-node" : 단일 노드로 실행
    - -v opensearch_vol:/usr/share/opensearch/data : 데이터 볼륨 마운트

#### SSL 오류 발생과 해결
- 하지만 위 명령어로 실행하면 컨테이너 내부에서 오류가 발생한다
    ```text
    2024-07-05 22:15:12 Caused by: io.netty.handler.ssl.NotSslRecordException: not an SSL/TLS record: ...
    2024-07-05 22:15:12     at io.netty.handler.ssl.SslHandler.decodeJdkCompatible(SslHandler.java:1314) ~[netty-handler-4.1.110.Final.jar:4.1.110.Final]
    2024-07-05 22:15:12     at io.netty.handler.ssl.SslHandler.decode(SslHandler.java:1387) ~[netty-handler-4.1.110.Final.jar:4.1.110.Final]
    2024-07-05 22:15:12     at io.netty.handler.codec.ByteToMessageDecoder.decodeRemovalReentryProtection(ByteToMessageDecoder.java:530) ~[netty-codec-4.1.110.Final.jar:4.1.110.Final]
    2024-07-05 22:15:12     at io.netty.handler.codec.ByteToMessageDecoder.callDecode(ByteToMessageDecoder.java:469) ~[netty-codec-4.1.110.Final.jar:4.1.110.Final]
    2024-07-05 22:15:12     ... 16 more
    ```

- 프로젝트 기간이 길지 않고, 해당 포트는 외부에 노출할 필요가 없으므로 SSL을 끄고 실행하는 것으로 해결하였다.
    ```yaml
    /usr/share/opensearch/config/opensearch.yml
    # 변경 전
    plugins.security.ssl.http.enabled: true
    # 변경 후
    plugins.security.ssl.http.enabled: false
    ```

### 3. 텍스트 데이터 임베딩 및 OpenSearch에 저장
> RAG 세션을 해주신 멘토님이 짜준 코드를 적극! 참고하여 작성하였다.

#### OpenSearch 인덱스 생성
```python
from opensearchpy import OpenSearch
import torch
from transformers import AutoTokenizer, AutoModel
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import OpenSearchVectorSearch

INDEX_NAME = "elon_musk"
FILE_NAME = "ted_elon_musk_script.txt"

## OpenSearch 연결 설정
client = OpenSearch(
    hosts=[{"host": "localhost", "port": 9200}], http_auth=("admin", {password})
)

## 텍스트 데이터 불러오기
loader = TextLoader(file_path=FILE_NAME, encoding="utf-8")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=100,
    chunk_overlap=0,
    separators=["\n"],
    length_function=len,
)

documents = text_splitter.split_documents(docs)

# print(documents)

## Embedding 모델 정의
class MyEmbeddingModel:
    def __init__(self, model_name):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)

    def embed_documents(self, doc):
        inputs = self.tokenizer(
            doc, return_tensors="pt", padding=True, truncation=True, max_length=512
        )

        with torch.no_grad():
            outputs = self.model(**inputs)
            embeddings = outputs.last_hidden_state.mean(dim=1).tolist()

        return embeddings

    def embed_query(self, text):
        inputs = self.tokenizer(
            [text], padding=True, truncation=True, return_tensors="pt", max_length=512
        )
        with torch.no_grad():
            outputs = self.model(**inputs)
            embeddings = outputs.last_hidden_state.mean(dim=1).tolist()
        return embeddings


## index 구조 정의
index_body = {
    "settings": {
        "analysis": {
            "tokenizer": {
                "nori_user_dict": {
                    "type": "nori_tokenizer",
                    "decompound_mode": "mixed",
                    "user_dictionary": "user_dic.txt",
                }
            },
            "analyzer": {
                "korean_anlyzer": {
                    "filter": [
                        "synonym", "lowercase",
                    ],
                    "tokenizer": "nori_user_dict",
                }
            },
            "filter": {
                "synonym" :{
                    "type": "synonym_graph",
                    "synonyms_path" : "synonyms.txt"
                }
            }
        }
    }
}

## Embedding 모델 생성
my_embedding = MyEmbeddingModel("monologg/kobert")

## OpenSearch에 데이터 삽입
vector_db = OpenSearchVectorSearch.from_documents(
    index_name=INDEX_NAME,
    body=index_body,
    documents=documents,
    embedding=my_embedding,
    op_type="create",
    opensearch_url="http://localhost:9200",
    http_auth=("admin", {password}),
    use_ssl=False,
    verify_certs=False,
    ssl_assert_hostname=False,
    ssl_show_warn=False,
    bulk_size=1000000,
    timeout=360000,
)

result = vector_db.add_documents(documents, bulk_size=1000000)
```

- tokenizer는 한국어를 지원하는 "nori_tokenizer"를 사용하였다.
- embedding 모델은 저거 말고도 여러가지가 존재하는데, 어떤 모델이 프로젝트에 가장 부합하는 모델인지는 실험을 해볼 것이다.
- curl을 통해 localhost:9200/elon_musk/_search로 요청을 보내 임베딩한 데이터가 잘 들어갔는지 확인할 수 있다.

### 4. RAG 모델이 OpenSearch를 쿼리하여 대답 생성
```python
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI
from opensearchpy import OpenSearch
import os

INDEX_NAME = "elon_musk"

# 환경변수 설정
os.environ["OPENAI_API_KEY"] = {api_key}

llm = ChatOpenAI(
    model_name="gpt-3.5-turbo",
)

prompt_template = PromptTemplate(
    input_variables=["context", "question"],
    template="""
Imagine you are {character_name},
a wise and experienced advisor. Given the context: "{context}",
how would you respond to this inquiry: "{question}"?',
(in korean)
""",
)


llm_chain = LLMChain(llm=llm, prompt=prompt_template)

client = OpenSearch(
    hosts=["http://localhost:9200"],
    http_auth=("admin", {password}),
    use_ssl=False,
    verify_certs=False,
    ssl_assert_hostname=False,
    ssl_show_warn=False,
)

def search_documents(query):
    search_body = {"query": {"match": {"text": query}}}
    response = client.search(index=INDEX_NAME, body=search_body)
    hits = response["`its"]["hits"]
    return [hit["_source"]["text"] for hit in hits]

if __name__ == "__main__":
    question = input("Enter your question\n")
    search_results = search_documents(question)

    print(search_results)

    # context = " ".join(search_results)
    context = ""

    response = llm_chain.invoke({"character_name": INDEX_NAME, "context": context, "question": question})

    print (response["text"])
```

- OpenSearch에 저장된 데이터를 쿼리하여 RAG 모델에 넣어 대답을 생성한다.
- search_documents 함수를 통해 OpenSearch에 쿼리를 보내고, 그 결과를 context로 사용한다.

#### 결과

- 질문
    > 테슬라에 대해서 어떻게 생각해?
- RAG를 사용하지 않았을 때의 대답
    > 테슬라는 혁신적인 기업으로서 미래를 향한 비전을 가지고 있습니다. 그들의 전기 자동차 기술과 에너지 솔루션은 전 세계적으로 주목받고 있습니다. 테슬라의 혁신적인 접근 방식과 지속 가능한 비즈니스 모델에 대해 매우 긍정적으로 생각하고 있습니다.
- RAG를 사용할때 적용된 context
    > ['길게 갈 것 같지는 않아요.\n그러네요. 저는 최대한 오랫동안 테슬라에 머물 생각이에요.\n그리고 준비 중에 있는 흥미로운 일도 많고요. 아시다시피, 모델 3이 출시 예정이고요.', '올해 말까지 LA에서 뉴욕까지\n완전 자율 주행으로 횡단하는 계획에 맞춰서 진행 중이에요.\n사람이 테슬라에 타서 운전대를 잡지 않고 "뉴욕"을 찍으면 그리로 간다는 말이네요.', '길게 갈 것 같지는 않아요.\n그러네요. 저는 최대한 오랫동안 테슬라에 머물 생각이에요.\n그리고 준비 중에 있는 흥미로운 일도 많고요. 아시다시피, 모델 3이 출시 예정이고요.', '올해 말까지 LA에서 뉴욕까지\n완전 자율 주행으로 횡단하는 계획에 맞춰서 진행 중이에요.\n사람이 테슬라에 타서 운전대를 잡지 않고 "뉴욕"을 찍으면 그리로 간다는 말이네요.']
- RAG를 사용할 때의 대답
    > 저는 테슬라를 매우 긍정적으로 생각합니다. 테슬라는 혁신적인 기술과 지속 가능한 미래를 위한 비전을 갖춘 기업으로서, 자율 주행 기술을 통해 우리의 삶을 혁신하고 있습니다. 또한, 전기차 시장을 선도하고 환경에 친화적인 차량을 제공하는 멋진 기업이라고 생각합니다. 테슬라의 미래가 밝고 흥미로운 일들이 계속해서 일어날 것이라고 믿습니다.
- 고찰
    > 확실히 RAG를 사용하지 않았을 때는 객관적이고 일반적인 대답을 하는 반면, RAG를 사용할 때는 테슬라에 대해 긍정적인 일론 머스크의 대답과, 자율주행 기술을 언급했다는 것을 반영하여 대답을 생성하였다. 