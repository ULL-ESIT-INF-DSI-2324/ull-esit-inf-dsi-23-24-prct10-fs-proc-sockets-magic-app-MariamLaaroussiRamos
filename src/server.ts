import { EventEmitter } from 'events';
import net from 'net';
import { CardCollection } from './cardCollection.js';
import { Card } from './card.js';
import { FileManager } from './fileManager.js'; // Importamos el FileManager

/**
 * Clase que extiende EventEmitter para manejar eventos de socket.
 */
class EventEmitterSocket extends EventEmitter {
  constructor(connection: net.Socket) {
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

// Reemplaza 'nombreUsuario' con el nombre de usuario adecuado
const USERNAME = 'nombreUsuario';

// Creamos una instancia de FileManager pasando el nombre de usuario como parámetro
const fileManager = new FileManager(USERNAME);
const cardCollection = new CardCollection(fileManager); // Pasamos el FileManager al CardCollection

const server = net.createServer((connection) => {
  console.log('Un cliente se ha conectado.');

  const serverSocket = new EventEmitterSocket(connection);

  serverSocket.on('peticion', (peticion, connection) => {
    // Tu lógica para manejar las peticiones de los clientes
    // Ejemplo:
    console.log('Solicitud recibida:', peticion);
    connection.write('Recibido');
    connection.end();
  });

  serverSocket.on('close', () => {
    console.log('Un cliente se ha desconectado');
  });
});

server.listen(60300, () => {
  console.log('Esperando que los clientes se conecten.');
});
