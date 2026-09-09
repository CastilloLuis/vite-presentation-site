import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import posts from './plugins/posts.js'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), posts()],
    resolve: {
        alias: {
            '@': path.resolve(new URL('.', import.meta.url).pathname, './src'),
        },
    },
})
