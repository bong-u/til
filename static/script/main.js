`use strict`;

window.onload = () => {
    formatTimeDiff();
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

const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 },
];

// 시간 차이 계산
const formatTimeDiff = () => {
    const elements = document.getElementsByClassName('summary-date');
    let label = '';

    for (const element of elements) {
        label = '방금 전';
        // Date 객체 변환을 위해 " KST" 제거
        const lastmod = new Date(element.getAttribute('lastmod').replace(" KST", ""));

        const today = new Date();

        const diff = (today - lastmod) / 1000;

        for (const value of times) {
            const betweenTime = Math.floor(diff / value.milliSeconds);

            if (betweenTime > 0) {
                label = `${betweenTime}${value.name} 전`;
                break
            }
        }

        element.innerText = label;
    }
};

const switchSection = (e) => {
    const switches = e.target.parentElement.children;
    const summarySection = document.getElementById('summary-section');
    const groupSection = document.getElementById('group-section');

    if (switches[0].checked) {
        summarySection.classList.remove('hidden');
        groupSection.classList.add('hidden');
    } else {
        summarySection.classList.add('hidden');
        groupSection.classList.remove('hidden');
    }
}