import React from 'react';
import MusicListContainer from './container/MusicListContainer';
import PageTemplate from './components/PageTemplate';
import SearchBar from './components/SearchBar';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <PageTemplate
        list={<MusicListContainer />}
        search={<SearchBar />}
      />
    );
  }
}

export default App;
