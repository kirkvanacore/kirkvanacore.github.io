<script lang="ts">
    import Title from '#lib/components/Title.svelte';
    import Section from '#lib/components/Section.svelte';
    import LinkRow from '#lib/components/LinkRow.svelte';
    import { linkList, slug } from '#lib/format.ts';

    let { data } = $props();

    const nto = $derived(data.nto.nto);
    const orgLinks = $derived(
        [
            [`${nto.name} website`, nto.url],
            ['Team', data.profile.links.nto_team],
            ['GitHub', nto.github],
        ].filter((link): link is [string, string] => !!link[1]),
    );
</script>

<Title text="Projects" description={nto.blurb} />

<h1>Projects</h1>

<Section id="nto" header={nto.name}>
    <p class="label role">{nto.role}</p>
    <p>{nto.blurb}</p>
    <LinkRow links={orgLinks} about={nto.name} />
</Section>

{#each data.nto.projects as project (project.name)}
    <Section id={slug(project.name)} header={project.name}>
        <p>{project.blurb}</p>
        <LinkRow links={[[`Visit ${project.name}`, project.url], ...linkList(project.links)]} about={project.name} />
    </Section>
{/each}

<style>
    .role {
        margin-top: -0.5em;
    }
</style>
