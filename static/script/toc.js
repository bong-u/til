let anchorsCache = null;

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", () => {
        const toc = document.getElementById("TableOfContents");
        const tocLinks = document.querySelectorAll("#TableOfContents a");
        const current = getCurrentAnchor();
        let currentIdx = 0;

        for (let i = 0; i < tocLinks.length; i++) {
            tocLinks[i].classList.remove("current");
            if (tocLinks[i] === current)
                currentIdx = i;
        }

        if (current)
            current.classList.add("current");

        toc.scroll(0, current.offsetTop - (toc.offsetHeight / 2));
    });
});

const getTocItem = (anchor) => {
    return document.querySelector('[href="' + anchor + '"]');
}

const getCurrentAnchor = () => {
    const winY = window.scrollY;
    const anchors = getAnchors();
    let currAnchor = null;
    for (let i = 0; i < anchors.length; i++) {
        const y = getHeading(anchors[i]).getBoundingClientRect().top + winY;
        if (y < winY + window.innerHeight * 0.23)
            currAnchor = anchors[i];
        else
            break;
    }
    if (!currAnchor)
        currAnchor = anchors[0];
    return getTocItem(currAnchor);
}

const getAnchors = () => {
    if (!anchorsCache) {
        anchorsCache = Array.from(document.querySelectorAll("#TableOfContents a")).map((link) => {
            return link.getAttribute("href");
        });
    }
    return anchorsCache;
}

const getHeading = (anchor) => {
    return document.getElementById(anchor.substr(1));
}