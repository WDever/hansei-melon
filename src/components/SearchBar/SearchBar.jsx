import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchBar.scss';
import { ReactComponent as Icon } from './searchIcon.svg';

const cx = classNames.bind(styles);

class SearchBar extends React.Component {
  state = {
    input: '',
    placeholder: '',
  }

  componentDidMount = () => {
    const { code } = this.props;
    const hour = moment().format('H') * 3600;
    const min = moment().format('m') * 60;
    const sec = moment().format('s') * 1;

    const sum = hour + min + sec;

    // if(sum < 30000) {
    //   setInterval(() => this.setTime(), 1000);
    // }

    setInterval(() => this.setTime(), 1000);

    if (sum >= 28800 && sum <= 43200 && code !== 423) {
      this.setState(() => ({
        placeholder: '',
      }));
    }

    else if (sum > 43200 || code === 423) {
      this.setState(() => ({
        placeholder: '오늘의 예약이 마감되었습니다.',
      }));
    }
  }

  setTime = () => {
    const { code } = this.props;
    const { placeholder } = this.state;

    const hour = moment().format('H') * 3600;
    const min = moment().format('m') * 60;
    const sec = moment().format('s') * 1;
 
    const sum = hour + min + sec;

    if(sum < 28800) {
      const remainSum = 28800 - sum;
      const remainHour = Math.floor(remainSum / 3600);
      const remainMin = Math.floor((remainSum - remainHour * 3600) / 60);
      const remainSec = remainSum - remainHour * 3600 - remainMin * 60;
      this.setState(() => ({
        placeholder: `예약시간 전 입니다. - ${remainHour} : ${remainMin} : ${remainSec}`       
      }));
    }

    else if(sum === 28800) {
      this.setState(() => ({
        placeholder: '',
      }));
    }

    else if ((sum > 43200 || code === 423) && placeholder !== '오늘의 예약이 마감되었습니다.') {
      this.setState(() => ({
        placeholder: '오늘의 예약이 마감되었습니다.',
      }));
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { input } = this.state;
    const { onClick } = this.props;

    onClick(input);
  }

  onChange = e => {
    const { value } = e.target;

    this.setState(() => ({
      input: value,
    }));
  }

  render() {
    const { changer, canReservation, onFocus } = this.props;
    const { placeholder, input } = this.state;
    const { onChange, onSubmit } = this; 
    return (
      <div className={cx('search-template')}>
        {changer}
        <form className={cx('search-bar')} onSubmit={onSubmit}>
          <input
            className={cx('search')}
            onChange={onChange}
            value={input}
            placeholder={canReservation ? placeholder : ''}
            onFocus={() => onFocus(true)}
            onBlur={() => onFocus(false)}
          />
          <button type="submit">
            <Icon className={cx('icon')} />
          </button>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  // onChange: PropTypes.func,
  onClick: PropTypes.func,
  // value: PropTypes.string,
  // reservation: PropTypes.bool,
  // placeholder: PropTypes.string,
  onFocus: PropTypes.func,
};

SearchBar.defaultProps = {
  // onChange: () => console.log('no onChange!'),
  onClick: () => console.log('no onClick!'),
  // value: '',
  // reservation: true,
  // placeholder: '',
  onFocus: () => console.log('no onFocus!'),
};

export default SearchBar;
