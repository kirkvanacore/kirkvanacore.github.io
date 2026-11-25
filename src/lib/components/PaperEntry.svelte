<script lang="ts">
    import LinkRow from './LinkRow.svelte';
    import { paperID, venueShort } from '#lib/papers.ts';
    import type { SitePaper } from '#lib/types.ts';

    interface Props {
        paper: SitePaper;
        /** A card for the home page strip, linking to the full entry. */
        compact?: boolean;
    }

    let { paper, compact = false }: Props = $props();

    const id = $derived(paperID(paper));
    const primary = $derived(paper.links[0]?.[1]);
</script>

{#if compact}
    <article class="card">
        <p class="label">{venueShort(paper)}</p>
        <h3><a href="/publications#{id}">{paper.title}</a></h3>
        <p class="authors">{paper.authors}</p>
    </article>
{:else}
    <article class="paper" {id}>
        <h3>
            {#if primary}<a href={primary}>{paper.title}</a>{:else}{paper.title}{/if}
        </h3>
        <p class="citation">
            {paper.authors} ({paper.year}). <em>{paper.venue}</em>.
            {#if paper.author_note}<span class="muted">({paper.author_note})</span>{/if}
        </p>
        <p class="summary">{paper.summary}</p>
        <LinkRow links={paper.links} about={paper.title} />
    </article>
{/if}

<style>
    .card {
        padding: 0.9em 1em 1em 1em;
        border: 1px solid var(--border-color);
        border-radius: var(--roundedness);
        background-color: var(--surface-color);
    }

    .card .label {
        margin: 0 0 0.3em 0;
    }

    .card h3 {
        font-size: 1.02rem;
        line-height: 1.3;
        margin: 0 0 0.45em 0;
    }

    .card h3 a {
        text-decoration: none;
    }

    .card h3 a:hover {
        text-decoration: underline;
    }

    .authors {
        font-size: var(--extra-small-font-size);
        color: var(--muted-color);
        line-height: 1.4;
        margin: 0;
    }

    .paper {
        margin: 0 0 2.25em 0;
        scroll-margin-top: 1em;
    }

    .paper h3 {
        margin: 0 0 0.35em 0;
        font-size: 1.25rem;
        line-height: 1.3;
    }

    .citation {
        font-size: var(--small-font-size);
        color: var(--muted-color);
        line-height: 1.5;
        margin-bottom: 0.6em;
    }

    .summary {
        margin-bottom: 0.3em;
    }

    .paper:target h3 {
        background-color: var(--annotation-color);
        box-shadow: 0 0 0 0.25em var(--annotation-color);
        border-radius: 2px;
    }
</style>
