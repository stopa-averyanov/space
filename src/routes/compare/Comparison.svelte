<script lang='ts'>
    import { asset } from "$app/paths";


import type { PlanetProperties } from "./Stats.svelte";

let props : { planets : PlanetProperties[], compareFrom : number, compareTo : number, swapFunction : Function } = $props();

let planetA = $derived(props.planets[props.compareTo]);
let planetB = $derived(props.planets[props.compareFrom]);

function round(value : number) { return Math.round(value * 1000) / 1000; }
function suffix(value : number) {
    return Math.abs(value) % 10 >= 2 && Math.abs(value) % 10 < 5;
}

function massLabel() {

    if (massRatio >= 1) {

        const labelNumber = round(massRatio);
        return 'В ' + labelNumber.toString() + (suffix(labelNumber) ? ' раза' : ' раз') + ' тяжелее ' + planetB.nameAlt;
    }
    else {

        const labelNumber = round(1 / massRatio);
        return 'В ' + labelNumber.toString() + (suffix(labelNumber) ? ' раза' : ' раз') + ' легче ' + planetB.nameAlt
    }
}
function distanceLabel() {

    if (distanceRatio >= 1) {
        const labelNumber = round(distanceRatio);
        return 'В ' + labelNumber.toString() + (suffix(labelNumber) ? ' раза' : ' раз') + ' дальше от солнца';
    }
    else {
        const labelNumber = round(1 / distanceRatio);
        return 'В ' + labelNumber.toString() + (suffix(labelNumber) ? ' раза' : ' раз') + ' ближе к солнцу';
    }
}
function diameterLabel() {

    if (radiusRatio >= 1) {
        const labelNumber = round(radiusRatio);
        return 'В ' + labelNumber.toString() + (suffix(labelNumber) ? ' раза' : ' раз') + ' больше в диаметре';
    }
    else {
        const labelNumber = round(1 / radiusRatio);
        return 'В ' + labelNumber.toString() + (suffix(labelNumber) ? ' раза' : ' раз') + ' меньше в диаметре';
    }
}
function temperatureLabel() {

    const degreeSuffixDigit = Math.round(Math.abs(temperatureDifference)) % 10
    const degreeSuffix = degreeSuffixDigit == 1 ? ' градус' : (degreeSuffixDigit >= 2 && degreeSuffixDigit < 5) ? ' градуса' : ' градусов';
    if (temperatureDifference >= 0) {
        const labelNumber = temperatureDifference;
        return 'На ' + labelNumber.toString() + degreeSuffix + ' теплее';
    }
    else {
        const labelNumber = -temperatureDifference;
        return 'На ' + labelNumber.toString() + degreeSuffix + ' холоднее';
    }
}

let massRatio = $derived(planetA.mass / planetB.mass);
let distanceRatio = $derived(planetA.distance / planetB.distance);
let radiusRatio = $derived(planetA.radius / planetB.radius);
let temperatureDifference = $derived(planetA.temperature - planetB.temperature);
</script>

<style>
div {
    
    position: relative;
    bottom: 0;
}
h2 {
    text-align: center;
    font-weight: inherit;
}
ul {
    padding-left: 1.4em;
    line-height: 2;
}
img {
    max-width: 2ch;
    position: relative;
    bottom: -0.25em;
    margin-left: 1ch;
    cursor: pointer;
}
</style>
<div>
    <h2>{planetA.name}... <img onclick={() => { props.swapFunction() }} src='{asset('/swap-icon.svg')}'></h2>
    <ul>
        <li>{massLabel()}</li>
        <li>{diameterLabel()}</li>
        <li>{distanceLabel()}</li>
        <li>{temperatureLabel()}</li>
    </ul>
</div>