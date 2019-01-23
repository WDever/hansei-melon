import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PlaylistItem.scss';

const cx = classNames.bind(styles);

const PlaylistItem = ({ title, src, onClick, detail }) => (
  <a className={cx('item')} style={{ backgroundImage: `url(${src})` }} onClick={onClick} href={detail}>
    <div className={cx('title')}>{title}</div>
    <div className={cx('reservation')}>예약하기</div>
  </a>
);

PlaylistItem.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
};

PlaylistItem.defaultProps = {
  title: 'ERROR!',
  src: null,
};

export default PlaylistItem;
