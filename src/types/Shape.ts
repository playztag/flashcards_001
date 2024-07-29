export interface Shape {
    id: string;
    type: 'rectangle' | 'circle' | 'text';
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
    text?: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
  }
  