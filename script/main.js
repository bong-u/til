`use strict`;

window.onload = () => {
    formatTimeDiff();
    switchSection();

    const sortToggleBtn = document.getElementById('sort-toggle');
    if (sortToggleBtn) {
        sortToggleBtn.addEventListener('click', toggleSort);
    }
};

// 최근 게시물인 경우 "hidden" 클래스 제거
// recentCommitDate : ISO 8601 형식의 문자열
const checkRecentPost = (e, recentCommitDate) => {
    const target = e.target;
    // 최근 게시물 기준일 (일 단위)
    const NEW_THRESHOLD = 2;

    // 오늘 날짜와 최근 커밋 날짜를 가져오기
    const today = new Date();
    const recentDate = new Date(recentCommitDate); // recentCommitDate는 ISO 문자열 또는 Date 객체로 제공

    // 날짜 차이 계산 (밀리초 → 일 단위)
    const dayDifference = Math.floor((today - recentDate) / (1000 * 60 * 60 * 24));

    // 기준일 이내면 "hidden" 클래스 제거
    if (dayDifference < NEW_THRESHOLD) {
        target.classList.remove('hidden');
        target.classList.add('inline');
    }
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

// 인기순/최신순 토글
const toggleSort = () => {
    const popularList = document.getElementById('popular-list');
    const recentList = document.getElementById('recent-list');
    const sortToggle = document.getElementById('sort-toggle');

    const isPopular = !popularList.classList.contains('hidden');

    if (isPopular) {
        popularList.classList.add('hidden');
        recentList.classList.remove('hidden');
        sortToggle.textContent = '🕐 최신순';
    } else {
        recentList.classList.add('hidden');
        popularList.classList.remove('hidden');
        sortToggle.textContent = '🔥 인기순';
    }
};

const switchSection = () => {
    const switches = document.getElementsByName('switch');
    const sections = [
        document.getElementById('summary-section'),
        document.getElementById('group-section'),
        document.getElementById('tag-section'),
        document.getElementById('search-section'),
    ];

    sections.forEach((section, i) => {
        section.style.display = switches[i].checked ? '' : 'none';
    });
}