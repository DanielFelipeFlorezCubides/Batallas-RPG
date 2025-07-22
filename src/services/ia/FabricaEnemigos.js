import { Enemigo } from './Enemigo.js';

export class FabricaEnemigos {
    static generarAleatorio() {
        const tipo = Math.floor(Math.random() * 3);

        switch (tipo) {
            case 0:
                return new Enemigo('Goomba', 60, 30, 2, 0, 'Bestia');
            case 1:
                return new Enemigo('Koopa', 90, 15, 7, 0, 'Tortuga');
            case 2:
                return new Enemigo('Magikoopa', 70, 12, 6, 17, 'Hechicero');
        }
    }
}