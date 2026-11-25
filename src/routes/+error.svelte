<script lang="ts">
    import { page } from '$app/state';
    import Page from '#lib/components/Page.svelte';
    import Title from '#lib/components/Title.svelte';
</script>

<Page>
    <Title text="Page not found" />
    <h1>Page not found</h1>
    <p>
        {#if page.status === 404}
            There's nothing at this address.
        {:else}
            Something went wrong loading this page.
        {/if}
        Try the <a href="/">home page</a> instead.
    </p>
</Page>
