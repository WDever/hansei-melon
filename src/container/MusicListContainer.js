import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as musicListActions from '../store/modules/musicList';
import MusicList from '../components/MusicList';
import * as api from '../lib/api';

class MusicListContainder extends React.Component {
  componentDidMount() {
    this.getTOP();
  };

  handleClick = (title, album, artist) => {
    this.getAPLLY(title, album, artist);
  }

  getTOP = async () => {
    const { MusicListActions } = this.props;

    try {
      const response = await api.getTOP();

      // eslint-disable-next-line array-callback-return
      response.data.map(item => {
        const { title, image_src: imgSrc, album, artist } = item;
        const onClick = () => console.log('success');
        MusicListActions.setData(title, imgSrc, album, artist, onClick);
      });

      console.log(response.data);

      MusicListActions.loading();
    } catch (e) {
      console.log(e);
    }
  };

  getAPLLY = async (title, album, artist) => {
    try {
      const response = await api.getAPLLY(title, album, artist);
      const { message, code } = response.data;
      alert(message, code);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { list, loading } = this.props;
    const { handleClick } = this;
    return <MusicList list={list} loading={loading} onClick={handleClick} />;
  }
}

const mapStateToProps = ({ musicList }) => ({
  list: musicList.list,
  loading: musicList.loading,
});

const mapDispatchToProps = dispatch => ({
  MusicListActions: bindActionCreators(musicListActions, dispatch),
});

MusicListContainder.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array,
  loading: PropTypes.bool
};

MusicListContainder.defaultProps = {
  list: [],
  loading: true
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicListContainder);
