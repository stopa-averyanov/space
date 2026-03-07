export default class Slider {

    _yn : number;
    _yn_ : number = 0;
    _yn__ : number = 0;

    _yn1 : number = 0;
    _yn1_ : number = 0;

    _xn : number;
    _xn_ : number = 0;
    _xn1 : number = 0;
    _xn1_ : number = 0;
    
    _f : number;
    _zeta : number = 1;
    _r : number = 0; 

    set f(value : number) {
        this._f = Math.max(0.0001, value);
    }
    get f() { return this._f }

    constructor(initialValue : number, speed : number) {

        this._yn = initialValue;

        this._xn = initialValue;

        this._f = Math.max(0.0001, speed);
    }

    set value(value : number) {

        this._xn1 = value;
    }
    get value() {

        return this._yn;
    }

    advance(delta : number) {

        const iterations = Math.ceil(delta / 0.1);
        const t = delta / iterations;

        const k1 = this._zeta / (Math.PI * this._f);
        const k2 = 1 / Math.pow(2 * Math.PI * this._f, 2);
        const k3 = this._r * this._zeta / (2 * Math.PI * this._f);

        this._xn_ = this._xn1_;
        this._xn1_ = (this._xn1 - this._xn) / t;
        this._xn = this._xn1;

        for (let i = 0; i < iterations; i++) {

            this._yn1 = this._yn + this._yn_ * t;
            this._yn__ = (this._xn1 + k3 * this._xn1_ - this._yn1 - k1 * this._yn_) / k2;
            this._yn1_ = this._yn_ + this._yn__ * t;

            this._yn = this._yn1;
            this._yn_ = this._yn1_;
        }
    }
}