import type { Handle } from '@sveltejs/kit/hooks';
import { theme as configuredTheme } from '#lib/config.ts';

const themes = ['academic', 'editorial', 'modern'];
const requested = process.env.SITE_THEME;
const theme =
    requested && themes.includes(requested) ? requested : configuredTheme;

/** Stamps the chosen theme onto <html data-theme> when each page is rendered. */
export const handle: Handle = ({ event, resolve }) =>
    resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%theme%', theme),
    });
