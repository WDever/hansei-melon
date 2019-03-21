/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Circle } from 'better-react-spinkit';
import { SearchItem } from '../MusicItem';
import styles from './SearchResults.scss';

const cx = classNames.bind(styles);

class SearchResults extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    const {
      Tlist,
      Allist,
      Arlist,
      cat,
      titleLoading,
      artistLoading,
      albumLoading,
    } = this.props;

    return (
      nextProps.Tlist !== Tlist ||
      nextProps.Allist !== Allist ||
      nextProps.Arlist !== Arlist ||
      nextProps.cat !== cat ||
      nextProps.titleLoading !== titleLoading ||
      nextProps.albumLoading !== albumLoading ||
      nextProps.artistList !== artistLoading
    );
  };

  render() {
    const {
      Tlist,
      Allist,
      Arlist,
      onClick,
      focus,
      flag,
      noResultsInput,
      cat,
      titleLoading,
      artistLoading,
      albumLoading,
    } = this.props;

    const titleList = Tlist.map(item => (
      <SearchItem
        key={item.id}
        id={item.id}
        title={item.title}
        src={item.imgSrc}
        artist={item.artist}
        onClick={() => onClick(item.title, item.album, item.artist, item.id)}
      />
    ));

    const albumList = Allist.map(item => (
      <SearchItem
        key={item.id}
        id={item.id}
        title={item.title}
        src={item.imgSrc}
        artist={item.artist}
        onClick={() => onClick(item.title, item.album, item.artist, item.id)}
      />
    ));

    const artistList = Arlist.map(item => (
      <SearchItem
        key={item.id}
        id={item.id}
        title={item.title}
        src={item.imgSrc}
        artist={item.artist}
        onClick={() => onClick(item.title, item.album, item.artist, item.id)}
      />
    ));

    if (cat === 1 && flag) {
      if (titleLoading) {
        return (
          <div className={cx('results-wrapper', { visibility: focus })}>
            <Circle color="black" size={60} />{' '}
          </div>
        );
      }
      if (!titleLoading && titleList.length) {
        return (
          <div className={cx('results-wrapper', { visibility: focus })}>
            {titleList}{' '}
          </div>
        );
      }
      if (!titleLoading && !titleList.length) {
        return (
          <div className={cx('results-wrapper', { visibility: focus })}>
            &quot;
            <p>{noResultsInput}</p>
            &quot;에 대한 검색결과가 존재하지 않습니다.
          </div>
        );
      }
    }

    if (cat === 2 && flag) {
      if (artistLoading) {
        return (
          <div className={cx('results-wrapper', { visibility: focus })}>
            <Circle color="black" size={60} />{' '}
          </div>
        );
      }
      if (!artistLoading && artistList.length) {
        return (
          <div className={cx('results-wrapper', { visibility: focus })}>
            {artistList}{' '}
          </div>
        );
      }
      if (!artistLoading && !artistList.length) {
        return (
          <div className={cx('results-wrapper', { visibility: focus })}>
            &quot;
            <p>{noResultsInput}</p>
            &quot;에 대한 검색결과가 존재하지 않습니다.
          </div>
        );
      }
    }

    if (cat === 3 && flag) {
      if (albumLoading) {
        return (
          <div className={cx('results-wrapper', { visibility: focus })}>
            <Circle color="black" size={60} />{' '}
          </div>
        );
      }
      if (!albumLoading && albumList.length) {
        return (
          <div className={cx('results-wrapper', { visibility: focus })}>
            {albumList}{' '}
          </div>
        );
      }
      if (!albumLoading && !albumList.length) {
        return (
          <div className={cx('results-wrapper', { visibility: focus })}>
            &quot;
            <p>{noResultsInput}</p>
            &quot;에 대한 검색결과가 존재하지 않습니다.
          </div>
        );
      }
    }
    return <div />;
  }
}

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
