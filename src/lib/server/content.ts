/**
 * Reads the YAML files in /content when the site is built. Pages never see the
 * raw files: unpublished events and internal notes (`verify`, `note_for_site`)
 * are dropped here, so they don't end up in the built site.
 */
import { parse } from 'yaml';
import type {
    EventRecord,
    NTO,
    Paper,
    Profile,
    ServiceRole,
    SiteEvent,
    TimelineItem,
    TimelineYear,
} from '#lib/types.ts';
import { formatWhen, linkList, slug, today } from '#lib/format.ts';

const files = import.meta.glob('/content/*.yaml', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

function load<T>(name: string): T {
    const text = files[`/content/${name}.yaml`];
    if (text === undefined) throw new Error(`Missing content/${name}.yaml`);
    try {
        return parse(text) as T;
    } catch (error) {
        throw new Error(`content/${name}.yaml isn't valid YAML: ${error}`);
    }
}

/** Fails the build with a readable message, rather than rendering a broken page. */
function require(condition: unknown, message: string): asserts condition {
    if (!condition) throw new Error(`Content problem: ${message}`);
}

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export const profile = load<Profile>('profile');
require(profile?.name, 'profile.yaml needs a name');
require(Array.isArray(profile.long_bio), 'profile.yaml long_bio should be a list of paragraphs');

export const featured = load<Paper[]>('featured');
require(Array.isArray(featured), 'featured.yaml should be a list of papers');
featured.forEach((paper, i) =>
    require(paper.title && paper.authors && paper.venue, `featured.yaml paper #${i + 1} needs a title, authors and venue`),
);

export const nto = load<NTO>('nto');
export const service = load<ServiceRole[]>('service') ?? [];

/** The roles an event can give Kirk. The header of events.yaml lists the same. */
const eventRoles = [
    'organizer',
    'lead organizer',
    'co-organizer',
    'PI and organizer',
    'panelist',
    'instructor',
    'presenter',
    'invited speaker',
    'invited participant',
];

/** What sort of event it is, shown as a tag on each entry. */
const eventKinds = ['workshop', 'tutorial', 'training', 'panel', 'talk', 'paper', 'convening'];

const records = load<EventRecord[]>('events') ?? [];
records.forEach((record, i) => {
    const where = `events.yaml entry #${i + 1} ("${record?.title ?? 'untitled'}")`;
    require(record?.title, `${where} needs a title`);
    require(record.event, `${where} needs an event`);
    require(isoDate.test(String(record.date)), `${where} needs a date written like 2026-11-09`);
    // Hidden entries are checked when they're published.
    if (record.publish !== false) {
        require(eventRoles.includes(String(record.role)), `${where} needs a role, one of: ${eventRoles.join(', ')}`);
        require(eventKinds.includes(String(record.kind)), `${where} needs a kind, one of: ${eventKinds.join(', ')}`);
    }
    if (record.image) require(record.image.src && record.image.alt, `${where} has an image without both src and alt`);
    for (const photo of record.photos ?? []) require(photo?.src && photo?.alt, `${where} has a photo without both src and alt`);
    if (record.end_date) require(isoDate.test(String(record.end_date)), `${where} has an end_date that isn't written like 2026-11-13`);
});

const now = today();
const usedIDs = new Set<string>();

/** Published events, newest first. */
export const events: SiteEvent[] = records
    .filter((record) => record.publish !== false)
    .map((record): SiteEvent => {
        const date = String(record.date);
        const end_date = record.end_date ? String(record.end_date) : undefined;
        let id = slug(`${date.slice(0, 7)}-${record.title.split(/\s+/).slice(0, 6).join(' ')}`);
        while (usedIDs.has(id)) id += '-x';
        usedIDs.add(id);
        return {
            id,
            date,
            end_date,
            when: record.date_display ?? formatWhen(date, end_date),
            upcoming: (end_date ?? date) >= now,
            highlight: record.highlight === true,
            group: record.group,
            role: String(record.role),
            kind: String(record.kind),
            nto: record.nto === true,
            title: record.title,
            type: record.type,
            description: record.description,
            with: record.with,
            moderator: record.moderator,
            speakers: record.speakers,
            time: record.time,
            event: record.event,
            location: record.location,
            photos: record.photos ?? [],
            pictures: record.image
                ? [record.image, ...(record.photos ?? []).filter((p) => p.src !== record.image?.src)]
                : (record.photos ?? []),
            links: linkList(record.links),
        };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

/** Lays out events as a timeline, gathering events that share a group under one heading. */
export function timeline(list: SiteEvent[]): TimelineItem[] {
    const items: TimelineItem[] = [];
    const placed = new Set<string>();
    for (const event of list) {
        if (!event.group) {
            items.push({ kind: 'event', event });
        } else if (!placed.has(event.group)) {
            placed.add(event.group);
            items.push({
                kind: 'group',
                id: slug(event.group),
                heading: event.group,
                events: list.filter((e) => e.group === event.group),
            });
        }
    }
    return items;
}

/** Past events from before this year share one heading, "2024 and earlier". */
const ownYearFrom = 2025;

/**
 * Puts a past timeline under year headings. A group goes under the year of its
 * newest event, so a series that spans years stays in one piece.
 */
export function byYear(items: TimelineItem[]): TimelineYear[] {
    const years: TimelineYear[] = [];
    for (const item of items) {
        const year = Number((item.kind === 'event' ? item.event : item.events[0]).date.slice(0, 4));
        const heading = year >= ownYearFrom ? String(year) : `${ownYearFrom - 1} and earlier`;
        const last = years.at(-1);
        if (last?.heading === heading) last.items.push(item);
        else years.push({ id: `past-${slug(heading)}`, heading, items: [item] });
    }
    return years;
}
