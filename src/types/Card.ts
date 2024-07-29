export interface CardSide {
  elements: CardElement[];
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


export interface CardElement {
  id: string;
  type: 'text' | 'rectangle' | 'circle';
  content: string;
  style: React.CSSProperties;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface Card {
  id: string;
  deckId: string;
  sideA: {
    elements: CardElement[];
  };
  sideB: {
    elements: CardElement[];
  };
}
