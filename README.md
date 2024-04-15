[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-MariamLaaroussiRamos/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-MariamLaaroussiRamos?branch=main)
# Práctica 10 - Aplicación cliente-servidor para coleccionistas de cartas Magic #
## Introducción #
En la Práctica 10 del curso Desarrollo de Sistemas Informáticos del Grado en Ingeniería Informática en la ULL, se aborda la implementación de una aplicación cliente-servidor para coleccionistas de cartas Magic. Este proyecto extiende el trabajo realizado en la Práctica 9, ahora utilizando sockets proporcionados por el módulo net de Node.js para la comunicación entre cliente y servidor.

## Objetivo ##
El objetivo principal es permitir a los usuarios gestionar sus colecciones de cartas Magic a través de una interfaz de línea de comandos. El servidor se encarga de almacenar la información de las cartas en archivos JSON en el sistema de archivos, mientras que el cliente interactúa con el servidor para realizar operaciones como añadir, modificar, eliminar, listar y mostrar cartas en la colección de un usuario.

## card.ts ##
Se trata de la estructura básica del programa.
Enumeraciones:
CardType: Enumera los posibles tipos de carta, como Tierra, Criatura, Encantamiento, etc.
CardColor: Enumera los posibles colores de una carta, como Blanco, Azul, Negro, etc.
CardRarity: Enumera las posibles rarezas de una carta, como Común, Infrecuente, Rara, etc.
```
export enum CardType {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

/**
 * Enumeración que define los posibles colores de una carta.
 */
export enum CardColor {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}

/**
 * Enumeración que define las posibles rarezas de una carta.
 */
export enum CardRarity {
  Comun = "Común",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mítica"
}
```
Clase Card:

Representa una carta del juego con propiedades como id, name, cost, color, cardType, rarity, rulesText, power, toughness, loyalty, y marketValue.
constructor: Método para crear una nueva instancia de la carta, inicializando sus propiedades con los valores proporcionados.
```
export class Card {
  id: number;
  name: string;
  cost: number;
  color: string;
  cardType: string;
  rarity: string;
  rulesText: string;
  power?: number;
  toughness?: number;
  loyalty?: number;
  marketValue: number;

  constructor(
    id: number,
    name: string,
    cost: number,
    color: string,
    cardType: string,
    rarity: string,
    rulesText: string,
    marketValue: number,
    power?: number,
    toughness?: number,
    loyalty?: number
  ) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.color = color;
    this.cardType = cardType;
    this.rarity = rarity;
    this.rulesText = rulesText;
    this.marketValue = marketValue;
    this.power = power;
    this.toughness = toughness;
    this.loyalty = loyalty;
  }
```
Propiedades de la clase Card:

id: Identificador único de la carta.
name: Nombre de la carta.
cost: Costo de la carta.
color: Color de la carta (de la enumeración CardColor).
cardType: Tipo de carta (de la enumeración CardType).
rarity: Rareza de la carta (de la enumeración CardRarity).
rulesText: Texto de las reglas de la carta.
power: Poder de la carta (solo para criaturas).
toughness: Resistencia de la carta (solo para criaturas).
loyalty: Lealtad de la carta (solo para planeswalkers).
marketValue: Valor de mercado de la carta.

## cardCollection.ts ##
Importaciones:
chalk: Esta biblioteca permite dar color al texto en la consola. Se utiliza para resaltar mensajes importantes en la salida de la aplicación.
Card y FileManager: Se importan las clases Card y FileManager desde sus respectivos archivos para ser utilizadas en esta clase.
fs: Este módulo es parte del sistema de archivos de Node.js y se utiliza para realizar operaciones relacionadas con archivos, como eliminar archivos físicos.
Clase CardCollection:
Propiedad privada collection: Es un array que almacena instancias de la clase Card. Representa la colección de cartas gestionada por esta clase.
Constructor:

