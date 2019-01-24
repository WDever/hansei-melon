/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames/bind';
import { Circle } from 'better-react-spinkit';
import styles from './MusicList.scss';
import MusicItem from '../MusicItem';
// import MusicItem, { PlaylistItem } from '../MusicItem';

const cx = classNames.bind(styles);

const MusicList = ({ list, loading, onClick, check, flag }) => {
  const musicList = list.map(item => (
    <MusicItem
      key={item.id}
      id={item.id}
      title={item.title.concat(' - ', item.artist)}
      src={item.imgSrc}
      onClick={() => onClick(item.title, item.album, item.artist, item.id)}
    />
  ));

  // if (!check) {
  //   const playList = list.map(item => (
  //     <PlaylistItem
  //       key={item.id}
  //       id={item.id}
  //       title={item.title.concat(' - ', item.artist)}
  //       src={item.imgSrc}
  //     />
  //   ))
  // }

  if (loading) {
    return (
      <div className={cx('list')}>
        <Circle color="black" size={80} />
      </div>
    );
  }

  // flag===true, 빈 div태그

  return (
    <div className={cx('list')}>
      <div className={cx('top-title')}>
        {check ? 'TOP 100' : `Today's Playlist`}
      </div>
      {/* {check ? {musicList} : {playList}} */}
      {musicList}
    </div>
  );
};

export default MusicList;
