import { defineConfig } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import removeConsole from 'vite-plugin-remove-console';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            // import svg as a component
            exportAsDefault: true,
        }),
        eslint(),
        removeConsole(),
    ],
    server: {
        // open at the port
        port: 3000,
        // open the browser automatically
        open: true,
        // host the url to the outer network like run in mobile
        host: true,
    },
    // rename the entry point in vite -> set into the index.html
    // path alias in vite
    resolve: {
        alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
    },
});
