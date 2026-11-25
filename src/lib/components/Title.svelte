<script lang="ts">
    import { page } from '$app/state';
    import { siteUrl } from '#lib/config.ts';
    import type { SiteData } from '#lib/types.ts';

    interface Props {
        /** The page's name; empty for the home page. */
        text: string;
        description?: string;
    }

    let { text, description }: Props = $props();

    const profile = $derived((page.data as SiteData).profile);
    const name = $derived(`${profile.name}${profile.credentials ? ', ' + profile.credentials : ''}`);
    const title = $derived(text.length > 0 ? `${text} · ${profile.name}` : name);
    const summary = $derived(description ?? profile.short_bio);
    const url = $derived(siteUrl + (page.url.pathname === '/' ? '/' : page.url.pathname.replace(/\/$/, '')));
    const image = $derived(siteUrl + profile.headshot.replace(/^\/?/, '/'));
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={summary} />
    <link rel="canonical" href={url} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={name} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={summary} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content="Headshot of {profile.name}" />
    <meta name="twitter:card" content="summary" />
</svelte:head>
