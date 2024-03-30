import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Match all requests starting with "/api/" and forward them to the backend
  //     '/api': {
  //       target: '',
  //       changeOrigin: true,
  //       secure: true, // Set to true for HTTPS connections in production
  //     },
  //   }
  // }
})
