import * as THREE from 'three';
import Sun from './sun';
import Cameraman from './cameraman';
import Earth from './planets/earth';
import Moon from './planets/moon';
import Planet from './planet';
import Saturn from './planets/saturn';
import Mercury from './planets/mercury';
import Mars from './planets/mars';
import Jupiter from './planets/jupiter';
import Uranus from './planets/uranus';
import Neptune from './planets/neptune';
import Venus from './planets/venus';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { SMAAPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js';

const clock = new THREE.Clock(true);

const scene = new THREE.Scene();

export const sun = new Sun();

export const cameraman = new Cameraman(sun.object3D, 25);

export const mercury : Mercury = new Mercury();
export const venus : Venus = new Venus();
export const earth : Earth = new Earth(cameraman.camera);
export const moon : Moon = new Moon();
export const mars : Mars = new Mars();
export const jupiter : Jupiter = new Jupiter();
export const saturn : Planet = new Saturn();
export const uranus : Uranus = new Uranus();
export const neptune : Neptune = new Neptune();

export let renderer : THREE.WebGLRenderer;
export let composer : EffectComposer;

let bloomPass : UnrealBloomPass;

let _canvas : HTMLCanvasElement;

let framesRendered = 0;

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

export async function init(canvas : HTMLCanvasElement) {

    renderer = new THREE.WebGLRenderer({ canvas : canvas, antialias : false });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass( scene, cameraman.camera );
    composer.addPass( renderPass );
    bloomPass = new UnrealBloomPass( new THREE.Vector2(2, 2), .3, 0.5, 0. );
    composer.addPass( bloomPass );
    composer.addPass( new SMAAPass());
    const outputPass = new OutputPass();
    composer.addPass( outputPass );
    _canvas = canvas;
    sun.setCameraman(cameraman);

    renderer.setAnimationLoop( animate );
}
setInterval(() => {
    // console.log(framesRendered);
    framesRendered = 0;
}, 1000)

function animate() {
    
    // renderer.render( scene, cameraman.camera );
    composer.render();

    const delta = clock.getDelta();

    sun.animate(delta);
    cameraman.animate(delta);
    // renderer.toneMappingExposure = cameraman.exposure;

    framesRendered += 1;
}
export function resize(canvas : HTMLCanvasElement) {

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
export function focusOnPlanet(planet : Planet, distance? : number, rotationY? : number) {
    
    if (distance === undefined) distance = planet._radius * 15;
    cameraman.transition(planet.object3D, distance, 1, Math.PI / 3, rotationY);
    sun.hideOrbits();
    earth.hideOrbits();
}
export function focusOnEarth() {

    const distance = earth._radius * 15;
    cameraman.transition(earth.object3D, distance, 1, Math.PI / 3, Math.PI / 6 * 2);
    sun.hideOrbits();
    earth.showOrbits();
}
export function focusOnMoon() {

    const distance = moon._radius * 15;
    cameraman.transition(moon.object3D, distance, 1, Math.PI / 3, Math.PI / 6 * 3);
    sun.hideOrbits();
    earth.hideOrbits();
}