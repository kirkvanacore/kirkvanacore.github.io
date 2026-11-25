<script lang="ts">
    import { page } from '$app/state';
    import { repoUrl } from '#lib/config.ts';
    import type { SiteData } from '#lib/types.ts';

    const data = $derived(page.data as SiteData);
</script>

<footer>
    <p>
        Last updated {data.built}. Site code is released under <a
            rel="license"
            href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a
        >. Text, papers, and photos © {data.profile.name} unless noted.
    </p>
    <p>
        <a href="https://github.com/amyjko/faculty">Site design based on Amy J. Ko's faculty site</a>.
        <a href={repoUrl}>Source on GitHub</a>. This site uses no cookies, analytics or tracking.
    </p>
</footer>

<style>
    footer {
        margin-top: 4em;
        padding-top: 1em;
        border-top: 1px solid var(--border-color);
        font-size: var(--extra-small-font-size);
        line-height: 1.5;
        color: var(--muted-color);
    }

    p {
        margin-bottom: 0.6em;
    }
</style>
