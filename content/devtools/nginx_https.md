---
title: "Nginx에서 HTTPS 설정하기"
date: 2024-07-25
tags: ['Nginx', 'HTTPS', 'SSL', 'Docker']
---

## 배경
- 테커 부트캠프를 진행중이다.
- 모든 프로그램은 docker-compose로 구성되어 있다.
- AWS EC2에 구동 중인 서버에 HTTPS를 적용하려고 한다.
- 도메인 구매 없이 시도를 했으나, AWS에서 제공하는 도메인으로 SSL 인증서를 발급받을 수 없었다.
- 따라서, 도메인을 구매하고, Route 53을 통해 도메인을 연결했다.

## 목표
- Nginx를 이용하여 HTTPS를 적용한다.

## 방법

#### 1. docker-compose.yml에 certbot 컨테이너를 추가한다.
```yml
certbot:
    image: certbot/certbot
    container_name: certbot
    volumes:
        - ./certbot/conf:/etc/letsencrypt
        - ./certbot/www:/var/www/certbot
    depends_on:
        - nginx

    # certbot을 무한루프로 돌리기 위해 사용
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do sleep 6h & wait $${!}; done;'"
```

#### 2. nginx.conf를 수정한다.
```conf
# certbot을 사용하기 위한 설정
location /.well-known/acme-challenge/ {
    allow all;
    root /var/www/certbot;
}
```

#### 3. certbot 컨테이너를 활용해서 SSL 인증서를 발급받는다.
```bash
docker exec -it certbot certbot certonly \
  # 웹 루트 방식으로 인증서를 생성
  --webroot \
  # 웹 서버의 웹 루트 디렉터리 경로를 지정
  --webroot-path=/var/www/certbot \
  # 인증서 갱신 및 중요한 알림을 받을 이메일 주소를 지정
  --email {이메일 주소} \
  # Let's Encrypt 서비스 약관에 동의
  --agree-tos \ 
  # EFF(Electronic Frontier Foundation) 뉴스레터를 받지 않도록 설정
  --no-eff-email \
  # SSL 인증서를 생성할 도메인 이름을 지정
  -d {도메인 이름}
```

#### 4. Nginx 웹 서버와 함께 사용할 SSL 설정 파일을 다운로드
- 다운 받은 후 파일을 알맞은 위치로 이동시킨다.
- 해당 프로젝트에서는 /etc/letsencrypt/로 이동시켰다.

```bash
sudo curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "./options-ssl-nginx.conf"

sudo curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "./ssl-dhparams.pem"
```

#### 5. nginx.conf를 수정한다.
- 필요한 부분만 추가하였다.
```conf
server {
    listen 80;
    charset utf-8;

    server_name {도메인 이름};

    # HTTP 요청을 HTTPS로 리다이렉트
    location / {
        return 301 https://$host$request_uri;
    }
}
server {
    listen 443 ssl;
    charset utf-8;

    server_name { 도메인 이름 };

    # SSL 인증서 설정
    ssl_certificate /etc/letsencrypt/live/api.forest-of-thoughts.site/fullchain.pem;
    # SSL 인증서 키 설정
    ssl_certificate_key /etc/letsencrypt/live/api.forest-of-thoughts.site/privkey.pem;
    # SSL 설정 파일 포함
    include /etc/letsencrypt/options-ssl-nginx.conf;
    # Diffie-Hellman 키 설정
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

#### 6. nginx 컨테이너 설정을 수정한다.
```yml
nginx:
    image: nginx:stable
    ports:
        - "80:80"
        - "443:443"
    volumes:
        - ./nginx.conf:/etc/nginx/nginx.conf
        - ./certbot/conf:/etc/letsencrypt
        - ./certbot/www:/var/www/certbot
```
해
## 회고
- 보통 crontab을 활용해서 자동으로 인증서 갱신을 받는다.
- 이번에는 프로젝트 기간이 길지 않아서, 수동으로 진행했다.
- 다음에는 자동으로 인증서 갱신을 받는 것도 도전해보자.
