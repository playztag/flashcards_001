import { renderHook, act } from '@testing-library/react';
import useUndoRedo from '../hooks/useUndoRedo';

describe('useUndoRedo Hook', () => {
  it('should initialize with the given state', () => {
    const { result } = renderHook(() => useUndoRedo(0));
    expect(result.current.state).toBe(0);
  });

  it('should update the state and add to history', () => {
    const { result } = renderHook(() => useUndoRedo(0));
    act(() => {
      result.current.set((prev: number) => prev + 1);
    });
    expect(result.current.state).toBe(1);
  });

  it('should undo state changes', () => {
    const { result } = renderHook(() => useUndoRedo(0));
    act(() => {
      result.current.set((prev: number) => prev + 1);
      result.current.set((prev: number) => prev + 1);
      result.current.undo();
    });
    expect(result.current.state).toBe(1);
  });

  it('should redo state changes', () => {
    const { result } = renderHook(() => useUndoRedo(0));
    act(() => {
      result.current.set((prev: number) => prev + 1);
      result.current.set((prev: number) => prev + 1);
      result.current.undo();
      result.current.redo();
    });
    expect(result.current.state).toBe(2);
  });
});