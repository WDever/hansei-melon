import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchBar.scss';
import { ReactComponent as Icon } from './searchIcon.svg';

const cx = classNames.bind(styles);

const SearchBar = ({ onChange, onClick, value, reservation, placeholder, onKeyPress }) => (
  <div className={cx('search-bar')}>
    <input
      className={cx('search')}
      onChange={onChange}
      value={value}
      placeholder={reservation ? placeholder : ''}
      onKeyPress={onKeyPress}
    />
    <Icon className={cx('icon')} onClick={onClick} />
  </div>
  );

SearchBar.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.string,
  reservation: PropTypes.bool,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  onChange: () => console.log('no onChange!'),
  onClick: () => console.log('no onClick!'),
  value: '',
  reservation: true,
  placeholder: '',
};

export default SearchBar;