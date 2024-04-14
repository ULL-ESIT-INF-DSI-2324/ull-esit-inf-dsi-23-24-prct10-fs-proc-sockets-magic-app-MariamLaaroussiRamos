import * as fs from 'fs'; // Módulo File System de Node.js para trabajar con archivos
import { Card } from './card.js'; // Importamos la clase Card del archivo card.js

/**
 * Clase que gestiona la interacción con el sistema de archivos para las cartas.
 */
export class FileManager {
  private userDir: string; // Directorio del usuario

  /**
   * Constructor de la clase FileManager.
   * @param username Nombre de usuario para identificar la carpeta de almacenamiento.
   */
  constructor(private username: string) {
    // Se construye el directorio del usuario basado en el nombre proporcionado
    this.userDir = `./src/users/${this.username}`;
    this.createUserDirIfNotExists(); // Se crea la carpeta del usuario si no existe
  }

  /**
   * Crea el directorio del usuario si no existe.
   */
  private createUserDirIfNotExists(): void {
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true }); // Se crea la carpeta recursivamente si no existe
    }
  }

  /**
   * Obtiene la ruta de archivo para una carta específica.
   * @param cardId ID de la carta para generar la ruta de archivo.
   * @returns Ruta de archivo para la carta.
   */
  public getFilePath(cardId: number): string {
    return `${this.userDir}/card${cardId}.json`; // Genera la ruta de archivo basada en el ID de la carta
  }

  /**
   * Guarda la colección de cartas en archivos JSON en el sistema de archivos.
   * @param collection Colección de cartas a guardar.
   */
  public save(collection: Card[]): void {
    for (const card of collection) {
      const filePath = this.getFilePath(card.id); // Obtiene la ruta de archivo para la carta
      fs.writeFileSync(filePath, JSON.stringify(card, null, 2)); // Escribe el archivo JSON de la carta
    }
  }

  /**
   * Carga las cartas almacenadas en archivos JSON desde el sistema de archivos.
   * @returns Colección de cartas cargadas desde archivos.
   */
  public load(): Card[] {
    const files = fs.readdirSync(this.userDir); // Lee los archivos en el directorio del usuario
    const collection: Card[] = [];
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = `${this.userDir}/${file}`; // Genera la ruta completa del archivo
        try {
          const data = fs.readFileSync(filePath, 'utf-8'); // Lee el archivo como texto
          const card = JSON.parse(data) as Card; // Convierte el texto JSON a objeto Card
          collection.push(card); // Agrega la carta a la colección
        } catch (error) {
          console.error(`Error loading card from ${filePath}: ${error.message}`); // Manejo de errores al cargar cartas
        }
      }
    }
    return collection; // Devuelve la colección de cartas cargadas
  }
}
