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
