<script lang='ts'>
import { onMount } from "svelte";
import { on } from "svelte/events";

export interface PlanetProperties {
    name : string,
    nameAlt : string, 
    radius : number,
    distance : number,
    mass : number,
    temperature : number
}

let props : { planets : PlanetProperties[], selectedPlanet : number } = $props();

function scientificNotation(value : number) {

    const exponent = Math.floor(Math.log10(value));
    const mantissa = value / (10**exponent);
    return {exponent, mantissa : Math.round(mantissa * 1000) / 1000}
}

let mass = $derived(scientificNotation(props.planets[props.selectedPlanet].mass).mantissa);
let massExponent = $derived(scientificNotation(props.planets[props.selectedPlanet].mass).exponent);
let radius = $derived(props.planets[props.selectedPlanet].radius);
let temperature = $derived(props.planets[props.selectedPlanet].temperature);
let distance = $derived(props.planets[props.selectedPlanet].distance);

function F(property : PlanetProperties, otherProperty : PlanetProperties) {

    const greaterThanString = 'раз больше, чем у ' + otherProperty.nameAlt;
    const lessThanString = 'раз меньше, чем у ' + otherProperty.nameAlt;

    const { mass, distance, radius, temperature } = property;
    const volume = Math.pow(radius, 2) * Math.PI;
    const { mass : otherMass, distance:  otherDistance, radius: otherRadius, temperature : otherTemperature } = otherProperty;
    const otherVolume = Math.pow(otherRadius, 2) * Math.PI;

    const T = (n : number) => n - 273;
    const T_inv = (n : number) => n + 273;
    function G(t : number, o : number) {

        const ratio = Math.round(t / o * 100) / 100;
        const ratioInv = Math.round(o / t * 100) / 100;
        
        const greaterThanString = `В ${ratio} раз больше, чем у ${otherProperty.nameAlt}`;
        const lessThanString = `В ${ratioInv} раз меньше, чем у ${otherProperty.nameAlt}`
        const greaterThanStringAlt = `В ${ratio} раза больше, чем у ${otherProperty.nameAlt}`;
        const lessThanStringAlt = `В ${ratioInv} раза меньше, чем у ${otherProperty.nameAlt}`

        if (ratio >= 1)
            if (ratio == 2 || ratio == 3 || ratio == 4)
                return greaterThanStringAlt
            else return greaterThanString
        else if (ratioInv == 2 || ratioInv == 3 || ratioInv == 4)
                return lessThanStringAlt;
            else return lessThanString;
    }

    return {
        m : mass,
        d : distance,
        r : radius,
        t : temperature,
        v : volume,

        C : {

            m : G(mass, otherMass),
            d : G(distance, otherDistance),
            r : G(radius, otherRadius),
            t : G(temperature + 273, otherTemperature + 273),
            v : G(volume, otherVolume)
        }
    }
}

</script>

<style>
ul {
    padding-left: 1.4em;
    line-height: 2;
}
sup { 
    vertical-align: top; 
    position: relative; 
    top: -0.5em; 
}
.nowrap {
    white-space: nowrap;
    
}

</style>

<ul style="display: inline-block;">
    <li>Масса<span class='nowrap'>&nbsp;:&nbsp;</span>{mass} × 10<sup>{massExponent}</sup> кг</li>
    <li>Радиус<span class='nowrap'>&nbsp;:&nbsp;</span>{radius} км</li>
    <li>Расстояние до солнца<span class='nowrap'>&nbsp;:&nbsp;</span>{distance} млн км</li>
    <li>Температура поверхности<span class='nowrap'>&nbsp;:&nbsp;</span>{temperature} °C</li>

    <!-- <div class='stats-table'>
        <span>Радиус</span>
        <span>{@html cells.r} км</span>
        <span>{cells.C.r}</span>
        <span>Расстояние до Солнца</span>
        <span>{@html cells.d} млн км</span>
        <span>{cells.C.d}</span>
        <span>Масса</span>
        <span>{@html cells.m} × 10<sup>24</sup> кг</span>
        <span>{cells.C.m}</span>
        <span>Температура поверхности</span>
        <span>{@html cells.t} °C</span>
    </div> -->
    <!-- <table>
        <tbody>
            <tr>
            <th scope="row">Радиус</th>
            <td>{@html cells.r} км</td>
            <td>{cells.C.r}</td>
            </tr>
            <tr>
            <th scope="row">Расстояние до Солнца</th>
            <td>{@html cells.d} млн км</td>
            <td>{cells.C.d}</td>
            </tr>
            <tr>
            <th scope="row">Масса</th>
            <td>{@html cells.m} × 10<sup>24</sup> кг</td>
            <td>{cells.C.m}</td>
            </tr>
            <tr>
            <th scope="row">Температура поверхности</th>
            <td>{@html cells.t} °C</td>
            <td></td>
            </tr>
        </tbody>
    </table> -->
</ul>
