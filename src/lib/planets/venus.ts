import { asset } from '$app/paths';
import Planet, { distances, sizes, speeds } from '../planet';


export default class Venus extends Planet {

    constructor() {

        super({
            radius: sizes.venus,
            distance: distances.venus,
            orbitingSpeed: -speeds.venus,
            initialRotation: 16,
            textureName: '/space/textures/2k_venus.jpg'
        });
    }
}