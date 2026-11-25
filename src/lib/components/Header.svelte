<script lang="ts">
    import { page } from '$app/state';
    import SocialLinks from './SocialLinks.svelte';
    import type { SiteData } from '#lib/types.ts';

    interface Props {
        headers?: [string, string][];
        activeID?: string;
    }

    let { headers = [], activeID }: Props = $props();

    const data = $derived(page.data as SiteData);
    const profile = $derived(data.profile);
    const path = $derived(page.url.pathname.replace(/\/$/, '') || '/');
    const home = $derived(path === '/');

    const nav: [string, string][] = [
        ['/', 'Home'],
        ['/projects', 'Projects'],
        ['/publications', 'Publications'],
        ['/events', 'Events'],
        ['/cv', 'CV'],
        ['/contact', 'Contact'],
    ];

    function current(href: string) {
        return href === '/' ? home : path === href || path.startsWith(href + '/');
    }
</script>

<div class="identity">
    {#if home}
        <img class="headshot" src={profile.headshot.replace(/^\/?/, '/')} alt="Headshot of {profile.name}" />
    {:else}
        <a href="/" class="headshot-link"
            ><img class="headshot" src={profile.headshot.replace(/^\/?/, '/')} alt="{profile.name}, home page" /></a
        >
    {/if}
    <div class="who">
        <svelte:element this={home ? 'h1' : 'p'} class="name">
            {#if home}{profile.name}{:else}<a href="/">{profile.name}</a>{/if}{#if profile.credentials}<span class="credentials">, {profile.credentials}</span>{/if}
        </svelte:element>
        <ul class="titles">
            {#each profile.titles as title (title)}
                <li>{title}</li>
            {/each}
        </ul>
        <SocialLinks compact />
    </div>
</div>

<nav aria-label="Main">
    <ul class="links">
        {#each nav as [href, label] (href)}
            <li><a {href} aria-current={current(href) ? 'page' : undefined}>{label}</a></li>
        {/each}
    </ul>
    {#if headers.length > 1}
        <div class="outline">
            <p class="label">On this page</p>
            <ul>
                {#each headers as [header, id] (id)}
                    <li><a href="#{id}" class:active={id === activeID}>{header}</a></li>
                {/each}
            </ul>
        </div>
    {/if}
</nav>

<style>
    .identity {
        display: grid;
        grid-template-columns: 6.5em 1fr;
        gap: 1em;
        align-items: start;
    }

    .headshot {
        display: block;
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        object-position: 50% 30%;
        border-radius: var(--roundedness);
    }

    /* min-width keeps the 900px photo from stretching its grid cell on phones. */
    .headshot-link {
        display: block;
        min-width: 0;
    }

    .name {
        font-family: var(--header-font);
        font-weight: var(--header-weight);
        letter-spacing: var(--header-tracking);
        font-size: 1.45rem;
        line-height: 1.2;
        margin: 0 0 0.35em 0;
    }

    .name a {
        color: inherit;
        text-decoration: none;
    }

    .credentials {
        font-weight: var(--text-weight);
    }

    .titles {
        list-style: none;
        padding: 0;
        margin: 0 0 0.6em 0;
        font-size: var(--extra-small-font-size);
        line-height: 1.4;
        color: var(--muted-color);
    }

    .titles li + li {
        margin-top: 0.35em;
    }

    nav {
        margin-top: 1.25em;
        padding-top: 0.75em;
        border-top: 1px solid var(--border-color);
        font-size: var(--small-font-size);
    }

    .links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.15em 0.35em;
    }

    .links a {
        display: inline-block;
        padding: 0.15em 0.45em;
        border-radius: var(--roundedness);
        text-decoration: none;
    }

    .links a:hover {
        background-color: var(--surface-color);
    }

    .links a[aria-current='page'] {
        color: var(--annotation-text-color);
        background-color: var(--annotation-color);
        font-weight: var(--bold-weight);
    }

    .outline {
        display: none;
    }

    @media only screen and (min-width: 860px) {
        .identity {
            display: block;
        }

        .headshot {
            width: 11em;
            aspect-ratio: 900 / 783;
            margin-bottom: 1em;
        }

        nav {
            position: sticky;
            top: 1.5em;
        }

        .links {
            flex-direction: column;
            gap: 0.1em;
        }

        .links a {
            margin-left: -0.45em;
        }

        .outline {
            display: block;
            margin-top: 1.25em;
        }

        .outline .label {
            margin: 0 0 0.25em 0;
        }

        .outline ul {
            list-style: none;
            padding: 0;
            margin: 0;
            font-size: var(--extra-small-font-size);
            line-height: 1.35;
        }

        .outline li {
            margin: 0.3em 0;
        }

        .outline a {
            color: var(--muted-color);
            text-decoration: none;
            border-left: 2px solid transparent;
            padding-left: 0.5em;
            display: inline-block;
        }

        .outline a:hover,
        .outline a.active {
            color: var(--link-color);
            border-left-color: var(--accent-color);
        }
    }
</style>
