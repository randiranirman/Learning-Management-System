import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7293',
        changeOrigin: true,
        secure: false,
      },
      '/notificationHub': {
        target: 'https://localhost:7293',
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxying for SignalR
      },
    },
  },
});
