`use strict`;

window.onload = () => {
    modifyImagePath();
    loadUtterances();
    sidebarScrollHandler();
};

// 이미지 경로 변경
const modifyImagePath = () => {
    const imgElementList = document.querySelectorAll('img');

    for (const imgElement of imgElementList) {
        imgElement.src = imgElement.src.replace('/static/image', '/til/image');
    }
};

// 댓글 기능
const loadUtterances = () => {
    const commentElement = document.getElementById('comment-box');

    if (commentElement === null)
        return;

    const scriptElement = document.createElement('script');
    scriptElement.src = "https://utteranc.es/client.js";
    scriptElement.setAttribute('repo', "bong-u/til");
    scriptElement.setAttribute('issue-term', "pathname");
    scriptElement.setAttribute('label', "comment");
    scriptElement.setAttribute('crossorigin', "anonymous");
    scriptElement.async = true;

    if (localStorage.getItem("theme") === "dark")
        scriptElement.setAttribute('theme', "github-dark-orange");
    else
        scriptElement.setAttribute('theme', "github-light");

    const oldChild = commentElement.firstChild;

    if (oldChild)
        commentElement.replaceChild(scriptElement, oldChild);
    else
        commentElement.appendChild(scriptElement);
};

// 사이드바 스크롤 이벤트 핸들러
const sidebarScrollHandler = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.onmousemove = (e) => {
        const mouseY = e.clientY;

        const sidebarRect = sidebar.getBoundingClientRect();
        const offsetY = mouseY - sidebarRect.top;

        const maxScroll = sidebar.scrollHeight - sidebar.clientHeight;
        const scrollValue = maxScroll * (offsetY / sidebar.clientHeight);

        sidebar.scrollTo({ top: scrollValue });
    };
};
