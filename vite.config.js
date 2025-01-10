import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/item': {
        target: 'http://5.189.180.8:8010',
        changeOrigin: true,
        secure: false, 
      },
      '/header/multiple': {
        target: 'http://5.189.180.8:8010',
        changeOrigin: true, 
        secure: false,
        
      },
    },
  },
});
