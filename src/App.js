import React from 'react';
import MusicListContainer from './container/MusicListContainer';
import PageTemplate from './components/PageTemplate';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <PageTemplate
        list={<MusicListContainer />}
      />
    );
  }
}

export default App;
