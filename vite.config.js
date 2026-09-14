import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  /* server: {
    proxy: {
      '/sendmail.php': {
        // Ajusta "nuevo_proyecto" si tu carpeta dentro de htdocs se llama diferente
        target: 'http://localhost/nuevo_proyecto',
        changeOrigin: true,
      },
    },
  }, */
  plugins: [
    injectHTML(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contacto: resolve(__dirname, 'contacto.html'),
      },
    },
  },
});