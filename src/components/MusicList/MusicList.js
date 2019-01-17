import React from 'react'
import classNames from 'classnames/bind';
import { Circle } from 'better-react-spinkit';
import MusicItem from '../MusicItem';
import styles from './MusicList.scss';

const cx = classNames.bind(styles);

const MusicList = ({ list, loading }) => {
  const musicList = list.map(
    item => (
      <MusicItem
        key={item.id}
        id={item.id}
        title={item.title}
        src={item.imgSrc}
      />
    )
  );

  if(loading) {
    return (
      <div className={cx('list')}>
        <Circle color="black" size={80} />
      </div>
    )
  }

  return (
    <div className={cx('list')}>
      {musicList}
    </div>
  )
}

export default MusicList
