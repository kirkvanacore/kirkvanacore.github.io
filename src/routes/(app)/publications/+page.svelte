<script lang="ts">
    import Title from '#lib/components/Title.svelte';
    import Section from '#lib/components/Section.svelte';
    import PaperEntry from '#lib/components/PaperEntry.svelte';
    import Icon from '#lib/components/Icon.svelte';
    import { describe } from '#lib/seo.ts';

    let { data } = $props();
</script>

<Title text="Publications" description={describe.publications(data.profile, data.featured)} />

<h1>Publications</h1>

<Section id="selected" header="Selected publications">
    {#each data.featured as paper (paper.title)}
        <PaperEntry {paper} />
    {/each}
</Section>

{#if data.profile.links.google_scholar}
    <div class="scholar">
        <a class="button" href={data.profile.links.google_scholar}
            ><Icon name="google_scholar" /> Full list on Google Scholar →</a
        >
    </div>
{/if}

<style>
    .scholar {
        margin: 0.5em 0 1em 0;
        padding: 1.25em;
        border: 1px solid var(--border-color);
        border-radius: var(--roundedness);
        background-color: var(--surface-color);
    }

    .scholar .button {
        font-size: var(--text-font-size);
    }
</style>
