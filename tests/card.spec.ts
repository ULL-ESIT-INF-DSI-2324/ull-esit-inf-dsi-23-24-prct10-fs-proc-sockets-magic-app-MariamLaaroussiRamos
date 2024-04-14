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
});
