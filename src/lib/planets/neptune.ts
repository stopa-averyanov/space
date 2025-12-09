import Planet, { distances, sizes, speeds } from '../planet';


export default class Neptune extends Planet {

    constructor() {

        super({
            radius: sizes.neptune,
            distance: distances.neptune,
            orbitingSpeed: -speeds.neptune,
            initialRotation: 27.5,
            textureName: '/space/textures/2k_neptune.jpg'
        });
    }
}