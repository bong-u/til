`use strict`;

const toggleDarkModeHandler = () => {
    setTimeout(() => {
        document.body.classList.toggle('dark');
    }, 200);
};
const checkRecentPost = (e, recentCommitYearday) => {
    const target = e.target;
    // get today's yearday
    const diff = new Date() - new Date(new Date().getFullYear(), 0, 0);
    // convert it into day
    const today = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (today - recentCommitYearday < 2 )
        target.classList.remove('hidden');
};