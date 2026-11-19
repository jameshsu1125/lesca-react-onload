import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'public'),
    build: {
      rollupOptions: {
        external: ['react', 'react/jsx-runtime'],
      },
      emptyOutDir: true,
      outDir: '../lib',
      lib: {
        entry: resolve(__dirname, 'src/index.tsx'),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          globalVars: {
            mainColor: 'red',
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
    plugins: [react(), cssInjectedByJsPlugin()],
    test: {
      environment: 'jsdom',
    },
    server: {
      open: true,
      port: 5173,
    },
  };
});
