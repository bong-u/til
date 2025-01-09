module.exports = {
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
      textgray: "var(--color-textgray)",
      black: "var(--color-black)",
      bg: "var(--color-bg)",
      scrollbar: "var(--color-scrollbar)",
      codeinline: "var(--color-codeinline)",
      codebox: "var(--color-codebox)",
      line: "var(--color-line)",
      box: {
        DEFAULT: "var(--color-box)",
        hover: "var(--color-box-hover)",
      },
      link: "var(--color-link)",
      quotebar: "var(--color-quotebar)",
    },
    extend: {
      fontFamily: {
        "base": [
          "Apple SD Gothic Neo",
          "system-ui",
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

