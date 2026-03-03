<script lang='ts'>
import SolarSystemSection from "./planetSections/SolarSystemSection.svelte";
import MercurySection from "./planetSections/MercurySection.svelte";
import VenusSection from "./planetSections/VenusSection.svelte";
import EarthSection from "./planetSections/EarthSection.svelte";
import MarsSection from "./planetSections/MarsSection.svelte";
import JupiterSection from "./planetSections/JupiterSection.svelte";
import SaturnSection from "./planetSections/SaturnSection.svelte";
import UranusSection from "./planetSections/UranusSection.svelte";
import NeptuneSection from "./planetSections/NeptuneSection.svelte";
import SunSection from "./planetSections/SunSection.svelte";
import MoonSection from "./planetSections/MoonSection.svelte";
import { on } from "svelte/events";
import type { Component } from "svelte";

const sections : Component[] = [
    SolarSystemSection,
    SunSection,
    MercurySection,
    VenusSection,
    EarthSection,
    MoonSection,
    MarsSection,
    JupiterSection,
    SaturnSection,
    UranusSection,
    NeptuneSection
]
let displayedPage = $state(0);
let queuedPage = 0;
const Section = $derived(sections[displayedPage]);
let content : HTMLDivElement;
let transitioning = $state(false);

export function setPage(page : number) {

    if (page < 0 || page >= sections.length) return;
    if (page == displayedPage) return;

    queuedPage = page;
    transitioning = true;
    on(content, 'transitionend', () => {

        displayedPage = queuedPage;
        transitioning = false;
    }, {once: true});
}
</script>

<div class={transitioning ? 'content fade-out' : 'content'} bind:this={content}>
    <Section></Section>
</div>

<style>

.content {
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: opacity 1s ease-in-out;
}
.content:global(.fade-out) {
    opacity: 0;
}

</style>