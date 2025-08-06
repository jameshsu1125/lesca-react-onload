import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dtsPlugin from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        base: './',
        root: resolve(__dirname, 'src'),
        publicDir: resolve(__dirname, 'public'),
        build: {
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
        plugins: [
            react(),
            cssInjectedByJsPlugin(),
            dtsPlugin({ insertTypesEntry: true, outDir: '../lib' }),
        ],
        server: {
            open: true,
            port: 5173,
        },
        define: {
            'process.env': env,
        },
    };
});
