import React from 'react';
import MusicListContainer from './container/MusicListContainer';
import PageTemplate from './component/PageTemplate';
import './App.css';

class App extends React.Component {
  // state = {
  //   list: [],
  //   title: '',
  //   src: '',
  // };

  // id = -1;

  // componentDidMount = () => {
  //   this.getTEST();
  // };

  // getTEST = async () => {
  //   const response = await api.getTEST();
  //   const { title, image_src: imgSrc } = response.data.song_list[0];
  //   const length = response.data.song_list.length;

  //   this.setState({
  //     title,
  //     src: imgSrc,
  //   });

  //   console.log(response.data.song_list.length);
  // };

  render() {
    return (
      <MusicListContainer />
    );
  }
}

export default App;
