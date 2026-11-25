<script lang="ts">
    import EventEntry from './EventEntry.svelte';
    import type { TimelineItem } from '#lib/types.ts';

    interface Props {
        items: TimelineItem[];
    }

    let { items }: Props = $props();
</script>

<div class="timeline">
    {#each items as item (item.kind === 'event' ? item.event.id : item.id)}
        {#if item.kind === 'event'}
            <EventEntry event={item.event} />
        {:else}
            <div class="group" id={item.id}>
                <h3 class="group-heading">{item.heading}</h3>
                {#each item.events as event (event.id)}
                    <EventEntry {event} level={4} />
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
