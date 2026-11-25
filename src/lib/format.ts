import type { Links } from '#lib/types.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Today's date in Ithaca, as YYYY-MM-DD, for deciding what's upcoming. */
export function today(): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());
}

function parts(iso: string) {
    const [y, m, d] = iso.split('-').map(Number);
    return { y, m: months[m - 1], d };
}

/** "Oct 5, 2026", "Nov 9–13, 2026", "Jun 28 – Jul 2, 2026", "Dec 30, 2026 – Jan 2, 2027". */
export function formatWhen(start: string, end?: string): string {
    const a = parts(start);
    if (!end || end === start) return `${a.m} ${a.d}, ${a.y}`;
    const b = parts(end);
    if (a.y !== b.y) return `${a.m} ${a.d}, ${a.y} – ${b.m} ${b.d}, ${b.y}`;
    if (a.m !== b.m) return `${a.m} ${a.d} – ${b.m} ${b.d}, ${a.y}`;
    return `${a.m} ${a.d}–${b.d}, ${a.y}`;
}

/** Readable names for link keys used in the YAML. Unknown keys are tidied automatically. */
const linkNames: Record<string, string> = {
    doi: 'DOI',
    paper: 'Paper',
    preprint: 'Preprint',
    scholar: 'Google Scholar',
    announcement: 'Announcement',
    program: 'Program',
    conference: 'Conference',
    training_sessions: 'Training sessions (PDF)',
    recap: 'Recap',
    linkedin_post: 'LinkedIn post',
    panel: 'Panel',
    workshop: 'Workshop site',
    slides: 'Slides (PDF)',
    news: 'News',
    huggingface_org: 'Hugging Face',
    github: 'GitHub',
};

export function linkName(key: string): string {
    if (linkNames[key]) return linkNames[key];
    const words = key.replace(/[_-]+/g, ' ').trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
}

/** A YAML links map as [label, url] pairs, in the order written. */
export function linkList(links?: Links): [string, string][] {
    return Object.entries(links ?? {})
        .filter(([, url]) => typeof url === 'string' && /^(https?:|mailto:)/.test(url))
        .map(([key, url]) => [linkName(key), url]);
}

/** Sentence-cases a role for display: "lead organizer" → "Lead organizer". */
export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function slug(text: string): string {
    return text
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