Recibe una instancia de FileManager para manejar la carga y guardado de la colección desde y hacia el sistema de archivos.
Al inicializar la clase, carga la colección desde el archivo utilizando el método load de FileManager.
Métodos públicos:

addCard: Agrega una nueva carta a la colección verificando primero si ya existe una carta con el mismo ID.
updateCard: Modifica una carta existente en la colección basándose en su ID.
removeCard: Elimina una carta de la colección por su ID, también elimina físicamente el archivo asociado a esa carta.
listCards: Muestra en consola los ID y nombres de todas las cartas en la colección.
showCard: Muestra los detalles de una carta específica según su ID.
getCardById: Obtiene una carta de la colección por su ID.

```
import chalk from 'chalk';
import { Card } from './card.js';
import { FileManager } from './fileManager.js';
import * as fs from 'fs';

export class CardCollection {
  private collection: Card[];

  constructor(private fileManager: FileManager) {
    this.collection = fileManager.load();
  }

  public addCard(card: Card): void {
    const existingCard = this.getCardById(card.id);
    if (existingCard) {
      console.log(chalk.red('Error: A card with the same ID already exists.'));
    } else {
      this.collection.push(card);
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card added successfully!'));
    }
  }

  public updateCard(updatedCard: Card): void {
    const index = this.collection.findIndex(card => card.id === updatedCard.id);
    if (index !== -1) {
      this.collection[index] = updatedCard;
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card modified successfully!'));
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  public removeCard(cardId: number): void {
    console.log('Removing card with ID:', cardId);
    const index = this.collection.findIndex(card => card.id === cardId);
    console.log('Card index:', index);
    if (index !== -1) {
      const cardToRemove = this.collection[index];
      const filePath = this.fileManager.getFilePath(cardToRemove.id);
      fs.unlinkSync(filePath);
      this.collection.splice(index, 1);
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card removed successfully!'));
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  public listCards(): void {
    for (const card of this.collection) {
      console.log(`Card ID: ${card.id}, Name: ${card.name}`);
    }
  }

  public showCard(cardId: number): void {
    const card = this.getCardById(cardId);
    if (card) {
      console.log(chalk.green('Card Details:'));
      console.log('ID:', card.id);
      console.log('Name:', card.name);
      console.log('Cost:', card.cost);
      console.log('Color:', card.color);
      console.log('Type:', card.cardType);
      console.log('Rarity:', card.rarity);
      console.log('Rules Text:', card.rulesText);
      console.log('Market Value:', card.marketValue);
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  public getCardById(cardId: number): Card | undefined {
    return this.collection.find(card => card.id === cardId);
  }
}
```

## fileManager.ts ##
Este se encarga de gestionar la interacción con el sistema de archivos para las cartas de usuario en una aplicación de colección de cartas. 
En primer lugar:
Se importa el módulo fs de Node.js para trabajar con el sistema de archivos.
Se importa la clase Card desde el archivo card.js para manipular objetos de tipo carta.
```
import * as fs from 'fs'; // Módulo File System de Node.js para trabajar con archivos
import { Card } from './card.js'; // Importamos la clase Card del archivo card.js
```
Clase FileManager:
```
export class FileManager {
  private userDir: string; // Directorio del usuario

  constructor(private username: string) {
    this.userDir = `./src/users/${this.username}`;
    this.createUserDirIfNotExists();
  }

  private createUserDirIfNotExists(): void {
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
  }

  public getFilePath(cardId: number): string {
    return `${this.userDir}/card${cardId}.json`;
  }

  public save(collection: Card[]): void {
    for (const card of collection) {
      const filePath = this.getFilePath(card.id);
      fs.writeFileSync(filePath, JSON.stringify(card, null, 2));
    }
  }

  public load(): Card[] {
    const files = fs.readdirSync(this.userDir);
    const collection: Card[] = [];
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = `${this.userDir}/${file}`;
        try {
          const data = fs.readFileSync(filePath, 'utf-8');
          const card = JSON.parse(data) as Card;
          collection.push(card);
        } catch (error) {
          console.error(`Error loading card from ${filePath}: ${error.message}`);
        }
      }
    }
    return collection;
  }
}
```
Constructor:

