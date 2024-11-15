---
title: "Issue - Jar 실행환경에서 ClassPathResource를 가져오지 못하는 문제"
date: 2023-07-11
tags: ["Java", "Spring"]
---

### 상황

- 개발 환경에서는 ClassPathResource를 문제없이 불러온다
- jar로 package해서 실행했을 때 오류가 발생한다
  ```
  Caused by: java.lang.RuntimeException: Cannot read blacklist file
          at org.academy.springorder.blacklist.BlacklistRepository.list(BlacklistRepository.java:25)
          at org.academy.springorder.blacklist.BlacklistService.list(BlacklistService.java:16)
          at org.academy.springorder.CommandLineApplication.main(CommandLineApplication.java:66)
          ... 8 more
  ```
- 문제의 코드

  ```java
      List<String> list = new ArrayList<String>();

      try {
          list = Files.readAllLines(blacklist.getFile().toPath());
      }
      catch (IOException e) {
          throw new RuntimeException("Cannot read blacklist file");
      }
  ```

### 해결

- readAllLines를 사용하지 않고 InputStreamReader와 BufferedRearder를 사용하여 해결하였다.

  ```java
  List<String> list = new ArrayList<String>();

  try {
      InputStreamReader isr = new InputStreamReader(blacklist.getInputStream());
      BufferedReader br = new BufferedReader(isr);

      String line;
      while ((line = br.readLine()) != null)
          list.add(line);
      isr.close();
      br.close();
  }
  ```
