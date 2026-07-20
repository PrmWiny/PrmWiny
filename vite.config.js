import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    proxy: {
      '/api/codewars': {
        target: 'https://www.codewars.com/api/v1/users/PrmWiny',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/codewars/, '')
      }
    }
  }
})
