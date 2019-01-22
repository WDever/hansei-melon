import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchChanger.scss';

const cx = classNames.bind(styles);

const SearchChanger = ({ changeResults, cat }) => (
  <div className={cx('change-wrapper')}>
    <div className={cx('change', { active: cat === 1 })} onClick={() => changeResults(1)}>
      제목
    </div>
    <div className={cx('change', { active: cat === 2 })} onClick={() => changeResults(2)}>
      가수
    </div>
    <div className={cx('change', { active: cat === 3 })} onClick={() => changeResults(3)}>
      앨범
    </div>
  </div>
  );

export default SearchChanger;
