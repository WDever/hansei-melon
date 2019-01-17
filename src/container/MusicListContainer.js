import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as musicListActions from '../store/modules/musicList';
import MusicList from '../components/MusicList';
import * as api from '../lib/api';

class MusicListContainder extends React.Component {
  componentDidMount() {
    this.getTEST();
  }

  getTEST = async () => {
    const { MusicListActions } = this.props;

    try {
      const response = await api.getTEST();

      // eslint-disable-next-line array-callback-return
      response.data.map(item => {
        const { title, image_src: imgSrc } = item;
        MusicListActions.setData(title, imgSrc);
      });

      console.log(response.data);

      MusicListActions.loading();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { list, loading } = this.props;
    return <MusicList list={list} loading={loading} />;
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
