FROM alpine:3.17

MAINTAINER Bong-u <bongudev@gmail.com>

RUN apk add hugo git npm && \
	git clone https://github.com/bong-u/til-hugo.git

WORKDIR /til-hugo

RUN npm install

EXPOSE 1313
