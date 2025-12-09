<script lang='ts'>

import ScrollFunctionSection from './ScrollFunctionSection.svelte';
import Navigation from '$lib/components/Navigation.svelte';
import SolarSystem3DBackground from '$lib/components/SolarSystem3DBackground.svelte';
import SolarSystemSection from './SolarSystemSection.svelte';
import SunSection from './SunSection.svelte';
import { onMount } from 'svelte';
import MercurySection from './MercurySection.svelte';
import VenusSection from './VenusSection.svelte';
import EarthSection from './EarthSection.svelte';
import MarsSection from './MarsSection.svelte';
import JupiterSection from './JupiterSection.svelte';
import SaturnSection from './SaturnSection.svelte';
import UranusSection from './UranusSection.svelte';
import NeptuneSection from './NeptuneSection.svelte';
    import MoonSection from './MoonSection.svelte';


let container : HTMLDivElement;

let background : SolarSystem3DBackground;

onMount(() => {
    background.wideShot();
});
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

</style>

<svelte:head>
    <title>Главная</title>
</svelte:head>

<SolarSystem3DBackground bind:this={background}></SolarSystem3DBackground>

<div class='page-container' bind:this={container} style="display: contents;">

    <ScrollFunctionSection content={SolarSystemSection} scrollFunction={background.wideShot}></ScrollFunctionSection>
    <ScrollFunctionSection content={SunSection} scrollFunction={background.focusOnSun}></ScrollFunctionSection>
    <ScrollFunctionSection content={MercurySection} scrollFunction={background.focusOnMercury}></ScrollFunctionSection>
    <ScrollFunctionSection content={VenusSection} scrollFunction={background.focusOnVenus}></ScrollFunctionSection>
    <ScrollFunctionSection content={EarthSection} scrollFunction={background.focusOnEarth}></ScrollFunctionSection>
    <ScrollFunctionSection content={MoonSection} scrollFunction={background.focusOnMoon}></ScrollFunctionSection>
    <ScrollFunctionSection content={MarsSection} scrollFunction={background.focusOnMars}></ScrollFunctionSection>
    <ScrollFunctionSection content={JupiterSection} scrollFunction={background.focusOnJupiter}></ScrollFunctionSection>
    <ScrollFunctionSection content={SaturnSection} scrollFunction={background.focusOnSaturn}></ScrollFunctionSection>
    <ScrollFunctionSection content={UranusSection} scrollFunction={background.focusOnUranus}></ScrollFunctionSection>
    <ScrollFunctionSection content={NeptuneSection} scrollFunction={background.focusOnNeptune}></ScrollFunctionSection>
</div>