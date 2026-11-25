import { slug } from '#lib/format.ts';
import type { SitePaper } from '#lib/types.ts';

/** A stable anchor for a paper, from its first few title words. */
export function paperID(paper: SitePaper): string {
    return slug(paper.title.split(/\s+/).slice(0, 6).join(' '));
}

/** The venue's short name, such as "EDM 2026", taken from the parentheses in the venue; else the year. */
export function venueShort(paper: SitePaper): string {
    const match = paper.venue.match(/\(([^()]*\b\d{4})\)/);
    return match ? match[1] : String(paper.year);
}
