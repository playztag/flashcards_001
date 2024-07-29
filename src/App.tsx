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
