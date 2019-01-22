/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React from 'react'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Circle } from 'better-react-spinkit';
import styles from './SearchResults.scss';
import SearchItem from '../SearchItem';
import { postAPLLY } from '../../lib/api';

const cx = classNames.bind(styles);

const SearchResults = ({ flag, cat, Tlist, Allist, Arlist, changeResults, onClick, loading }) => {
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

  if(flag === true && cat === 1) {
    return (
      <div className={cx('results-wrapper')}>
        <div className={cx('change-wrapper')}>
          <div className={cx('change')} onClick={() => changeResults(1)}>제목</div>
          <div className={cx('change')} onClick={() => changeResults(2)}>가수</div>
          <div className={cx('change')} onClick={() => changeResults(3)}>앨범</div>
        </div>
        {titleList}
      </div>
    );
  }

  if(flag === true && cat === 2) {
    return (
      <div className={cx('results-wrapper')}>
        <div className={cx('change-wrapper')}>
          <div className={cx('change')} onClick={() => changeResults(1)}>제목</div>
          <div className={cx('change')} onClick={() => changeResults(2)}>가수</div>
          <div className={cx('change')} onClick={() => changeResults(3)}>앨범</div>
        </div>
        {artistList}
      </div>
    );
  }

  if(flag === true && cat === 3) {
    return (
      <div className={cx('results-wrapper')}>
        <div className={cx('change-wrapper')}>
          <div className={cx('change')} onClick={() => changeResults(1)}>제목</div>
          <div className={cx('change')} onClick={() => changeResults(2)}>가수</div>
          <div className={cx('change')} onClick={() => changeResults(3)}>앨범</div>
        </div>
        {albumList}
      </div>
    );
  }

  return (
    <div />
  )
}

SearchResults.propTypes = {
  flag: PropTypes.bool,
  cat: PropTypes.number,
  Tlist: PropTypes.array,
  Allist: PropTypes.array,
  Arlist: PropTypes.array
};

SearchResults.defaultProps = {
  flag: false,
  cat: 1,
  Tlist: [],
  Allist: [],
  Arlist: []
}

export default SearchResults
