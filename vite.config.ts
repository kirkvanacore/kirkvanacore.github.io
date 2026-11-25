import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
import type { UserConfig } from 'vite';

const config: UserConfig = {
    plugins: [
        sveltekit({
            preprocess: [vitePreprocess({ script: true })],
            // Every page is prerendered to plain HTML for GitHub Pages. GitHub
            // Pages serves 404.html for unknown paths.
            adapter: adapter({
                pages: 'build',
                assets: 'build',
                fallback: '404.html',
            }),
            // The site is served from the root of kirkvanacore.com (and
            // kirkvanacore.github.io), so there is no base path.
            paths: {
                relative: false,
            },
        }),
    ],
    server: {
        fs: {
            // The YAML content lives outside src/.
            allow: ['content'],
        },
    },
};

export default config;
