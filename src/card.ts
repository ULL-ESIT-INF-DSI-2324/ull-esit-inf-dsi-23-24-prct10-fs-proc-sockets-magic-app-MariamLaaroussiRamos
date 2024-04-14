/**
 * Enumeración que define los posibles tipos de carta.
 */
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

/**
 * Clase que representa una carta.
 */
export class Card {
  /** Identificador único de la carta. */
  id: number;
  /** Nombre de la carta. */
  name: string;
  /** Costo de la carta. */
  cost: number;
  /** Color de la carta. */
  color: string;
  /** Tipo de carta. */
  cardType: string;
  /** Rareza de la carta. */
  rarity: string;
  /** Texto de las reglas de la carta. */
  rulesText: string;
  /** Poder de la carta (si es una criatura). */
  power?: number;
  /** Resistencia de la carta (si es una criatura). */
  toughness?: number;
  /** Lealtad de la carta (si es un planeswalker). */
  loyalty?: number;
  /** Valor de mercado de la carta. */
  marketValue: number;

  /**
   * Crea una instancia de la clase Card.
   * @param id Identificador único de la carta.
   * @param name Nombre de la carta.
   * @param cost Costo de la carta.
   * @param color Color de la carta.
   * @param cardType Tipo de carta.
   * @param rarity Rareza de la carta.
   * @param rulesText Texto de las reglas de la carta.
   * @param marketValue Valor de mercado de la carta.
   * @param power Poder de la carta (opcional).
   * @param toughness Resistencia de la carta (opcional).
   * @param loyalty Lealtad de la carta (opcional).
   */
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
}