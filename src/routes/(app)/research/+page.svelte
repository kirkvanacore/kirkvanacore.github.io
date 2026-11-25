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

<Title text="Research" description={nto.blurb} />

<h1>Research</h1>

<Section id="nto" header={nto.name}>
    <p class="label role">{nto.role}</p>
    <p>{nto.blurb}</p>
    <LinkRow links={orgLinks} about={nto.name} />
</Section>

<Section id="projects" header="Projects">
    {#each data.nto.projects as project (project.name)}
        <article class="project" id={slug(project.name)}>
            <h3><a href={project.url}>{project.name}</a></h3>
            <p>{project.blurb}</p>
            <LinkRow links={linkList(project.links)} about={project.name} />
        </article>
    {/each}
</Section>

<style>
    .role {
        margin-top: -0.5em;
    }

    .project {
        margin-bottom: 2em;
    }

    .project h3 {
        margin: 0 0 0.35em 0;
        font-size: 1.25rem;
    }
</style>