Recibe el nombre de usuario para identificar la carpeta de almacenamiento de las cartas.
Crea el directorio del usuario si no existe mediante createUserDirIfNotExists.
Método createUserDirIfNotExists:

Comprueba si el directorio del usuario existe.
Si no existe, lo crea de forma recursiva usando fs.mkdirSync.
Método getFilePath:

Genera la ruta de archivo para una carta específica basada en su ID.
Método save:

Guarda la colección de cartas en archivos JSON en el sistema de archivos.
Itera sobre cada carta en la colección, obtiene su ruta de archivo y escribe el archivo JSON.
Método load:

Carga las cartas almacenadas en archivos JSON desde el sistema de archivos.
Lee los archivos en el directorio del usuario y los convierte en objetos Card.
Maneja errores al cargar cartas y los muestra en la consola.

## index.ts ##
Configuración del yargs:
```
yargs(hideBin(process.argv))
```
Configuro yargs para trabajar con los argumentos pasados desde la línea de comandos.

Comandos y Argumentos:
Se definen varios comandos (add, update, remove, list, show) junto con sus argumentos correspondientes utilizando el método .command() de yargs.
```
  .command('add', 'Adds a card to the collection', {
    id: { 
      description: 'Card ID', 
      type: 'number', 
      demandOption: true 
    },
    name: { 
      description: 'Card Name', 
      type: 'string', 
      demandOption: true 
    },
    cost: { 
      description: 'Cost', 
      type: 'number', 
      demandOption: true 
    },
    color: { 
      description: 'Card Color', 
      type: 'string', 
      choices: Object.values(CardColor), 
      demandOption: true 
    },
    type: { 
      description: 'Card Type', 
      type: 'string', 
      choices: Object.values(CardType), 
      demandOption: true 
    },
    rarity: { 
      description: 'Card Rarity', 
      type: 'string', 
      choices: Object.values(CardRarity), 
      demandOption: true 
    },
    rulesText: { 
      description: 'Rules Text', 
      type: 'string', 
      demandOption: true 
    },
    marketValue: { 
      description: 'Market Value', 
      type: 'number', 
      demandOption: true 
    },
    power: { 
      description: 'Card Power', 
      type: 'number' 
    },
    toughness: { 
      description: 'Card Toughness', 
      type: 'number' 
    },
    loyalty: { 
      description: 'Card Loyalty', 
      type: 'number' 
    },
  }, (argv) => {
    const USERNAME: string = argv.user as string; // Obtener el nombre de usuario como string
    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    const newCard = new Card(
      argv.id,
      argv.name,
      argv.cost,
      argv.color,
      argv.type,
      argv.rarity,
      argv.rulesText,
      argv.marketValue,
      argv.power,
      argv.toughness,
      argv.loyalty
    );
    cardCollection.addCard(newCard);
  })
  // Comando 'update' para modificar una carta en la colección
  .command('update', 'Modifies a card in the collection', {
    id: { 
      description: 'Card ID', 
      type: 'number', 
      demandOption: true 
    },
    name: { 
      description: 'Card Name', 
      type: 'string', 
      demandOption: true 
    },
    cost: { 
      description: 'Cost', 
      type: 'number', 
      demandOption: true 
    },
    color: { 
      description: 'Card Color', 
      type: 'string', 
      choices: Object.values(CardColor), 
      demandOption: true 
    },
    type: { 
      description: 'Card Type', 
      type: 'string', 
      choices: Object.values(CardType), 
      demandOption: true 
    },
    rarity: { 
      description: 'Card Rarity', 
      type: 'string', 
      choices: Object.values(CardRarity), 
      demandOption: true 
    },
    rulesText: { 
      description: 'Rules Text', 
      type: 'string', 
      demandOption: true 
    },
    marketValue: { 
      description: 'Market Value', 
      type: 'number', 
      demandOption: true 
    },
    power: { 
      description: 'Card Power', 
      type: 'number' 
    },
    toughness: { 
      description: 'Card Toughness', 
      type: 'number' 
    },
    loyalty: { 
      description: 'Card Loyalty', 
      type: 'number' 
    },
  }, (argv) => {
    const USERNAME: string = argv.user as string; // Obtener el nombre de usuario como string
    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    const modifiedCard = new Card(
      argv.id,
      argv.name,
      argv.cost,
      argv.color,
      argv.type,
      argv.rarity,
      argv.rulesText,
      argv.marketValue,
      argv.power,
      argv.toughness,
      argv.loyalty
    );
    cardCollection.updateCard(modifiedCard);
  })
  // Comando 'remove' para eliminar una carta de la colección
  .command('remove', 'Removes a card from the collection', {
    user: { 
      description: 'User name', 
      type: 'string', 
      demandOption: true 
    },
    id: { description: 'Card ID', 
    type: 'number', 
    demandOption: true 
  },
  }, (argv) => {
    const USERNAME = argv.user; // Obtener el nombre de usuario
    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    cardCollection.removeCard(argv.id); // Revisar si argv.id contiene el ID correcto
  })  
  // Comando 'list' para listar todas las cartas en la colección
  .command('list', 'Lists all cards in the collection', {}, (argv) => {
    const USERNAME: string = argv.user as string; // Obtener el nombre de usuario como string
    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    cardCollection.listCards();
  })
  // Comando 'show' para mostrar detalles de una carta específica en la colección
  .command('show', 'Shows details of a specific card in the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
  }, (argv) => {
    const USERNAME: string = argv.user as string; // Obtener el nombre de usuario como string

    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    cardCollection.showCard(argv.id);
  })
```
Cada comando tiene asociada una función de callback que se ejecuta cuando se invoca ese comando desde la línea de comandos.
Ejemplos de Comandos:
Comando add: Agrega una nueva carta a la colección.
Comando update: Modifica una carta existente en la colección.
Comando remove: Elimina una carta de la colección por su ID.
Comando list: Lista todas las cartas en la colección.
Comando show: Muestra detalles de una carta específica en la colección.

