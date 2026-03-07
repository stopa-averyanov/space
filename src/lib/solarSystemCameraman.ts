import BezierEasing from 'bezier-easing';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils.js';
import Skybox from './skybox';
import Cameraman from './cameraman';
import Slider3D from './slider3D';
import Slider from './slider';

export default class SolarSystemCameraman extends Cameraman {

    _target : THREE.Object3D;

    _sliderSpeed : number = 1;
    _distanceSlider : Slider = new Slider(0, this._sliderSpeed);
    
    _positionSlider : Slider3D = new Slider3D(new THREE.Vector3(0,0,0), this._sliderSpeed);
    _rotationXSlider : Slider = new Slider(0, this._sliderSpeed);
    _rotationZSlider : Slider = new Slider(Math.PI / 4, this._sliderSpeed);

    _exposureSlider : Slider = new Slider(0, this._sliderSpeed);

    get exposure() {
        return this._exposureSlider.value;
    }
    
    constructor(target : THREE.Object3D, distance : number) {

        super();
        
        this._target = target;
        
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

        this._target = newTarget;
        this._distanceSlider.value = distance;
        this._exposureSlider.value = exposure;
        if (rotationX !== undefined) this._rotationXSlider.value = rotationX;
        if (rotationZ !== undefined) this._rotationZSlider.value = rotationZ;
    }
    animate(delta : number) {

        const goalPosition : THREE.Vector3 = new THREE.Vector3();
        this._target.getWorldPosition(goalPosition);
        this._positionSlider.value = goalPosition;

        this._positionSlider.advance(delta);
        this._distanceSlider.advance(delta);
        this._exposureSlider.advance(delta);
        this._rotationXSlider.advance(delta);
        this._rotationZSlider.advance(delta);

        this.object3D.position.set(
            this._positionSlider.value.x,
            this._positionSlider.value.y,
            this._positionSlider.value.z
        );
        this.camera.position.z = this._distanceSlider.value;
        this.object3D.rotation.x = this._rotationXSlider.value;
        this.object3D.rotation.z = this._rotationZSlider.value;

        const guh : THREE.Vector3 = new THREE.Vector3();
        this.camera.getWorldPosition(guh);

        this.camera.updateProjectionMatrix();

        super.animate(delta);
        this._skybox._material.uniforms.uExposure.value = this._exposureSlider.value;
    }
}