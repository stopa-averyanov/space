import { Vector3 } from "three";
import Slider from "./slider";

export default class Slider3D {

    _x : Slider;
    _y : Slider;
    _z : Slider;

    set f(value : number) {
        this._x._f = Math.max(0.0001, value);
        this._y._f = Math.max(0.0001, value);
        this._z._f = Math.max(0.0001, value);
    }
    get f() { return this._x._f }

    constructor(initialValue : Vector3, speed : number) {

        this._x = new Slider(initialValue.x, speed);
        this._y = new Slider(initialValue.y, speed);
        this._z = new Slider(initialValue.z, speed);
    }

    set value(value : Vector3) {

        this._x.value = value.x;
        this._y.value = value.y;
        this._z.value = value.z;
    }
    get value() {

        return new Vector3(this._x.value, this._y.value, this._z.value);
    }

    advance(delta : number) {

        this._x.advance(delta);
        this._y.advance(delta);
        this._z.advance(delta);
    }
}