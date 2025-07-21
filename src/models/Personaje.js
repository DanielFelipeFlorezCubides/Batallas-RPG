export class Personaje {
    constructor(nombre, clase, saludMax, fuerza, defensa, magia) {
        this.nombre = nombre;
        this.clase = clase;
        this.saludMax = saludMax;
        this.saludActual = saludMax;
        this.fuerza = fuerza;
        this.defensa = defensa;
        this.magia = magia;
        this.nivel = 1;
        this.experiencia = 0;
        this.inventario = [];
    }

    recibirDanio(cantidad) {
        const danio = Math.max(0, cantidad - this.defensa);
        this.saludActual = Math.max(0, this.saludActual - danio);
        return danio;
    }

    curar(cantidad) {
        this.saludActual = Math.min(this.saludMax, this.saludActual + cantidad);
    }

    subirNivel() {
        this.nivel++;
        this.saludMax += 10;
        this.fuerza += 2;
        this.defensa += 2;
        this.magia += 1;
        this.saludActual = this.saludMax;
    }

    usarObjeto(objeto) {
        objeto.usar(this);
    }

    agregarObjeto(objeto) {
        this.inventario.push(objeto);
    }
}  