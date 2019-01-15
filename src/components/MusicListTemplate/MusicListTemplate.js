import React from 'react'
import classNames from 'classnames/bind';
import styles from './MusicListTemplate.scss';

const cx = classNames.bind(styles);

const MusicListTemplate = ({ list }) => {
  return (
    <div className={cx('list-template')}>
      <div className={cx('Toptitle')}>
        TOP 100
      </div>
      {list}
    </div>
  )
}

export default MusicListTemplate
