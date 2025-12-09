<script lang='ts'>
import ActualScale3DBackground from "$lib/components/ActualScale3DBackground.svelte";
import Navigation from '$lib/components/Navigation.svelte';
import Announcement from "./Announcement.svelte";

let background : ActualScale3DBackground | undefined = $state();

</script>
<style>
    
h1 {

    margin-top: 0;
    margin-bottom: 0;
    font-size: 4em;
    font-weight: 300;
}
.main-container {
    top: 0;
    box-sizing: border-box;
    padding: 1em;
    overflow-y: hidden;
    position: relative;
    max-height: var(--height);
    min-height: var(--height);
}
.planet-text-container {
    
    position: absolute;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 1em;
    left: 0;
}
.ten-mil-km {

    box-sizing: border-box;
}
.ten-mil-km-container {
    position: absolute; 
    bottom: 0; 
    display:flex;
    pointer-events: none;
    flex-direction: column-reverse;
    width: 20%;
}
ul {
    font-size: 1em;
    padding-left: 1.5em;
}
</style>

<svelte:head>
    <title>Масштаб</title>
</svelte:head>

<ActualScale3DBackground bind:this={background}></ActualScale3DBackground>

<div class='main-container' style='--height: {background !== undefined ? background.fullHeightPx * 100 : 0}lvh'>

    <div class='planet-text-container' style='top: {background !== undefined ? background.sizesPx.mercuryPositionPx : 0}px'>
        <h1 id="mercury">Меркурий</h1>
        <ul>
            <li>Радиус : 2,764 км</li>
            <li>Удаленность от солнца : 58 млн км</li>
        </ul>
    </div>
    <div class='planet-text-container' style='top: {background !== undefined ? background.sizesPx.venusPositionPx : 0}px'>
        <h1 id="venus">Венера</h1>
        <ul>
            <li>Радиус : 6,051 км</li>
            <li>Удаленность от солнца : 108 млн км</li>
        </ul>
    </div>
    <div class='planet-text-container' style='top: {background !== undefined ? background.sizesPx.earthPositionPx : 0}px'>
        <h1 id="earth">Земля</h1>
        <ul>
            <li>Радиус : 6,378 км</li>
            <li>Удаленность от солнца : 150 млн км</li>
        </ul>
    </div>
    <div class='planet-text-container' style='top: {background !== undefined ? background.sizesPx.marsPositionPx : 0}px'>
        <h1 id="mars">Марс</h1>
        <ul>
            <li>Радиус : 3,390 км</li>
            <li>Удаленность от солнца : 228 млн км</li>
        </ul>
    </div>
    <div class='planet-text-container' style='top: {background !== undefined ? background.sizesPx.jupiterPositionPx : 0}px'>
        <h1 id="jupiter">Юпитер</h1>
        <ul>
            <li>Радиус : 69,911 км</li>
            <li>Удаленность от солнца : 778 млн км</li>
        </ul>
    </div>
    <div class='planet-text-container' style='top: {background !== undefined ? background.sizesPx.saturnPositionPx : 0}px'>
        <h1 id="saturn">Сатурн</h1>
        <ul>
            <li>Радиус : 60,250 км</li>
            <li>Удаленность от солнца : 1.42 млрд км</li>
        </ul>
    </div>
    <div class='planet-text-container' style='top: {background !== undefined ? background.sizesPx.uranusPositionPx : 0}px'>
        <h1 id="uranus">Уран</h1>
        <ul>
            <li>Радиус : 25,559 км</li>
            <li>Удаленность от солнца : 2.91 млрд км</li>
        </ul>
    </div>
    <div class='planet-text-container' style='top: {background !== undefined ? background.sizesPx.neptunePositionPx : 0}px'>
        <h1 id="neptune">Нептун</h1>
        <ul>
            <li>Радиус : 24,764 км</li>
            <li>Удаленность от солнца : 4.47 млрд км</li>
        </ul>
    </div>
    <div class='planet-text-container' style='bottom: 0px'>
        <h1 id="sun">Солнце</h1>
        <ul>
            <li>Радиус : 696,340 км</li>
        </ul>
    </div>
    <div class='ten-mil-km-container'>
        {#each [...Array(120).keys()] as i}
        <div class='ten-mil-km' style='min-height: {background !== undefined ? background.sizesPx.tenMilKmPx * 5: 0}px'>

            {#if (i + 1) * 50 != 1450 && (i + 1) * 50 != 2900 && (i + 1) * 50 != 150}
            <span>{(i + 1) * 50} млн км<br>от Солнца</span>
            {/if}
        </div>
        {/each}
    </div>

</div>

<Announcement></Announcement>