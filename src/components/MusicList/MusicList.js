/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames/bind';
import { Circle } from 'better-react-spinkit';
import MusicItem from '../MusicItem';
import styles from './MusicList.scss';

const cx = classNames.bind(styles);

const MusicList = ({ list, loading, onClick, check }) => {
  const musicList = list.map(item => (
    <MusicItem
      key={item.id}
      id={item.id}
      title={item.title}
      src={item.imgSrc}
      onClick={() => onClick(item.title, item.album, item.artist)}
    />
  ));

  if (loading) {
    return (
      <div className={cx('list')}>
        <Circle color="black" size={80} />
      </div>
    );
  }

  return (
    <div className={cx('list')}>
      <div className={cx('top-title')}>
        {check ? 'TOP 100' : `Today's Playlist`}
      </div>
      {musicList}
    </div>
  );
};

export default MusicList;
