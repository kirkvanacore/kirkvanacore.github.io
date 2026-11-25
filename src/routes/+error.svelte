<script lang="ts">
    import { page } from '$app/state';
    import Page from '#lib/components/Page.svelte';
    import Title from '#lib/components/Title.svelte';

    // The sidebar and title need the site's data. If loading failed badly
    // enough that it's missing, show the message without them rather than crash.
    const hasData = $derived(!!(page.data as { profile?: unknown }).profile);
    const notFound = $derived(page.status === 404);
</script>

{#snippet message()}
    <h1>{notFound ? 'Page not found' : 'Something went wrong'}</h1>
    <p>
        {#if notFound}
            There's nothing at this address.
        {:else}
            This page didn't load properly. Try reloading it.
        {/if}
        Or go to the <a href="/">home page</a>.
    </p>
{/snippet}

<svelte:head>
    {#if !hasData}<title>{notFound ? 'Page not found' : 'Error'}</title>{/if}
</svelte:head>

{#if hasData}
    <Page>
        <Title text={notFound ? 'Page not found' : 'Error'} />
        {@render message()}
    </Page>
{:else}
    <main class="bare">{@render message()}</main>
{/if}

<style>
    .bare {
        max-width: 40em;
        margin: 4em auto;
        padding: 0 1em;
    }
</style>
