import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

console.log('Index.tsx: Script started');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Index.tsx: DOM fully loaded');
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    console.log('Index.tsx: Root element found');
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    );
    console.log('Index.tsx: App rendered');
  } else {
    console.error('Index.tsx: Root element not found');
  }
});

console.log('Index.tsx: Script ended');