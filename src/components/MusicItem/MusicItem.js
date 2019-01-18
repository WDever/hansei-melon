import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MusicItem.scss';

const cx = classNames.bind(styles);

const MusicItem = ({ title, src, onClick }) => (
  <div className={cx('item')} style={{ backgroundImage: `url(${src})` }} onClick={onClick}>
    <div className={cx('title')}>{title}</div>
    <div className={cx('reservation')}>예약하기</div>
  </div>
);

MusicItem.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
};

MusicItem.defaultProps = {
  title: 'ERROR!',
  src: null,
};

export default MusicItem;
