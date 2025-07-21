import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import ora from 'ora';

import { GestorPersonajes } from './services/personajes/GestorPersonajes.js';

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
        case '❌ Salir':
            console.log(chalk.green('\n👋 ¡Hasta la próxima, aventurero!\n'));
            process.exit();
    }

    await inquirer.prompt({
        type: 'confirm',
        name: 'continuar',
        message: '¿Volver al menú?',
        default: true
    });

    await menuPrincipal();
}

menuPrincipal();