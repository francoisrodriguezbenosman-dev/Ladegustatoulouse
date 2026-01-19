import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                domaine: resolve(__dirname, 'domaine.html'),
                vins: resolve(__dirname, 'vins.html'),
                visites: resolve(__dirname, 'visites.html'),
                contact: resolve(__dirname, 'contact.html'),
            },
        },
    },
    server: {
        open: true
    }
});
