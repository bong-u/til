document.addEventListener('DOMContentLoaded', () => {
    formatTimeDiff();
    checkRecentPosts();
    switchSection();

    document.getElementById('switch-form').addEventListener('change', switchSection);

    const sortToggleBtn = document.getElementById('sort-toggle');
    if (sortToggleBtn) {
        sortToggleBtn.addEventListener('click', toggleSort);
    }
});

// 최근 게시물인 경우 "hidden" 클래스 제거
const checkRecentPosts = () => {
    const NEW_THRESHOLD = 2;
    const today = new Date();

    document.querySelectorAll('img[data-lastmod]').forEach((img) => {
        const recentDate = new Date(img.dataset.lastmod);
        const dayDifference = Math.floor((today - recentDate) / (1000 * 60 * 60 * 24));

        if (dayDifference < NEW_THRESHOLD) {
            img.classList.remove('hidden');
            img.classList.add('inline');
        }
    });
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

let pagefindLoaded = false;

const loadPagefind = () => {
    if (pagefindLoaded) return;
    pagefindLoaded = true;

    const baseURL = document.querySelector('link[id="twCSS"]').href.replace('css/style.css', '');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = baseURL + 'pagefind/pagefind-ui.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = baseURL + 'pagefind/pagefind-ui.js';
    script.onload = () => {
        const ui = new PagefindUI({
            element: "#search",
            showSubResults: true,
            pageSize: 10,
            autofocus: true,
            translations: {
                "placeholder": "검색",
                "clear_search": "검색 초기화",
                "load_more": "결과 더보기",
                "search_label": "사이트 검색",
                "filters_label": "필터",
                "zero_results": "\"[SEARCH_TERM]\"에 대한 결과가 없습니다.",
                "many_results": "\"[SEARCH_TERM]\"에 대한 [COUNT]개의 결과",
                "one_result": "\"[SEARCH_TERM]\"에 대한 [COUNT]개의 결과",
                "alt_search": "\"[SEARCH_TERM]\"에 대한 결과가 없습니다. 대신 [DIFFERENT_TERM]에 대한 결과를 표시합니다.",
                "search_suggestion": "\"[SEARCH_TERM]\"에 대한 결과가 없습니다. 다음 검색어를 시도해 보세요:",
                "searching": "\"[SEARCH_TERM]\" 검색 중..."
            },
            processResult: (result) => {
                if (result.meta && result.meta.image && result.meta.image_alt) {
                    delete result.meta.image;
                    delete result.meta.image_alt;
                }
                return result;
            }
        });
        const input = document.querySelector("#search input.pagefind-ui__search-input");
        if (input && !input.id) {
            input.id = "pagefind-search";
            input.name = "search";
        }
    };
    document.head.appendChild(script);
};

const switchSection = () => {
    const switches = document.getElementsByName('switch');
    const sections = [
        document.getElementById('summary-section'),
        document.getElementById('group-section'),
        document.getElementById('tag-section'),
        document.getElementById('search-section'),
    ];

    const tabs = document.querySelectorAll('[role="tab"]');
    sections.forEach((section, i) => {
        const isActive = switches[i].checked;
        section.classList.toggle('hidden', !isActive);
        tabs[i].setAttribute('aria-selected', isActive);
    });

    if (switches[3].checked) {
        loadPagefind();
    }
}