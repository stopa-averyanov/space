import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils.js';

function _orbitMaterial() {

    const material = new THREE.MeshBasicMaterial();
    material.transparent = true;
    return material;
}

export default class Orbit {

    _material : THREE.Material;
    object3D : THREE.Object3D;
    _mesh : THREE.Mesh;
    _geometry : THREE.BufferGeometry;    

    _targetOpacity : number = 0.0;

    constructor(radius : number, thickness : number) {

        this.object3D = new THREE.Object3D();

        this._material = _orbitMaterial();
        this._geometry = new THREE.TorusGeometry(radius, thickness, 16, 128);

        this._material.opacity = 0.0;
        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this.object3D.add(this._mesh);
    }
    animate(delta : number) {

        const interpolationFactor = 0.1;
        const interpolationFactorAdjusted = 1 - Math.pow(interpolationFactor, delta);

        this._material.opacity = lerp(this._material.opacity, this._targetOpacity, interpolationFactorAdjusted);
        if (this._material.opacity <= 0.01) {
            this._material.visible = false;
        }
        else this._material.visible = true;
    }
    hide() {

        this._targetOpacity = 0;
    }
    show() {

        this._targetOpacity = 0.1;
    }
}