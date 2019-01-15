import React from 'react'
import classNames from 'classnames/bind';
import styles from './SearchBar.scss';
import { ReactComponent as Icon} from './searchIcon.svg';

const cx = classNames.bind(styles);

const SearchBar = ({ onChange, value }) => {
  return (
    <div className={cx('search-bar')}>
      <input
        className={cx('search')}
        onChange={onChange}
        value={value}
      />
      <Icon className={cx('icon')} />
    </div>
  );
}

export default SearchBar
