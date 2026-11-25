/** Shapes of the YAML files in /content, and of what pages receive from them. */

export type Links = Record<string, string>;

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
    education: { degree: string; school: string; year: number | string }[];
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
    role?: string;
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
    links?: Links;
}

/** A published event, ready to render. Internal notes are stripped. */
export interface SiteEvent {
    id: string;
    date: string;
    end_date?: string;
    when: string;
    upcoming: boolean;
    group?: string;
    role?: string;
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
    links: [string, string][];
}

/** One item on the events timeline: a lone event, or several sharing a group. */
export type TimelineItem =
    | { kind: 'event'; event: SiteEvent }
    | { kind: 'group'; id: string; heading: string; events: SiteEvent[] };

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
    recent: SiteEvent[];
    upcoming: TimelineItem[];
    past: TimelineItem[];
    built: string;
}
