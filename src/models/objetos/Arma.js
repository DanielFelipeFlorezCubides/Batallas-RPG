export class Arma {
    constructor(nombre, bonusAtaque) {
        this.nombre = nombre;
        this.bonusAtaque = bonusAtaque;
    }

    usar(personaje) {
        personaje.fuerza += this.bonusAtaque;
    }
}
