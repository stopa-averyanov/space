import { asset } from '$app/paths';
import Planet, { distances, sizes, speeds } from '../planet';


export default class Jupiter extends Planet {

    constructor() {

        super({
            radius: sizes.jupiter,
            distance: distances.jupiter,
            orbitingSpeed: -speeds.jupiter,
            initialRotation: 41,
            textureName: '/space/textures/2k_jupiter.jpg'
        });
    }
}