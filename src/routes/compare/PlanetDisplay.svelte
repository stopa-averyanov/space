<script lang='ts'>
    import { asset } from '$app/paths';


const aspectRatio = 2.5;
let props : {height : number} = $props();

import Cameraman from '$lib/cameraman';
import Planet from '$lib/planet';
import { _earthMaterial } from '$lib/planets/earth';
import { _saturnRingsMaterial } from '$lib/planets/saturn';
import Sun from '$lib/sun';
import { onMount } from 'svelte';
    import { on } from 'svelte/events';
import * as THREE from 'three';


let canvas : HTMLCanvasElement;
let canvasWidth = $state(0);
let canvasHeight = $state(0);

const clock = new THREE.Clock(true);

const scene = new THREE.Scene();

const rootObject = new THREE.Object3D();

const offset = new THREE.Vector3(-2500 * 100, -4500 * 100, -2000 * 100);

rootObject.position.set(offset.x, offset.y, offset.y);

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
const ringsGeometry = new THREE.RingGeometry(6.9, 15, 256);
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


mercury._mesh.rotation.set(0, 0, 0);
mercury.object3D.rotation.x = - 0.1;
venus._mesh.rotation.set(0, 0, 0);
venus.object3D.rotation.x = - 0.1;
earth._mesh.rotation.set(0, 0, 0);
earth.object3D.rotation.x = - 0.1;
mars._mesh.rotation.set(0, 0, 0);
mars.object3D.rotation.x = - 0.1;
jupiter._mesh.rotation.set(0, 0, 0);
jupiter.object3D.rotation.x = - 0.1;
saturn._mesh.rotation.set(0, 0, 0);
saturn.object3D.rotation.x = 0.3;
uranus._mesh.rotation.set(0, 0, 0);
uranus.object3D.rotation.x = - 0.1;
neptune._mesh.rotation.set(0, 0, 0);
neptune.object3D.rotation.x = - 0.1;

rootObject.add(saturn.object3D);

const cameraman = new Cameraman();

cameraman._skybox._mesh.visible = false;

rootObject.add(cameraman.object3D);
rootObject.add(mercury.object3D);
rootObject.add(venus.object3D);
rootObject.add(earth.object3D);
rootObject.add(mars.object3D);
rootObject.add(jupiter.object3D);
rootObject.add(saturn.object3D);
rootObject.add(uranus.object3D);
rootObject.add(neptune.object3D);
scene.add(rootObject);

const cameramanDistanceRatio = 50 / 5.823;

let targetDistance = 0;
let queuedPlanet = mercury;
let queuedDistance : number | undefined = undefined;

cameraman.object3D.position.set(0, 0, 50);
cameraman.camera.fov = 14;

let renderer : THREE.WebGLRenderer;

export const planets = [
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune
]

export function queuePlanet(target : Planet, zoomRadius? : number) {
    
    queuedPlanet = target;
    canvas.classList.add('hide');

    if (zoomRadius !== undefined) queuedDistance = zoomRadius * cameramanDistanceRatio;
}
export function setPlanet(target : Planet, zoomRadius? : number) {

    queuedPlanet = target;
    planets.forEach(planet => {

        if (planet === target)
            planet.object3D.visible = true;
        else planet.object3D.visible = false;
    })
    if (zoomRadius !== undefined) {
        
        targetDistance = zoomRadius * cameramanDistanceRatio;
        cameraman.object3D.position.z = zoomRadius * cameramanDistanceRatio;
        queuedDistance = undefined;
    }
}
export function setTargetDistance(zoomRadius : number) {

    targetDistance = zoomRadius * cameramanDistanceRatio;
}
onMount(() => {
    
    renderer = new THREE.WebGLRenderer({ canvas : canvas, antialias : true, alpha:true });

    renderer.setAnimationLoop( animate );

    resize();
    
    targetDistance = jupiter._radius * cameramanDistanceRatio;
    cameraman.object3D.position.z = targetDistance;
    on(canvas, 'transitionend', () => {

        if (canvas.classList.contains('hide'))
        canvas.classList.remove('hide')
        
        if (queuedDistance !== undefined) {

            targetDistance = queuedDistance;
            cameraman.object3D.position.z = queuedDistance;
            queuedDistance = undefined;
        }
        setPlanet(queuedPlanet);
    })
    on(window, 'resize', resize);
    setPlanet(mercury);
})
function animate() {
    
    renderer.render(scene, cameraman.camera);
    
    const delta = clock.getDelta();

    mercury.object3D.rotation.y += delta * 0.07;
    venus.object3D.rotation.y += delta * 0.06;
    earth.object3D.rotation.y += delta * 0.05;
    mars.object3D.rotation.y += delta * 0.05;
    jupiter.object3D.rotation.y += delta * 0.02;
    saturn.object3D.rotation.y += delta * 0.04;
    uranus.object3D.rotation.y += delta * 0.04;
    neptune.object3D.rotation.y += delta * 0.03;

    const factor = 1 - Math.pow(0.01, delta);
    cameraman.object3D.position.z = THREE.MathUtils.lerp(cameraman.object3D.position.z, targetDistance, factor);
}
function resize() {

    const w = props.height * aspectRatio;
    const h = props.height;

    canvasWidth = w;
    canvasHeight = h;
    cameraman.resize(w, h);
    renderer.setSize( w, h, false );
}



</script>

<style>

canvas {
    pointer-events: none;
    filter: brightness(1.4);
    position: absolute;
    left: calc(-50%*calc(var(--aspect-ratio) - 1));
    transition-duration: 0.5s;
    transition-property: opacity;
    z-index: -9;
    height: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
}
.placeholder {
    max-width: 400px;
    max-height: 400px;
    width: 100%;
    display: inline;
    position: relative;
    aspect-ratio: 1;
}
:global(.hide) {
    opacity: 0;
}
</style>

<div class='placeholder'>
    <canvas bind:this={canvas} style='--heigth: {canvasHeight}px; --aspect-ratio: {aspectRatio};'></canvas>
</div>