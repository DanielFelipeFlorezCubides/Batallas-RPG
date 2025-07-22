import { Personaje } from '../../models/Personaje.js';

export class Enemigo extends Personaje {
constructor(nombre, saludMax, fuerza, defensa, magia, clase) {
super(nombre, clase, saludMax, fuerza, defensa, magia);
}

habilidadEspecial(objetivo) {
const danio = Math.floor((this.fuerza + this.magia) * 1.5);
return objetivo.recibirDanio(danio);
}
}