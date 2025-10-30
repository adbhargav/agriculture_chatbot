import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you deploy under a subpath, change base to '/your-subpath/'
export default defineConfig({
  base: '/',
  plugins: [react()]
})
