<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';

    let { children } = $props();

    /** The page's sections, for the outline in the sidebar. */
    let headers: [string, string][] = $state([]);
    let activeID: string | undefined = $state(undefined);
    let main: HTMLElement | undefined = $state();

    function sections(): HTMLElement[] {
        return main ? Array.from(main.querySelectorAll<HTMLElement>('h2[id]')) : [];
    }

    afterNavigate(() => {
        headers = sections().map((h) => [h.dataset.title ?? h.innerText.trim(), h.id]);
        spy();
    });

    /** Marks the section nearest the top of the window as the current one. */
    function spy() {
        const all = sections();
        let current: string | undefined = all[0]?.id;
        for (const h of all) if (h.getBoundingClientRect().top < window.innerHeight * 0.3) current = h.id;
        activeID = current;
    }
</script>

<svelte:window onscroll={spy} />

<a class="skip" href="#content">Skip to content</a>
<div class="page">
    <header class="sidebar"><Header {headers} {activeID} /></header>
    <div class="body">
        <main id="content" tabindex="-1" bind:this={main}>
            {@render children?.()}
        </main>
        <Footer />
    </div>
</div>

<style>
    .skip {
        position: absolute;
        left: var(--margin);
        top: -4em;
        z-index: 10;
        padding: 0.5em 1em;
        background: var(--back-color);
        border: 2px solid var(--focus-color);
        border-radius: var(--roundedness);
    }

    .skip:focus {
        top: var(--margin);
    }

    main:focus {
        outline: none;
    }

    .page {
        max-width: 72em;
        margin: 0 auto;
        padding: 1.25em 1em 2em 1em;
    }

    .body {
        min-width: 0;
        max-width: var(--measure);
    }

    .sidebar {
        margin-bottom: 1.75em;
    }

    @media only screen and (min-width: 860px) {
        .page {
            display: flex;
            flex-direction: row;
            gap: 3.5em;
            padding: 4em 3em;
        }

        .sidebar {
            flex: 0 0 14em;
            margin-bottom: 0;
        }

        .body {
            flex: 1;
        }
    }
</style>
