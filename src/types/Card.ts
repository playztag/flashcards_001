// src/types/Card.ts

export interface ElementStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  fontColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CardElement {
  id: string;
  type: 'text' | 'rectangle' | 'circle' | 'ellipse';  // Added 'ellipse' here
  content: string;
  style: ElementStyle;
  position: Position;
  side: 'A' | 'B';
}

export interface Card {
  id: string;
  deckId: string;
  elements: CardElement[];
}

export interface CardSide {
  elements: CardElement[];
}