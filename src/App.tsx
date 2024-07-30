import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import DeckManagement from './pages/DeckManagement';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:cardId" element={<Editor />} />
          <Route path="/decks" element={<DeckManagement />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;