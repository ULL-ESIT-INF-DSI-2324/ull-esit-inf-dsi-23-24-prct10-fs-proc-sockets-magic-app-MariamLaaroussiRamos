import chalk from 'chalk'; // Librería para dar color a la consola
import { Card } from './card.js'; // Importamos la clase Card del archivo card.js
import { FileManager } from './fileManager.js'; // Importamos la clase FileManager del archivo fileManager.js
import * as fs from 'fs'; // Módulo File System de Node.js para trabajar con archivos

/**
 * Clase que representa una colección de cartas.
 */
export class CardCollection {
  private collection: Card[]; // Array que almacena las cartas

  /**
   * Constructor de la clase CardCollection.
   * @param fileManager Instancia de FileManager para gestionar archivos de la colección.
   */
  constructor(private fileManager: FileManager) {
    // Cargamos la colección desde el archivo al inicializar la instancia
    this.collection = fileManager.load();
  }

  /**
   * Agrega una nueva carta a la colección.
   * @param card Instancia de la carta a agregar.
   */
  public addCard(card: Card): void {
    // Verificamos si ya existe una carta con el mismo ID
    const existingCard = this.getCardById(card.id);
    if (existingCard) {
      console.log(chalk.red('Error: A card with the same ID already exists.'));
    } else {
      // Agregamos la carta a la colección y guardamos en el archivo
      this.collection.push(card);
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card added successfully!'));
    }
  }

  /**
   * Modifica una carta existente en la colección.
   * @param updatedCard Instancia de la carta actualizada.
   */
  public updateCard(updatedCard: Card): void {
    const index = this.collection.findIndex(card => card.id === updatedCard.id);
    if (index !== -1) {
      // Actualizamos la carta en la colección y guardamos en el archivo
      this.collection[index] = updatedCard;
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card modified successfully!'));
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  /**
   * Elimina una carta de la colección por su ID.
   * @param cardId ID de la carta a eliminar.
   */
  public removeCard(cardId: number): void {
    console.log('Removing card with ID:', cardId); // Mensaje de depuración
    const index = this.collection.findIndex(card => card.id === cardId);
    console.log('Card index:', index); // Mensaje de depuración
    if (index !== -1) {
      const cardToRemove = this.collection[index];
      const filePath = this.fileManager.getFilePath(cardToRemove.id);
      fs.unlinkSync(filePath); // Eliminar físicamente el archivo
      this.collection.splice(index, 1);
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card removed successfully!'));
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  /**
   * Lista todas las cartas en la colección.
   */
  public listCards(): void {
    for (const card of this.collection) {
      console.log(`Card ID: ${card.id}, Name: ${card.name}`);
    }
  }

  /**
   * Muestra los detalles de una carta específica por su ID.
   * @param cardId ID de la carta cuyos detalles se desean mostrar.
   */
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

  /**
   * Obtiene una carta de la colección por su ID.
   * @param cardId ID de la carta deseada.
   * @returns La instancia de la carta si se encuentra, de lo contrario undefined.
   */
  public getCardById(cardId: number): Card | undefined {
    return this.collection.find(card => card.id === cardId);
  }
}
