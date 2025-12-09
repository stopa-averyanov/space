import BezierEasing from 'bezier-easing';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils.js';
import Skybox from './skybox';
import Cameraman from './cameraman';

export default class ScrollableStarsCameraman extends Cameraman {

    constructor() {

        super();
    }
    animate(delta : number) {

        super.animate(delta);
    }
}