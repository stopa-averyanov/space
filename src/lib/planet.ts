import * as THREE from 'three';
import Orbit from './orbit';
import planetFrag from './shaders/planetFragment.glsl?raw';
import planetVect from './shaders/planetVector.glsl?raw';

export const distances = {

    mercury : 0.39,
    venus : 0.72,
    earth : 1,
    mars : 1.52,
    jupiter : 5.2,
    saturn : 9.54,
    uranus : 19.2,
    neptune : 30.6
};
export const sizes = {

    mercury : 4879,
    venus : 12104,
    earth : 12756,
    mars : 6792,
    jupiter : 142984,
    saturn : 120536,
    uranus: 51118,
    neptune : 49528
}
export const speeds = {

    mercury : 47.87,
    venus : 35.02,
    earth : 29.78,
    mars : 24.07,
    jupiter : 13.07,
    saturn : 9.69,
    uranus : 6.81,
    neptune : 5.43,
}
Object.entries(distances).forEach((entry) => {

    // (distances as any)[entry[0]] = THREE.MathUtils.lerp((entry[1] - 0.39) / 30.21, 0.39, 30.6);
    const min = 3;
    const max = 40;
    const factor = (entry[1] - 0.39) / 30.21;
    (distances as any)[entry[0]] = THREE.MathUtils.lerp(min, max, Math.pow(factor, 0.5));
});

Object.entries(sizes).forEach((entry) => {

    // (distances as any)[entry[0]] = THREE.MathUtils.lerp((entry[1] - 0.39) / 30.21, 0.39, 30.6);
    const min = 0.05;
    const max = 0.3;
    const factor = (entry[1] - 4879) / 142984;
    (sizes as any)[entry[0]] = THREE.MathUtils.lerp(min, max, Math.pow(factor, 0.7));
});

Object.entries(speeds).forEach((entry) => {

    // (distances as any)[entry[0]] = THREE.MathUtils.lerp((entry[1] - 0.39) / 30.21, 0.39, 30.6);
    const min = 0.01;
    const max = 0.05;
    const factor = (entry[1] - 5.43) / 47.87;
    (speeds as any)[entry[0]] = THREE.MathUtils.lerp(min, max, Math.pow(factor, 0.7));
});

function _planetMaterial(textureName? : string, nightBrightness? : number, color? : THREE.Vector3) {

    const loader = new THREE.TextureLoader();

    const material = new THREE.ShaderMaterial( {

        uniforms: {
            uTexture : {
                value : undefined
            },
            uTextureAvailable : {
                value : 0
            },
            uColor : {
                value : new THREE.Vector3(1., 1., 1.)
            },
            uNightBrightness : {
                value : nightBrightness ?? 0.01
            },
            uExposure : {
                value : 1.
            }
        },

        vertexShader: planetVect,
        fragmentShader: planetFrag
    } );
    if (textureName !== undefined) loader.loadAsync(textureName).then((texture) => {
        material.uniforms.uTexture.value = texture;
        material.uniforms.uTextureAvailable.value = 1;
    })
    return material;
}
export default class Planet {

    _radius : number = 1.;
    _geometry : THREE.BufferGeometry;
    _material : THREE.ShaderMaterial;

    _rotationSpeed : number = -0.5;

    object3D : THREE.Object3D;

    _distance : number = 3;
    _orbitingSpeed : number = 1;

    _angle : number = 0;

    _planets : Array<Planet>;
    _orbits : Array<Orbit>

    _mesh : THREE.Mesh;

    constructor(params?: { 
        radius? : number, 
        rotationSpeed? : number,
        distance? : number,
        orbitingSpeed? : number,
        initialRotation? : number,
        textureName? : string,
        nightBrightness? : number
    }) {

        this._radius = params?.radius ?? this._radius;
        this._rotationSpeed = params?.rotationSpeed ?? this._rotationSpeed;
        this._distance = params?.distance ?? this._distance;
        this._orbitingSpeed = params?.orbitingSpeed ?? this._orbitingSpeed;

        this._geometry = new THREE.IcosahedronGeometry(this._radius, 18);
        this._material = _planetMaterial(params?.textureName, params?.nightBrightness);
        this.object3D = new THREE.Object3D();
        this._mesh = new THREE.Mesh(this._geometry, this._material);

        this.object3D.add(this._mesh);

        this.object3D.position.x = this._distance;
        this._mesh.rotation.x = (Math.PI / 2) * 0.9;

        this._planets = new Array<Planet>();
        this._orbits = new Array<Orbit>();

        if (params?.initialRotation) {
            this._angle = params.initialRotation;
            this.animate(0);
        }
    }

    animate(delta : number) {

        this._planets.forEach(planet => {
            planet.animate(delta)
        });
        this._orbits.forEach(orbit => {
            orbit.animate(delta);
        });

        this._mesh.rotateY(delta * this._rotationSpeed);

        this._angle += delta * this._orbitingSpeed;
        
        this.object3D.position.x = Math.cos(this._angle) * this._distance;
        this.object3D.position.y = -Math.sin(this._angle) * this._distance;
    }

    addPlanet(planet : Planet) {

        this._planets.push(planet);
        this.object3D.add(planet.object3D);
        const orbit = new Orbit(planet._distance, 0.0005);
        this._orbits.push(orbit);
        this.object3D.add(orbit.object3D);
    }

    hideOrbits() {
        this._orbits.forEach((orbit) => {
            orbit.hide();
        })
    }
    showOrbits() {
        this._orbits.forEach((orbit) => {
            orbit.show();
        })
    }
};