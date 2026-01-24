/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          status: {
            free: '#22c55e',
            busy: '#ef4444',
            off: '#9ca3af',
            stale: '#eab308',
          }
        }
      },
    },
    plugins: [],
  }