import React, { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import Konva from 'konva';

interface TransformerHandlerProps {
  selectedId: string | null;
  layerRef: React.RefObject<Konva.Layer>;
}

export const TransformerHandler: React.FC<TransformerHandlerProps> = ({ selectedId, layerRef }) => {
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (selectedId && layerRef.current && transformerRef.current) {
      const node = layerRef.current.findOne(`#${selectedId}`);
      if (node instanceof Konva.Node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer()?.batchDraw();
      } else {
        transformerRef.current.nodes([]);
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
    }
  }, [selectedId, layerRef]);

  return <Transformer ref={transformerRef} />;
};