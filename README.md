## Jugador 1 “Mario” – Sistema de Personajes, Clases y Objetos

------

### 🧩 Estructura de Archivos (Jugador 1)

```
src/
├── models/
│   ├── Personaje.js
│   ├── clases/
│   │   ├── Guerrero.js
│   │   ├── Mago.js
│   │   └── Arquero.js
│   └── objetos/
│       ├── Arma.js
│       ├── Armadura.js
│       └── Pocion.js
├── services/
│   ├── personajes/
│   │   └── GestorPersonajes.js
│   └── inventario/
│       └── Inventario.js
```

------

### 🎮 Objetivo de este módulo

Este módulo define el **núcleo RPG del juego**, implementando el sistema de personajes jugables, clases con habilidades especiales, y un inventario funcional.

------

## 🧙‍♂️ Clases principales

------

### `Personaje.js` (Clase base)

Clase abstracta que representa a cualquier personaje jugable, incluyendo atributos como:

- `nombre`, `clase`, `salud`, `fuerza`, `defensa`, `magia`, `nivel`, `inventario`
- Métodos como `recibirDanio()`, `curar()`, `usarObjeto()`, `subirNivel()`

------

### Subclases de personaje (`clases/`)

| Clase      | Habilidad Especial            | Stats destacados    |
| ---------- | ----------------------------- | ------------------- |
| `Guerrero` | Ataque físico x2              | Alta fuerza y salud |
| `Mago`     | Hechizo mágico x2             | Alta magia          |
| `Arquero`  | Ataque combinado fuerza+magia | Equilibrado         |



Cada clase extiende `Personaje` y redefine el método `habilidadEspecial()`.

------

## 🧰 Sistema de Inventario (`Inventario.js`)

Permite:

- `agregar(objeto)` → Añadir objeto al inventario
- `usar(nombreObjeto)` → Usar y remover objeto
- `listar()` → Mostrar objetos disponibles

------

## 🎁 Tipos de Objetos (`objetos/`)

- **`Arma`**: Aumenta fuerza
- **`Armadura`**: Aumenta defensa
- **`Pocion`**: Restaura salud

Todos implementan el método `usar(personaje)` que modifica los atributos del personaje directamente.

------

## 👤 Gestión de Personajes (`GestorPersonajes.js`)

Permite:

- Crear personajes (`crearPersonaje(nombre, clase)`)
- Listar personajes
- Ver detalles con estadísticas e inventario

------

## ✅ Aplicación de Principios SOLID

| Principio | Aplicación Concreta                                          |
| --------- | ------------------------------------------------------------ |
| SRP       | Cada clase tiene un único propósito (ej. personaje, inventario, creación). |
| OCP       | Pueden añadirse nuevas clases (como `Hechicero`, `Clérigo`) sin tocar código existente. |
| LSP       | Todas las subclases funcionan como `Personaje` y pueden usarse en su lugar. |
| ISP       | Cada clase solo implementa lo que necesita (no hay métodos innecesarios). |
| DIP       | Este módulo está listo para que la lógica de batalla dependa de interfaces tipo `IAtaque`, etc. |



------

## 🎬 Interfaz por consola

Luigi usará este módulo en el flujo general del juego (ver personajes, seleccionar, iniciar combate).

------

## 📌 Dependencias

- Usa módulos ES (`import/export`)
- Requiere `inquirer` (para menú, en `main.js`)
- No requiere BD, guarda todo en memoria (o archivos JSON si se extiende)

![Diagrama UML primera parte](./Diagrama%20UML%20-%20Primera%20parte.png)

--- 

# 🧙‍♂️ Parte 2 – Luigi: Sistema de Batalla, Enemigos y Flujo

Este módulo implementa el sistema de combate del juego RPG, incluyendo enemigos generados por IA, lógica de turnos y la ejecución del flujo principal del juego en consola.

---

## 📁 Estructura de Archivos
```
src/

├── index.js                        # Flujo principal del juego y menú
├── services/
│   ├── batalla/
│   │   └── Batalla.js              # Lógica de combate por turnos
│   ├── ia/
│   │   ├── Enemigo.js              # Clase Enemigo que extiende Personaje
│   │   └── FabricaEnemigos.js     # Generador aleatorio de enemigos
```
---

## ⚔️ Funcionalidades

✔ Combate por turnos entre un personaje y un enemigo

✔ IA que responde automáticamente luego del turno del jugador

✔ Enemigos con fuerza, magia y habilidades

✔ Finalización de batalla y anuncio del ganador

✔ Compatible con sistema de personajes de Mario (Jugador 1)

---

## 🔄 Flujo de Combate

1. El usuario selecciona “⚔️ Iniciar batalla” en el menú.
2. Elige un personaje creado previamente.
3. Se genera un enemigo aleatorio (Goomba, Koopa, Magikoopa).
4. Turno del jugador: ataca o usa habilidad.
5. Turno automático del enemigo.
6. El ciclo se repite hasta que alguien pierde toda su salud.
7. Se muestra al ganador.

---

## 👾 IA de Enemigos

- Controlada por lógica aleatoria (70% ataque básico, 30% habilidad especial).
- Se puede extender a lógica más compleja (comportamientos según salud o defensa).
- Habilidad especial inflige daño adicional basado en fuerza + magia.

---

## 🧠 Principios SOLID aplicados

| Principio | Aplicación |
| --- | --- |
| SRP | Batalla, Enemigo y Fábrica cumplen funciones únicas. |
| OCP | Se pueden agregar nuevos tipos de enemigos sin tocar los existentes. |
| LSP | Enemigo se comporta como Personaje. |
| ISP | Clases no dependen de métodos que no usan. |
| DIP | Batalla depende de Personaje y Enemigo como abstracciones. |

---

## 🧬 Diagrama UML

📷 Puedes ver el diagrama aquí: ![alt text](<Diagrama UML - Segunda parte.png>)


---

## 🛠️ Mejoras futuras

- Sistema de experiencia y niveles al ganar batallas
- Soporte para múltiples enemigos y personajes en combate
- Implementación de estados (veneno, aturdimiento, etc.)
- Persistencia de personajes e inventario con JSON o lowdb

---

🎮 Proyecto desarrollado en Node.js con módulos ES y herramientas de consola como Inquirer, Chalk y Figlet.