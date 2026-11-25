<script lang="ts">
    import Title from '#lib/components/Title.svelte';
    import Section from '#lib/components/Section.svelte';
    import SocialLinks from '#lib/components/SocialLinks.svelte';
    import Icon from '#lib/components/Icon.svelte';

    let { data } = $props();

    const profile = $derived(data.profile);
</script>

<Title text="Contact" />

<h1>Contact</h1>

<p class="email">
    <Icon name="email" />
    <a href="mailto:{profile.email}">{profile.email}</a>
</p>

<address>
    {#each profile.titles as title (title)}
        {title}<br />
    {/each}
    {#if profile.location}{profile.location}{/if}
</address>

<Section id="profiles" header="Profiles">
    <SocialLinks />
</Section>

<style>
    .email {
        display: flex;
        align-items: center;
        gap: 0.5em;
        font-size: 1.3rem;
        margin-bottom: 1em;
    }

    address {
        font-style: normal;
        color: var(--muted-color);
        font-size: var(--small-font-size);
        line-height: 1.55;
    }
</style>
