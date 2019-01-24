import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MusicItem.scss';

const cx = classNames.bind(styles);

const MusicItem = ({ title, src, onClick }) => (
  <div className={cx('item')} style={{ backgroundImage: `url(${src})` }} onClick={onClick}>
    <div className={cx('title')}>{title}</div>
    <div className={cx('reservation')}>신청하기</div>
  </div>
);

export const PlaylistItem = ({ title, src, detail }) => (
  <a className={cx('item')} style={{ backgroundImage: `url(${src})` }} href={detail}>
    <div className={cx('title')}>{title}</div>
    <div className={cx('reservation')}>정보보기</div>
  </a>
);

export const SearchItem = ({ title, src, artist, onClick }) => {
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


PlaylistItem.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
};

PlaylistItem.defaultProps = {
  title: 'ERROR!',
  src: null,
};




MusicItem.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
};

MusicItem.defaultProps = {
  title: 'ERROR!',
  src: null,
};

export default MusicItem;
