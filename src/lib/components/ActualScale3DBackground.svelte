<script lang='ts'>
    import { asset } from '$app/paths';
import Cameraman from '$lib/cameraman';
import Planet from '$lib/planet';
import { _earthMaterial } from '$lib/planets/earth';
import { _saturnRingsMaterial } from '$lib/planets/saturn';
import Sun from '$lib/sun';
import { onMount } from 'svelte';
import * as THREE from 'three';
import { EffectComposer, OutputPass, RenderPass, SMAAPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js';

let canvas : HTMLCanvasElement;
let blackOverlay : HTMLDivElement;

const clock = new THREE.Clock(true);

const scene = new THREE.Scene();
const rootObject = new THREE.Object3D();

const scrollScale = 14;

const offset = new THREE.Vector3(-2500 * 100, -4500 * 100, -2000 * 100)
rootObject.position.set(offset.x, offset.y, offset.y);

const sun = new Sun(69.57);
sun._material.uniforms.uExposure.value = 1;
const mercury = new Planet({
    radius : 0.244,
    rotationSpeed : 0.1,
    distance: 0,
    orbitingSpeed: 0,
    initialRotation: 0,
    textureName: '/space/textures/2k_mercury.jpg'
});
const venus = new Planet({
    radius : 0.6052,
    rotationSpeed : 0.1,
    distance: 0,
    orbitingSpeed: 0,
    initialRotation: 0,
    textureName: '/space/textures/2k_venus.jpg'
});
const earth = new Planet({
    radius : 0.6371,
    rotationSpeed : 0.1,
    distance: 0,
    orbitingSpeed: 0,
    initialRotation: 0,
    textureName: '/space/textures/2k_earth_daymap.jpg'
});
earth._mesh.material = _earthMaterial();
const mars = new Planet({
    radius : 0.339,
    rotationSpeed : 0.1,
    distance: 0,
    orbitingSpeed: 0,
    initialRotation: 0,
    textureName: '/space/textures/2k_mars.jpg'
});
// 6.9911 = 69.91 * 0.1
// 778.6 = 778,600,000 * 0.001 * 0.1
const jupiter = new Planet({
    radius: 6.9911,
    rotationSpeed : 0.1,
    distance: 0,
    orbitingSpeed: 0,
    initialRotation: 0,
    textureName: '/space/textures/2k_jupiter.jpg'
});
const saturn = new Planet({
    radius : 5.823,
    rotationSpeed : 0.1,
    distance: 0,
    orbitingSpeed: 0,
    initialRotation: 0,
    textureName: '/space/textures/2k_saturn.jpg'
});
const ringsGeometry = new THREE.RingGeometry(6.9, 16, 256);
const pos = ringsGeometry.attributes.position;
const v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
    v3.fromBufferAttribute(pos, i);
    ringsGeometry.attributes.uv.setXY(i, v3.length() < 7. ? 0 : 1, 1);
}

const rings = new THREE.Mesh(
    ringsGeometry,
    _saturnRingsMaterial()
)
rings.rotation.x = -Math.PI / 2;
saturn.object3D.add(rings);
const uranus = new Planet({
    radius : 2.5362,
    rotationSpeed : 0.1,
    distance: 0,
    orbitingSpeed: 0,
    initialRotation: 0,
    textureName: '/space/textures/2k_uranus.jpg'
});
const neptune = new Planet({
    radius : 2.462,
    rotationSpeed : 0.1,
    distance: 0,
    orbitingSpeed: 0,
    initialRotation: 0,
    textureName: '/space/textures/2k_neptune.jpg'
});
neptune.object3D.rotation.y = 1.5;

// sun 69.5700 0
// mercury 0.2440 57.900
// venus 0.6052 108.200
// earth 0.6371 149.600
// mars 0.3390 227.900
// jupiter 6.991 778.600
// saturn 5.8232 1433.500
// uranus 2.5362 2872.500
// neptune 2.4622 4495.100


mercury.object3D.position.set(0, 69.57 + 57.9, 0);
mercury._mesh.rotation.set(0, 0, 0);
mercury.object3D.rotation.x = - 0.1;
venus.object3D.position.set(0, 69.57 + 108.2, 0);
venus._mesh.rotation.set(0, 0, 0);
venus.object3D.rotation.x = - 0.1;
earth.object3D.position.set(0, 69.57 + 149.2, 0);
earth._mesh.rotation.set(0, 0, 0);
earth.object3D.rotation.x = - 0.1;
mars.object3D.position.set(0, 69.57 + 227.9, 0);
mars._mesh.rotation.set(0, 0, 0);
mars.object3D.rotation.x = - 0.1;
jupiter.object3D.position.set(0, 69.57 + 778.6, 0);
jupiter._mesh.rotation.set(0, 0, 0);
jupiter.object3D.rotation.x = - 0.1;
saturn.object3D.position.set(0, 69.57 + 1443.5, 0);
saturn._mesh.rotation.set(0, 0, 0);
saturn.object3D.rotation.x = 0.3;
uranus.object3D.position.set(0, 69.57 + 2900, 0);
uranus._mesh.rotation.set(0, 0, 0);
uranus.object3D.rotation.x = - 0.1;
neptune.object3D.position.set(0, 69.57 + 4468, 0);
neptune._mesh.rotation.set(0, 0, 0);
neptune.object3D.rotation.x = - 0.1;

