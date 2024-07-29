#!/bin/bash

# Create necessary directories
mkdir -p src/components/common src/pages src/__tests__

# Create a basic package.json file with specific versions
echo '{
  "name": "flash-card-creator",
  "version": "1.0.0",
  "description": "A flash card creation and management application",
  "main": "src/index.tsx",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.3.0",
    "@material-ui/core": "^4.12.4",
    "@emotion/react": "^11.4.1",
    "@emotion/styled": "^11.3.0"
  },
  "devDependencies": {
    "@testing-library/react": "^12.1.2",
    "@testing-library/jest-dom": "^5.14.1",
    "@types/jest": "^27.0.1",
    "@types/react": "^17.0.20",
    "@types/react-dom": "^17.0.9",
    "@types/react-router-dom": "^5.1.8",
    "typescript": "^4.4.2",
    "react-scripts": "4.0.3"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}' > package.json

# Install dependencies
npm install

# Create src/index.tsx
cat << EOF > src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
EOF

# Create src/App.tsx
cat << EOF > src/App.tsx
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import DeckManagement from './pages/DeckManagement';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/editor" component={Editor} />
        <Route path="/decks" component={DeckManagement} />
      </Switch>
    </div>
  );
};

export default App;
EOF

# Create basic page components
for page in Home Editor DeckManagement; do
  cat << EOF > src/pages/${page}.tsx
import React from 'react';

const ${page}: React.FC = () => {
  return (
    <div>
      <h1>${page}</h1>
      {/* TODO: Implement ${page} page */}
    </div>
  );
};

export default ${page};
EOF
done

# Update CardViewer component
cat << EOF > src/components/cards/CardViewer.tsx
import React, { useState } from 'react';
import { Card } from '../../types/Card';

interface CardViewerProps {
  card: Card;
}

const CardViewer: React.FC<CardViewerProps> = ({ card }) => {
  const [showFront, setShowFront] = useState(true);

  const flipCard = () => {
    setShowFront(!showFront);
  };

  return (
    <div className="card-viewer" onClick={flipCard}>
      <h2>Card Viewer</h2>
      {showFront ? (
        <div>
          <h3>Front</h3>
          {card.sideA.elements.map((element) => (
            <div key={element.id}>{element.content}</div>
          ))}
        </div>
      ) : (
        <div>
          <h3>Back</h3>
          {card.sideB.elements.map((element) => (
            <div key={element.id}>{element.content}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardViewer;
EOF

# Update DeckManager component
cat << EOF > src/components/decks/DeckManager.tsx
import React, { useState } from 'react';
import { Deck } from '../../types/Deck';

const DeckManager: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  const createDeck = (name: string, description: string) => {
    const newDeck: Deck = {
      id: Date.now().toString(),
      name,
      description,
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setDecks([...decks, newDeck]);
  };

  return (
    <div>
      <h2>Deck Manager</h2>
      <button onClick={() => createDeck('New Deck', 'A new deck')}>
        Create New Deck
      </button>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>{deck.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeckManager;
EOF

# Create a basic test for App component
cat << EOF > src/__tests__/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

test('renders App component', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const homeElement = screen.getByText(/Home/i);
  expect(homeElement).toBeInTheDocument();
});
EOF

# Create a basic global styles file
cat << EOF > src/styles/globalStyles.ts
import { css } from '@emotion/react';

export const globalStyles = css\`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .App {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
\`;
EOF

# Create .gitignore file
cat << EOF > .gitignore
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# TypeScript
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Project-specific
/snapshots
EOF

echo "Project setup completed. You can now run 'npm start' to start the development server and 'npm test' to run the tests."