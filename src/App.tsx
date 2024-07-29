import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import DeckManagement from './pages/DeckManagement';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    console.log('App: Component mounted');
  }, []);

  console.log('App: Rendering');

  return (
    <div className="App">
      <Header />
      <div style={styles.mainContent}>
        <Sidebar />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/decks" element={<DeckManagement />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  mainContent: {
    display: 'flex',
  },
  main: {
    flex: 1,
    padding: '20px',
  },
};

export default App;
