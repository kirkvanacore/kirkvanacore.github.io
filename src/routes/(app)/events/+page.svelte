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
        <Timeline items={data.past} />
    </Section>
{/if}

{#if data.service.length > 0}
    <Section id="service" header="Service">
        <ul class="service">
            {#each data.service as role (role.role + role.venue)}
                <li>
                    <span class="label year">{role.year}</span>
                    <span
                        ><strong>{role.role}</strong>,
                        {#if role.link}<a href={role.link}>{role.venue}</a>{:else}{role.venue}{/if}</span
                    >
                </li>
            {/each}
        </ul>
    </Section>
{/if}

<style>
    .intro {
        margin-top: -0.25em;
    }

    .service {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .service li {
        display: grid;
        grid-template-columns: 6.5em 1fr;
        gap: 0.75em;
        padding: 0.5em 0;
        border-bottom: 1px solid var(--border-color);
        font-size: var(--small-font-size);
        line-height: 1.45;
    }

    .year {
        padding-top: 0.1em;
    }
</style>
