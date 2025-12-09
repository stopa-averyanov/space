<script lang='ts'>
import type Planet from '$lib/planet';
import Earth from '$lib/planets/earth';
import Jupiter from '$lib/planets/jupiter';
import Mars from '$lib/planets/mars';
import Mercury from '$lib/planets/mercury';
import Moon from '$lib/planets/moon';
import Neptune from '$lib/planets/neptune';
import Saturn from '$lib/planets/saturn';
import Uranus from '$lib/planets/uranus';
import Venus from '$lib/planets/venus';
import SolarSystemCameraman from '$lib/solarSystemCameraman';
import Sun from '$lib/sun';
import { onMount } from 'svelte';
import * as THREE from 'three';
import { EffectComposer, OutputPass, RenderPass, SMAAPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js';

let canvas : HTMLCanvasElement;
let blackOverlay : HTMLDivElement;

const clock = new THREE.Clock(true);

const scene = new THREE.Scene();

const sun = new Sun();
const cameraman = new SolarSystemCameraman(sun.object3D, 500);

const mercury : Mercury = new Mercury();
const venus : Venus = new Venus();
const earth : Earth = new Earth(cameraman.camera);
const moon : Moon = new Moon();
const mars : Mars = new Mars();
const jupiter : Jupiter = new Jupiter();
const saturn : Planet = new Saturn();
const uranus : Uranus = new Uranus();
const neptune : Neptune = new Neptune();

let renderer : THREE.WebGLRenderer;
let composer : EffectComposer;

let bloomPass : UnrealBloomPass;

earth.addPlanet(moon);
sun.addPlanet(mercury);
sun.addPlanet(venus);
sun.addPlanet(earth);
sun.addPlanet(mars);
sun.addPlanet(jupiter);
sun.addPlanet(saturn);
sun.addPlanet(uranus);
sun.addPlanet(neptune);

scene.add( sun.object3D );
scene.add(cameraman.object3D);

sun.setCameraman(cameraman);

onMount(() => {
        
    renderer = new THREE.WebGLRenderer({ canvas : canvas, antialias : false });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    
    composer = new EffectComposer(renderer);
    
    bloomPass = new UnrealBloomPass( new THREE.Vector2(2, 2), .3, 0.5, 0. );

    composer.addPass( new RenderPass( scene, cameraman.camera ) );
    composer.addPass( bloomPass );
    composer.addPass( new SMAAPass());
    composer.addPass( new OutputPass() );

    renderer.setAnimationLoop( animate );

    window.addEventListener('resize', resize);
    resize();

    blackOverlay.classList.add('fadeInAnimation');
})
function animate() {
    
    composer.render();

    const delta = clock.getDelta();
    sun.animate(delta);
    cameraman.animate(delta);
}
function resize() {

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    cameraman.resize(w, h);
    renderer.setSize( w, h, false );
    composer.setSize( w, h );
    bloomPass.resolution = new THREE.Vector2(w / 4, h / 4);
}

export function wideShot() {

    cameraman.transition(sun.object3D, 160, 1, 0, 0);
    sun.showOrbits();
    earth.showOrbits();
}
export function focusOnSun() {
    
    cameraman.transition(sun.object3D, 12, 0, 0, 0);
    sun.hideOrbits();
    earth.hideOrbits();
}
function focusOnPlanet(planet : Planet, distance? : number, rotationY? : number) {
    
    if (cameraman._target == planet.object3D) return;
    if (distance === undefined) distance = planet._radius * 15;
    cameraman.transition(planet.object3D, distance, 1, Math.PI / 3, rotationY);
    sun.hideOrbits();
    earth.hideOrbits();
}

export function focusOnMercury() { focusOnPlanet(mercury, undefined, Math.PI / 6 * 0); }
export function focusOnVenus() { focusOnPlanet(venus, undefined, Math.PI / 6 * 1); }
export function focusOnEarth() { focusOnPlanet(earth, undefined, Math.PI / 6 * 2); earth.showOrbits() }
export function focusOnMoon() { focusOnPlanet(moon, undefined, Math.PI / 6 * 3); }
export function focusOnMars() { focusOnPlanet(mars, undefined, Math.PI / 6 * 4); }
export function focusOnJupiter() { focusOnPlanet(jupiter, 3, Math.PI / 6 * 5); }
export function focusOnSaturn() { focusOnPlanet(saturn, 4, Math.PI / 6 * 6); }
export function focusOnUranus() { focusOnPlanet(uranus, undefined, Math.PI / 6 * 7); }
export function focusOnNeptune() { focusOnPlanet(neptune, undefined, Math.PI / 6 * 8); }

</script>
<style>

canvas {
    width: 100%;
    height: 100lvh;
    display: block;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    left: 0;
    z-index: -1;
}
div {

    width: 100vw;
    height: 100vh;
    background-color: black;
    position: fixed;
    z-index: -1;
}
:global(.fadeInAnimation) {

    animation-fill-mode: forwards;
    animation-duration: 1.5s;
    animation-iteration-count: 1;
    animation-name: fadeInAnimation;
}
@keyframes fadeInAnimation {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

</style>

<canvas bind:this={canvas}></canvas>
<div bind:this={blackOverlay}></div>