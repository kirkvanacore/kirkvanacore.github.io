<script lang="ts">
    interface Props {
        label: string;
        quiet?: boolean;
    }

    let { label, quiet = false }: Props = $props();
</script>

<span class="tag" class:quiet>{label}</span>

<style>
    .tag {
        display: inline-block;
        margin: 0 0.35em 0.35em 0;
        padding: 0.15em 0.55em;
        border-radius: var(--roundedness);
        background-color: var(--annotation-color);
        color: var(--annotation-text-color);
        font-family: var(--label-font);
        font-size: var(--annotation-size);
        font-weight: var(--bold-weight);
        letter-spacing: 0.02em;
        line-height: 1.4;
    }

    .quiet {
        background-color: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-color);
        font-weight: var(--text-weight);
    }
</style>
