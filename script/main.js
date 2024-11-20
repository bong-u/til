`use strict`;

window.onload = () => {
    formatTimeDiff();
    switchSection();
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

    for (const el of elements) {
        label = '방금 전';

        const parts = el.getAttribute('lastmod').match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
        const lastmod = new Date(Date.UTC(parseInt(parts[1], 10), parseInt(parts[2], 10) - 1, parseInt(parts[3], 10), parseInt(parts[4], 10) - 9, parseInt(parts[5], 10), parseInt(parts[6], 10)));

        const today = new Date();

        const diff = (today - lastmod) / 1000;

        for (const value of times) {
            const betweenTime = Math.floor(diff / value.milliSeconds);

            if (betweenTime > 0) {
                label = `${betweenTime}${value.name} 전`;
                break
            }
        }

        el.innerText = label;
    }
};

// 스위치 버튼 클릭 시 섹션 전환
const switchSection = () => {
    const switches = document.getElementsByName('switch');
    const summarySection = document.getElementById('summary-section');
    const groupSection = document.getElementById('group-section');
    const tagSection = document.getElementById('tag-section');

    // 모든 섹션 숨기기
    summarySection.classList.add('hidden');
    groupSection.classList.add('hidden');
    tagSection.classList.add('hidden');

    // 선택된 스위치에 따라 섹션 표시
    if (switches[0].checked) {
        summarySection.classList.remove('hidden');
    } else if (switches[1].checked) {
        groupSection.classList.remove('hidden');
    } else if (switches[2].checked) {
        tagSection.classList.remove('hidden');
    }
}