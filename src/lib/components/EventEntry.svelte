<script lang="ts">
    import Tag from './Tag.svelte';
    import LinkRow from './LinkRow.svelte';
    import { capitalize } from '#lib/format.ts';
    import type { SiteEvent } from '#lib/types.ts';

    interface Props {
        event: SiteEvent;
        /** Heading level: one below the heading it sits under (a section, year or group). */
        level?: 3 | 4 | 5;
    }

    let { event, level = 3 }: Props = $props();

    const people = $derived(
        [
            event.moderator ? `Moderator: ${event.moderator}` : undefined,
            event.with && event.with.length > 0 ? `With ${list(event.with)}` : undefined,
            event.speakers ? `Speakers: ${event.speakers}` : undefined,
        ].filter((line): line is string => line !== undefined),
    );

    function list(names: string[]) {
        if (names.length <= 2) return names.join(' and ');
        return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
    }
</script>

<article class="event" id={event.id}>
    <!-- The tags come after the title in reading order, so a screen reader that jumps
         to the heading hears them next; CSS shows them above it. -->
    <div class="head">
        <svelte:element this={`h${level}`} class="title">{event.title}</svelte:element>
        <p class="tags">
            <Tag label={capitalize(event.kind)} />{#if event.nto}<Tag
                    label="NTO"
                    expansion="National Tutoring Observatory"
                    quiet
                />{/if}
        </p>
    </div>
    <p class="role">
        <strong>{capitalize(event.role)}</strong>{#if event.type}{' · '}<span class="type">{capitalize(event.type)}</span
            >{/if}
    </p>
    <p class="where">
        {event.event}{#if event.location}<br /><span class="muted">{event.location}</span>{/if}
    </p>
    <p class="when label">
        <time datetime={event.date}>{event.when}</time>{#if event.time}&nbsp;· {event.time}{/if}
    </p>
    {#if event.description}<p class="description">{event.description}</p>{/if}
    {#each people as line (line)}
        <p class="people">{line}</p>
    {/each}
    {#if event.photos.length > 0}
        <ul class="gallery" aria-label="Photos from {event.title}">
            {#each event.photos as photo (photo.src)}
                <li>
                    <a href={photo.src.replace(/^\/?/, '/')}>
                        <img src={photo.src.replace(/^\/?/, '/')} alt={photo.alt} loading="lazy" decoding="async" />
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
    <LinkRow links={event.links} about={event.title} />
</article>

<style>
    .event {
        position: relative;
        margin: 0 0 2em 0;
        scroll-margin-top: 1em;
    }

    /* The dot on the timeline's rule. */
    .event::before {
        content: '';
        position: absolute;
        left: calc(-1.5em - 5px);
        top: 0.45em;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background-color: var(--back-color);
        border: 2px solid var(--accent-color);
    }

    .head {
        display: flex;
        flex-direction: column;
    }

    .tags {
        order: -1;
        margin: 0;
    }

    /* Set in full here, so the title looks the same at every heading level. */
    .title {
        font-family: var(--header-font);
        font-weight: var(--header-weight);
        letter-spacing: var(--header-tracking);
        font-size: 1.12rem;
        line-height: 1.35;
        text-wrap: pretty;
        margin: 0.1em 0 0.3em 0;
    }

    .role,
    .where {
        font-size: var(--small-font-size);
        line-height: 1.45;
        margin: 0 0 0.2em 0;
    }

    .type {
        font-style: italic;
    }

    .when {
        margin: 0 0 0.4em 0;
        font-size: var(--small-font-size);
    }

    .description {
        font-size: var(--small-font-size);
        margin: 0.4em 0;
    }

    .people {
        font-size: var(--small-font-size);
        color: var(--muted-color);
        line-height: 1.45;
        margin: 0 0 0.2em 0;
    }

    .gallery {
        list-style: none;
        padding: 0;
        margin: 0.6em 0 0.3em 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(9.5em, 1fr));
        gap: 0.5em;
        max-width: 31em;
    }

    .gallery a {
        display: block;
        border-radius: var(--roundedness);
        overflow: hidden;
    }

    .gallery img {
        display: block;
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        transition: transform 150ms ease-out;
    }

    .gallery a:hover img {
        transform: scale(1.03);
    }

    .event:target .title {
        background-color: var(--annotation-color);
        box-shadow: 0 0 0 0.25em var(--annotation-color);
        border-radius: 2px;
    }
</style>
