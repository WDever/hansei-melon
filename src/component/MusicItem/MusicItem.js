import React from 'react'
import classNames from 'classnames/bind';
import styles from './MusicItem.scss';

const cx = classNames.bind(styles);

const MusicItem = ({ title, src, id }) => {
  return (
    <div className={cx('item')} style={{backgroundImage: `url(${src})`}}>
      <div className={cx('title')}>
        {title}
      </div>
      <div className={cx('reservation')}>
        예약하기
      </div>
    </div>
  )
}

export default MusicItem
