import { asset } from '$app/paths';
import Planet, { distances, sizes, speeds } from '../planet';


export default class Mercury extends Planet {

    constructor() {

        super({
            radius: sizes.mercury,
            distance: distances.mercury,
            orbitingSpeed: -speeds.mercury,
            initialRotation: 17,
            rotationSpeed: 0.5,
            textureName: '/space/textures/2k_mercury.jpg'
        });
    }
}