export class Pocion {
    constructor(nombre, cantidadCura) {
        this.nombre = nombre;
        this.cantidadCura = cantidadCura;
    }

    usar(personaje) {
        personaje.curar(this.cantidadCura);
    }
}
