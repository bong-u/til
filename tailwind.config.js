/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["content/**/*.md", "layouts/**/*.html"],
  theme: {
    colors: {
      'dark': {
        'bg': '#1d1e20',
        'scroll-track': '#1d1e20',
        'text': '#dadadb',
        'summary': '#2e2e33',
        'toc-hover': '#9696a5',
        'scroll-thumb': '#52525b',
      }
    }
  },
  plugins: [],
}

