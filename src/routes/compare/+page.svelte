<script lang="ts">
import ScrollableStars3DBackground from "$lib/components/ScrollableStars3DBackground.svelte";
import { onMount } from "svelte";
import PlanetDisplay from "./PlanetDisplay.svelte";
import { on } from "svelte/events";
import type Planet from "$lib/planet";
//     import StatsAndSelection from "./StatsAndSelection.svelte";

let planetA : PlanetDisplay;
let planetB : PlanetDisplay;

let planetAPlanetIndex = $state(0);
let planetBPlanetIndex = $state(0);

let planetAPlanet : Planet;
let planetBPlanet : Planet;

let selectionA : Selection, selectionB : Selection;

let greaterRadius : number;

let mobile = false;

function swapPlanets() {

    const indexT = planetAPlanetIndex;

    planetAPlanetIndex = planetBPlanetIndex;
    planetBPlanetIndex = indexT;

    planetAPlanet = planetA.planets[planetAPlanetIndex];
    planetBPlanet = planetB.planets[planetBPlanetIndex];

    if (planetAPlanetIndex == 5 && planetBPlanetIndex == 5 && !mobile) {
        greaterRadius = greaterRadius * 1.4;
    }

    greaterRadius = Math.max(planetAPlanet._radius, planetBPlanet._radius);
    
    planetA.queuePlanet(planetAPlanet, greaterRadius);
    planetB.queuePlanet(planetBPlanet, greaterRadius);

    selectionA.selectSilent(planetAPlanetIndex);
    selectionB.selectSilent(planetBPlanetIndex);
}
function setPlanetA(index : number) {
    
    planetAPlanetIndex = index;
    planetAPlanet = planetA.planets[index];
        
    greaterRadius = Math.max(planetAPlanet._radius, planetBPlanet._radius);

    if (planetAPlanetIndex == 5 && planetBPlanetIndex == 5 && !mobile) {
        greaterRadius = greaterRadius * 1.4;
    }

    planetB.setTargetDistance(greaterRadius);
    planetA.queuePlanet(planetAPlanet, greaterRadius);
}

function setPlanetB(index : number) {
    
    planetBPlanetIndex = index;
    planetBPlanet = planetB.planets[index];
        
    greaterRadius = Math.max(planetBPlanet._radius, planetAPlanet._radius);
    
    if (planetAPlanetIndex == 5 && planetBPlanetIndex == 5 && !mobile) {
        greaterRadius = greaterRadius * 1.4;
    }

    planetA.setTargetDistance(greaterRadius);
    planetB.queuePlanet(planetBPlanet, greaterRadius);
}

onMount(() => {

    planetAPlanet = planetA.planets[0];
    planetBPlanet = planetB.planets[0];

    greaterRadius = Math.max(planetBPlanet._radius, planetAPlanet._radius);

    planetA.setPlanet(planetAPlanet, greaterRadius);
    planetB.setPlanet(planetBPlanet, greaterRadius);

    mobile = window.innerWidth <= 767;
});

import Selection from './Selection.svelte';
import type { PlanetProperties } from './Stats.svelte';
import Stats from './Stats.svelte';
    import Comparison from "./Comparison.svelte";
    import Navigation from "$lib/components/Navigation.svelte";

const planets : PlanetProperties[] = [

    {
        name : "Меркурий",
        nameAlt : "Меркурия",
        radius : 2440,
        distance : 58,
        mass : 0.3301 * 10**24,
        temperature : 167
    },
    {
        name : "Венера",
        nameAlt : "Венеры",
        radius : 6052,
        distance : 108,
        mass : 4.86 * 10**24,
        temperature : 464
    },
    {
        name : "Земля",
        nameAlt : "Земли",
        radius : 6371,
        distance : 149,
        mass : 5.97 * 10**24,
        temperature : 15
    },
    {
        name : "Марс",
        nameAlt : "Марса",
        radius : 3390,
        distance : 227,
        mass : 0.6416 * 10**24,
        temperature : -65
    },
    {
        name : "Юпитер",
        nameAlt : "Юпитера",
        radius : 69911,
        distance : 778,
        mass : 1898.12 * 10**24,
        temperature : -110
    },
    {
        name : "Сатурн",
        nameAlt : "Сатурна",
        radius : 58232,
        distance : 1425,
        mass : 568.31 * 10**24,
        temperature : -140
    },
    {
        name : "Уран",
        nameAlt : "Урана",
        radius : 25362,
        distance : 2915,
        mass : 86.80 * 10**24,
        temperature : -195
    },
    {
        name : "Нептун",
        nameAlt : "Нептуна",
        radius : 24622,
        distance : 4470,
        mass : 102.40 * 10**24,
        temperature : -200
    }
]
</script>
<style>

