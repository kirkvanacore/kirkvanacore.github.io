<script lang="ts">
    interface Props {
        links: [string, string][];
        /** Says what the links are about, for screen readers ("Links for …"). */
        about: string;
    }

    let { links, about }: Props = $props();
</script>

{#if links.length > 0}
    <ul class="link-row" aria-label="Links for {about}">
        {#each links as [label, url] (url + label)}
            <li><a href={url}>{label}</a></li>
        {/each}
    </ul>
{/if}

<style>
    .link-row {
        list-style: none;
        padding: 0;
        margin: 0.4em 0 0 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.25em 0;
        font-size: var(--small-font-size);
    }

    li + li::before {
        content: '·';
        color: var(--muted-color);
        margin: 0 0.55em;
    }
</style>
