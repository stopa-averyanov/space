<script lang='ts'>

import SolarSystem3DBackground from '$lib/components/SolarSystem3DBackground.svelte';
import { onMount } from 'svelte';
import PagedSections from '$lib/components/index/PagedSections.svelte';
    import LeftRightButton from '$lib/components/index/LeftRightButton.svelte';

let background : SolarSystem3DBackground;

let content : PagedSections;
let page = 0;

let focusFunctions : (() => void)[];

onMount(() => {
    background.wideShot();

    focusFunctions = [

        background.wideShot,
        background.focusOnSun,
        background.focusOnMercury,
        background.focusOnVenus,
        background.focusOnEarth,
        background.focusOnMoon,
        background.focusOnMars,
        background.focusOnJupiter,
        background.focusOnSaturn,
        background.focusOnUranus,
        background.focusOnNeptune,
    ]
});

function pageNext() {
    if (page == 10) return;
    page ++;
    focusFunctions[page]();
    content.setPage(page);
}
function pagePrevious() {
    if (page == 0) return;
    page --;
    focusFunctions[page]();
    content.setPage(page);
}
</script>

<style>

div :global(canvas) {
    width: 100%;
    height: 100lvh;
    display: block;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    left: 0;
    z-index: -1;
}
.page-container {
    
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
}
.planets-navigation {
    position: absolute;
    bottom: 5vh;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 32px;
}
</style>

<svelte:head>
    <title>Главная</title>
</svelte:head>

<SolarSystem3DBackground bind:this={background}></SolarSystem3DBackground>

<div class='page-container' style="display: contents;">

    <PagedSections bind:this={content}></PagedSections>
    <div class='planets-navigation'>
        <LeftRightButton clickLeft={pagePrevious} clickRight={pageNext}></LeftRightButton>
    </div>
</div>