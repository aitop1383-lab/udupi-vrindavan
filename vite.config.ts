import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',   // 👈 ये जरूरी है
    server: {
      proxy: {
        '/api/wp': {
          target: 'http://d7v.021.myftpupload.com/wp-json/wp/v2',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/wp/, '')
        }
      }
    },
    plugins: [react(), tailwindcss()],
    define: {
      'process.env': env,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
