<script lang="ts">
    import Title from '#lib/components/Title.svelte';
    import Section from '#lib/components/Section.svelte';
    import Tag from '#lib/components/Tag.svelte';
    import PaperEntry from '#lib/components/PaperEntry.svelte';
    import { capitalize } from '#lib/format.ts';

    let { data } = $props();
</script>

<Title text="" />

<div class="bio">
    {#each data.profile.long_bio as paragraph, i (i)}
        <p>{paragraph}</p>
    {/each}
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

<Section id="recent" header="Recent & upcoming events">
    <ul class="recent">
        {#each data.highlights as event (event.id)}
            <li>
                <p class="label">
                    <time datetime={event.date}>{event.when}</time>{#if event.upcoming}&nbsp;· Upcoming{/if}
                </p>
                <p class="title"><a href="/events#{event.id}">{event.title}</a></p>
                <p class="where">
                    {#if event.role}{capitalize(event.role) + ' · '}{/if}{event.event}{#if event.location}, {event.location}{/if}
                </p>
            </li>
        {/each}
    </ul>
    <p class="more"><a href="/events">All events →</a></p>
</Section>

<style>
    .bio p:first-child {
        font-size: 1.08em;
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
        padding: 0.8em 0;
        border-bottom: 1px solid var(--border-color);
    }

    .recent li:first-child {
        padding-top: 0;
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
