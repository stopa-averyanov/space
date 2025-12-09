import BezierEasing from 'bezier-easing';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils.js';
import Skybox from './skybox';
import Cameraman from './cameraman';

export default class SolarSystemCameraman extends Cameraman {

    _target : THREE.Object3D;
    distanceToTarget : number;

    exposure : number = 1.0;
    _rotationX : number = 0.0;
    _rotationZ : number = Math.PI / 4;

    _transitionLength : number = 2;
    _transitionRemains : number = 0;

    _oldTargetPosition : THREE.Vector3;
    _oldDistance : number;
    _oldExposure : number = 1.0;
    _oldRotationX : number = 0;
    _oldRotationY : number = 0;
    _exposure : number = 1.0;


    _easingFunction : BezierEasing.EasingFunction = BezierEasing(0.3,0,.2,1);

    constructor(target : THREE.Object3D, distance : number) {

        super();
        
        this._target = target;
        this._oldTargetPosition = new THREE.Vector3();
        this._target.getWorldPosition(this._oldTargetPosition);
        this.distanceToTarget = distance;
        this._oldDistance = this.distanceToTarget;
        
        this.camera.position.z = distance;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.object3D.add(this.camera);
        this.object3D.rotation.order = 'ZXY';
    }
    resize(width : number, height : number) {

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
    transition(newTarget : THREE.Object3D, distance : number, exposure : number, rotationX? : number, rotationZ? : number) {

        this.object3D.getWorldPosition(this._oldTargetPosition);
        this._oldDistance = this.camera.position.z;
        this.distanceToTarget = distance;
        this._target = newTarget;
        this._oldExposure = this.exposure;
        this._exposure = exposure;

        if (rotationX !== undefined) {
            this._oldRotationX = this.object3D.rotation.x;
            this._rotationX = rotationX;
        }
        
        if (rotationZ !== undefined) {
            this._oldRotationY = this.object3D.rotation.z;
            this._rotationZ = rotationZ;
        }

        this._transitionRemains = this._transitionLength;
    }
    animate(delta : number) {

        const goalPosition : THREE.Vector3 = new THREE.Vector3();
        this._target.getWorldPosition(goalPosition);

        this._transitionRemains -= delta;
        if (this._transitionRemains < 0) {
            
            this._transitionRemains = 0;

            this.object3D.position.set(goalPosition.x, goalPosition.y, goalPosition.z);
            this.camera.position.z = this.distanceToTarget;
            this.exposure = this._exposure;
            this.object3D.rotation.x = this._rotationX;
            this.object3D.rotation.z = this._rotationZ;
        }
        else {

            const factor = 1 - (this._transitionRemains / this._transitionLength);
            const easedFactor = this._easingFunction(factor);
            this.object3D.position.lerpVectors(this._oldTargetPosition, goalPosition, easedFactor);
            this.camera.position.z = lerp(this._oldDistance, this.distanceToTarget, easedFactor);
            this.exposure = lerp(this._oldExposure, this._exposure, easedFactor);
            this.object3D.rotation.x = lerp(this._oldRotationX, this._rotationX, easedFactor);
            this.object3D.rotation.z = lerp(this._oldRotationY, this._rotationZ, easedFactor);
        }

        const guh : THREE.Vector3 = new THREE.Vector3();
        this.camera.getWorldPosition(guh);

        this.camera.updateProjectionMatrix();

        super.animate(delta);
        this._skybox._material.uniforms.uExposure.value = this.exposure;
    }
}