/**
 * Search-engine metadata built from the content files: a schema.org Person
 * record for the home page, and a short description for each page.
 */
import { siteUrl } from '#lib/config.ts';
import { venueShort } from '#lib/papers.ts';
import type { NTO, Profile, ServiceRole, SitePaper } from '#lib/types.ts';

const absolute = (path: string) => siteUrl + '/' + path.replace(/^\/+/, '');

/** Joins a list as prose: "a", "a and b", "a, b and c". */
function prose(items: string[]): string {
    if (items.length <= 2) return items.join(' and ');
    return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

const unique = <T>(items: T[]) => [...new Set(items)];

/** Current appointments: those whose years run to "present". */
function current(profile: Profile) {
    return (profile.positions ?? []).filter((p) => /present/i.test(p.years));
}

/**
 * A schema.org Person as a JSON-LD string, safe to put inside a <script>
 * element: "<" is escaped, so no value can close the tag early.
 */
export function personJsonLd(profile: Profile, nto: NTO): string {
    const positions = current(profile);
    const orgURL = (name: string) => (name === nto.nto.name ? nto.nto.url : undefined);
    const sameAs = [
        profile.links.google_scholar,
        profile.links.semantic_scholar,
        profile.links.orcid,
        profile.links.linkedin,
        profile.links.github,
    ].filter((url): url is string => !!url);

    const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        honorificSuffix: profile.credentials,
        description: profile.short_bio,
        url: siteUrl + '/',
        image: absolute(profile.headshot),
        email: profile.email ? `mailto:${profile.email}` : undefined,
        jobTitle: positions.length > 0 ? positions.map((p) => p.title) : profile.titles,
        worksFor: unique(positions.map((p) => p.org)).map((name) => ({
            '@type': 'Organization',
            name,
            url: orgURL(name),
        })),
        alumniOf: unique(profile.education.map((e) => e.school)).map((name) => ({
            '@type': 'CollegeOrUniversity',
            name,
        })),
        knowsAbout: profile.areas_of_interest,
        sameAs,
    };
    return JSON.stringify(person).replace(/</g, '\\u003c');
}

/** Each page's own meta description, so no two pages share one. */
export const describe = {
    publications(profile: Profile, featured: SitePaper[]) {
        const venues = unique(featured.map(venueShort));
        return `Selected publications by ${profile.name}${venues.length ? `, including papers at ${prose(venues)}` : ''}, with summaries and links. The full list is on Google Scholar.`;
    },
    events(profile: Profile) {
        return `Panels, workshops, tutorials and convenings with ${profile.name}, upcoming and past.`;
    },
    cv(profile: Profile, service: ServiceRole[] = []) {
        const orgs = unique((profile.positions ?? []).map((p) => p.org.split(', ').pop() ?? p.org));
        return `Curriculum vitae of ${profile.name}${profile.credentials ? ', ' + profile.credentials : ''}: appointments${orgs.length ? ` at ${prose(orgs)}` : ''}, education${service.length ? ', advisors and professional service' : ' and advisors'}.`;
    },
    contact(profile: Profile) {
        const where = [
            profile.links.google_scholar && 'Google Scholar',
            profile.links.semantic_scholar && 'Semantic Scholar',
            profile.links.orcid && 'ORCID',
            profile.links.linkedin && 'LinkedIn',
            profile.links.github && 'GitHub',
        ].filter((name): name is string => !!name);
        return `How to contact ${profile.name}: email ${profile.email}${where.length ? `, or find him on ${prose(where)}` : ''}.`;
    },
};
