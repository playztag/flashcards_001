import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import DeckManagement from './pages/DeckManagement';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/editor">Card Editor</Link></li>
          <li><Link to="/decks">Deck Management</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/decks" element={<DeckManagement />} />
      </Routes>
    </div>
  );
};

export default App;