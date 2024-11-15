---
title: "JS - Dicom to base64"
date: 2023-08-06
tags: ["Javascript"]
---

### 배경

- 학부연구생 업무 중에, dicom파일을 서버에 전송하는 작업이 필요했다
- 보내는 형식은 2가지로 생각했다
  1. dicom파일을 그대로 multipart/form-data 형식으로 보내는 방법
      - 장점 : 파일을 그대로 효율적으로 전송할 수 있다
      - 단점 : 파일 정보를 함께 보내기 어렵다
  2. dicom파일을 base64로 인코딩하여 application/json 형식으로 보내는 방법
      - 장점 : 파일 정보를 함께 보낼 수 있다
      - 단점 : 인코딩으로 인해서 원본 파일보다 용량이 커진다
- 파일의 정보도 함께 구조화하여 보내기 위해 json형태로 보내는 방식을 택하였다

### 구현
- dicom파일 -> base64
  ```js
  // Encode a file to BASE64
    const readFileAsync = (file) => {
      return new Promise((resolve, reject) => {
        // 비동기적으로 파일을 읽어오기 위해 FileReader 객체를 생성
        const reader = new FileReader();

        // 읽기가 끝나면 수행
        reader.onload = (evt) => {
          resolve(evt.target.result);
        };

        // 에러가 발생하면 reject
        reader.onerror = reject;

        // 파일을 Base64로 인코딩된 데이터 URL 형식으로 읽어온다
        reader.readAsDataURL(file);
      });
    };
  ```
- 위 함수는 파일을 base64로 인코딩하여 promise를 반환한다
- 결과
  ```text
  data:application/octet-stream;base64,AAAAAAAAAAAAAAAAA...
  ```

