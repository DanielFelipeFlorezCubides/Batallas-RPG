import fs from 'fs';

const PATH = './src/data/personajes.json';

export class Guardado {
    static guardar(personajes) {
        fs.writeFileSync(PATH, JSON.stringify(personajes, null, 2));
    }

    static cargar() {
        if (!fs.existsSync(PATH)) return [];
        return JSON.parse(fs.readFileSync(PATH));
    }
}