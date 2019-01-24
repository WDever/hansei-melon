import React from 'react'
import classNames from 'classnames/bind';
import styles from './SearchItem.scss';

const cx = classNames.bind(styles);

const SearchItem = ({ title, src, artist, onClick }) => {
  return (
    <div className={cx('search-item')}>
      <div className={cx('search-data')}>
        <img className={cx('search-img')} src={src} alt='album art' />
        <div className={cx('search-info')}>
          <div className={cx('search-title')}>{title}</div>
          <div className={cx('search-artist')}>{artist}</div>
        </div>
      </div>
      <div className={cx('search-reservation')} onClick={onClick}>신청하기</div>
    </div>
  )
}

export default SearchItem