rootObject.add(sun.object3D);
rootObject.add(mercury.object3D);
rootObject.add(venus.object3D);
rootObject.add(earth.object3D);
rootObject.add(mars.object3D);
rootObject.add(jupiter.object3D);
rootObject.add(saturn.object3D);
rootObject.add(uranus.object3D);
rootObject.add(neptune.object3D);

const cameraman = new Cameraman();

rootObject.add(cameraman.object3D);
scene.add(rootObject);

cameraman.object3D.position.set(0, 0, 42);
cameraman.object3D.position.y = neptune.object3D.position.y;

let renderer : THREE.WebGLRenderer;
let composer : EffectComposer;

let bloomPass : UnrealBloomPass;

export const sizesPx = $state({

    mercuryPositionPx : 0,
    venusPositionPx : 0,
    earthPositionPx : 0,
    marsPositionPx : 0,
    jupiterPositionPx : 0,
    saturnPositionPx : 0,
    uranusPositionPx : 0,
    neptunePositionPx : 0,
    tenMilKmPx : 0
});
export const fullHeightPx = ((neptune.object3D.position.y - 75) / scrollScale + 1);

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

    new ResizeObserver(resize).observe(canvas);
    resize();

    blackOverlay.classList.add('fadeInAnimation');
    window.addEventListener('scroll', scrollSolarSystem);
})
function animate() {
    
    composer.render();
    
    const delta = clock.getDelta();
    // cameraman.animate(delta);
    mercury.object3D.rotation.y += delta * 0.07;
    venus.object3D.rotation.y += delta * 0.06;
    earth.object3D.rotation.y += delta * 0.05;
    mars.object3D.rotation.y += delta * 0.05;
    jupiter.object3D.rotation.y += delta * 0.02;
    saturn.object3D.rotation.y += delta * 0.04;
    uranus.object3D.rotation.y += delta * 0.04;
    neptune.object3D.rotation.y += delta * 0.03;
}
let previousScrollFactor = 0;
let otherPreviousScrollFactor = 0;
function scrollSolarSystem() {

    const scrollPosition = document.documentElement.scrollTop;
    const otherScrollFactor = scrollPosition / canvas.clientHeight;

    const scrollFactor = ((neptune.object3D.position.y - 75) / scrollScale + 1) - scrollPosition / canvas.clientHeight - 1;
    previousScrollFactor = scrollFactor;
    otherPreviousScrollFactor = otherScrollFactor;
    rootObject.position.y = offset.y + (document.body.clientHeight / canvas.clientHeight - otherScrollFactor - 1) * scrollScale;
    cameraman.object3D.position.y = scrollFactor * scrollScale + 75;
    cameraman._skybox.object3D.rotation.x = scrollFactor * -0.005;
}
function resize() {

    const w = canvas.clientWidth * devicePixelRatio;
    const h = canvas.clientHeight * devicePixelRatio;

    cameraman.resize(w, h);
    renderer.setSize( w, h, false );
    composer.setSize( w, h );
    bloomPass.resolution = new THREE.Vector2(w / 4, h / 4);
    document.documentElement.scrollTop = otherPreviousScrollFactor * canvas.clientHeight;
    scrollSolarSystem();
    sizesPx.mercuryPositionPx = (neptune.object3D.position.y - mercury.object3D.position.y) / scrollScale * canvas.clientHeight;
    sizesPx.venusPositionPx = (neptune.object3D.position.y - venus.object3D.position.y) / scrollScale * canvas.clientHeight;
    sizesPx.earthPositionPx = (neptune.object3D.position.y - earth.object3D.position.y) / scrollScale * canvas.clientHeight;
    sizesPx.marsPositionPx = (neptune.object3D.position.y - mars.object3D.position.y) / scrollScale * canvas.clientHeight;
    sizesPx.jupiterPositionPx = (neptune.object3D.position.y - jupiter.object3D.position.y) / scrollScale * canvas.clientHeight;
    sizesPx.saturnPositionPx = (neptune.object3D.position.y - saturn.object3D.position.y) / scrollScale * canvas.clientHeight;
    sizesPx.uranusPositionPx = (neptune.object3D.position.y - uranus.object3D.position.y) / scrollScale * canvas.clientHeight;
    sizesPx.neptunePositionPx = (neptune.object3D.position.y - neptune.object3D.position.y) / scrollScale * canvas.clientHeight;
    sizesPx.tenMilKmPx = 10 / scrollScale * canvas.clientHeight;
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