import React from 'react'
import classNames from 'classnames/bind';
import MusicItem from '../MusicItem';
import styles from './MusicList.scss';

const cx = classNames.bind(styles);

const MusicList = ({ list }) => {
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

  return (
    <div className={cx('list')}>
      {musicList}
    </div>
  )
}

export default MusicList
