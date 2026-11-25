/**
 * Site-wide settings that aren't content. Content (bio, papers, events) lives
 * in the YAML files in /content.
 */

/** The site's public address, used for canonical links and social previews. */
export const siteUrl = 'https://kirkvanacore.com';

/** Where this site's source lives. */
export const repoUrl = 'https://github.com/kirkvanacore/kirkvanacore.github.io';

/**
 * The visual theme: 'academic' (classic serif, navy), 'editorial' (warm
 * paper, muted red) or 'modern' (sans-serif, slate and teal). The themes are
 * defined in src/lib/styles/global.css. Set SITE_THEME=… when running
 * `npm run dev` to preview another one without changing this line.
 */
export const theme: 'academic' | 'editorial' | 'modern' = 'academic';
