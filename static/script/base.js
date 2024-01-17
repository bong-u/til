`use strict`;

// 현재 다크모드 여부에 따라 class 추가
const checkDarkMode = () => {
    // dark -> light
    if (localStorage.getItem("theme") === "dark")
        document.documentElement.classList.add("dark");
    // light -> dark
    else {
        document.documentElement.classList.remove("dark");
    };
}
checkDarkMode();

window.addEventListener('DOMContentLoaded', () => {
    scrollHandler();
});

// 스크롤 이벤트 핸들러
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
window.addEventListener('scroll', scrollHandler);

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
