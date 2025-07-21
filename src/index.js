import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import ora from 'ora';
// Importaciones adicionales
import { GestorPersonajes } from './services/personajes/GestorPersonajes.js';
import { Arma } from './models/objetos/Arma.js';
import { Pocion } from './models/objetos/Pocion.js';
import { Armadura } from './models/objetos/Armadura.js';

const gestor = new GestorPersonajes();
const delay = ms => new Promise(res => setTimeout(res, ms));

async function showTitle() {
    console.clear();
    const msg = figlet.textSync('Batallas RPG', { horizontalLayout: 'default' });
    console.log(gradient.rainbow.multiline(msg));
    console.log(boxen(chalk.yellow('¡Bienvenido al sistema de personajes! 🎮'), {
        padding: 1,
        borderColor: 'green',
        borderStyle: 'round',
        align: 'center'
    }));
}

async function crearPersonaje() {
    const respuestas = await inquirer.prompt([
        {
            name: 'nombre',
            message: chalk.cyan('¿Nombre del personaje?')
        },
        {
            type: 'list',
            name: 'clase',
            message: chalk.cyan('Elige una clase:'),
            choices: ['Guerrero', 'Mago', 'Arquero']
        }
    ]);

    const spinner = ora('Creando personaje...').start();
    await delay(1000);
    gestor.crearPersonaje(respuestas.nombre, respuestas.clase);
    // Obtenemos el último personaje creado
    const personaje = gestor.personajes.at(-1);
    // Poblamos el inventario con objetos de prueba
    personaje.agregarObjeto(new Arma('Espada Oxidada', 5));
    personaje.agregarObjeto(new Pocion('Poción Pequeña', 30));
    personaje.agregarObjeto(new Armadura('Escudo Viejo', 3));
    spinner.succeed(chalk.green('✅ ¡Personaje creado correctamente!'));
}

async function verPersonajes() {
    const lista = gestor.listarPersonajes();
    if (lista.length === 0) {
        console.log(chalk.red('❌ No hay personajes aún.'));
        return;
    }

    console.log(chalk.magenta('\n📜 Lista de personajes:'));
    lista.forEach((p, i) => {
        console.log(`${chalk.yellow(`#${i + 1}`)} ${p}`);
    });
}

async function verDetalles() {
    const lista = gestor.listarPersonajes();
    if (lista.length === 0) {
        console.log(chalk.red('❌ No hay personajes creados.'));
        return;
    }

    const { seleccionado } = await inquirer.prompt([
        {
            type: 'list',
            name: 'seleccionado',
            message: chalk.cyan('Selecciona un personaje:'),
            choices: lista
        }
    ]);

    const nombre = seleccionado.split(' ')[0];
    const detalles = gestor.obtenerDetalles(nombre);

    console.log(boxen(
        chalk.blueBright(`👤 ${detalles.nombre} (${detalles.clase})`) + '\n' +
        `❤️ Salud: ${detalles.salud} \n` +
        `💪 Fuerza: ${detalles.fuerza}\n` +
        `🛡️ Defensa: ${detalles.defensa}\n` +
        `✨ Magia: ${detalles.magia}\n` +
        `🎒 Inventario: ${detalles.inventario.length > 0 ? detalles.inventario.join(', ') : 'Vacío'}`,
        {
            padding: 1,
            borderColor: 'cyan',
            margin: 1,
            borderStyle: 'round'
        }
    ));
}

async function usarObjeto() {
    const lista = gestor.listarPersonajes();
    if (lista.length === 0) {
        console.log(chalk.red('❌ No hay personajes aún.'));
        return;
    }

    const { seleccionado } = await inquirer.prompt([
        {
            type: 'list',
            name: 'seleccionado',
            message: chalk.cyan('Selecciona un personaje:'),
            choices: lista
        }
    ]);

    const nombre = seleccionado.split(' ')[0];
    const personaje = gestor.personajes.find(p => p.nombre === nombre);

    if (personaje.inventario.length === 0) {
        console.log(chalk.yellow('🎒 Este personaje no tiene objetos.'));
        return;
    }

    const { objetoNombre } = await inquirer.prompt([
        {
            type: 'list',
            name: 'objetoNombre',
            message: chalk.magenta('Selecciona el objeto que deseas usar:'),
            choices: personaje.inventario.map(obj => obj.nombre)
        }
    ]);

    const index = personaje.inventario.findIndex(obj => obj.nombre === objetoNombre);
    if (index !== -1) {
        personaje.inventario[index].usar(personaje);
        personaje.inventario.splice(index, 1);
        console.log(chalk.green(`✅ ¡Objeto "${objetoNombre}" usado con éxito!`));
    }
}

async function menuPrincipal() {
    await showTitle();

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: chalk.greenBright('Selecciona una opción:'),
            choices: [
                '🆕 Crear personaje',
                '📋 Ver personajes',
                '🔍 Ver detalles de personaje',
                '🎒 Usar objeto del inventario',
                '❌ Salir'
            ]
        }
    ]);

    switch (opcion) {
        case '🆕 Crear personaje':
            await crearPersonaje();
            break;
        case '📋 Ver personajes':
            await verPersonajes();
            break;
        case '🔍 Ver detalles de personaje':
            await verDetalles();
            break;
        case '🎒 Usar objeto del inventario':
            await usarObjeto();
            break;
        case '❌ Salir':
            console.log(chalk.green('\n👋 ¡Hasta la próxima, aventurero!\n'));
            process.exit();
    }

    const { continuar } = await inquirer.prompt({
        type: 'confirm',
        name: 'continuar',
        message: '¿Volver al menú?',
        default: true
    });

    if (continuar) {
        await menuPrincipal();
    } else {
        console.log(chalk.green('\n👋 ¡Hasta la próxima, aventurero!\n'));
        process.exit();
    }

}

menuPrincipal();