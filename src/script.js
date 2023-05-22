`use strict`;

// 최근 게시물인 경우 "hidden" 클래스 제거
const checkRecentPost = (e, recentCommitYearday) => {
    const target = e.target;
    // get today's yearday
    const diff = new Date() - new Date(new Date().getFullYear(), 0, 0);
    // convert it into day
    const today = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (today - recentCommitYearday < 2 )
        target.classList.remove('hidden');
};

// 이미지 경로 변경
window.onload = () => {
    const imgElementList = document.querySelectorAll('img');

    for (const imgElement of imgElementList) {
        imgElement.src = imgElement.src.replace('/static/image', '/til-hugo/image');
    }
}

