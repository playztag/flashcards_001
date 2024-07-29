import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Card } from '../types/Card';
import { Deck } from '../types/Deck';

interface AppState {
  cards: Card[];
  decks: Deck[];
}

type Action =
  | { type: 'ADD_CARD'; payload: Card }
  | { type: 'UPDATE_CARD'; payload: Card }
  | { type: 'DELETE_CARD'; payload: string }
  | { type: 'ADD_DECK'; payload: Deck }
  | { type: 'UPDATE_DECK'; payload: Deck }
  | { type: 'DELETE_DECK'; payload: string };

const initialState: AppState = {
  cards: [],
  decks: [],
};

const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_CARD':
      return { ...state, cards: [...state.cards, action.payload] };
    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
    case 'DELETE_CARD':
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    case 'ADD_DECK':
      return { ...state, decks: [...state.decks, action.payload] };
    case 'UPDATE_DECK':
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.id === action.payload.id ? action.payload : deck
        ),
      };
    case 'DELETE_DECK':
      return {
        ...state,
        decks: state.decks.filter((deck) => deck.id !== action.payload),
      };
    default:
      return state;
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}