<script lang="ts">
    import { page } from '$app/state';
    import Icon from './Icon.svelte';
    import type { IconName } from './icons.ts';
    import type { SiteData } from '#lib/types.ts';

    interface Props {
        /** Icons only, for the sidebar. Otherwise icons with their names. */
        compact?: boolean;
    }

    let { compact = false }: Props = $props();

    const profile = $derived((page.data as SiteData).profile);

    const items = $derived(
        (
            [
                ['google_scholar', 'Google Scholar', profile.links.google_scholar],
                ['semantic_scholar', 'Semantic Scholar', profile.links.semantic_scholar],
                ['orcid', 'ORCID', profile.links.orcid],
                ['linkedin', 'LinkedIn', profile.links.linkedin],
                ['github', 'GitHub', profile.links.github],
                ['nto', 'National Tutoring Observatory', profile.links.nto],
                ['email', 'Email', profile.email ? `mailto:${profile.email}` : undefined],
            ] as [IconName, string, string | undefined][]
        ).filter((item): item is [IconName, string, string] => !!item[2]),
    );
</script>

<ul class="social" class:compact aria-label="Profiles and contact">
    {#each items as [icon, label, href] (icon)}
        <li>
            <a
                {href}
                rel={icon === 'nto' ? undefined : 'me'}
                title={compact ? label : undefined}
                aria-label={compact ? label : undefined}
            >
                <Icon name={icon} />{#if !compact}<span>{label}</span>{/if}
            </a>
        </li>
    {/each}
</ul>

<style>
    .social {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em 1.1em;
        font-size: var(--small-font-size);
    }

    .social a {
        display: inline-flex;
        align-items: center;
        gap: 0.45em;
        text-decoration: none;
    }

    .social a:hover span {
        text-decoration: underline;
    }

    .compact {
        gap: 0.15em;
        font-size: 1.1rem;
    }

    /* Big enough to tap comfortably. */
    .compact a {
        justify-content: center;
        width: 1.9em;
        height: 1.9em;
        border-radius: var(--roundedness);
        color: var(--muted-color);
    }

    .compact a:hover {
        color: var(--link-color);
        background-color: var(--surface-color);
    }

    .compact li:first-child a {
        margin-left: -0.4em;
    }
</style>
