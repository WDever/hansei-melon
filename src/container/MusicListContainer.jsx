import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as musicListActions from '../store/modules/musicList';
import * as searchActions from '../store/modules/search';
import * as loginActions from '../store/modules/login';
import MusicList from '../components/MusicList';
import * as api from '../lib/api';

class MusicListContainder extends React.Component {
  async componentDidMount() {
    const { MusicListActions, list, status } = this.props;
    await this.getCHECK();
    // await MusicListActions.reset();

    const hour = moment().format('H');

    const { code } = this.props;

    // console.log(typeof code);

    // return (code === 423 || hour >= 12) && status === 'none'
    return (code === 423 || hour >= 12) && (status === 'none' || status === 'playlist')
      ? this.getPLAYLIST(true)
      : this.getTOP();
    // return (code === 423 || hour >= 12) && status === 'none' ? this.getTOP() : null;
    // return list.length === 0 ? this.getTOP() : null;
  }

  handleClick = async (title, album, artist, id) => {
    await this.postAPPLY(title, album, artist, id);
    await this.getCHECK();
    const { code } = this.props;
    return code === 423 ? this.getPLAYLIST(false) : null;
  };

  getTOP = async () => {
    const { MusicListActions, loading } = this.props;

    try {
      const response = await api.getTOP();

      // console.log(`MusicListRes${response}`);

      response.data.map(item => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        // console.log(item);
        return MusicListActions.setData(title, imgSrc, album, artist, id);
      });

      // console.log(response.data);

      if (loading) {
        MusicListActions.setStatus('top');
        MusicListActions.loading();
      }
    } catch (e) {
      console.log(e);
    }
  };

  postAPPLY = async (title, album, artist, id) => {
    try {
      const { userInfo } = this.props;
      const { keyToken } = userInfo;
      const response = await api.postAPPLY(title, album, artist, id, keyToken);
      const { message, code } = response.data;
      // console.log(id);
      alert(message, code);
      // console.log(response);
    } catch (e) {
      // console.log(e);
      alert('로그인 후 다시 시도해주세요.');
    }
  };

  getCHECK = async () => {
    const { MusicListActions } = this.props;
    try {
      const response = await api.getCHECK();
      const { code } = response.data;

      MusicListActions.check(code);
    } catch (e) {
      // console.log(e);
    }
  };

  getPLAYLIST = async bool => {
    const { MusicListActions, check, status } = this.props;

    try {
      if (status === 'playlist') return;
      const response = await api.getPLAYLIST();

      // console.log(response);

      const titleCheck = check ? MusicListActions.checkCode() : null;

      const afterCheck = bool ? null : MusicListActions.reset();

      let id = 0;

      // eslint-disable-next-line array-callback-return
      response.data.results.map(item => {
        const {
          title,
          image_src: imgSrc,
          album,
          artist,
          music_info_url: url,
        } = item;

        MusicListActions.setStatus('playlist');

        // console.log(item);
        // eslint-disable-next-line no-plusplus
        return MusicListActions.setData(
          title,
          imgSrc,
          album,
          artist,
          id++,
          url,
        );
      });

      return bool ? MusicListActions.loading() : null;
    } catch (e) {
      // console.log(e);
    }
  };

  render() {
    const { list, loading, check, flag } = this.props;
    const { handleClick } = this;
    return (
      <MusicList
        list={list}
        loading={loading}
        onClick={handleClick}
        check={check}
        flag={flag}
      />
    );
  }
}

const mapStateToProps = ({ musicList, search, login }) => ({
  list: musicList.list,
  loading: musicList.loading,
  code: musicList.code,
  check: musicList.check,
  flag: search.flag,
  userInfo: login.userInfo,
  status: musicList.status,
});

const mapDispatchToProps = dispatch => ({
  MusicListActions: bindActionCreators(musicListActions, dispatch),
  SearchActions: bindActionCreators(searchActions, dispatch),
  LoginActions: bindActionCreators(loginActions, dispatch),
});

MusicListContainder.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array,
  loading: PropTypes.bool,
};

MusicListContainder.defaultProps = {
  list: [],
  loading: true,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicListContainder);
