export interface CardSide {
  elements: CardElement[];
}

export interface CardElement {
  id: string;
  type: 'text' | 'rectangle' | 'circle';
  content?: string;
  style: ElementStyle;
  position: Position;
}

export interface ElementStyle {
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Card {
  id: string;
  deckId: string;
  sideA: CardSide;
  sideB: CardSide;
}