Uso de las Clases FileManager y CardCollection:
Se instancia FileManager con el nombre de usuario proporcionado en los argumentos.
```
    const fileManager = new FileManager(USERNAME);

```
Se instancia CardCollection pasando la instancia de FileManager como argumento para gestionar las cartas.
```
    const cardCollection = new CardCollection(fileManager);
    cardCollection.showCard(argv.id);
```
## server.ts #
### Decisiones de Diseño: ###
Separación de Responsabilidades:

Se sigue el principio de separación de responsabilidades al dividir el código en diferentes archivos y clases, lo que facilita la mantenibilidad y la escalabilidad del sistema.
Reutilización de Código:

Se reutiliza el código al utilizar una clase CardManager para gestionar las operaciones relacionadas con las cartas, lo que permite un código más limpio y modular.
```
import { EventEmitter } from 'events';
import net from 'net';
import { CardCollection } from './cardCollection.js';
import { Card } from './card.js';
import { FileManager } from './fileManager.js'; // Importamos el FileManager

/**
 * Clase que extiende EventEmitter para manejar eventos de socket.
 */
class EventEmitterSocket extends EventEmitter {
  constructor(connection) {
    super();
    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      if (wholeData.includes('FIN"}')) {
        this.emit('peticion', JSON.parse(wholeData), connection);
      }
    });

    connection.on('close', () => {
      this.emit('close');
    });
  }
}

const USERNAME = 'nombreUsuario';

// Creamos una instancia de FileManager pasando el nombre de usuario como parámetro
const fileManager = new FileManager(USERNAME);
const cardCollection = new CardCollection(fileManager); // Pasamos el FileManager al CardCollection

const server = net.createServer((connection) => {
  console.log('Un cliente se ha conectado.');

  const serverSocket = new EventEmitterSocket(connection);

  serverSocket.on('peticion', (peticion, connection) => {
    console.log('Solicitud recibida:', peticion);

    // Manejar diferentes tipos de solicitudes
    switch (peticion.tipo) {
      case 'agregarCarta':
        agregarCarta(peticion, connection);
        break;
      case 'modificarCarta':
        modificarCarta(peticion, connection);
        break;
      case 'eliminarCarta':
        eliminarCarta(peticion, connection);
        break;
      case 'mostrarCarta':
        mostrarCarta(peticion, connection);
        break;
      default:
        connection.write('Error: Solicitud no válida');
        connection.end();
    }
  });

  serverSocket.on('close', () => {
    console.log('Un cliente se ha desconectado');
  });
});

server.listen(60300, () => {
  console.log('Esperando que los clientes se conecten.');
});

function agregarCarta(peticion, connection) {
    const { carta } = peticion;
    // Lógica para agregar una carta a la colección
    try {
        cardCollection.addCard(new Card(carta.id, carta.nombre, carta.costeMana, carta.color, carta.tipo, carta.rareza, carta.textoReglas, carta.valorMercado));
        connection.write('Carta agregada correctamente');
    } catch (error) {
        connection.write(`Error al agregar la carta: ${error.message}`);
    }
    connection.end();
}

function modificarCarta(peticion, connection) {
    const { carta } = peticion;
    // Lógica para modificar una carta en la colección
    try {
        cardCollection.updateCard(new Card(carta.id, carta.nombre, carta.costeMana, carta.color, carta.tipo, carta.rareza, carta.textoReglas, carta.valorMercado));
        connection.write('Carta modificada correctamente');
    } catch (error) {
        connection.write(`Error al modificar la carta: ${error.message}`);
    }
    connection.end();
}

function eliminarCarta(peticion, connection) {
    const { idCarta } = peticion;
    // Lógica para eliminar una carta de la colección
    try {
        cardCollection.removeCard(idCarta);
        connection.write('Carta eliminada correctamente');
    } catch (error) {
        connection.write(`Error al eliminar la carta: ${error.message}`);
    }
    connection.end();
}

function mostrarCarta(peticion, connection) {
    const { idCarta } = peticion;
    // Lógica para mostrar la información de una carta específica
    const carta = cardCollection.getCardById(idCarta);
    if (carta) {
        connection.write(JSON.stringify(carta));
    } else {
        connection.write('Carta no encontrada');
    }
    connection.end();
}

```

