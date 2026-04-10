import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/portfolio/' to '/<your-repo-name>/' when deploying to GitHub Pages project site
// Use '/' if deploying to a GitHub user site (username.github.io)
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
