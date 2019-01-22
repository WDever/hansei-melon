/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Circle } from 'better-react-spinkit';
import SearchItem from '../SearchItem';
import styles from './SearchResults.scss';
// import MusicItem from '../MusicItem';

const cx = classNames.bind(styles);

const SearchResults = ({ flag, cat, Tlist, Allist, Arlist, onClick, loading, focus }) => {
  const titleList = Tlist.map(item => (
    <SearchItem
      key={item.id}
      id={item.id}
      title={item.title}
      src={item.imgSrc}
      artist={item.artist}
      onClick={() => onClick(item.title, item.album, item.artist)}
    />
  ));

  const albumList = Allist.map(item => (
    <SearchItem
      key={item.id}
      id={item.id}
      title={item.title}
      src={item.imgSrc}
      artist={item.artist}
      onClick={() => onClick(item.title, item.album, item.artist)}
    />
  ));

  const artistList = Arlist.map(item => (
    <SearchItem
      key={item.id}
      id={item.id}
      title={item.title}
      src={item.imgSrc}
      artist={item.artist}
      onClick={() => onClick(item.title, item.album, item.artist)}
    />
  ));

  const reset = async () => {
    titleList.length = 0;
    albumList.length = 0;
    artistList.length = 0;
  }

  if (loading) {
    reset();
    return (
      <div className={cx('results-wrapper', { visibility: focus })}>
        <Circle color="black" size={60} />{' '}
      </div>
    );
  }

  if (flag && !loading) {
    if (titleList.length !== 0 && cat === 1) {
      return (
        <div className={cx('results-wrapper', { visibility: focus })}>
          {titleList}{' '}
        </div>
      );
    }
    if (titleList.length === 0) {
      return (
        <div className={cx('change-wrapper')}>
          <div className={cx('results-wrapper')}> 검색 결과가 없습니다. </div>{' '}
        </div>
      );
    }
  }

  if (flag && !loading) {
    if (artistList.length !== 0 && cat === 2) {
      return (
        <div className={cx('results-wrapper')}>
          {artistList}{' '}
        </div>
      );
    }
    if (artistList.length === 0) {
      return (
        <div className={cx('change-wrapper')}>
          <div className={cx('results-wrapper')}> 검색 결과가 없습니다. </div>{' '}
        </div>
      );
    }
  }

  if (flag && !loading) {
    if (albumList.length !== 0 && cat === 3) {
      return (
        <div className={cx('results-wrapper')}>
          {albumList}{' '}
        </div>
      );
    }
    if (albumList.length === 0) {
      return (
        <div className={cx('results-wrapper')}>
          검색 결과가 없습니다.{' '}
        </div>
      );
    }
  }

  return <div />;
};

SearchResults.propTypes = {
  flag: PropTypes.bool,
  cat: PropTypes.number,
  Tlist: PropTypes.array,
  Allist: PropTypes.array,
  Arlist: PropTypes.array,
  focus: PropTypes.bool,
};

SearchResults.defaultProps = {
  flag: false,
  cat: 1,
  Tlist: [],
  Allist: [],
  Arlist: [],
  focus: false,
};

export default SearchResults;
