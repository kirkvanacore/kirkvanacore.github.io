<script lang="ts">
    import Title from '#lib/components/Title.svelte';
    import Section from '#lib/components/Section.svelte';
    import Timeline from '#lib/components/Timeline.svelte';
    import { describe } from '#lib/seo.ts';

    let { data } = $props();
</script>

<Title text="Events" description={describe.events(data.profile)} />

<h1>Events</h1>

<p class="intro muted">Panels, workshops, tutorials and convenings, newest first.</p>

{#if data.upcoming.length > 0}
    <Section id="upcoming" header="Upcoming">
        <Timeline items={data.upcoming} />
    </Section>
{/if}

{#if data.past.length > 0}
    <Section id="past" header="Past">
        {#each data.past as year (year.id)}
            <h3 class="year-heading" id={year.id}>{year.heading}</h3>
            <Timeline items={year.items} level={4} />
        {/each}
    </Section>
{/if}

<style>
    .intro {
        margin-top: -0.25em;
    }

    /* A year under "Past", with a rule running to the right edge. */
    .year-heading {
        display: flex;
        align-items: center;
        gap: 0.6em;
        margin: 1.25em 0 1em 0;
        font-size: 1.3rem;
        font-variant-numeric: lining-nums;
        scroll-margin-top: 1em;
    }

    .year-heading::after {
        content: '';
        flex: 1;
        border-top: 1px solid var(--border-color);
    }
</style>
