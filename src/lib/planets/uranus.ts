import { asset } from '$app/paths';
import Planet, { distances, sizes, speeds } from '../planet';


export default class Uranus extends Planet {

    constructor() {

        super({
            radius: sizes.uranus,
            distance: distances.uranus,
            orbitingSpeed: -speeds.uranus,
            initialRotation: 27,
            textureName: '/space/textures/2k_uranus.jpg'
        });
    }
}