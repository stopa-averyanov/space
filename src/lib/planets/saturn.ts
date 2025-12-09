import * as THREE from 'three';
import Planet, { distances, sizes, speeds } from '../planet';
import { asset } from '$app/paths';

export function _saturnRingsMaterial() {

    const loader = new THREE.TextureLoader();
    const texture = loader.load('/space/textures/2k_saturn_ring_alpha.png');

    const white = new THREE.Color().setRGB(1., 1., 1.);
    const saturnYellow = new THREE.Color().setRGB(0.55, 0.51, 0.43)

    return new THREE.MeshBasicMaterial({
        map : texture,
        transparent : true,
        opacity: 0.4,
        color: white.lerp(saturnYellow, 0.8)
    });
}

export default class Saturn extends Planet {

    _rings : THREE.Mesh;

    constructor() {

        super({
            radius: sizes.saturn,
            distance: distances.saturn,
            orbitingSpeed: -speeds.saturn,
            initialRotation: 28.5,
            textureName: '/space/textures/2k_saturn.jpg'
        });

        const geometry = new THREE.RingGeometry(this._radius * 1.25, this._radius * 2.5, 256);
        var pos = geometry.attributes.position;
        var v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++){
            v3.fromBufferAttribute(pos, i);
            geometry.attributes.uv.setXY(i, v3.length() < this._radius * 1.75 ? 0 : 1, 1);
        }

        this._rings = new THREE.Mesh(
            geometry,
            _saturnRingsMaterial()
        )
        this._rings.rotateY(0.1);
        this.object3D.add(this._rings);
    }
}