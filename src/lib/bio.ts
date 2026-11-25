import type { Profile } from '#lib/types.ts';

export interface Part {
    text: string;
    url?: string;
}

/**
 * Names and phrases to link in the bio: every advisor named in education or
 * positions (so "Adam Sales" links to the same page as on the CV), plus
 * anything listed under `bio_links` in profile.yaml.
 */
export function bioLinks(profile: Profile): [string, string][] {
    const advisors = [...profile.education, ...(profile.positions ?? [])]
        .map((entry) => entry.advisor)
        .filter((person) => person?.url)
        .map((person) => [person!.name, person!.url!] as [string, string]);
    return [...advisors, ...Object.entries(profile.bio_links ?? {})];
}

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Splits text into plain and linked parts, linking each phrase wherever it appears. */
export function linkify(text: string, links: [string, string][]): Part[] {
    const urls = new Map(links);
    if (urls.size === 0) return [{ text }];
    // Longest first, so "Ryan S. Baker" would win over "Ryan".
    const phrases = [...urls.keys()].sort((a, b) => b.length - a.length).map(escape);
    return text
        .split(new RegExp(`(${phrases.join('|')})`, 'g'))
        .filter((piece) => piece.length > 0)
        .map((piece) => ({ text: piece, url: urls.get(piece) }));
}
