import { Guerrero } from '../../models/clases/Guerrero.js';
import { Mago } from '../../models/clases/Mago.js';
import { Arquero } from '../../models/clases/Arquero.js';

export class GestorPersonajes {
    constructor() {
        this.personajes = [];
    }

    crearPersonaje(nombre, clase) {
        let nuevo;
        switch (clase.toLowerCase()) {
            case 'guerrero':
                nuevo = new Guerrero(nombre);
                break;
            case 'mago':
                nuevo = new Mago(nombre);
                break;
            case 'arquero':
                nuevo = new Arquero(nombre);
                break;
            default:
                throw new Error('Clase no válida');
        }
        this.personajes.push(nuevo);
        return nuevo;
    }

    listarPersonajes() {
        return this.personajes.map(p => `${p.nombre} (${p.clase})`);
    }

    obtenerDetalles(nombre) {
        const p = this.personajes.find(p => p.nombre === nombre);
        if (!p) return null;
        return {
            nombre: p.nombre,
            clase: p.clase,
            salud: `${p.saludActual}/${p.saludMax}`,
            fuerza: p.fuerza,
            defensa: p.defensa,
            magia: p.magia,
            inventario: p.inventario.map(obj => obj.nombre)
        };
    }
}