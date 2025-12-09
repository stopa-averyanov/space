import * as THREE from 'three';
import earthFrag from '../shaders/earthFragment.glsl?raw';
import earthVect from '../shaders/earthVector.glsl?raw';
import Planet, { distances, sizes, speeds } from '../planet';
import Orbit from '../orbit';
import { asset } from '$app/paths';

export function _earthMaterial() {

    const loader = new THREE.TextureLoader();
    const textureDay = loader.load('/space/textures/2k_earth_daymap.jpg');
    const textureNight = loader.load('/space/textures/2k_earth_nightmap.jpg');
    const textureClouds = loader.load('/space/textures/2k_earth_clouds.jpg');
    const textureSpecular = loader.load('/space/textures/2k_earth_specular_map.jpg');
    textureClouds.wrapS = THREE.RepeatWrapping;

    return new THREE.ShaderMaterial( {

        uniforms: {
            uTime : { value : 0.0 },
            uTextureDay : { value : textureDay },
            uTextureNight : { value : textureNight },
            uTextureClouds : { value : textureClouds },
            uCameraPosition : { value : new THREE.Vector3(0., 0., 0.) },
            uExposure : { value : 1. }
        },

        vertexShader: earthVect,
        fragmentShader: earthFrag
    } );
}

export default class Earth extends Planet {

    _camera : THREE.Camera;
    constructor(camera : THREE.Camera) {

        super({
            radius : sizes.earth, 
            rotationSpeed : 0.3,
            distance : distances.earth,
            orbitingSpeed : -speeds.earth,
            initialRotation : 15
        });

        this._material = _earthMaterial();
        (this._mesh as THREE.Mesh).material = this._material;
        this._camera = camera;
    }
    
    animate(delta : number) {

        this._planets.forEach(planet => {
            planet.animate(delta)
            planet._material.uniforms.uExposure.value = this._material.uniforms.uExposure.value;
        });
        this._orbits.forEach(orbit => {
            orbit.animate(delta);
        });
        this._mesh.rotateY(delta * this._rotationSpeed);

        this._angle += delta * this._orbitingSpeed;
        
        this.object3D.position.x = Math.cos(this._angle) * this._distance;
        this.object3D.position.y = -Math.sin(this._angle) * this._distance;

        if (this._material instanceof THREE.ShaderMaterial && "uTime" in this._material.uniforms) {
            this._material.uniforms.uTime.value += delta;
            this._camera.getWorldPosition(this._material.uniforms.uCameraPosition.value);
        }
    }
}