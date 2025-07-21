export class Armadura {
    constructor(nombre, bonusDefensa) {
        this.nombre = nombre;
        this.bonusDefensa = bonusDefensa;
    }

    usar(personaje) {
        personaje.defensa += this.bonusDefensa;
    }
}
