import { useState, useCallback } from 'react';

const useUndoRedo = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const [history, setHistory] = useState<T[]>([]);
  const [redoStack, setRedoStack] = useState<T[]>([]);

  const set = useCallback((newState: T | ((prevState: T) => T)) => {
    setState(prevState => {
      const updatedState = typeof newState === 'function' ? (newState as (prevState: T) => T)(prevState) : newState;
      setHistory(prevHistory => [...prevHistory, prevState]);
      setRedoStack([]);
      return updatedState;
    });
  }, []);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setRedoStack(prevRedoStack => [state, ...prevRedoStack]);
    setHistory(prevHistory => prevHistory.slice(0, -1));
    setState(previousState);
  }, [state, history]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[0];
    setHistory(prevHistory => [...prevHistory, state]);
    setRedoStack(prevRedoStack => prevRedoStack.slice(1));
    setState(nextState);
  }, [state, redoStack]);

  return { state, set, undo, redo };
};

export default useUndoRedo;