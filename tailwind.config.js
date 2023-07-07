module.exports = {
  darkMode: 'class',
  content: ["./content/**/*.md", "./layouts/**/*.html"],
  plugins: [],
  theme: {
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

