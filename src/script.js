`use strict`;

// 이미지 경로 변경
window.onload = () => {
    checkDarkMode();
    modifyImagePath();
};

// 최근 게시물인 경우 "hidden" 클래스 제거
const checkRecentPost = (e, recentCommitYearday) => {
    const target = e.target;
    // get today's yearday
    const diff = new Date() - new Date(new Date().getFullYear(), 0, 0);
    // convert it into day
    const today = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (today - recentCommitYearday < 2)
        target.classList.remove('hidden');
};

// 이미지 경로 변경
const modifyImagePath = () => {
    const imgElementList = document.querySelectorAll('img');

    for (const imgElement of imgElementList) {
        imgElement.src = imgElement.src.replace('/static/image', '/til/image');
    }
};

const checkDarkMode = () => {
    const linkEl = document.createElement("link");
    linkEl.id = "github-markdown-css";
    linkEl.rel = "stylesheet";

    // dark -> light
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.remove("dark");
        linkEl.href = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css"
    }
    // light -> dark
    else {
        document.documentElement.classList.add("dark");
        linkEl.href = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-dark.min.css";
    }

    const prevEl = document.getElementById("github-markdown-css");

    if (prevEl) {
        document.head.replaceChild(linkEl, prevEl);
    } else {
        let twCSS = document.getElementById("twCSS");
        document.head.insertBefore(linkEl, twCSS);
    }
};

// 다크모드 toggle
const toggleDarkModeHandler = () => {
    const buttonEl = document.getElementById('toggleButton');
    // dark -> light
    if (localStorage.getItem("theme") === "dark") {
        localStorage.removeItem("theme");
        buttonEl.innerText = '☀️';
    }
    // light -> dark
    else {
        localStorage.setItem("theme", "dark");
        buttonEl.innerText = '🌙';
    }

    checkDarkMode();
};
