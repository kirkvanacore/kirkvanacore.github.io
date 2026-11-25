<script lang="ts">
    import EventEntry from './EventEntry.svelte';
    import type { TimelineItem } from '#lib/types.ts';

    interface Props {
        items: TimelineItem[];
        /** Heading level for entries and group headings: 3 right under a section, 4 under a year heading. */
        level?: 3 | 4;
    }

    let { items, level = 3 }: Props = $props();
</script>

<div class="timeline">
    {#each items as item (item.kind === 'event' ? item.event.id : item.id)}
        {#if item.kind === 'event'}
            <EventEntry event={item.event} {level} />
        {:else}
            <div class="group" id={item.id}>
                <svelte:element this={`h${level}`} class="group-heading">{item.heading}</svelte:element>
                {#each item.events as event (event.id)}
                    <EventEntry {event} level={(level + 1) as 4 | 5} />
                {/each}
            </div>
        {/if}
    {/each}
</div>

<style>
    .timeline {
        border-left: 2px solid var(--border-color);
        padding-left: 1.5em;
        margin-left: 0.3em;
    }

    .group {
        margin-bottom: 0.5em;
        scroll-margin-top: 1em;
    }

    .group-heading {
        position: relative;
        margin: 0 0 0.9em 0;
        font-size: 1.2rem;
        color: var(--accent-color);
    }

    /* A larger, filled dot marks the start of a group. */
    .group-heading::before {
        content: '';
        position: absolute;
        left: calc(-1.5em - 7px);
        top: 0.35em;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--accent-color);
    }

    .group :global(.event) {
        margin-left: 0;
    }
</style>