## client.ts ##
### Decisiones de Diseño: ###
Simplicidad y Usabilidad:

Se prioriza la simplicidad y la usabilidad al proporcionar una interfaz de usuario intuitiva en la consola utilizando la biblioteca inquirer, lo que facilita la interacción del usuario con la aplicación.
Desacoplamiento del Servidor y del Cliente:

Se mantiene el desacoplamiento entre el servidor y el cliente al separar el código en dos archivos diferentes (server.ts y client.ts), lo que permite una mayor flexibilidad y reutilización del código.
```
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { Card } from './card.js';
import { CardCollection } from './cardCollection.js';
import { FileManager } from './fileManager.js';

// Configuración de yargs para manejar los comandos y argumentos de la línea de comandos
yargs(hideBin(process.argv))
  // Comando 'add' para agregar una carta a la colección
  .command('add', 'Adds a card to the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
    name: { description: 'Card Name', type: 'string', demandOption: true },
    cost: { description: 'Cost', type: 'number', demandOption: true },
    color: { description: 'Card Color', type: 'string', demandOption: true },
    type: { description: 'Card Type', type: 'string', demandOption: true },
    rarity: { description: 'Card Rarity', type: 'string', demandOption: true },
    rulesText: { description: 'Rules Text', type: 'string', demandOption: true },
    marketValue: { description: 'Market Value', type: 'number', demandOption: true },
    power: { description: 'Card Power', type: 'number' },
    toughness: { description: 'Card Toughness', type: 'number' },
    loyalty: { description: 'Card Loyalty', type: 'number' },
    user: { description: 'User name', type: 'string', demandOption: true }
  }, (argv) => {
    const fileManager = new FileManager(argv.user);
    const cardCollection = new CardCollection(fileManager);
    const newCard = new Card(
      argv.id,
      argv.name,
      argv.cost,
      argv.color,
      argv.type,
      argv.rarity,
      argv.rulesText,
      argv.marketValue,
      argv.power,
      argv.toughness,
      argv.loyalty
    );
    cardCollection.addCard(newCard);
  })
  // Comando 'update' para modificar una carta en la colección
  .command('update', 'Modifies a card in the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
    name: { description: 'Card Name', type: 'string', demandOption: true },
    cost: { description: 'Cost', type: 'number', demandOption: true },
    color: { description: 'Card Color', type: 'string', demandOption: true },
    type: { description: 'Card Type', type: 'string', demandOption: true },
    rarity: { description: 'Card Rarity', type: 'string', demandOption: true },
    rulesText: { description: 'Rules Text', type: 'string', demandOption: true },
    marketValue: { description: 'Market Value', type: 'number', demandOption: true },
    power: { description: 'Card Power', type: 'number' },
    toughness: { description: 'Card Toughness', type: 'number' },
    loyalty: { description: 'Card Loyalty', type: 'number' },
    user: { description: 'User name', type: 'string', demandOption: true }
  }, (argv) => {
    const fileManager = new FileManager(argv.user);
    const cardCollection = new CardCollection(fileManager);
    const modifiedCard = new Card(
      argv.id,
      argv.name,
      argv.cost,
      argv.color,
      argv.type,
      argv.rarity,
      argv.rulesText,
      argv.marketValue,
      argv.power,
      argv.toughness,
      argv.loyalty
    );
    cardCollection.updateCard(modifiedCard);
  })
  // Comando 'remove' para eliminar una carta de la colección
  .command('remove', 'Removes a card from the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
    user: { description: 'User name', type: 'string', demandOption: true }
  }, (argv) => {
    const fileManager = new FileManager(argv.user);
    const cardCollection = new CardCollection(fileManager);
    cardCollection.removeCard(argv.id);
  })  
  // Comando 'list' para listar todas las cartas en la colección
  .command('list', 'Lists all cards in the collection', {
    user: { description: 'User name', type: 'string', demandOption: true }
  }, (argv) => {
    const fileManager = new FileManager(argv.user);
    const cardCollection = new CardCollection(fileManager);
    cardCollection.listCards();
  })
  // Comando 'show' para mostrar detalles de una carta específica en la colección
  .command('show', 'Shows details of a specific card in the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
    user: { description: 'User name', type: 'string', demandOption: true }
  }, (argv) => {
    const fileManager = new FileManager(argv.user);
    const cardCollection = new CardCollection(fileManager);
    cardCollection.showCard(argv.id);
  })
  .help()
  .argv;

```

## Conclusión ##

La Práctica 10 proporciona una oportunidad para profundizar en el desarrollo de aplicaciones cliente-servidor utilizando Node.js. Al implementar un sistema robusto de gestión de colecciones de cartas Magic, se aplican conceptos importantes como la comunicación en red, la persistencia de datos y la interacción con el usuario a través de una interfaz de línea de comandos.


## Bibliografía ##
> npm: yargs. (n.d.). Npm. https://www.npmjs.com/package/yargs

> npm: chalk. (n.d.). Npm. https://www.npmjs.com/package/chalk

> File system | Node.js v21.7.1 Documentation. (n.d.). https://nodejs.org/docs/latest/api/fs.html

> Events | Node.js v21.7.3 Documentation. (n.d.). https://nodejs.org/docs/latest/api/events.html
