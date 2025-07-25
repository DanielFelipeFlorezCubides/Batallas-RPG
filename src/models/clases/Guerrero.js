import { Personaje } from '../personaje.js';

export class Guerrero extends Personaje {
    constructor(nombre) {
        super(nombre, 'Guerrero', 120, 15, 10, 5);
    }

    habilidadEspecial(objetivo) {
        const danio = this.fuerza * 2;
        return objetivo.recibirDanio(danio);
    }
}