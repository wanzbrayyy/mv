import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true // Ini akan membuat server bisa diakses secara publik (0.0.0.0)
  }
})
