/** Shapes of the YAML files in /content, and of what pages receive from them. */

export type Links = Record<string, string>;

/** Someone named on the site, such as an advisor; `url` links their name. */
export interface Person {
    name: string;
    url?: string;
}

export interface Profile {
    name: string;
    credentials?: string;
    titles: string[];
    location?: string;
    email: string;
    headshot: string;
    /** A public link to the CV (a Google Doc shared with "Anyone with the link"). */
    cv_url?: string;
    areas_of_interest: string[];
    short_bio: string;
    long_bio: string[];
    /** How many bio paragraphs show before "Read more" (default 1; 0 shows them all). */
    bio_shown?: number;
    /** Extra phrases to link in the bio: {"phrase": url}. Advisors are linked automatically. */
    bio_links?: Record<string, string>;
    education: { degree: string; school: string; year: number | string; advisor?: Person }[];
    /** Appointments for the CV page, newest first. */
    positions?: { years: string; title: string; org: string; advisor?: Person }[];
    links: {
        google_scholar?: string;
        semantic_scholar?: string;
        linkedin?: string;
        github?: string;
        nto?: string;
        nto_team?: string;
        orcid?: string;
    };
}

export interface Paper {
    title: string;
    authors: string;
    author_note?: string;
    year: number | string;
    venue: string;
    doi?: string;
    links?: Links;
    themes?: string[];
    summary: string;
}

export interface Photo {
    src: string;
    alt: string;
}

/** An event as written in events.yaml. */
export interface EventRecord {
    date: string;
    end_date?: string;
    date_display?: string;
    status?: string;
    publish?: boolean;
    verify?: string;
    note_for_site?: string;
    group?: string;
    /** Also list it under "Featured events" on the home page. */
    highlight?: boolean;
    role?: string;
    /** What sort of event it is, shown as a tag (see `eventKinds` in content.ts). */
    kind?: string;
    /** National Tutoring Observatory work; adds an "NTO" marker. */
    nto?: boolean;
    title: string;
    type?: string;
    description?: string;
    with?: string[];
    moderator?: string;
    speakers?: string;
    time?: string;
    event: string;
    location?: string;
    photos?: Photo[];
    /** The picture for the home page highlight; defaults to the first photo. */
    image?: Photo;
    links?: Links;
}

/** A published event, ready to render. Internal notes are stripped. */
export interface SiteEvent {
    id: string;
    date: string;
    end_date?: string;
    when: string;
    upcoming: boolean;
    highlight: boolean;
    group?: string;
    role: string;
    kind: string;
    nto: boolean;
    title: string;
    type?: string;
    description?: string;
    with?: string[];
    moderator?: string;
    speakers?: string;
    time?: string;
    event: string;
    location?: string;
    photos: Photo[];
    /** Pictures for the home page slideshow: `image` (if any), then the photos. */
    pictures: Photo[];
    links: [string, string][];
}

/** One item on the events timeline: a lone event, or several sharing a group. */
export type TimelineItem =
    | { kind: 'event'; event: SiteEvent }
    | { kind: 'group'; id: string; heading: string; events: SiteEvent[] };

/** Past timeline items under one year heading ("2026", or "2024 and earlier"). */
export interface TimelineYear {
    id: string;
    heading: string;
    items: TimelineItem[];
}

export interface NTO {
    nto: {
        name: string;
        role: string;
        url: string;
        github?: string;
        blurb: string;
    };
    projects: {
        name: string;
        url: string;
        blurb: string;
        links?: Links;
    }[];
}

export interface ServiceRole {
    year: number | string;
    role: string;
    venue: string;
    link?: string;
}

/** A featured paper as pages receive it: links flattened to [label, url], DOI first. */
export type SitePaper = Omit<Paper, 'links'> & { links: [string, string][] };

/** What every page receives from src/routes/+layout.server.ts. */
export interface SiteData {
    profile: Profile;
    featured: SitePaper[];
    nto: NTO;
    service: ServiceRole[];
    highlights: SiteEvent[];
    upcoming: TimelineItem[];
    past: TimelineYear[];
    built: string;
}
