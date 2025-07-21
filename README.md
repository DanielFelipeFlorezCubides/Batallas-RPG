## Jugador 1 “Mario” – Sistema de Personajes, Clases y Objetos

------

### 🧩 Estructura de Archivos (Jugador 1)

```
bash


CopyEdit
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