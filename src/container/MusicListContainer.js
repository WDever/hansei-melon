import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as musicListActions from '../store/modules/musicList';
import MusicList from '../components/MusicList';
import * as api from '../lib/api';

class MusicListContainder extends React.Component {
  componentDidMount() {
    this.getTEST();
  };

  getTEST = async () => {
    const response = await api.getTEST();
    const { MusicListActions } = this.props;

    response.data.map(
      item => {
        const { title, image_src: imgSrc } = item;
        MusicListActions.setData(title, imgSrc);
      }
    )

    console.log(response.data);
  };

  render() {
    const { list } = this.props;
    return (
      <MusicList
        list={list}
      />
    );
  }
}

const mapStateToProps = ({ musicList }) => ({
  list: musicList.list
});

const mapDispatchToProps = dispatch => ({
  MusicListActions: bindActionCreators(musicListActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicListContainder);
