import { describe, it, beforeEach } from "mocha";
import { expect } from 'chai';
import { Card } from '../src/card.js';
import { CardCollection } from '../src/cardCollection.js';
import { FileManager } from '../src/fileManager.js';

describe('CardCollection', () => {
  let cardCollection: CardCollection;

  beforeEach(() => {
    const fileManager = new FileManager('test_user');
    cardCollection = new CardCollection(fileManager);
  });

  it('should add a card to the collection', () => {
    const newCard: Card = new Card(
      1,
      'Test Card',
      2,
      'Azul',
      'Criatura',
      'Comun',
      'Reglas de prueba',
      20
    );
    cardCollection.addCard(newCard);
    const addedCard = cardCollection.getCardById(1);
    expect(addedCard).to.exist;
  
    // Verifica que addedCard no sea undefined antes de acceder a sus propiedades
    if (addedCard) {
      expect(addedCard.id).to.equal(newCard.id);
    } else {
      throw new Error('addedCard is undefined');
    }
  });
  
  it('should update a card in the collection', () => {
    const initialCard: Card = new Card(
      2,
      'Initial Card',
      3,
      'Rojo',
      'Conjuro',
      'Infrecuente',
      'Reglas iniciales',
      30
    );
    cardCollection.addCard(initialCard);
  
    const updatedCard: Card = new Card(
      2,
      'Updated Card',
      4,
      'Verde',
      'Encantamiento',
      'Rara',
      'Nuevas reglas',
      40
    );
    cardCollection.updateCard(updatedCard);
  
    const modifiedCard = cardCollection.getCardById(2);
    expect(modifiedCard).to.exist;
  
    // Verifica que modifiedCard no sea undefined antes de acceder a sus propiedades
    if (modifiedCard) {
      expect(modifiedCard.name).to.equal(updatedCard.name);
    } else {
      throw new Error('modifiedCard is undefined');
    }
  });
  

  it('should remove a card from the collection', () => {
    const cardToRemove: Card = new Card(
      3,
      'Card to Remove',
      4,
      'Negro',
      'Instantaneo',
      'Mítica',
      'Reglas para eliminar',
      50
    );
    cardCollection.addCard(cardToRemove);

    cardCollection.removeCard(3);

    const removedCard = cardCollection.getCardById(3);
    expect(removedCard).to.not.exist;
  });

  it('should return undefined when getting a non-existing card', () => {
    const nonExistingCardId = 999; // ID que no existe en la colección
    const nonExistingCard = cardCollection.getCardById(nonExistingCardId);
    expect(nonExistingCard).to.be.undefined;
  });

  // it('should not add a card with duplicate ID', () => {
  //   const cardId = 1;
  //   const card1: Card = new Card(
  //     cardId,
  //     'Test Card 1',
  //     2,
  //     'Azul',
  //     'Criatura',
  //     'Comun',
  //     'Reglas de prueba 1',
  //     20
  //   );
  //   const card2: Card = new Card(
  //     cardId, // Mismo ID que card1
  //     'Test Card 2',
  //     3,
  //     'Rojo',
  //     'Conjuro',
  //     'Infrecuente',
  //     'Reglas de prueba 2',
  //     30
  //   );
  //   cardCollection.addCard(card1);
    
  //   // Intentar agregar una carta con un ID ya existente debería fallar
  //   expect(() => cardCollection.addCard(card2)).to.throw('Card with the same ID already exists');
  // });

  // it('should not update a non-existing card', () => {
  //   const nonExistingCard: Card = new Card(
  //     999, // ID que no existe en la colección
  //     'Non-existing Card',
  //     4,
  //     'Negro',
  //     'Instantaneo',
  //     'Mítica',
  //     'Reglas para eliminar',
  //     50
  //   );

  //   // Intentar actualizar una carta que no existe en la colección debería fallar
  //   expect(() => cardCollection.updateCard(nonExistingCard)).to.throw('Card does not exist in the collection');
  // });

  // it('should not remove a non-existing card', () => {
  //   const nonExistingCardId = 991; // ID que no existe en la colección

  //   // Intentar eliminar una carta que no existe en la colección debería fallar
  //   expect(() => cardCollection.removeCard(nonExistingCardId)).to.throw('Card does not exist in the collection');
  // });
});