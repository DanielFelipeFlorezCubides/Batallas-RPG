import { Personaje } from '../personaje.js';

export class Mago extends Personaje {
    constructor(nombre) {
        super(nombre, 'Mago', 80, 5, 5, 20);
    }

    habilidadEspecial(objetivo) {
        const danio = this.magia * 2;
        return objetivo.recibirDanio(danio);
    }
}
