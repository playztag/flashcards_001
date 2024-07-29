import React, { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import DeckManagement from './pages/DeckManagement';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    console.log('App: Component mounted');
  }, []);

  console.log('App: Rendering');

  return (
    <div className="App">
      <header>
        <h1>Flash Card Creator</h1>
        <p style={{ color: 'red' }}>Debug: App component rendered</p>
      </header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/editor">Create New Card</Link></li>
          <li><Link to="/decks">Manage Decks</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/decks" element={<DeckManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;