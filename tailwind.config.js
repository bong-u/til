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
      scrollbar: "var(--color-scrollbar)",
      codeinline: "var(--color-codeinline)",
      codebox: "var(--color-codebox)",
      box: {
        DEFAULT: "var(--color-box)",
        hover: "var(--color-box-hover)",
      },
      sidebar: "var(--color-sidebar)",
      link: "var(--color-link)",
      quotebar: "var(--color-quotebar)",
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
          "Roboto Mono",
        ]
      }
    }
  }
}

