import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import DeckManagement from './pages/DeckManagement';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/decks" element={<DeckManagement />} />
      </Routes>
    </div>
  );
};

export default App;