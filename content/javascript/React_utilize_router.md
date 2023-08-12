---
title: "React - 로그인 상태와 중첩 라우팅"
date: 2023-08-12
---

### 배경

- 학부연구생 업무 중에, 로그인 여부에 따라 다른 페이지를 보여주는 기능을 구현해야 했다.
- 로그인을 하지 않았을때는 "/login"으로, 로그인을 했을 때는 "/"으로 리다이렉트 했다
- path가 달라도 공통적으로 적용되는 레이아웃은 중첩 라우팅을 이용하여 구현했다
- 구조는 다음과 같다
![route_structure](/static/image/react_router_structure.png)

### 코드
- Router.js
    ```html
    <BrowserRouter>
        <Routes>
            <!-- isAuthorized를 prop으로 넘겨서 이미 login한 경우 redirect -->
            <Route
            path="/login"
            element={<Login isAuthorized={isAuthorized} />}
            />
            <!-- 로그인을 하지 않았는데 "/"로 접근시 redirect -->
            {!isAuthorized ? (
            <Route path="/" element={<Navigate to="/login" />} />
            ) : (
            <!-- 공통 요소인 MainLayout에 대해 아래와 같이 중첩라우팅을 사용할 수 있다 -->
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainDashboard />} />
                <Route path="/file" element={<FileManager />} />
                <Route path="/job" element={<JobManager />} />
            </Route>
            )}
        </Routes>
    </BrowserRouter>
    ```

- MainLayout.js
    ```html
    <Container>
        <Sidebar/>
        <!-- Outlet을 이용하여 자식 컴포넌트를 보여준다 -->
        <Outlet />
    </Container>
    ```
