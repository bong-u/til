module.exports = {
  darkMode: 'class',
  content: ["./content/**/*.md", "./layouts/**/*.html"],
  plugins: [],
  theme: {
    listStyleType: {
      disc: 'disc',
      circle: 'circle',
      square: 'square',
      decimal: 'decimal',
      alpha: 'lower-alpha',
      roman: 'upper-roman',
    },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      text: "var(--color-text)",
      bg: "var(--color-bg)",
      scroll_thumb: "var(--color-scroll-thumb)",
      code_bg: "var(--color-code-bg)",
      toc_hover: "var(--color-toc-hover)",
      box_bg: "var(--color-box-bg)",
      box_hover_bg: "var(--color-box-hover-bg)",
      link: "var(--color-link)",
      quote_bar: "var(--color-quote-bar)",
    },
    extend: {
      fontFamily: {
        "base": [
          "Noto Sans KR",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ],
        "code": [
          "Ubuntu"
        ]
      }
    }
  }
}

