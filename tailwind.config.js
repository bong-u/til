module.exports = {
  darkMode: 'class',
  content: ["./content/**/*.md", "./layouts/**/*.html"],
  plugins: [],
  theme: {
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      'text': '#3f3f46', // zinc-700
      'bg': '#e4e4e7', // zinc-200
      'dark-text': '#d1d5db', // gray-300
      'dark-bg': '#27272a', // zinc-800
      'scroll-thumb': '#71717a', // zinc-500
      'code-bg': '#1c1917', // stone-900
      'toc-hover': '#9ca3af', // gray-400
      'dark-toc-hover': '#71717a', // gray-500
      'hl-bg': '#f4f4f5', // zinc-100
      'hl-dark-bg': '#1c1917', // stone-900
      'hl-hover-bg': '#d4d4d8', // zinc-300
      'hl-dark-hover-bg': '#0c0a09', // stone-950
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

