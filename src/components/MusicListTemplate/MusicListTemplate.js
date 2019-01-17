import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MusicListTemplate.scss';

const cx = classNames.bind(styles);

const MusicListTemplate = ({ list }) => (
  <div className={cx('list-template')}>
    <div className={cx('Toptitle')}>TOP 100</div>
    {list}
  </div>
);

MusicListTemplate.propTypes = {
  list: PropTypes.element,
};

MusicListTemplate.defaultProps = {
  list: null,
};

export default MusicListTemplate;
