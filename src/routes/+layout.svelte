<script lang="ts">
    // Fonts are bundled with the site rather than loaded from Google Fonts, so
    // visitors' browsers never contact a third party. Browsers only download
    // the families the active theme uses.
    import '@fontsource-variable/source-serif-4/opsz.css';
    import '@fontsource-variable/source-serif-4/opsz-italic.css';
    import '@fontsource-variable/fraunces/opsz.css';
    import '@fontsource-variable/inter/opsz.css';
    import '#lib/styles/global.css';

    let { children } = $props();
</script>

{@render children?.()}
