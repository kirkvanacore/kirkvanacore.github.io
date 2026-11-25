<script lang="ts">
    /**
     * A small slideshow. The photos sit in a horizontally scrolling strip that
     * snaps to each one, so swiping works on phones, and before or without
     * JavaScript. The buttons step through the photos, wrapping around, and are
     * how keyboard users move between them.
     */
    import type { Photo } from '#lib/types.ts';

    interface Props {
        photos: Photo[];
        /** What the photos are of, for screen readers. */
        label: string;
    }

    let { photos, label }: Props = $props();

    let track: HTMLUListElement | undefined = $state();
    let index = $state(0);

    function go(to: number) {
        if (!track) return;
        const next = (to + photos.length) % photos.length;
        track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
        index = next;
    }

    function onscroll() {
        if (track && track.clientWidth > 0) index = Math.round(track.scrollLeft / track.clientWidth);
    }
</script>

<div class="carousel" role="region" aria-roledescription="carousel" aria-label="Photos: {label}">
    <ul class="track" bind:this={track} {onscroll}>
        {#each photos as photo, i (photo.src)}
            <li aria-roledescription="slide" aria-label="{i + 1} of {photos.length}">
                <img
                    src={photo.src.replace(/^\/?/, '/')}
                    alt={photo.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                />
            </li>
        {/each}
    </ul>
    {#if photos.length > 1}
        <button type="button" class="step prev" onclick={() => go(index - 1)} aria-label="Previous photo">‹</button>
        <button type="button" class="step next" onclick={() => go(index + 1)} aria-label="Next photo">›</button>
        <p class="count" aria-live="polite">{index + 1}&thinsp;/&thinsp;{photos.length}</p>
    {/if}
</div>

<style>
    .carousel {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .track {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        border-radius: var(--roundedness);
    }

    .track::-webkit-scrollbar {
        display: none;
    }

    li {
        flex: 0 0 100%;
        scroll-snap-align: start;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Always light-on-dark, since they sit on top of photos. */
    .step {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 1.6em;
        height: 1.6em;
        padding: 0 0 0.12em 0;
        border: none;
        border-radius: 50%;
        background-color: rgb(0 0 0 / 0.55);
        color: #fff;
        font-size: 1.05rem;
        line-height: 1;
        cursor: pointer;
    }

    .step:hover {
        background-color: rgb(0 0 0 / 0.75);
    }

    .prev {
        left: 0.35em;
    }

    .next {
        right: 0.35em;
    }

    .count {
        position: absolute;
        right: 0.4em;
        bottom: 0.4em;
        margin: 0;
        padding: 0.05em 0.45em;
        border-radius: 1em;
        background-color: rgb(0 0 0 / 0.55);
        color: #fff;
        font-size: 0.7rem;
        line-height: 1.5;
    }
</style>
