/* eslint-disable react/forbid-prop-types */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SearchChanger from '../components/SearchChanger';
import * as api from '../lib/api';
import * as searchActions from '../store/modules/search';
import * as musicListActions from '../store/modules/musicList';
import * as loginActions from '../store/modules/login';

class SearchBarContainer extends React.Component {
  componentDidMount = async () => {
    // this.getTSearch();
    // this.getARSearch();
    // this.getALSearch();
    await this.getCHECK(); // check reservation availability

    const { SearchActions, canReservation, code } = this.props;

    const hour = moment().format('H');
    const min = moment().format('m');

    const sum = hour * 3600 + min * 60;

    // if (code === 423 && !canReservation) {
    //   SearchActions.start();
    // }

    // if (min >= '20' && min <= '59') {
    //   // 신청시간 안에 들어왔을때. true를 false로
    //   if (hour >= '8' && hour <= '11' && canReservation) {
    //     SearchActions.start();
    //   }
    // }

    // if (hour >= '8' && hour <= 11 && min >= '20' && canReservation && code !== 423) {
    //   SearchActions.start(); // turn to false
    // }

    // if (total >= 30000 && total <= 43200 && code !== 423) {
    //   SearchActions.start();
    // }

    // setInterval(() => this.reIsuued(), 1000);

    setInterval(() => this.TimeHandler(), 1000);

    return sum >= 30000 && sum <= 43200 && code !== 423
      ? SearchActions.start()
      : this.handleStarter(hour);
    // return sum >= 30000 || sum <= 43200 && code !== 423 ? SearchActions.start() : SearchActions.end(); 이거는
  };

  getCHECK = async () => {
    const { MusicListActions } = this.props;
    try {
      const response = await api.getCHECK();
      const { code } = response.data;

      MusicListActions.check(code);
    } catch (e) {
      console.log(e);
    }
  };

  getALSearch = async input => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getALSearch(input);

