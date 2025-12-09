<script lang='ts'>
import Cameraman from '$lib/cameraman';
import { onMount } from 'svelte';
import * as THREE from 'three';

let canvas : HTMLCanvasElement;
let blackOverlay : HTMLDivElement;

const clock = new THREE.Clock(true);

const scene = new THREE.Scene();

export const cameraman = new Cameraman();
let props : { animationCallback? : Function } = $props();

cameraman.camera.fov = 20;

scene.add(cameraman.object3D);

let renderer : THREE.WebGLRenderer;

onMount(() => {
        
    renderer = new THREE.WebGLRenderer({ canvas : canvas, antialias : true });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    

    renderer.setAnimationLoop( animate );

    window.addEventListener('resize', resize);
    resize();

    blackOverlay.classList.add('fadeInAnimation');

    cameraman.object3D.rotation.x = -Math.PI / 3.;
    cameraman.object3D.rotation.z = Math.PI + Math.PI / 2;
})
function scrollStars() {

    const scrollPosition = document.documentElement.scrollTop;
    cameraman.object3D.rotation.y = -0.6 - scrollPosition * 0.0003;
}
export function scrollTo(angle : number) {

    cameraman.object3D.rotation.y = -0.6 - angle;
}
function animate() {
    
    renderer.render(scene, cameraman.camera);

    const delta = clock.getDelta();
    cameraman.animate(delta);
    cameraman.object3D.rotation.x -= delta * 0.01;
    props.animationCallback?.call(null, delta);
}
function resize() {

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    cameraman.resize(w, h);
    renderer.setSize( w, h, false );
}

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
    z-index: -10;
}
div {

    width: 100vw;
    height: 100vh;
    background-color: black;
    position: fixed;
    z-index: -8;
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