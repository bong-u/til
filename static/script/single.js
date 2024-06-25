`use strict`;

window.onload = () => {
    modifyImagePath();
    loadUtterances();
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

    scriptElement.setAttribute('theme', "github-light");

    const oldChild = commentElement.firstChild;

    if (oldChild)
        commentElement.replaceChild(scriptElement, oldChild);
    else
        commentElement.appendChild(scriptElement);
};
