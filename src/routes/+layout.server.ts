import { events, featured, nto, profile, service, timeline } from '#lib/server/content.ts';
import { linkList } from '#lib/format.ts';

export const prerender = true;

export function load() {
    return {
        profile,
        featured: featured.map((paper) => ({
            ...paper,
            // DOI first, then the paper's other links in the order written.
            links: [
                ...(paper.doi ? ([['DOI', paper.doi]] as [string, string][]) : []),
                ...linkList(paper.links),
            ],
        })),
        nto,
        service,
        /** The four newest published events, for the home page. */
        recent: events.slice(0, 4),
        upcoming: timeline(events.filter((e) => e.upcoming)),
        past: timeline(events.filter((e) => !e.upcoming)),
        built: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/New_York',
        }),
    };
}