:global(html) {
    background-color: black;
}
:global(body) {
    max-width: 100svw;
    overflow-x: hidden;
}
h1 {
    position: absolute;
    text-align: center;
    font-weight: 400;
    width: 100%;
}
.two-planets-container {
    max-width: 100%;
    min-width: 100%;
    display: flex;
    align-items: end;
    justify-content: center;
    gap: 32px;
}
.one-planet-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    flex-grow: 1;
}
.fullscreen-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

@media (max-width: 767px) {

    h1 {
        position: static;
        margin-left: 32px;
        margin-right: 32px;
        box-sizing: border-box;
        width: unset;
        font-size: 1.5em;
    }
    .two-planets-container {

        flex-direction: column;
        align-items: center;
        gap: 32px;
    }
    .comparison {
        order: 3;
        margin-top: 32px;
        margin-bottom: 32px;
    }
}
</style>

<svelte:head>
    <title>Сравнение</title>
</svelte:head>

<ScrollableStars3DBackground></ScrollableStars3DBackground>
<h1>Сравните две любые планеты и посмотрите, как они относятся друг к другу.</h1>
<div class='fullscreen-container'>
    <div class='two-planets-container'>
        
        <div class='one-planet-container'>
            <PlanetDisplay height={400} bind:this={planetA}></PlanetDisplay>
            <Selection bind:this={selectionA} options={planets.map(planet => planet.name)} selectionFunction={setPlanetA}></Selection> 
            <Stats {...{planets : planets, selectedPlanet : planetAPlanetIndex}}></Stats>
        </div>
        <div class='comparison'>
            <Comparison {...{planets: planets, compareFrom : planetAPlanetIndex, compareTo : planetBPlanetIndex, swapFunction : swapPlanets}}></Comparison>
        </div>
        <div class='one-planet-container'>
            <PlanetDisplay height={400} bind:this={planetB}></PlanetDisplay>
            <Selection bind:this={selectionB}  options={planets.map(planet => planet.name)} selectionFunction={setPlanetB}></Selection> 
            <Stats {...{planets : planets, selectedPlanet : planetBPlanetIndex}}></Stats>
        </div>
    
    </div>
</div>


<!-- <Selection options={["Меркурий", "Венера", "Земля", "Марс"]} selectionFunction={() => {}}></Selection> -->
<!-- <StatsAndSelection compareTo={0} selectionFunction={() => {}}></StatsAndSelection> -->

<!-- 
<div class='fullscreen-container'>

    <div style='display: inline-block;'>
        <div style='min-height: 420px; display: flex; flex-direction: column; align-items: center;'>
            <PlanetDisplay height={400} bind:this={planetA}></PlanetDisplay>
        </div>
        <StatsAndSelection compareTo={planetBPlanetIndex} selectionFunction={setPlanetA}></StatsAndSelection>
    </div>
    
    <div style='display: inline-block;'>
        <div style='min-height: 420px; display: flex; flex-direction: column; align-items: center;'>
            <PlanetDisplay height={400} bind:this={planetB}></PlanetDisplay>
        </div>
        <StatsAndSelection compareTo={planetAPlanetIndex} selectionFunction={setPlanetB}></StatsAndSelection>
    </div>
</div>

<div style='display: none'>
    
    
</div> -->