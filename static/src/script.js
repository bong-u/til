`use strict`;

window.onload = () => {
    checkDarkMode();
    modifyImagePath();
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
};

// 최근 게시물인 경우 "hidden" 클래스 제거
const checkRecentPost = (e, recentCommitYearday) => {
    // 최근 게시물 기준일
    const NEW_THRESHOLD = 2;
    const target = e.target;
    // get today's yearday
    const diff = new Date() - new Date(new Date().getFullYear(), 0, 0);
    // convert it into day
    const today = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (today - recentCommitYearday < NEW_THRESHOLD)
        target.classList.remove('hidden');
};

// 이미지 경로 변경
const modifyImagePath = () => {
    const imgElementList = document.querySelectorAll('img');

    for (const imgElement of imgElementList) {
        imgElement.src = imgElement.src.replace('/static/image', '/til/image');
    }
};

// 현재 다크모드 여부에 따라 class 추가
const checkDarkMode = () => {

    if (localStorage.getItem("theme") === "dark")
        document.documentElement.classList.add("dark");
    // light -> dark
    else {
        document.documentElement.classList.remove("dark");

    };
}

// 다크모드 toggle
const toggleDarkModeHandler = () => {
    const buttonEl = document.getElementById('toggleButton');
    // dark -> light
    if (localStorage.getItem("theme") === "dark") {
        localStorage.removeItem("theme");
        buttonEl.innerText = '🌙';
    }
    // light -> dark
    else {
        localStorage.setItem("theme", "dark");
        buttonEl.innerText = '☀️';
    }

    checkDarkMode();
};


// 스크롤 최상단 이동
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 스크롤 최하단 이동
const scrollToBottom = () => {
    window.scrollTo({ top: document.body.clientHeight, behavior: 'smooth' });
};

const scrollHandler = () => {
    const scrollButton = document.getElementById('scrollButton');
    if (window.scrollY / (document.body.clientHeight - window.innerHeight) > 0.5) {
        scrollButton.innerText = '🔼';
        scrollButton.removeEventListener('click', scrollToBottom);
        scrollButton.addEventListener('click', scrollToTop);
    }
    else {
        scrollButton.innerText = '🔽';
        scrollButton.removeEventListener('click', scrollToTop);
        scrollButton.addEventListener('click', scrollToBottom);
    }
};