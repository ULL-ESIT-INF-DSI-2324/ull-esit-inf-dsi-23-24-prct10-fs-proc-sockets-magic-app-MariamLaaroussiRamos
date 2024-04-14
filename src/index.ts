import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { Card, CardType, CardColor, CardRarity } from './card.js';
import { FileManager } from './fileManager.js';
import { CardCollection } from './cardCollection.js';

// Configuración de yargs para manejar los comandos y argumentos de la línea de comandos
yargs(hideBin(process.argv))
  // Comando 'add' para agregar una carta a la colección
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
  .help()
  .argv;
