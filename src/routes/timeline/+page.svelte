<script lang='ts'>
import Navigation from "$lib/components/Navigation.svelte";
import ScrollableStars3DBackground from "$lib/components/ScrollableStars3DBackground.svelte";
import { onMount } from "svelte";
import InteractiveTimeline from "./InteractiveTimeline.svelte";
import TriviaContainer from "./TriviaContainer.svelte";
import events from "./events.ts";

const years = [...new Set(events.map(event => event.year))].toSorted();

let selectedYear = 2000;

let triviaContainer : TriviaContainer;
let background : ScrollableStars3DBackground;

let targetRotationZ = 0;

onMount(() => {
    update(0);
    targetRotationZ = (0 / years.length) * Math.PI;
    background.cameraman.object3D.rotation.z = 0;
});

function update(index : number) {

    selectedYear = years[index];
    triviaContainer.update(events.filter(event => event.year == selectedYear));

    targetRotationZ = (index / years.length) * Math.PI;
}
function animate(delta: number) {

    const factor = 1 - Math.pow(0.1, delta);
    background.cameraman.object3D.rotation.z = background.cameraman.object3D.rotation.z * (1 - factor) + targetRotationZ * factor;
}
</script>
<style>

:global(body) {
    overflow-y: hidden;
}
.fullscreen-container {

    display: flex;
    flex-direction: column;
    min-height: 100svh;
    max-height: 100svh;
    overflow-y: hidden;
}

</style>

<svelte:head>
    <title>История</title>
</svelte:head>

<ScrollableStars3DBackground bind:this={background} animationCallback={animate}></ScrollableStars3DBackground>

<div class='fullscreen-container'>
    <TriviaContainer bind:this={triviaContainer}></TriviaContainer>
    <InteractiveTimeline years={years} scrollFunction={update}></InteractiveTimeline>
    <!-- <InteractiveTimelineAlt></InteractiveTimelineAlt> -->
</div>