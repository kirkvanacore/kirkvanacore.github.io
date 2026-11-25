<script lang="ts">
    import Title from '#lib/components/Title.svelte';
    import Section from '#lib/components/Section.svelte';
    import Icon from '#lib/components/Icon.svelte';
    import type { Person } from '#lib/types.ts';
    import { describe } from '#lib/seo.ts';

    let { data } = $props();

    const profile = $derived(data.profile);

    /** A Google Doc's ID, from a link like https://docs.google.com/document/d/<id>/edit. */
    const docID = $derived(profile.cv_url?.match(/\/document\/d\/([\w-]+)/)?.[1]);
    const viewURL = $derived(docID ? `https://docs.google.com/document/d/${docID}/view` : profile.cv_url);
    const pdfURL = $derived(docID ? `https://docs.google.com/document/d/${docID}/export?format=pdf` : undefined);
</script>

<Title text="CV" description={describe.cv(data.profile)} />

<h1>CV</h1>

{#if viewURL}
    <p>My CV is kept up to date as a Google Doc.</p>
    <p class="actions">
        <a class="button" href={viewURL}><Icon name="cv" /> View CV</a>
        {#if pdfURL}<a class="button secondary" href={pdfURL}><Icon name="download" /> Download PDF</a>{/if}
    </p>
{:else}
    <p>
        For a copy of my CV, email <a href="mailto:{profile.email}">{profile.email}</a>.
    </p>
{/if}

{#snippet advisor(person: Person | undefined)}
    {#if person}<span class="advisor"
            >Advisor: {#if person.url}<a href={person.url}>{person.name}</a>{:else}{person.name}{/if}</span
        >{/if}
{/snippet}

<Section id="appointments" header="Appointments">
    {#if profile.positions && profile.positions.length > 0}
        <ul class="rows">
            {#each profile.positions as position (position.title + position.org)}
                <li>
                    <span class="label">{position.years}</span>
                    <span
                        ><strong>{position.title}</strong>, {position.org}{@render advisor(position.advisor)}</span
                    >
                </li>
            {/each}
        </ul>
    {:else}
        <ul class="positions">
            {#each profile.titles as title (title)}
                <li>{title}</li>
            {/each}
        </ul>
    {/if}
</Section>

<Section id="education" header="Education">
    <ul class="rows">
        {#each profile.education as degree (degree.degree)}
            <li>
                <span class="label">{degree.year}</span>
                <span><strong>{degree.degree}</strong>, {degree.school}{@render advisor(degree.advisor)}</span>
            </li>
        {/each}
    </ul>
    {#if profile.links.google_scholar}
        <p class="small">
            For publications, see the <a href="/publications">selected publications</a> or the
            <a href={profile.links.google_scholar}>full list on Google Scholar</a>.
        </p>
    {/if}
</Section>

<style>
    .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75em;
    }

    .rows {
        list-style: none;
        padding: 0;
        margin: 0 0 1em 0;
    }

    .rows li {
        display: grid;
        grid-template-columns: 7.5em 1fr;
        gap: 0.75em;
        padding: 0.45em 0;
        border-bottom: 1px solid var(--border-color);
        line-height: 1.45;
    }

    .rows .label {
        padding-top: 0.15em;
    }

    .advisor {
        display: block;
        font-size: var(--small-font-size);
        color: var(--muted-color);
    }

    @media only screen and (max-width: 520px) {
        .rows li {
            grid-template-columns: 1fr;
            gap: 0;
        }
    }

    .positions {
        margin: 0 0 1em 0;
    }
</style>
