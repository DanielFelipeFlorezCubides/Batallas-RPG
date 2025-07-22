export class Batalla {
    constructor(jugador, enemigo) {
        this.jugador = jugador;
        this.enemigo = enemigo;
        this.turno = 'jugador';
        this.registro = [];
    }

    log(mensaje) {
        this.registro.push(mensaje);
        console.log(mensaje);
    }

    turnoJugador(accion) {

        if (accion === 'atacar') {
            const danio = this.jugador.fuerza;
            const recibido = this.enemigo.recibirDanio(danio);
            this.log(`👊 ${this.jugador.nombre} ataca e inflige ${recibido} de daño a ${this.enemigo.nombre}`);
        } 

        else if (accion === 'habilidad') {
            const recibido = this.jugador.habilidadEspecial(this.enemigo);
            this.log(`✨ ${this.jugador.nombre} usa su habilidad especial causando ${recibido} de daño.`);
        } 

        else {
            this.log("🛑 Acción inválida del jugador.");
        }

        this.turno = 'enemigo';
    }

    turnoEnemigo() {
        const accion = Math.random() < 0.7 ? 'atacar' : 'especial';

        if (accion === 'atacar') {
            const danio = this.enemigo.fuerza;
            const recibido = this.jugador.recibirDanio(danio);
            this.log(`💢 ${this.enemigo.nombre} ataca e inflige ${recibido} a ${this.jugador.nombre}`);
        } 

        else {
            const recibido = this.enemigo.habilidadEspecial(this.jugador);
            this.log(`🔥 ${this.enemigo.nombre} lanza un ataque especial causando ${recibido} de daño.`);
        }
        this.turno = 'jugador';
    }

    estaFinalizada() {
    return this.jugador.saludActual <= 0 || this.enemigo.saludActual <= 0;
    }

    obtenerGanador() {
        if (this.jugador.saludActual <= 0) return this.enemigo.nombre;
        if (this.enemigo.saludActual <= 0) return this.jugador.nombre;
        return null;
    }
}