import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as musicListActions from '../store/modules/musicList';
import MusicList from '../components/MusicList';
import * as api from '../lib/api';

class MusicListContainder extends React.Component {
  async componentDidMount () {
    await this.getCHECK();

    const hour = moment().format('H');

    const { code } = this.props;

    return code === 423 || hour >= 12 ? this.getPLAYLIST(true) : this.getTOP();
  };

  handleClick = async (title, album, artist) => {
    await this.postAPLLY(title, album, artist);
    await this.getCHECK();
    const { code } = this.props;
    console.log(code)
    return code === 423 ? this.getPLAYLIST(false) : null;
  }

  getTOP = async () => {
    const { MusicListActions } = this.props;

    try {
      const response = await api.getTOP();

      // eslint-disable-next-line array-callback-return
      response.data.map(item => {
        const { title, image_src: imgSrc, album, artist } = item;
        MusicListActions.setData(title, imgSrc, album, artist);
      });

      console.log(response.data);

      MusicListActions.loading();
    } catch (e) {
      console.log(e);
    }
  };

  postAPLLY = async (title, album, artist) => {
    try {
      const response = await api.postAPLLY(title, album, artist);
      const { message, code } = response.data;
      alert(message, code);
      // console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

 getCHECK = async () => {
    const { MusicListActions } = this.props;
    try {
      const response = await api.getCHECK();
      const { code } = response.data;

      MusicListActions.check(code);
    } catch (e) {
      console.log(e);
    }
  }

  getPLAYLIST = async (bool) => {
    const { MusicListActions, check } = this.props;

    try {
      const response = await api.getPLAYLIST();

      const titleCheck = check ? MusicListActions.checkCode() : null;

      const afterCheck = bool ? null : MusicListActions.reset();

      // eslint-disable-next-line array-callback-return
      response.data.results.map(item => {
        const { title, image_src: imgSrc, album, artist } = item;
        MusicListActions.setData(title, imgSrc, album, artist);
      });
      
      return bool ? MusicListActions.loading() : null;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { list, loading, check } = this.props;
    const { handleClick } = this;
    return <MusicList list={list} loading={loading} onClick={handleClick} check={check} />;
  }
}

const mapStateToProps = ({ musicList }) => ({
  list: musicList.list,
  loading: musicList.loading,
  code: musicList.code,
  check: musicList.check
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
