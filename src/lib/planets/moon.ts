import Planet, { sizes } from '../planet';


export default class Moon extends Planet {

    constructor() {

        super({
            radius : sizes.earth / 6, 
            rotationSpeed : 0.2,
            distance : sizes.earth * 3.,
            orbitingSpeed : -0.1,
            initialRotation : 15,
            textureName: "textures/2k_moon.jpg",
            nightBrightness: 0.01
        });
    }
}