import * as THREE from "three";
import starFrag from './shaders/starFragment.glsl?raw';
import starVect from './shaders/starVector.glsl?raw';
import { asset } from "$app/paths";

export default class Skybox {

    _radius : number;
    _far_plane : number;

    object3D : THREE.Object3D;
    _mesh : THREE.Mesh;
    _material : THREE.ShaderMaterial;
    
    constructor() {

        const loader = new THREE.TextureLoader();
        const texture = loader.load('/space/textures/8k_stars_milky_way.png');

        this._radius = 300;
        this._far_plane = 900;
        
        this.object3D = new THREE.Object3D;
        
        this._material = 
            new THREE.ShaderMaterial({
                uniforms : {
                    uTexture : { value : texture },
                    uExposure : { value : 1. }
                },
                fragmentShader: starFrag,
                vertexShader: starVect,
                side: THREE.BackSide
            });
        this._mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this._radius, 30, 30),
            this._material
        )
        this._mesh.rotateX(-Math.PI / 4);
        this.object3D.position.z = -(this._far_plane - this._radius);
        this.object3D.add(this._mesh);
        this.object3D.rotation.order = 'YXZ';
    }
}