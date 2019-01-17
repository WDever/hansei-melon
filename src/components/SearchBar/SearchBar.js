import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchBar.scss';
import { ReactComponent as Icon } from './searchIcon.svg';

const cx = classNames.bind(styles);

const SearchBar = ({ onChange, value, reservation, placeholder }) => (
  <div className={cx('search-bar')}>
    <input
      className={cx('search')}
      onChange={onChange}
      value={value}
      placeholder={reservation ? placeholder : ''}
    />
    <Icon className={cx('icon')} />
  </div>
  );

SearchBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  reservation: PropTypes.bool,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  onChange: () => console.log('no onChange!'),
  value: '',
  reservation: true,
  placeholder: '',
};

export default SearchBar;