      await response.data.song_list_album.map(item => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        console.log(id);
        return SearchActions.Alsearch(title, imgSrc, album, artist, id);
      });
    } catch (e) {
      console.log(e);
    }
  };

  getTSearch = async input => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getTSearch(input);

      response.data.song_list_title.map(item => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        console.log(id);
        return SearchActions.Tsearch(title, imgSrc, album, artist, id);
      });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  getARSearch = async input => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getARSearch(input);

      response.data.song_list_artist.map(item => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        console.log(id);
        return SearchActions.Arsearch(title, imgSrc, album, artist, id);
      });
    } catch (e) {
      console.log(e);
    }
  };

  postApply = async (title, album, artist, id) => {
    try {
      const { userInfo } = this.props;
      const { keyToken } = userInfo;
      console.log(keyToken);
      const response = await api.postAPPLY(title, album, artist, id, keyToken);
      const { message, code } = response.data;
      console.log(id);
      alert(message, code);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  postAccessToken = async accessToken => {
    const { LoginActions } = this.props;

    try {
      const response = await api.postAccessToken(accessToken);

      const { key } = response.data;

      await LoginActions.keyToken(key);

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  postVerify = async JWTtoken => {
    try {
      const response = await api.postVerify(JWTtoken);

      const { token } = response.data;

      console.log(`verify`);
      console.log(response);
      console.log(token);

      return token;
    } catch (e) {
      console.log(e);
    }
  };

  handleStarter = hour => {
    const { SearchActions } = this.props;
    this.starter =
      hour >= 12
        ? SearchActions.end()
        : // : setInterval(() => this.TimeHandler(), 1000);
          null;
  };

  reIsuued = () => {
    const { LoginActions, count, userInfo } = this.props;
    LoginActions.count();
    console.log(count);
    if (count === 18000) {
      this.postAccessToken(userInfo.accessToken);
      LoginActions.countReset();
    }
  };

  TimeHandler = async () => {
    const { SearchActions, canReservation, code } = this.props;

    const hour = moment().format('H') * 3600;
    const min = moment().format('m') * 60;
    const sec = moment().format('s') * 1;

    const sum = hour + min + sec;

    const total = 30000 - sum;

    const remainHour = Math.floor(total / 3600);
    const remainMin = Math.floor((total - remainHour * 3600) / 60);
    const remainSec = total - remainHour * 3600 - remainMin * 60;

    // if (min >= '20') {
    //   // TimeHandler가 실행중일때 8시 20분이 넘으면 canReservation 반전
    //   if (hour === '8' && canReservation) {
    //     SearchActions.start();
    //     console.log('th active');
    //   }
    // }

    if (sum === 30000 && canReservation) {
      // 접속중에 8시 20분이 되면 placeholer 비움
      SearchActions.start();
    }

    if (sum >= 43200 || code === 423) {
      if (!canReservation) {
        SearchActions.start();
        SearchActions.end();
      } else {
        SearchActions.end();
      }
    }

    if (sum === 0) {
      await this.getCHECK();
    }

    // if (code === 423 && canReservation) {
    //   SearchActions.end();
    // }

    // if (code === 423 && !canReservation) {
    //   SearchActions.start();
    //   SearchActions.end();
    // }

    // if (code !== 423) {
    //   SearchActions.setTime(remainHour, remainMin, remainSec);
    // }

    if (code !== 423 && sum <= 43200) {
      SearchActions.setTime(remainHour, remainMin, remainSec);
    }
  };

  handleChange = e => {
    const { value } = e.target;
    const { SearchActions } = this.props;

    SearchActions.input(value);
  };

  handleSearch = async () => {
    const { SearchActions, input } = this.props;

    SearchActions.reset();

    await this.handleLoading();

    await this.getTSearch(input);

    SearchActions.flag(true);

    await this.handleLoading();

    this.getALSearch(input);
    this.getARSearch(input);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.handleFocus(false);
    }
  };

  changeResults = async index => {
    const { SearchActions } = this.props;

    // console.log(Tlist);
    // console.log(Allist);
    // console.log(Arlist);
    await this.handleLoading();
    await SearchActions.cat(index);
    await this.handleFocus(true);
    await this.handleLoading();
  };

  handleLoading = () => {
    const { SearchActions } = this.props;

    SearchActions.searchLoading();
  };

  handleFocus = bool => {
    const { SearchActions } = this.props;

    SearchActions.focus(bool);
  };

  timeOutFocus = bool => {
    setTimeout(() => this.handleFocus(bool), 310);
  };

  loginCallback = async response => {
    const { LoginActions } = this.props;

    const res = await response;

    const { accessToken, name } = res;

    await LoginActions.setInfo(name, accessToken);

    await this.postAccessToken(accessToken);

    console.log(res);

    const { userInfo } = this.props;
    console.log(userInfo);
    return userInfo.accessToken !== undefined ? LoginActions.isLogin(true) : null;
  };

  logout = () => {
    const { LoginActions } = this.props;
    window.FB.logout();
    LoginActions.isLogin(false);
  };

  // verifyApply = () => {
  //   const { userInfo } = this.props;

  // }

  render() {
    const {
      input,
      placeholder,
      canReservation,
      Tlist,
      Allist,
      Arlist,
      flag,
      cat,
      loading,
      focus,
      isLogin,
      userInfo,
    } = this.props;
    const {
      handleChange,
      handleSearch,
      postApply,
      changeResults,
      handleKeyPress,
      handleFocus,
      handleKeyDown,
      timeOutFocus,
      loginCallback,
      logout,
    } = this;
    return (
      <>
        <SearchBar
          value={input}
          onChange={handleChange}
          onClick={handleSearch}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          canReservation={canReservation}
          changer={(
            <SearchChanger
              changeResults={changeResults}
              cat={cat}
              changeFocus={handleFocus}
              loginCallback={loginCallback}
              isLogin={isLogin}
              userInfo={userInfo}
              logout={logout}
            />
)}
          onFocus={handleFocus}
          handleKeyDown={handleKeyDown}
          timeOutFocus={timeOutFocus}
        />
        <SearchResults
          Tlist={Tlist}
          Allist={Allist}
          Arlist={Arlist}
          cat={cat}
          flag={flag}
          onClick={postApply}
          loading={loading}
          focus={focus}
          input={input}
        />
      </>
    );
  }
}

const mapStateToProps = ({ search, musicList, login }) => ({
  input: search.input,
  hour: search.hour,
  min: search.min,
  sec: search.sec,
  placeholder: search.placeholder,
  canReservation: search.canReservation,
  code: musicList.code,
  list: search.list,
  flag: search.flag,
  cat: search.cat,
  Tlist: search.Tlist,
  Allist: search.Allist,
  Arlist: search.Arlist,
  loading: search.loading,
  focus: search.focus,
  isLogin: login.isLogin,
  userInfo: login.userInfo,
  count: login.count,
});

const mapDispatchToProps = dispatch => ({
  SearchActions: bindActionCreators(searchActions, dispatch),
  MusicListActions: bindActionCreators(musicListActions, dispatch),
  LoginActions: bindActionCreators(loginActions, dispatch),
});

SearchBarContainer.propTypes = {
  canReservation: PropTypes.bool,
  // hour: PropTypes.number,
  // min: PropTypes.number,
  // sec: PropTypes.number,
  input: PropTypes.string,
  placeholder: PropTypes.string,
  Tlist: PropTypes.array,
  Allist: PropTypes.array,
  Arlist: PropTypes.array,
};

SearchBarContainer.defaultProps = {
  canReservation: true,
  input: '',
  placeholder: '',
  Tlist: [],
  Allist: [],
  Arlist: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBarContainer);
