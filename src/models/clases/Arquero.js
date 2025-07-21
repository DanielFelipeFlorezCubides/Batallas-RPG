import { Personaje } from '../personaje.js';

export class Arquero extends Personaje {
    constructor(nombre) {
        super(nombre, 'Arquero', 100, 12, 8, 10);
    }

    habilidadEspecial(objetivo) {
        const danio = this.fuerza + this.magia;
        return objetivo.recibirDanio(danio);
    }
}