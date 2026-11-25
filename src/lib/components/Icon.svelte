<script lang="ts">
    import { icons, type IconName } from './icons.ts';

    interface Props {
        name: IconName;
    }

    let { name }: Props = $props();
    const icon = $derived(icons[name]);
</script>

<!-- Decorative: whatever contains the icon provides its accessible name. -->
<svg
    class="icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    fill={icon.kind === 'fill' ? 'currentColor' : 'none'}
    stroke={icon.kind === 'stroke' ? 'currentColor' : 'none'}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">{@html icon.body}</svg
>

<style>
    .icon {
        width: 1em;
        height: 1em;
        flex: none;
        vertical-align: -0.125em;
    }
</style>
