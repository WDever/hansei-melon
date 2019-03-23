import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import SearchBarContainer from './container/SearchBarContainer';
import MusicListContainer from './container/MusicListContainer';
import './App.css';
import Main from './components/Main/Main';
import PageTemplate from './components/PageTemplate';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;
