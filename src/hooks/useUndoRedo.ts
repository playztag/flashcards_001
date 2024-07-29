import { useState, useCallback } from 'react';

const useUndoRedo = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const [history, setHistory] = useState<T[]>([]);
  const [redoStack, setRedoStack] = useState<T[]>([]);

  const set: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (newState: React.SetStateAction<T>) => {
      setHistory([...history, state]);
      setState(newState);
      setRedoStack([]);
    },
    [state, history]
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const previousState = history.pop()!;
    setRedoStack([state, ...redoStack]);
    setState(previousState);
    setHistory(history);
  }, [state, history, redoStack]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const nextState = redoStack.shift()!;
    setHistory([...history, state]);
    setState(nextState);
    setRedoStack(redoStack);
  }, [state, history, redoStack]);

  return { state, set, undo, redo };
};

export default useUndoRedo;