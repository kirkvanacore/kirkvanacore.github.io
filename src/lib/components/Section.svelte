<script lang="ts">
    /** A page section: an h2 with an anchor link, which also feeds the sidebar outline. */
    interface Props {
        id: string;
        header: string;
        children?: import('svelte').Snippet;
    }

    let { id, header, children }: Props = $props();
</script>

<section aria-labelledby={id}>
    <h2 {id} data-title={header}>
        {header}<a class="anchor" href="#{id}" aria-label="Link to the {header} section">#</a>
    </h2>
    {@render children?.()}
</section>

<style>
    h2 {
        scroll-margin-top: 1em;
    }

    .anchor {
        margin-left: 0.35em;
        font-weight: var(--text-weight);
        color: var(--muted-color);
        text-decoration: none;
        opacity: 0;
    }

    h2:hover .anchor,
    .anchor:focus-visible {
        opacity: 1;
    }

    @media (hover: none) {
        .anchor {
            display: none;
        }
    }
</style>
