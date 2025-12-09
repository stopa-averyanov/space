import BezierEasing from 'bezier-easing';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils.js';
import Skybox from './skybox';

export default class Cameraman {

    object3D : THREE.Object3D;
    camera : THREE.PerspectiveCamera;

    _skybox : Skybox;

    constructor() {

        this.object3D = new THREE.Object3D();
        this.camera = new THREE.PerspectiveCamera(20, 16 / 9, 0.1, 1000);
        
        this.object3D.add(this.camera);

        this._skybox = new Skybox();
        this.camera.add(this._skybox.object3D);
        this.object3D.rotation.order = 'ZXY';
    }
    resize(width : number, height : number) {

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
    animate(delta : number) {

        const cameraman_euler = this.object3D.rotation;

        const cameraman_euler_vec3 = new THREE.Vector3();
        cameraman_euler_vec3.setFromEuler(cameraman_euler);

        const skybox_euler_vec3 = new THREE.Vector3(0, 0, 0).sub(cameraman_euler_vec3);
        const skybox_euler = new THREE.Euler();
        skybox_euler.setFromVector3(skybox_euler_vec3);

        this._skybox.object3D.setRotationFromEuler(skybox_euler);
    }
}