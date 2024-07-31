import { CardElement } from '../../../../types/Card';

export interface ShapeProps {
  element: CardElement;
  selectedId: string | null;
  selectShape: (id: string | null) => void;
}