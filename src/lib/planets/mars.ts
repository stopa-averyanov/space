import { asset } from '$app/paths';
import Planet, { distances, sizes, speeds } from '../planet';


export default class Mars extends Planet {

    constructor() {

        super({
            radius: sizes.mars,
            distance: distances.mars,
            orbitingSpeed: -speeds.mars,
            initialRotation: 7.8,
            textureName: '/space/textures/2k_mars.jpg'
        });
    }
}