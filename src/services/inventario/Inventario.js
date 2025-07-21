export class Inventario {
    constructor() {
        this.objetos = [];
    }

    agregar(objeto) {
        this.objetos.push(objeto);
    }

    usar(nombreObjeto, personaje) {
        const index = this.objetos.findIndex(o => o.nombre === nombreObjeto);
        if (index !== -1) {
            this.objetos[index].usar(personaje);
            this.objetos.splice(index, 1);
        }
    }

    listar() {
        return this.objetos.map(obj => obj.nombre);
    }
}