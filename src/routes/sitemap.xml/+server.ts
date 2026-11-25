import { siteUrl } from '#lib/config.ts';

export const prerender = true;

const pages = ['/', '/research', '/publications', '/events', '/cv', '/contact'];

export function GET() {
    const urls = pages.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n');
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        { headers: { 'Content-Type': 'application/xml' } },
    );
}
