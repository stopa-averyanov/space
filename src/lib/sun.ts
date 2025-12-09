import * as THREE from 'three';
import Planet from './planet';
import frag from './shaders/sunFragment.glsl?raw';
import vect from './shaders/sunVector.glsl?raw';
import Orbit from './orbit';
import type Cameraman from './cameraman';
import SolarSystemCameraman from './solarSystemCameraman';

function _sunMaterial() {
    
    return new THREE.ShaderMaterial( {

        uniforms: {
            'uTime' : { value : 0.0 },
            'uExposure' : { value : 1.0 },
            'uScale' : {value : 1.0}
        },
        vertexShader: vect,
        fragmentShader: frag
    } );
}
export default class Sun {

    _radius = 1.;
    _geometry : THREE.BufferGeometry;
    _material : THREE.ShaderMaterial;

    _rotationSpeed : number = -0.05;

    object3D : THREE.Object3D;
    _mesh : THREE.Mesh;
    
    _planets : Array<Planet>;
    _orbits : Array<Orbit>

    _renderer? : THREE.WebGLRenderer;
    _cameraman? : Cameraman;

    constructor(radius? : number) {
        
        this._planets = new Array<Planet>();
        this._orbits = new Array<Orbit>();

        this._geometry = new THREE.IcosahedronGeometry(radius !== undefined ? radius : this._radius, 30);
        this._material = _sunMaterial();
        this._mesh = new THREE.Mesh(this._geometry, this._material);

        this.object3D = new THREE.Object3D();
        this.object3D.add(this._mesh);
    }
    setRenderer(renderer : THREE.WebGLRenderer) {
        this._renderer = renderer;
    }
    setCameraman(cameraman : Cameraman) {
        this._cameraman = cameraman;
    }

    animate(delta : number) {

        this._mesh.rotation.x += delta * this._rotationSpeed;
        this._mesh.rotation.y += delta * this._rotationSpeed;

        this._planets.forEach(planet => {
            planet.animate(delta);
            planet._material.uniforms.uExposure.value = this._material.uniforms.uExposure.value;
        });
        this._orbits.forEach(orbit => {
            orbit.animate(delta);
        });

        this._material.uniforms.uTime.value += delta;

        if (this._cameraman && this._cameraman instanceof SolarSystemCameraman) {
            this._material.uniforms.uExposure.value = this._cameraman.exposure;
        }
    }

    addPlanet(planet : Planet) {

        this._planets.push(planet);
        this.object3D.add(planet.object3D);
        const orbit = new Orbit(planet._distance, 0.03);
        this._orbits.push(orbit);
        this.object3D.add(orbit.object3D);
    }

    hideOrbits() {
        this._orbits.forEach((orbit) => {
            orbit.hide();
        })
    }
    showOrbits() {
        this._orbits.forEach((orbit) => {
            orbit.show();
        })
    }
}