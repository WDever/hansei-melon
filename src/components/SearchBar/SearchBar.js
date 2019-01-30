import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchBar.scss';
import { ReactComponent as Icon } from './searchIcon.svg';

const cx = classNames.bind(styles);

const SearchBar = ({
  onChange,
  onClick,
  value,
  canReservation,
  placeholder,
  onKeyPress,
  changer,
  onFocus,
  handleKeyDown,
  timeOutFocus,
}) => (
  <div className={cx('search-template')}>
    {changer}
    <div className={cx('search-bar')}>
      <input
        className={cx('search')}
        onChange={onChange}
        value={value}
        placeholder={canReservation ? placeholder : ''}
        onKeyPress={onKeyPress}
        onKeyDown={handleKeyDown}
        onFocus={() => onFocus(true)}
        onBlur={() => timeOutFocus(false)}
      />
      <Icon className={cx('icon')} onClick={onClick} />
    </div>
  </div>
  );

SearchBar.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.string,
  reservation: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
};

SearchBar.defaultProps = {
  onChange: () => console.log('no onChange!'),
  onClick: () => console.log('no onClick!'),
  value: '',
  reservation: true,
  placeholder: '',
  onFocus: () => console.log('no onFocus!'),
};

export default SearchBar;
