<script lang="ts">
    import Title from '#lib/components/Title.svelte';
    import Section from '#lib/components/Section.svelte';
    import Tag from '#lib/components/Tag.svelte';
    import PaperEntry from '#lib/components/PaperEntry.svelte';
    import Carousel from '#lib/components/Carousel.svelte';
    import { capitalize } from '#lib/format.ts';
    import { personJsonLd } from '#lib/seo.ts';
    import { bioLinks, linkify } from '#lib/bio.ts';

    let { data } = $props();

    const links = $derived(bioLinks(data.profile));
    const split = $derived(data.profile.bio_shown === 0 ? data.profile.long_bio.length : (data.profile.bio_shown ?? 1));
    const shown = $derived(data.profile.long_bio.slice(0, split));
    const more = $derived(data.profile.long_bio.slice(split));
</script>

<Title text="" />

<svelte:head>
    {@html `<script type="application/ld+json">${personJsonLd(data.profile, data.nto)}</script>`}
</svelte:head>

{#snippet paragraph(text: string)}
    <p>
        {#each linkify(text, links) as part, i (i)}{#if part.url}<a href={part.url}>{part.text}</a
                >{:else}{part.text}{/if}{/each}
    </p>
{/snippet}

<div class="bio">
    {#each shown as text, i (i)}{@render paragraph(text)}{/each}
    {#if more.length > 0}
        <!-- Native disclosure: works without JavaScript, and the text stays in the page for search engines. -->
        <details class="more-bio">
            <summary><span class="when-closed">Read more</span><span class="when-open">Show less</span></summary>
            {#each more as text, i (i)}{@render paragraph(text)}{/each}
        </details>
    {/if}
</div>

<div class="interests">
    <h2 class="label">Areas of interest</h2>
    <ul>
        {#each data.profile.areas_of_interest as area (area)}
            <li><Tag label={area} quiet /></li>
        {/each}
    </ul>
</div>

<Section id="selected-publications" header="Selected publications">
    <div class="strip">
        {#each data.featured as paper (paper.title)}
            <PaperEntry {paper} compact />
        {/each}
    </div>
    <p class="more"><a href="/publications">All selected publications and the full list →</a></p>
</Section>

<Section id="recent" header="Featured events">
    <ul class="recent">
        {#each data.highlights as event (event.id)}
            <li>
                <div class="picture">
                    {#if event.pictures.length > 0}
                        <Carousel photos={event.pictures} label={event.title} />
                    {:else}
                        <a class="placeholder" href="/events#{event.id}" tabindex="-1" aria-hidden="true">
                            <span class="month">{event.when.split(' ')[0]}</span>
                            <span class="year">{event.date.slice(0, 4)}</span>
                        </a>
                    {/if}
                </div>
                <div class="text">
                    <p class="label">
                        <time datetime={event.date}>{event.when}</time>{#if event.upcoming}&nbsp;· Upcoming{/if}
                    </p>
                    <p class="title"><a href="/events#{event.id}">{event.title}</a></p>
                    <p class="where">
                        {#if event.role}{capitalize(event.role) + ' · '}{/if}{event.event}{#if event.location}, {event.location}{/if}
                    </p>
                </div>
            </li>
        {/each}
    </ul>
    <p class="more"><a href="/events">All events →</a></p>
</Section>

<style>
    /* Justified. On phones, hyphenation keeps the short lines from opening wide gaps between words. */
    .bio p {
        text-align: justify;
    }

    @media only screen and (max-width: 520px) {
        .bio p {
            hyphens: auto;
        }
    }

    .bio > p:first-child {
        font-size: 1.08em;
    }

    .more-bio summary {
        display: inline-flex;
        align-items: center;
        gap: 0.35em;
        margin: -0.25em 0 1em 0;
        color: var(--link-color);
        font-size: var(--small-font-size);
        font-weight: var(--bold-weight);
        cursor: pointer;
        list-style: none;
    }

    .more-bio summary::-webkit-details-marker {
        display: none;
    }

    /* A chevron that points down when closed and up when open. */
    .more-bio summary::after {
        content: '';
        width: 0.45em;
        height: 0.45em;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: translateY(-0.15em) rotate(45deg);
        transition: transform 150ms ease-out;
    }

    .more-bio[open] summary::after {
        transform: translateY(0.1em) rotate(-135deg);
    }

    .more-bio summary:hover {
        color: var(--link-hover-color);
        text-decoration: underline;
    }

    .more-bio .when-open,
    .more-bio[open] .when-closed {
        display: none;
    }

    .more-bio[open] .when-open {
        display: inline;
    }

    .interests {
        margin: 1.75em 0 0.5em 0;
    }

    .interests h2 {
        font-family: var(--label-font);
        font-weight: var(--bold-weight);
        letter-spacing: var(--label-tracking);
        margin: 0 0 0.5em 0;
    }

    .interests ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }

    .strip {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(16em, 1fr));
        gap: 0.9em;
    }

    .recent {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .recent li {
        display: grid;
        grid-template-columns: 11em 1fr;
        gap: 1.1em;
        align-items: start;
        padding: 1em 0;
        border-bottom: 1px solid var(--border-color);
    }

    .recent li:first-child {
        padding-top: 0;
    }

    .picture {
        display: block;
        text-decoration: none;
        border-radius: var(--roundedness);
        overflow: hidden;
        aspect-ratio: 4 / 3;
        background-color: var(--annotation-color);
    }

    /* For events without a photo: the month and year, set like a calendar page. */
    .placeholder {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--annotation-text-color);
        border: 1px solid var(--border-color);
        border-radius: var(--roundedness);
    }

    .placeholder .month {
        font-family: var(--header-font);
        font-weight: var(--header-weight);
        font-size: 1.9rem;
        line-height: 1;
    }

    .placeholder .year {
        font-family: var(--label-font);
        font-size: var(--small-font-size);
        letter-spacing: 0.08em;
        margin-top: 0.3em;
    }

    @media only screen and (max-width: 520px) {
        .recent li {
            grid-template-columns: 6.5em 1fr;
            gap: 0.85em;
        }

        .placeholder .month {
            font-size: 1.35rem;
        }

        .placeholder .year {
            font-size: var(--annotation-size);
        }
    }

    .recent p {
        margin: 0;
    }

    .recent .title {
        font-weight: var(--bold-weight);
        line-height: 1.35;
        margin: 0.15em 0;
    }

    .recent .title a {
        text-decoration: none;
    }

    .recent .title a:hover {
        text-decoration: underline;
    }

    .recent .where {
        font-size: var(--small-font-size);
        color: var(--muted-color);
        line-height: 1.45;
    }

    .more {
        margin-top: 1em;
        font-size: var(--small-font-size);
    }
</style>
