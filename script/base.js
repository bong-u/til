window.addEventListener('DOMContentLoaded', () => {
    scrollHandler();
});

// 스크롤 이벤트 핸들러
const scrollHandler = () => {
    const scrollButton = document.getElementById('scrollButton');
    if (scrollButton === null) return;

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

// 스크롤 최상단 이동
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 스크롤 최하단 이동
const scrollToBottom = () => {
    window.scrollTo({ top: document.body.clientHeight, behavior: 'smooth' });
};
