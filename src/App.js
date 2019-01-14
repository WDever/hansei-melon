import React, { Component } from 'react';
import * as api from './api';
import MusicItem from './component/MusicItem';
import './App.css';

class App extends Component {
  state = {
    list: [],
    title: '',
    src: ''
  }
  id = -1;
  componentDidMount = () => {
    this.getTEST();
  }
  getTEST = async () => {
    const response = await api.getTEST();
    const { title: title, image_src } = response.data.song_list[0];
    const length = response.data.song_list.length;

    this.setState({
      title: title,
      src: image_src
    });

    console.log(response.data.song_list.length);
  }
  render() {
    return (
      <div className="App">
        <MusicItem
          title={this.state.title}
          src={this.state.src}
        />
      </div>
    );
  }
}

export default App;
