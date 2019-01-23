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

class SearchBarContainer extends React.Component {
  componentDidMount = async () => {
    // this.getTSearch();
    // this.getARSearch();
    // this.getALSearch();
    await this.getCHECK();

    const { SearchActions, reservation, code } = this.props;

    const hour = moment().format('H');
    const min = moment().format('m');

    if (code === 423 && !reservation) {
      // 예약 시간동안만 false
      SearchActions.start();
      console.log(reservation);
    }

    if (min >= '20' && min <= '59') {
      // 신청시간 안에 들어왔을때. true를 false로
      if (hour >= '8' && hour <= '11' && reservation) {
        SearchActions.start();
      }
    }

    this.handleStarter(hour);
  };

  getCHECK = async () => {
    const { MusicListActions } = this.props;
    try {
      const response = await api.getCHECK();
      const { code } = response.data;

      MusicListActions.check(code);

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  getALSearch = async input => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getALSearch(input);

      await response.data.song_list_album.map(item => {
        const { title, image_src: imgSrc, album, artist } = item;
        SearchActions.Alsearch(title, imgSrc, album, artist);
      });
      console.log('album');
    } catch (e) {
      console.log(e);
    }
  };

  getTSearch = async input => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getTSearch(input);

      response.data.song_list_title.map(item => {
        const { title, image_src: imgSrc, album, artist } = item;
        SearchActions.Tsearch(title, imgSrc, album, artist);
      });
      console.log('title');
    } catch (e) {
      console.log(e);
    }
  };

  getARSearch = async input => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getARSearch(input);

      response.data.song_list_artist.map(item => {
        const { title, image_src: imgSrc, album, artist } = item;
        SearchActions.Arsearch(title, imgSrc, album, artist);
      });
      console.log('artist');
    } catch (e) {
      console.log(e);
    }
  };

  postApply = async (title, album, artist) => {
    try {
      const response = await api.postAPLLY(title, album, artist);
      const { message, code } = response.data;
      alert(message, code);
    } catch (e) {
      console.log(e);
    }
  };

  handleStarter = hour => {
    const { SearchActions } = this.props;
    this.starter =
      hour >= 12
        ? SearchActions.end()
        : setInterval(() => this.TimeHandler(), 1000);
  };

  TimeHandler = () => {
    // 8시 20분 이전 시간 관리 로직
    const { SearchActions, reservation, code } = this.props;

    const hour = moment().format('H');
    const min = moment().format('m');
    const sec = moment().format('s');

    const total =
      30000 - (Number(hour * 3600) + Number(min * 60) + Number(sec));

    const remainHour = Math.floor(total / 3600);
    const remainMin = Math.floor((total - remainHour * 3600) / 60);
    const remainSec = total - remainHour * 3600 - remainMin * 60;

    if (min >= '20') {
      // TimeHandler가 실행중일때 8시 20분이 넘으면 reservation 반전
      if (hour === '8' && reservation) {
        SearchActions.start();
        console.log('th active');
      }
    }

    if (code === 423 && reservation) {
      SearchActions.end();
    }

    if (code === 423 && !reservation) {
      SearchActions.start();
      SearchActions.end();
    }

    if (code !== 423) {
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
      console.log('pressesc');
    }
  }

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

  handleFocus = (bool) => {
    const { SearchActions } = this.props;

    SearchActions.focus(bool);
  }

  render() {
    const {
      input,
      placeholder,
      reservation,
      Tlist,
      Allist,
      Arlist,
      flag,
      cat,
      loading,
      focus,
    } = this.props;
    const {
      handleChange,
      handleSearch,
      postApply,
      changeResults,
      handleKeyPress,
      handleFocus,
      handleKeyDown,
    } = this;
    return (
      <>
        <SearchBar
          value={input}
          onChange={handleChange}
          onClick={handleSearch}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          reservation={reservation}
          changer={<SearchChanger changeResults={changeResults} cat={cat} chageFocus={handleFocus} />}
          onFocus={handleFocus}
          handleKeyDown={handleKeyDown}
        />
        <SearchResults
          Tlist={Tlist}
          Allist={Allist}
          Arlist={Arlist}
          cat={cat}
          flag={flag}
          onClick={postApply}
          changeResults={changeResults}
          loading={loading}
          focus={focus}
        />
      </>
    );
  }
}

const mapStateToProps = ({ search, musicList }) => ({
  input: search.input,
  hour: search.hour,
  min: search.min,
  sec: search.sec,
  placeholder: search.placeholder,
  reservation: search.reservation,
  code: musicList.code,
  list: search.list,
  flag: search.flag,
  cat: search.cat,
  Tlist: search.Tlist,
  Allist: search.Allist,
  Arlist: search.Arlist,
  loading: search.loading,
  focus: search.focus
});

const mapDispatchToProps = dispatch => ({
  SearchActions: bindActionCreators(searchActions, dispatch),
  MusicListActions: bindActionCreators(musicListActions, dispatch),
});

SearchBarContainer.propTypes = {
  reservation: PropTypes.bool,
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
  reservation: true,
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
